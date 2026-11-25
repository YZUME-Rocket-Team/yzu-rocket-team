import { Suspense } from "react";

import { donationCampaign2027 } from "@/data/donationCampaign";
import { formatBudgetAmount, fundingTarget2027 } from "@/data/plan2027";
import { getDonationProgress } from "@/lib/donationProgress";
import type { DonationSnapshot } from "@/lib/donations";

import FundingProgress from "./FundingProgress";
import PlanIcon from "./PlanIcon";
import styles from "./plan.module.css";

const localDate = new Intl.DateTimeFormat("zh-TW", { timeZone: "Asia/Taipei", dateStyle: "long" });

function FundingCard({ snapshot, loading = false }: { snapshot: DonationSnapshot | null; loading?: boolean }) {
  return (
    <aside className={styles.fundingTarget} aria-labelledby="funding-target-heading">
      <div className={styles.fundingGoal}>
        <PlanIcon name="target" />
        <div>
          <h3 id="funding-target-heading">2027 募款目標</h3>
          <strong>{formatBudgetAmount(fundingTarget2027)}</strong>
        </div>
      </div>
      {snapshot
        ? <FundingProgress amount={snapshot.amount} goal={fundingTarget2027} />
        : (
          <div className={styles.fundingUnavailable}>
            <p>{loading ? "募款資料讀取中" : "募款資料暫未更新"}</p>
            <div className={styles.fundingTrack} aria-hidden="true" />
          </div>
        )}
      <footer className={styles.fundingSource}>
        <p>依校方公布資料更新</p>
        {snapshot && (
          <p>最後成功更新日期 <time dateTime={snapshot.updatedAt}>{localDate.format(new Date(snapshot.updatedAt))}</time></p>
        )}
        <a href={donationCampaign2027.sources[0].url} target="_blank" rel="noopener noreferrer">
          官方捐款名錄 <span aria-hidden="true">↗</span><span className="sr-only">（開啟新分頁）</span>
        </a>
      </footer>
    </aside>
  );
}

async function FundingCardData() {
  return <FundingCard snapshot={await getDonationProgress()} />;
}

export default function DonationProgressCard() {
  return (
    <Suspense fallback={<FundingCard snapshot={null} loading />}>
      <FundingCardData />
    </Suspense>
  );
}
