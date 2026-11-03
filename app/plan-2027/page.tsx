import type { Metadata } from "next";
import Image from "next/image";

import PageLinks from "@/components/PageLinks";
import BudgetChartCard from "@/app/budget/BudgetChartCard";
import { missionGoals } from "@/data/siteContent";
import { budgetTotal2027, formatBudgetAmount, planBudget2027, planGoalMedia } from "@/data/plan2027";
import CompetitionCalendar from "./CompetitionCalendar";
import PlanIcon from "./PlanIcon";
import PlanReveal from "./PlanReveal";
import styles from "./plan.module.css";

export const metadata: Metadata = {
  title: "2027 計畫｜火大的元件",
  description: "從 2026 的實戰經驗出發，了解火大的元件 2027 四大升級方向、20 萬元建議預算與台灣盃火箭競賽官方時程。",
};

export default function Plan2027Page() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroPhoto}>
          <Image src="/images/hero-launch.png" alt="火大的元件火箭於 2026 賽事升空，尾焰與煙霧沿發射架向上延伸" fill sizes="(min-width: 1024px) 78vw, 100vw" preload className={styles.heroImage} />
        </div>
        <div aria-hidden="true" className={styles.heroShade} />
        <div aria-hidden="true" className={styles.heroGrid} />
        <div className={`${styles.container} ${styles.heroContent}`}>
          <p className={styles.eyebrow}>MISSION 2027</p>
          <h1><span>2027</span> 計畫</h1>
          <p className={styles.heroTagline}>這一次，我們要飛得更好。</p>
          <p className={styles.heroDescription}>從 2026 的實戰經驗出發，優化設計、強化系統，<br className={styles.desktopBreak} />讓下一次的火箭飛得更高、更穩、更可靠。</p>
          <p className={styles.photoCredit}>2026 團隊發射紀錄</p>
        </div>
      </header>

      <PlanReveal>
        <section aria-labelledby="journey-heading" className={`${styles.introduction} ${styles.section}`}>
          <Image src="/images/competition/tasa-earth-bg.jpg.png" alt="" fill sizes="100vw" className={styles.earthImage} />
          <div className={`${styles.container} ${styles.introLayout}`} data-plan-reveal>
            <h2 id="journey-heading" className={styles.sectionTitle}>從 2026 的成果，<br />走向 2027 的改進。</h2>
            <div className={styles.introCopy}>
              <p>2026 年，我們投入約 13.9 萬元完成火箭製作與參賽，並在台灣盃火箭競賽學生 3K 組獲得第三名。這個成果來自團隊投入的時間，也來自學校、師長與各界的支持。</p>
              <p>2027 年，我們希望進一步改善火箭結構、航電、遙測與回收系統，並投入更多資源進行地面測試與系統驗證。把每一次的經驗，化為下一次更可靠的飛行。</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="upgrades-heading" className={`${styles.section} ${styles.upgrades}`}>
          <div className={styles.container}>
            <h2 id="upgrades-heading" className={styles.sectionTitle} data-plan-reveal>2027 四大升級重點</h2>
            <ol className={styles.goalGrid}>
              {missionGoals.map((goal, index) => {
                const media = planGoalMedia[index];
                return (
                  <li key={goal.number} className={styles.goalCard} data-plan-reveal data-reveal-delay={index * 50}>
                    <div className={styles.goalSurface}>
                      <Image src={media.src} alt={media.alt} fill sizes="(min-width: 900px) 24vw, (min-width: 600px) 48vw, 100vw" className={`${styles.goalImage} ${media.diagram ? styles.goalImageDiagram : ""}`} style={{ objectPosition: media.position }} />
                      <div className={styles.goalShade} aria-hidden="true" />
                      <span className={styles.mediaLabel}>{media.label}</span>
                      <div className={styles.goalCopy}>
                        <PlanIcon name={media.icon} className={styles.goalIcon} />
                        <span className={styles.goalNumber}>{goal.number}</span>
                        <h3>{goal.title}</h3>
                        <p>{goal.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section aria-labelledby="budget-heading" className={`${styles.section} ${styles.budget}`}>
          <div className={`${styles.container} ${styles.budgetLayout}`} data-plan-reveal>
            <div className={styles.budgetIntro}>
              <h2 id="budget-heading" className={styles.sectionTitle}>2027 建議預算</h2>
              <p>以下依下一階段的開發、測試與參賽需求，規劃各項支出用途。</p>
              <div className={styles.fundingTarget}>
                <PlanIcon name="target" />
                <div><p>2027 募款目標</p><strong>{formatBudgetAmount(budgetTotal2027)}</strong></div>
              </div>
              <p className={styles.budgetNote}>讓下一枚火箭更完整、更可靠。</p>
            </div>
            <BudgetChartCard
              id="budget-2027"
              title="2027 建議預算"
              totalLabel="預算分配"
              totalAmount={formatBudgetAmount(budgetTotal2027)}
              embedded
              note="各項金額為建議支出規劃；募款目標非已募金額。"
              segments={planBudget2027.map((item) => ({
                label: item.label,
                color: item.color,
                fraction: item.value / budgetTotal2027,
                offset: item.offset / 100,
                formattedAmount: item.amount,
                percentage: `${item.percentage}%`,
              }))}
            />
          </div>
        </section>

        <CompetitionCalendar />
        <div className={`${styles.container} ${styles.pageNavigation}`}>
          <PageLinks compact />
        </div>
      </PlanReveal>
    </main>
  );
}
