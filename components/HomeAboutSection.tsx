import Image from "next/image";

import HomeAboutCarousel from "@/components/HomeAboutCarousel";
import styles from "./HomeAboutSection.module.css";

function TrophyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 3v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1H8Z" />
    </svg>
  );
}

function LaurelIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 36" fill="currentColor">
      <path d="M17 34C5 28 2 14 12 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="7" cy="26" rx="1.8" ry="4" transform="rotate(-45 7 26)" />
      <ellipse cx="4" cy="18" rx="1.8" ry="4" transform="rotate(-25 4 18)" />
      <ellipse cx="6" cy="10" rx="1.8" ry="4" transform="rotate(15 6 10)" />
      <ellipse cx="11" cy="4" rx="1.8" ry="3.5" transform="rotate(40 11 4)" />
      <ellipse cx="12" cy="27" rx="1.8" ry="4" transform="rotate(40 12 27)" />
      <ellipse cx="9" cy="20" rx="1.8" ry="4" transform="rotate(50 9 20)" />
      <ellipse cx="10" cy="13" rx="1.8" ry="3.5" transform="rotate(60 10 13)" />
    </svg>
  );
}

export default function HomeAboutSection() {
  return (
    <div className={styles.overview}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>About the Team</p>
        <h2 id="about-title" className={styles.title}>我們是誰</h2>
        <p className={styles.lead}>
          來自元智大學的學生火箭團隊，從圖面、程式和零件開始，一路做到真正站上發射場。
        </p>
        <div className={styles.description}>
          <p>
            我們是來自元智大學的學生火箭團隊「火大的元件」，目前約 15 人。團隊成員一起參與火箭的結構、航電、酬載、回收、測試與系統整合。
          </p>
          <p>
            對我們來說，火箭不是一個展示作品，而是一個會逼著所有系統一起工作的工程專案。每一次設計、失敗、修改和測試，都是下一次升空的基礎。
          </p>
        </div>
      </div>

      <ul className={styles.facts} aria-label="團隊標誌與歷年戰績">
        <li className={`${styles.factCard} ${styles.logoCard}`}>
          <Image
            src="/images/team-logo.png"
            alt="火大的元件團隊 LOGO，含中文名稱與 YZUME"
            fill
            sizes="(min-width: 1200px) 200px, (min-width: 640px) 240px, 160px"
            className={styles.logo}
          />
        </li>
        {[{ year: 2025, category: "學生 1K 組" }, { year: 2026, category: "學生 3K 組" }].map((award) => (
          <li key={award.year} className={styles.factCard}>
            <p className={styles.awardYear}><TrophyIcon /><span>{award.year}</span></p>
            <p className={styles.awardCompetition}>台灣盃火箭競賽</p>
            <p className={styles.awardCategory}>{award.category}</p>
            <p className={styles.awardPlace}><LaurelIcon /><strong>第三名</strong><LaurelIcon /></p>
          </li>
        ))}
      </ul>

      <HomeAboutCarousel />
    </div>
  );
}
