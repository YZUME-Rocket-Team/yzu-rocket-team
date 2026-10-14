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
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const previewCloseRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
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
    setCopyStatus("");
    titleRef.current?.focus();
    dialogRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const closeImage = () => {
    setIsImageExpanded(false);
    requestAnimationFrame(() => imageButtonRef.current?.focus());
  };

  const copyPurpose = async () => {
    if (!step.copyText) return;
    try {
      await navigator.clipboard.writeText(step.copyText);
      setCopyStatus("已複製指定用途");
    } catch {
      setCopyStatus("無法自動複製，請選取上方文字手動複製。");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-${isImageExpanded ? "preview-title" : "title"}`}
      aria-describedby={`${id}-${isImageExpanded ? "preview-description" : "description"}`}
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); if (isImageExpanded) closeImage(); else onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
          if (isImageExpanded) closeImage(); else onClose();
        }
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-3xl border border-orange-400/25 bg-[#0b1422] p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
    >
      {isImageExpanded ? (
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 id={`${id}-preview-title`} className="text-lg font-bold">STEP {String(stepIndex + 1).padStart(2, "0")}｜{step.title}</h2>
            <button ref={previewCloseRef} type="button" onClick={closeImage} className={`min-h-11 shrink-0 rounded-full border border-orange-400/40 px-4 text-sm text-orange-300 ${focusStyle}`}>返回教學</button>
          </div>
          <p id={`${id}-preview-description`} className="my-3 text-sm text-slate-400">原尺寸截圖，可左右及上下捲動查看。按 ESC 或「返回教學」關閉圖片。</p>
          <div tabIndex={0} role="region" aria-label="放大截圖，可捲動查看" className={`max-h-[65dvh] overflow-auto overscroll-contain rounded-xl bg-white ${focusStyle}`}>
            <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} unoptimized className="block h-auto max-w-none" style={{ width: step.image.width }} />
          </div>
        </div>
      ) : null}
      <motion.div hidden={isImageExpanded} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400">SUPPORT THE MISSION</p>
            <h2 id={`${id}-title`} className="mt-2 text-2xl font-black">捐款教學</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="關閉捐款教學" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl transition hover:bg-white/10 ${focusStyle}`}>×</button>
        </div>
        <p id={`${id}-description`} className="mt-4 text-sm leading-6 text-slate-400">依照以下五個步驟完成捐款；實際操作請以官方平台的最新說明為準。</p>
        <ol aria-label="捐款教學進度" className="my-6 grid grid-cols-5 gap-2">
          {donationTutorialSteps.map((item, index) => (
            <li key={item.title} aria-current={index === stepIndex ? "step" : undefined} className="min-w-0">
              <span className={`block h-1.5 rounded-full transition-colors motion-reduce:transition-none ${index <= stepIndex ? "bg-orange-400" : "bg-white/10"}`} />
              <span className={`mt-2 block text-xs ${index === stepIndex ? "font-bold text-orange-300" : "text-slate-400"}`}><span className="sr-only">{item.title}，</span>步驟 {index + 1}</span>
            </li>
          ))}
        </ol>
        <section aria-labelledby={`${id}-step-title`}>
          <p className="text-sm text-orange-300" aria-live="polite" aria-atomic="true">第 {stepIndex + 1} 步，共 {donationTutorialSteps.length} 步</p>
          <h3 ref={titleRef} tabIndex={-1} id={`${id}-step-title`} className="mt-2 rounded text-xl font-bold focus-visible:outline-2 focus-visible:outline-orange-300">STEP {String(stepIndex + 1).padStart(2, "0")}｜{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{step.description}</p>
          {step.copyText ? (
            <div className="mt-4 rounded-xl border border-orange-400/25 bg-orange-500/5 p-4">
              <p className="select-all break-words text-sm font-semibold text-orange-200">{step.copyText}</p>
              <button type="button" onClick={copyPurpose} className={`mt-3 min-h-11 rounded-full border border-orange-400/40 px-4 text-sm font-bold text-orange-300 transition hover:bg-orange-500/10 ${focusStyle}`}>複製指定用途</button>
              <p role="status" className="mt-2 text-sm text-slate-300">{copyStatus}</p>
            </div>
          ) : null}
          <figure className="mt-5">
            <button ref={imageButtonRef} type="button" aria-label={`放大圖片：${step.title}`} onClick={() => {
              setIsImageExpanded(true);
              requestAnimationFrame(() => { dialogRef.current?.scrollTo({ top: 0, behavior: "instant" }); previewCloseRef.current?.focus(); });
            }} className={`block w-full cursor-zoom-in rounded-2xl border border-orange-400/30 bg-white p-2 ${focusStyle}`}>
              <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} sizes="(min-width: 672px) 608px, 90vw" className="h-auto w-full rounded-lg" />
            </button>
            <figcaption className="mt-2 text-center text-xs text-slate-400">點擊截圖放大查看</figcaption>
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
