"use client";

import { useEffect, useId, useRef, useState } from "react";
import DonationTutorialModal from "@/components/DonationTutorialModal";
import { officialDonationUrl } from "@/data/siteContent";

export default function SupportMenu({ mobile = false, onActiveChange }: {
  mobile?: boolean;
  onActiveChange?: (active: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    onActiveChange?.(open || showTutorial);
  }, [open, showTutorial, onActiveChange]);

  useEffect(() => () => onActiveChange?.(false), [onActiveChange]);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    // 手機網址列伸縮也會觸發 resize；只有跨過桌機斷點才收合。
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnResize = () => setOpen(false);
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    if (mobile) desktop.addEventListener("change", closeOnResize);
    else window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
      if (mobile) desktop.removeEventListener("change", closeOnResize);
      else window.removeEventListener("resize", closeOnResize);
    };
  }, [open, mobile]);

  const closeTutorial = () => {
    setShowTutorial(false);
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  };
  const itemStyle = "block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-colors hover:bg-orange-500/10 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-300 motion-reduce:transition-none";

  return (
    <div ref={rootRef} data-support-menu onKeyDown={(event) => {
      if (open && event.key === "Escape") { event.preventDefault(); event.stopPropagation(); setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }
    }} className={mobile ? "mt-1" : "relative ml-1"} onBlur={(event) => {
      // 部分手機瀏覽器觸控時不轉移焦點；交由外部 pointerdown 判斷，
      // 避免選項在 click 發生前就被隱藏。
      if (mobile && event.relatedTarget === null) return;
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => firstItemRef.current?.focus({ preventScroll: true }));
          }
        }}
        className={`flex min-h-11 items-center justify-center gap-2 bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(249,115,22,0.28)] transition hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300 motion-reduce:transition-none ${mobile ? "w-full rounded-2xl" : "rounded-full"}`}
      >
        支持我們 <span aria-hidden="true" className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity,visibility,transform] duration-200 motion-reduce:transition-none ${mobile ? "" : "absolute right-0 top-[calc(100%+0.75rem)] w-56"} ${open ? "visible grid-rows-[1fr] translate-y-0 opacity-100" : "invisible pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={`rounded-2xl border border-white/10 bg-[#0b1422] p-2 shadow-xl ${mobile ? "mt-2" : ""}`}>
            <button ref={firstItemRef} type="button" className={itemStyle} onClick={() => { setOpen(false); setShowTutorial(true); }}>查看捐款教學</button>
            <a href={officialDonationUrl} target="_blank" rel="noopener noreferrer" onClick={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }} className={itemStyle}>前往募款網站<span aria-hidden="true"> ↗</span><span className="sr-only">（開啟新分頁）</span></a>
          </div>
        </div>
      </div>
      {showTutorial ? <DonationTutorialModal onClose={closeTutorial} /> : null}
    </div>
  );
}
