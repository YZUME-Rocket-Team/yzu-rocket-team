import { donationPurpose } from "./donationTutorial";

export function donationCampaignWindow2027() {
  // Both dates are pending confirmation. An incomplete window keeps polling disabled.
  return {
    from: process.env.DONATION_CAMPAIGN_START?.trim(),
    through: process.env.DONATION_CAMPAIGN_END?.trim(),
  };
}

export const donationCampaign2027 = {
  purpose: donationPurpose,
  sources: [
    {
      url: "https://www.yzu.edu.tw/admin/pr/index.php/tw/2016-03-16-07-28-29/2016-03-18-07-27-55/91-115xue-nian-du/9312-donation-list-115",
      // The publication dates partition annual lists. Campaign dates are configured separately.
      from: "2026-08-01",
      through: "2027-07-31",
    },
  ],
} as const;
