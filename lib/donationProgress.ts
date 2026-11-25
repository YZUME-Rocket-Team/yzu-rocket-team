import "server-only";

import { unstable_cache } from "next/cache";
import { connection } from "next/server";

import { donationCampaign2027, donationCampaignWindow2027 } from "@/data/donationCampaign";

import { fetchDonationTotals, isIsoDate, readManualSnapshot, type DateRange, type DonationListSource, type DonationSnapshot } from "./donations";

const revalidateSeconds = 86_400;
const failureRetryMs = 5 * 60 * 1_000;
// Warm-instance throttling only. Next's shared cache owns every successful snapshot.
let retryAfter = 0;
let inFlight: Promise<DonationSnapshot> | null = null;

const getCachedSnapshot = unstable_cache(async (
  sources: readonly DonationListSource[],
  purpose: string,
  range: DateRange,
) => {
  if (inFlight) return inFlight;
  if (Date.now() < retryAfter) throw new Error("Donation source retry is cooling down");

  inFlight = fetchDonationTotals(sources, purpose, range)
    .then(({ amount }) => ({ amount, updatedAt: new Date().toISOString() }))
    .catch(() => {
      retryAfter = Date.now() + failureRetryMs;
      // Throw so a failed refresh cannot replace the last completed aggregate.
      throw new Error("Official donation totals could not be refreshed");
    })
    .finally(() => { inFlight = null; });
  return inFlight;
}, ["yzu-2027-donation-progress-v1"], { revalidate: revalidateSeconds });

export async function getDonationProgress(): Promise<DonationSnapshot | null> {
  const fallback = readManualSnapshot(process.env.DONATION_FALLBACK_AMOUNT, process.env.DONATION_FALLBACK_DATE);
  const { from, through } = donationCampaignWindow2027();
  if (process.env.DONATION_SCRAPE_ENABLED !== "true"
    || !from || !through || !isIsoDate(from) || !isIsoDate(through) || from > through) return fallback;

  // Skip network requests during build, even when production settings enable polling.
  await connection();
  try {
    return await getCachedSnapshot(donationCampaign2027.sources, donationCampaign2027.purpose, { from, through });
  } catch {
    return fallback;
  }
}
