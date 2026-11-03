"use client";

import { useEffect, useRef } from "react";

// Progressive enhancement: content stays visible without JS or animation support.
export default function PlanReveal({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const element = entry.target as HTMLElement;
        const animation = element.animate([
          { opacity: 0.25, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 600, delay: Number(element.dataset.revealDelay ?? 0), easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.08 });
    root.querySelectorAll("[data-plan-reveal]").forEach((element) => observer.observe(element));
    const stopMotion = () => { if (preference.matches) animations.forEach((animation) => animation.cancel()); };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return <div ref={rootRef}>{children}</div>;
}
