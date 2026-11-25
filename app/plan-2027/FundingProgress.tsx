"use client";

import { useEffect, useRef } from "react";

import { formatBudgetAmount } from "@/data/plan2027";

import styles from "./plan.module.css";

const duration = 1_250;

export default function FundingProgress({ amount, goal }: { amount: number; goal: number }) {
  const area = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const fraction = Math.min(amount / goal, 1);
  const percentage = (amount / goal * 100).toFixed(1);
  const remaining = Math.max(goal - amount, 0);

  useEffect(() => {
    const region = area.current;
    const number = counter.current;
    const bar = fill.current;
    if (!region || !number || !bar || !amount || !("IntersectionObserver" in window) || !bar.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    let frame = 0;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || preference.matches) return;
      observer.disconnect();
      number.textContent = formatBudgetAmount(0);
      animation = bar.animate([{ transform: "scaleX(0)" }, { transform: `scaleX(${fraction})` }], { duration });
      const start = performance.now();
      function count(now: number) {
        const progress = Math.min(Math.max((now - start) / duration, 0), 1);
        number!.textContent = formatBudgetAmount(Math.floor(amount * progress));
        if (progress < 1) frame = requestAnimationFrame(count);
      }
      frame = requestAnimationFrame(count);
    }, { threshold: 0.25 });

    function stop() {
      observer.disconnect();
      cancelAnimationFrame(frame);
      animation?.cancel();
      number!.textContent = formatBudgetAmount(amount);
    }
    function preferenceChanged() {
      if (preference.matches) stop();
    }
    observer.observe(region);
    preference.addEventListener("change", preferenceChanged);
    return () => {
      stop();
      preference.removeEventListener("change", preferenceChanged);
    };
  }, [amount, fraction]);

  return (
    <div ref={area} className={styles.fundingProgress}>
      <div className={styles.fundingProgressLabels}>
        <span>目前已募集</span>
        <span className={styles.fundingPercentage}>募款達成率 {percentage}%</span>
      </div>
      <strong className={styles.raisedAmount}>
        <span ref={counter} aria-hidden="true">{formatBudgetAmount(amount)}</span>
        <span className="sr-only">{formatBudgetAmount(amount)}</span>
      </strong>
      <div className={styles.fundingTrack} role="progressbar" aria-label="2027 募款進度"
        aria-valuenow={fraction * 100} aria-valuetext={`${percentage}%`}>
        <div ref={fill} className={styles.fundingFill} style={{ transform: `scaleX(${fraction})` }} />
      </div>
      <p className={styles.fundingRemaining} data-complete={remaining === 0 || undefined}>
        {remaining === 0 ? "募款目標已達成" : `距離目標尚差 ${formatBudgetAmount(remaining)}`}
      </p>
    </div>
  );
}
