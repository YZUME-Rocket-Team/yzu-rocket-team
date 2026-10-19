import Image from "next/image";

import { teamDivisions } from "@/data/siteContent";
import styles from "./TeamDivisionSection.module.css";

type TeamIconProps = {
  icon: (typeof teamDivisions)[number]["icon"];
};

function TeamIcon({ icon }: TeamIconProps) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.iconSvg}
      {...sharedProps}
    >
      {icon === "structure" && (
        <path d="m14.7 6.3 3-3a4.5 4.5 0 0 1-5.9 5.9l-7.3 7.3a2.1 2.1 0 1 0 3 3l7.3-7.3a4.5 4.5 0 0 1 5.9-5.9l-3 3-3-3Z" />
      )}
      {icon === "recovery" && (
        <>
          <path d="M4 9.5a8 8 0 0 1 16 0H4Z" />
          <path d="M4 9.5c2.7-2.2 5.3-2.2 8 0 2.7-2.2 5.3-2.2 8 0M8 9.5l4 10m4-10-4 10" />
        </>
      )}
      {icon === "payload" && (
        <>
          <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" />
          <path d="m5 7 7 4 7-4m-7 4v10" />
        </>
      )}
      {icon === "avionics" && (
        <>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
          <path d="M10 10h4v4h-4z" />
        </>
      )}
    </svg>
  );
}

function TechnicalOverlay() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 400"
      preserveAspectRatio="none"
      fill="none"
      className={styles.technicalOverlay}
    >
      <path d="M30 95h118l28-28h78M690 305H565l-31 29h-78" />
      <path d="M30 116V95h22M690 284v21h-22" />
      <path d="M500 26h158v72M215 374H62v-72" strokeDasharray="5 8" />
      <path d="M470 52h188M62 348h188M360 38v29M345 52h30" strokeDasharray="3 9" />
      <circle cx="535" cy="180" r="112" strokeDasharray="3 10" />
      <circle cx="535" cy="180" r="78" strokeDasharray="22 13" />
      <circle cx="116" cy="286" r="44" strokeDasharray="2 8" />
      <path d="M85 286h62M116 255v62M458 180h154M535 103v154" opacity=".58" />
    </svg>
  );
}

const hexagonClip = {
  clipPath:
    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0 50%)",
};

export default function TeamDivisionSection() {
  return (
    <section
      aria-labelledby="team-divisions-title"
      className={styles.section}
    >
      <div aria-hidden="true" className={styles.sectionBackdrop} />

      <header className={styles.header}>
        <div className={styles.eyebrow}>
          <span aria-hidden="true" />
          <p>Our Team</p>
          <span aria-hidden="true" />
        </div>
        <h3 id="team-divisions-title" className={styles.title}>
          團隊<span>分工</span>
        </h3>
        <p className={styles.description}>
          我們由不同專長的成員組成，分為四個主要小組，
          <br className={styles.desktopBreak} />
          從結構設計到飛行控制，每個環節都緊密合作，共同完成火箭任務。
        </p>
      </header>

      <div className={styles.cardGrid}>
        {teamDivisions.map((division) => (
          <article key={division.nameEn} className={styles.cardFrame}>
            <div className={styles.card}>
              <div className={styles.imageStage}>
                <div aria-hidden="true" className={styles.cardGridPattern} />
                <TechnicalOverlay />
                <div aria-hidden="true" className={styles.imageGlow} />

                <div
                  className={`${styles.imageWrap} ${styles[division.imageVariant]}`}
                >
                  <Image
                    src={division.image}
                    alt={division.imageAlt}
                    fill
                    unoptimized={
                      division.imageVariant === "schematic" ||
                      division.imageVariant === "photo" ||
                      division.imageVariant === "module"
                    }
                    sizes="(min-width: 1180px) 46vw, (min-width: 640px) 86vw, 100vw"
                    className={styles.teamImage}
                  />
                </div>

                <div aria-hidden="true" className={styles.imageShade} />
                <div className={styles.numberBlock} aria-hidden="true">
                  <span>{division.number}</span>
                  <small>{division.nameEn}</small>
                </div>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.identity}>
                  <div className={styles.hexagon} style={hexagonClip}>
                    <span style={hexagonClip} />
                    <TeamIcon icon={division.icon} />
                  </div>
                  <div className={styles.nameBlock}>
                    <h4>{division.name}</h4>
                    <p>{division.nameEn}</p>
                  </div>
                </div>

                <div aria-hidden="true" className={styles.divider} />

                <ul className={styles.responsibilities}>
                  {division.responsibilities.map((responsibility) => (
                    <li key={responsibility}>
                      <span aria-hidden="true">›</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
