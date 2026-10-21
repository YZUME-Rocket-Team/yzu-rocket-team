import type { Metadata } from "next";
import Image from "next/image";

import PageLinks from "@/components/PageLinks";
import RocketStructureSection from "@/components/RocketStructureSection";
import styles from "./journey.module.css";

export const metadata: Metadata = {
  title: "2026 經歷｜火大的元件",
  description: "從設計審查到決賽發射，記錄火大的元件參與第二屆台灣盃火箭競賽、獲得學生 3K 組第三名的經歷。",
};

const milestones = [
  { title: "初審", description: "通過任務計畫書審查" },
  { title: "設計審查", description: "學生 3K 組九取六" },
  { title: "決賽", description: "取得決賽資格" },
];

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className={styles.chapterLabel}>
      <span className={styles.chapterNumber}>{number}</span>
      <span className={styles.eyebrow} lang="en">{children}</span>
    </p>
  );
}

export default function Journey2026Page() {
  return (
    <main className={styles.journey}>
      <section className={styles.hero} aria-labelledby="journey-title">
        <div className={styles.heroPhoto}>
          <Image
            src="/images/journey-2026/hero-team.jpg.jpg"
            alt="火大的元件團隊在海邊與完整火箭合照"
            fill preload sizes="(min-width: 1024px) 75vw, 100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`${styles.container} ${styles.heroContent}`}>
          <div className={styles.heroCopy}>
            <ChapterLabel number="00">2026 TAIWAN CUP</ChapterLabel>
            <div className={styles.chapterBody}>
              <h1 id="journey-title" className={styles.heroTitle}>
                <span>第二屆</span><span>台灣盃火箭競賽</span>
              </h1>
              <div className={styles.copy}>
                <p>2026 年，我們帶著自己設計、製作的火箭，參加台灣盃火箭競賽學生 3K 組。</p>
                <p>從最初的設計，到最後站上發射場，這裡記錄了我們這一年的經歷。</p>
              </div>
            </div>
          </div>
          <a href="#road-to-finals" className={styles.exploreLink}>
            <span lang="en">EXPLORE THE JOURNEY</span><span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="road-to-finals" className={styles.qualifier} aria-labelledby="qualifier-title">
        <div className={`${styles.container} ${styles.qualifierGrid}`}>
          <div className={styles.qualifierCopy}>
            <ChapterLabel number="01">ROAD TO THE FINALS</ChapterLabel>
            <div className={styles.chapterBody}>
              <h2 id="qualifier-title" className={styles.sectionTitle}>脫穎而出，晉級決賽</h2>
              <div className={styles.copy}>
                <p>第二屆台灣盃火箭競賽共有 71 支隊伍、859 人報名。</p>
                <p>我們通過任務計畫書初審後，繼續參加火箭設計審查。學生 3K 組從 9 支隊伍中選出 6 支晉級決賽，我們也順利取得決賽資格。</p>
              </div>
              <dl className={styles.statistics}>
                {[
                  { value: "71", label: "支隊伍報名" },
                  { value: "859", label: "人報名參賽" },
                  { value: "9 → 6", label: "學生 3K 組晉級名額" },
                ].map((stat) => (
                  <div key={stat.value} className={styles.stat}>
                    <dt>{stat.label}</dt><dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <ol className={styles.timeline} aria-label="晉級歷程">
                {milestones.map((milestone, index) => (
                  <li key={milestone.title}>
                    <span className={styles.timelineNode} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <figure className={styles.qualifierFigure}>
            <div className={styles.qualifierPhoto}>
              <Image src="/images/journey-2026/qualifier-team.jpg.jpg" alt="團隊在火箭設計審查現場與台灣盃火箭競賽旗幟合照" fill sizes="(min-width: 1024px) 53vw, 100vw" className={styles.containImage} />
            </div>
            <figcaption><span aria-hidden="true">—</span> 火箭設計審查（預賽現場）</figcaption>
          </figure>
        </div>
      </section>

      <RocketStructureSection introduction={false} />

      <section id="the-finals" className={styles.finals} aria-labelledby="finals-title">
        <div className={`${styles.container} ${styles.finalsGrid}`}>
          <div className={styles.finalsCopy}>
            <ChapterLabel number="03">THE FINALS</ChapterLabel>
            <div className={styles.chapterBody}>
              <h2 id="finals-title" className={styles.sectionTitle}>決賽現場</h2>
              <p className={styles.copy}>從發射前的準備，到火箭實際升空，這些照片與影片記錄了我們的決賽過程。</p>
            </div>
          </div>
          <figure className={styles.finalsPhoto}>
            <Image src="/images/journey-2026/finals-team.jpg.jpg" alt="決賽現場，團隊在海邊圍繞火箭合照，上方是開闊天空" fill sizes="(min-width: 1024px) 55vw, 100vw" className={styles.containImage} />
          </figure>
          <figure className={styles.flightFigure}>
            <div className={styles.videoFrame}>
              <div className={styles.videoLabel}><span lang="en">FLIGHT RECORD / 2026</span><span className={styles.recordDot} aria-hidden="true" /></div>
              <video controls playsInline preload="metadata" aria-label="2026 台灣盃火箭競賽實際發射影片" className={styles.launchVideo}>
                <source src="/videos/rocket-launch-2026.mp4" type="video/mp4" />
                您的瀏覽器不支援 HTML5 影片播放。
              </video>
            </div>
            <figcaption>2026 台灣盃火箭競賽｜發射影片</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.result} aria-labelledby="result-title">
        <div className={`${styles.container} ${styles.resultGrid}`}>
          <div className={styles.resultCopy}>
            <ChapterLabel number="04">THE RESULT</ChapterLabel>
            <div className={styles.chapterBody}>
              <p className={styles.topThree} lang="en">TOP 3</p>
              <h2 id="result-title" className={styles.resultTitle}>學生 3K 組第三名</h2>
              <div className={styles.copy}>
                <p>最終，我們獲得第二屆台灣盃火箭競賽學生 3K 組第三名。</p>
                <p>這次比賽讓我們累積了實際的參賽經驗，也成為未來持續挑戰的重要基礎。</p>
              </div>
            </div>
          </div>
          <figure className={styles.awardPhoto}>
            <Image src="/images/journey-2026/third-place-award.jpg.jpg" alt="火大的元件團隊領取學生 3K 組第三名獎牌及獎金看板，於競賽活動背景前合照" fill sizes="(min-width: 1024px) 58vw, 100vw" className={styles.containImage} />
          </figure>
        </div>
      </section>

      <PageLinks compact nextLabel="經費總覽" />
    </main>
  );
}
