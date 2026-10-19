"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { RocketViewer } from "./rocket-model/viewer";
import styles from "./RocketModelSection.module.css";

type Status = "idle" | "loading" | "ready" | "error" | "unsupported";

export default function RocketModelSection({ modelUrl = "/models/Rocket_Web.glb" }: { modelUrl?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const track = trackRef.current!;
    const panel = panelRef.current!;
    const host = hostRef.current!;
    const abort = new AbortController();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let viewer: RocketViewer | null = null;
    let frame = 0;
    let started = false;
    let visible = false;
    let lastProgress = -1;

    const seek = (progress: number) => {
      if (!viewer || progress === lastProgress) return;
      lastProgress = progress;
      viewer.seek(progress);
      if (sliderRef.current) sliderRef.current.value = String(Math.round(progress * 1000));
    };
    const update = () => {
      frame = 0;
      if (!viewer || !visible || reducedMotion.matches) return;
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      const range = Math.max(1, track.offsetHeight - panel.offsetHeight);
      seek(Math.min(1, Math.max(0, (top - track.getBoundingClientRect().top) / range)));
    };
    const schedule = () => {
      if (!frame && viewer && visible && !reducedMotion.matches) frame = requestAnimationFrame(update);
    };
    const fail = (nextStatus: Status) => {
      if (abort.signal.aborted) return;
      viewer?.dispose();
      viewer = null;
      setStatus(nextStatus);
    };
    const load = async () => {
      if (started) return;
      started = true;
      setStatus("loading");
      try {
        const { createRocketViewer } = await import("./rocket-model/viewer");
        if (abort.signal.aborted) return;
        const loaded = await createRocketViewer(host, modelUrl, abort.signal, () => fail("unsupported"));
        if (abort.signal.aborted) { loaded.dispose(); return; }
        viewer = loaded;
        setStatus("ready");
        seek(0);
        schedule();
      } catch (error) {
        if (!abort.signal.aborted) {
          fail(error instanceof Error && error.name === "WebGLUnavailableError" ? "unsupported" : "error");
        }
      }
    };
    const near = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { near.disconnect(); void load(); }
    }, { rootMargin: "600px 0px" });
    near.observe(track);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    visibility.observe(panel);
    const size = new ResizeObserver(() => { viewer?.resize(); schedule(); });
    size.observe(host);
    size.observe(track);
    const changeMotion = () => {
      lastProgress = -1;
      if (reducedMotion.matches) seek(0);
      else schedule();
    };
    const manualSeek = () => {
      lastProgress = -1;
      seek(Number(sliderRef.current?.value ?? 0) / 1000);
    };
    const slider = sliderRef.current!;
    slider.addEventListener("input", manualSeek);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", changeMotion);
    return () => {
      near.disconnect();
      visibility.disconnect();
      size.disconnect();
      cancelAnimationFrame(frame);
      slider.removeEventListener("input", manualSeek);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", changeMotion);
      abort.abort();
      viewer?.dispose();
    };
  }, [modelUrl, attempt]);

  const failed = status === "error" || status === "unsupported";
  return (
    <section id="rocket-model" aria-labelledby="rocket-model-title" className="border-t border-white/10 bg-slate-950/65 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">3D Rocket / Exploded View</p>
        <h2 id="rocket-model-title" className="mt-5 text-balance text-3xl font-black tracking-tight text-white sm:text-5xl">從整體，看見每一個結構</h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          透過火箭 3D 模型，觀察各結構逐步分解、展開與重新組裝。下方保留各部件、酬載小船與航電系統的詳細介紹。
        </p>
        <div ref={trackRef} className={`relative mt-10 ${styles.track}`} data-status={status}>
          <div ref={panelRef} className={`overflow-hidden rounded-3xl border border-orange-400/25 bg-[#050b14] shadow-[0_0_48px_rgba(249,115,22,0.08)] ${styles.panel}`}>
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/10 px-4 py-3 font-mono text-xs tracking-wider text-slate-400 sm:px-6">
              <span className="text-orange-300">YZUME / ROCKET 3D</span>
              <span>組裝 → 分解 → 重組</span>
            </div>
            <div className="relative min-h-0 flex-1">
              <div ref={hostRef} className="absolute inset-0" role="img" aria-label="火箭三維結構展示，可由下方滑桿控制分解與重新組裝進度" />
              {status !== "ready" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
                  <div className="relative min-h-0 w-24 flex-1 sm:w-36">
                    <Image src="/images/rocket-structure/rocket-full.png" alt="" fill sizes="144px" className="object-contain opacity-40" />
                  </div>
                  <div className="max-w-lg shrink-0 rounded-2xl bg-slate-950/90 px-5 py-4 text-sm leading-6 text-slate-300" role="status" aria-live="polite">
                    {status === "idle" ? "捲動至此處以載入 3D 模型。" : status === "loading" ? "正在載入 3D 火箭模型…" : status === "unsupported" ? "目前無法使用 WebGL 2，已改為靜態圖片。可繼續閱讀下方結構介紹，或重試 3D 展示。" : "3D 模型載入失敗，請檢查網路連線後重試。下方結構介紹仍可正常閱讀。"}
                    {failed && <button type="button" onClick={() => setAttempt((value) => value + 1)} className="mx-auto mt-3 block rounded-lg border border-orange-400/50 px-4 py-2 font-bold text-orange-300 hover:bg-orange-400/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300">重新載入</button>}
                  </div>
                </div>
              )}
            </div>
            <div className="shrink-0 border-t border-white/10 px-4 py-3 sm:px-6">
              <label htmlFor="rocket-model-progress" className="flex items-center justify-between gap-3 text-xs text-slate-300">
                <span>結構展示進度</span><span className="text-slate-400">完整組裝 / 分解 / 重組</span>
              </label>
              <input ref={sliderRef} id="rocket-model-progress" type="range" min="0" max="1000" defaultValue="0" disabled={status !== "ready"} aria-describedby="rocket-model-hint" className="mt-2 block h-6 w-full cursor-pointer accent-orange-400 disabled:cursor-wait disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300" />
              <p id="rocket-model-hint" className={`mt-1 text-xs leading-5 text-slate-400 ${styles.hint}`}>
                <span className={styles.scrollHint}>向下滾動展開，向上滾動倒轉；也可拖曳滑桿或使用方向鍵檢視。</span>
                <span className={styles.staticHint}>已啟用減少動態效果：模型保持靜止，可用滑桿或方向鍵選擇結構畫面。</span>
              </p>
            </div>
          </div>
        </div>
        <noscript><p className="mt-5 text-sm text-slate-300">3D 展示需要啟用 JavaScript；下方提供完整圖文介紹。</p></noscript>
      </div>
    </section>
  );
}
