"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { donationTutorialSteps } from "@/data/donationTutorial";
import { officialDonationUrl } from "@/data/siteContent";

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300";

export default function DonationTutorialModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const step = donationTutorialSteps[stepIndex];
  const isLastStep = stepIndex === donationTutorialSteps.length - 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const scrollY = window.scrollY;
    const previousStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    }
    dialog.showModal();
    titleRef.current?.focus();
    return () => {
      dialog.close();
      Object.assign(document.body.style, previousStyle);
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  const changeStep = (index: number) => {
    setStepIndex(index);
    titleRef.current?.focus();
    dialogRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-3xl border border-orange-400/25 bg-[#0b1422] p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400">SUPPORT THE MISSION</p>
            <h2 id={`${id}-title`} className="mt-2 text-2xl font-black">捐款教學</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="關閉捐款教學" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl transition hover:bg-white/10 ${focusStyle}`}>×</button>
        </div>
        <p id={`${id}-description`} className="mt-4 text-sm leading-6 text-slate-400">暫定流程，教學截圖待補；請以官方平台的最新說明為準。</p>
        <ol aria-label="捐款教學進度" className="my-6 grid grid-cols-4 gap-2">
          {donationTutorialSteps.map((item, index) => (
            <li key={item.title} aria-current={index === stepIndex ? "step" : undefined} className="min-w-0">
              <span className={`block h-1.5 rounded-full transition-colors motion-reduce:transition-none ${index <= stepIndex ? "bg-orange-400" : "bg-white/10"}`} />
              <span className={`mt-2 block text-xs ${index === stepIndex ? "font-bold text-orange-300" : "text-slate-400"}`}><span className="sr-only">{item.title}，</span>步驟 {index + 1}</span>
            </li>
          ))}
        </ol>
        <section aria-labelledby={`${id}-step-title`}>
          <p className="text-sm text-orange-300" aria-live="polite" aria-atomic="true">第 {stepIndex + 1} 步，共 {donationTutorialSteps.length} 步</p>
          <h3 ref={titleRef} tabIndex={-1} id={`${id}-step-title`} className="mt-2 rounded text-xl font-bold focus-visible:outline-2 focus-visible:outline-orange-300">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{step.description}</p>
          <figure className="relative mt-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-orange-400/30 bg-slate-950/60">
            {step.image ? (
              <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 672px) 608px, 90vw" className="object-contain p-2" />
            ) : (
              <div className="px-6 text-center"><p className="text-sm font-semibold text-slate-300">步驟 {stepIndex + 1} 教學截圖待補</p><p className="mt-2 text-xs leading-6 text-slate-500">此處為圖片預留區，非官方平台畫面。</p></div>
            )}
          </figure>
        </section>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <button type="button" disabled={stepIndex === 0} onClick={() => changeStep(stepIndex - 1)} className={`min-h-11 rounded-full border border-white/20 px-5 text-sm font-bold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 ${focusStyle}`}>上一步</button>
          <button type="button" disabled={isLastStep} onClick={() => changeStep(stepIndex + 1)} className={`min-h-11 rounded-full bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-35 ${focusStyle}`}>下一步</button>
        </div>
        {isLastStep ? (
          <a href={officialDonationUrl} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400 ${focusStyle}`}>前往官方募款網站<span className="sr-only">（開啟新分頁）</span> ↗</a>
        ) : null}
      </motion.div>
    </dialog>
  );
}
