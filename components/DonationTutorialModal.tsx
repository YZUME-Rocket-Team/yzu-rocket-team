"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { donationTutorialSteps, type DonationTutorialStep } from "@/data/donationTutorial";
import DonationAction, { useDonationCopy } from "@/components/DonationAction";
import { lockBodyScroll } from "@/lib/lockBodyScroll";

const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300";

type ImageView = { scale: number; x: number; y: number };
type ImagePoint = { x: number; y: number };
const initialImageView: ImageView = { scale: 1, x: 0, y: 0 };

function TutorialImagePreview({ image, descriptionId }: {
  image: DonationTutorialStep["image"];
  descriptionId: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const viewRef = useRef<ImageView>(initialImageView);
  const pointersRef = useRef(new Map<number, ImagePoint>());

  const applyView = useCallback((next: ImageView) => {
    const viewport = viewportRef.current;
    const element = imageRef.current;
    if (!viewport || !element) return;
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;
    const fit = Math.min(width / image.width, height / image.height);
    // 至少能放大至原始像素大小；平移邊界以實際圖片而非留白區域計算。
    const scale = Math.max(1, Math.min(Math.max(8, 1 / fit), next.scale));
    const maxX = Math.max(0, (image.width * fit * scale - width) / 2);
    const maxY = Math.max(0, (image.height * fit * scale - height) / 2);
    const x = Math.max(-maxX, Math.min(maxX, next.x));
    const y = Math.max(-maxY, Math.min(maxY, next.y));
    viewRef.current = { scale, x, y };
    // 手勢直接更新 transform，避免每次指標移動重新渲染整個教學。
    element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    viewport.style.cursor = pointersRef.current.size ? "grabbing" : "grab";
  }, [image.width, image.height]);

  const resetView = useCallback(() => applyView(initialImageView), [applyView]);

  const zoomAt = useCallback((factor: number, point: ImagePoint = { x: 0, y: 0 }, movement: ImagePoint = { x: 0, y: 0 }) => {
    const current = viewRef.current;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const fit = Math.min(viewport.clientWidth / image.width, viewport.clientHeight / image.height);
    const scale = Math.max(1, Math.min(Math.max(8, 1 / fit), current.scale * factor));
    const ratio = scale / current.scale;
    applyView({ scale, x: point.x - (point.x - current.x) * ratio + movement.x, y: point.y - (point.y - current.y) * ratio + movement.y });
  }, [applyView, image.width, image.height]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const pointers = pointersRef.current;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = viewport.getBoundingClientRect();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
      const delta = Math.max(-500, Math.min(500, event.deltaY * unit));
      zoomAt(Math.exp(-delta * 0.002), { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 });
    };
    // 非 passive 監聽才能阻止滾輪捲動頁面或觸控板縮放整個網站。
    viewport.addEventListener("wheel", onWheel, { passive: false });
    const observer = new ResizeObserver(() => {
      pointers.forEach((_, pointerId) => {
        if (viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
      });
      pointers.clear();
      resetView();
    });
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      viewport.removeEventListener("wheel", onWheel);
      pointers.clear();
    };
  }, [resetView, zoomAt]);

  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    const pointers = pointersRef.current;
    if (!pointers.has(event.pointerId)) return;
    const before = [...pointers.values()];
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const after = [...pointers.values()];
    const current = viewRef.current;
    if (before.length === 1) {
      applyView({ ...current, x: current.x + after[0].x - before[0].x, y: current.y + after[0].y - before[0].y });
      return;
    }
    const midpoint = (points: ImagePoint[]) => ({ x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 });
    const distance = (points: ImagePoint[]) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
    const previousCenter = midpoint(before);
    const nextCenter = midpoint(after);
    const rect = event.currentTarget.getBoundingClientRect();
    zoomAt(
      distance(after) / Math.max(1, distance(before)),
      { x: previousCenter.x - rect.left - rect.width / 2, y: previousCenter.y - rect.top - rect.height / 2 },
      { x: nextCenter.x - previousCenter.x, y: nextCenter.y - previousCenter.y },
    );
  };

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    applyView(viewRef.current);
  };

  return (
    <>
      <div className="flex shrink-0 flex-wrap items-center gap-2" role="group" aria-label="圖片縮放控制">
        <button type="button" aria-label="縮小圖片" onClick={() => zoomAt(1 / 1.5)} className={`min-h-11 min-w-11 rounded-full border border-white/20 text-lg ${focusStyle}`}>−</button>
        <button type="button" aria-label="放大圖片" onClick={() => zoomAt(1.5)} className={`min-h-11 min-w-11 rounded-full border border-white/20 text-lg ${focusStyle}`}>＋</button>
        <button type="button" onClick={resetView} className={`min-h-11 rounded-full border border-white/20 px-4 text-sm ${focusStyle}`}>重設圖片</button>
      </div>
      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="教學截圖檢視器"
        aria-describedby={descriptionId}
        className={`relative min-h-0 flex-1 touch-none select-none overflow-hidden overscroll-contain rounded-xl bg-slate-950 ${focusStyle}`}
        onDoubleClick={resetView}
        onPointerDown={(event) => {
          if (event.button !== 0 || pointersRef.current.size >= 2) return;
          event.preventDefault();
          event.currentTarget.focus({ preventScroll: true });
          pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          event.currentTarget.setPointerCapture(event.pointerId);
          applyView(viewRef.current);
        }}
        onPointerMove={movePointer}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onLostPointerCapture={endPointer}
        onKeyDown={(event) => {
          const current = viewRef.current;
          switch (event.key) {
            case "+": case "=": zoomAt(1.5); break;
            case "-": zoomAt(1 / 1.5); break;
            case "0": case "Home": resetView(); break;
            case "ArrowLeft": applyView({ ...current, x: current.x + 40 }); break;
            case "ArrowRight": applyView({ ...current, x: current.x - 40 }); break;
            case "ArrowUp": applyView({ ...current, y: current.y + 40 }); break;
            case "ArrowDown": applyView({ ...current, y: current.y - 40 }); break;
            default: return;
          }
          event.preventDefault();
        }}
      >
        <Image ref={imageRef} src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized draggable={false} className="pointer-events-none block h-full w-full max-w-none object-contain" />
      </div>
    </>
  );
}

export default function DonationTutorialModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const previewCloseRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const { copied, copyPurpose: copySharedPurpose, beginTutorial, endTutorial } = useDonationCopy();
  const reduceMotion = useReducedMotion();
  const step = donationTutorialSteps[stepIndex];
  const isLastStep = stepIndex === donationTutorialSteps.length - 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    beginTutorial();
    const unlockScroll = lockBodyScroll();
    dialog.showModal();
    titleRef.current?.focus();
    return () => {
      dialog.close();
      unlockScroll();
      endTutorial();
    };
  }, [beginTutorial, endTutorial]);

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
    const success = await copySharedPurpose();
    setCopyStatus(success ? "已複製指定用途" : "無法自動複製，請選取上方文字手動複製。");
  };

  return (
    <dialog
      ref={dialogRef}
      data-donation-tutorial
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
      className={`fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] overscroll-contain rounded-3xl border border-orange-400/25 bg-[#0b1422] p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm ${isImageExpanded ? "h-[calc(100dvh-2rem)] max-w-6xl overflow-hidden" : "max-w-2xl overflow-y-auto"}`}
    >
      {isImageExpanded ? (
        <div className="flex h-full min-h-0 flex-col gap-3 p-3 sm:p-6">
          <div className="flex shrink-0 items-center justify-between gap-3">
            <h2 id={`${id}-preview-title`} className="min-w-0 break-words text-base font-bold sm:text-lg">STEP {String(stepIndex + 1).padStart(2, "0")}｜{step.title}</h2>
            <button ref={previewCloseRef} type="button" onClick={closeImage} className={`min-h-11 shrink-0 rounded-full border border-orange-400/40 px-4 text-sm text-orange-300 ${focusStyle}`}>返回教學</button>
          </div>
          <p id={`${id}-preview-description`} className="shrink-0 text-xs leading-5 text-slate-400 sm:text-sm">滾輪或雙指縮放，拖曳移動；雙擊或按「重設圖片」恢復完整顯示。鍵盤可用 +／− 縮放、方向鍵移動、0 重設；ESC 或「返回教學」關閉圖片。</p>
          <TutorialImagePreview key={step.image.src} image={step.image} descriptionId={`${id}-preview-description`} />
        </div>
      ) : null}
      <motion.div hidden={isImageExpanded} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400">SUPPORT THE MISSION</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 id={`${id}-title`} className="shrink-0 text-2xl font-black">捐款教學</h2>
              <DonationAction fromTutorial className={`inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xl border border-orange-400/40 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-orange-200 transition-[border-color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-orange-400/70 hover:bg-orange-500/10 hover:shadow-[0_0_18px_rgba(249,115,22,0.18)] motion-reduce:transition-none sm:px-4 sm:text-sm ${focusStyle}`}>前往募款網站 <span aria-hidden="true">↗</span></DonationAction>
            </div>
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
              <p role="status" className="mt-2 text-sm text-slate-300">{copied ? "已複製指定用途" : copyStatus}</p>
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
          <DonationAction fromTutorial className={`mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400 ${focusStyle}`}>前往官方募款網站 ↗</DonationAction>
        ) : null}
      </motion.div>
    </dialog>
  );
}
