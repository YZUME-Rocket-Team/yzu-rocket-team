"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { callouts, chapterOpacity, storyChapters } from "./rocket-model/story";
import type { StoryProjection } from "./rocket-model/director";
import type { RocketViewer } from "./rocket-model/viewer";
import styles from "./RocketModelSection.module.css";

type Status = "idle" | "loading" | "ready" | "error" | "unsupported";
const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const readMotion = () => window.matchMedia(motionQuery).matches;

function Evidence({ chapter }: { chapter: typeof storyChapters[number] }) {
  if (!("evidence" in chapter)) return null;
  const evidence = chapter.evidence;
  return (
    <a href="#rocket-structure" className={styles.evidence}>
      <figure>
        <div className={styles.evidenceImage}>
          <Image src={evidence.src} alt={evidence.alt} fill sizes="(min-width: 768px) 300px, 112px" className="object-contain" unoptimized />
        </div>
        <figcaption>
          <span>{evidence.title}</span>
          <p>{evidence.description}</p>
          <small>閱讀完整工程介紹 ↗</small>
        </figcaption>
      </figure>
    </a>
  );
}

export default function RocketModelSection({ modelUrl = "/models/Rocket_Web.glb" }: { modelUrl?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<SVGSVGElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [attempt, setAttempt] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, () => false);
  const failed = status === "error" || status === "unsupported";

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current!, panel = panelRef.current!, host = hostRef.current!;
    const abort = new AbortController();
    let viewer: RocketViewer | null = null;
    let frame = 0, started = false, visible = false, lastProgress = -1;

    function applyFrame(projection: StoryProjection) {
      if (abort.signal.aborted) return;
      const p = projection.progress;
      track.dataset.progress = p.toFixed(6);
      if (stageRef.current !== projection.stage) {
        stageRef.current = projection.stage;
        setActiveStage(projection.stage);
      }
      copyRef.current?.querySelectorAll<HTMLElement>("[data-chapter]").forEach((article, index) => {
        const opacity = chapterOpacity(p, index);
        article.style.opacity = String(opacity);
        article.style.visibility = opacity < 0.001 ? "hidden" : "visible";
        article.style.transform = `translateY(${(1 - opacity) * 14}px)`;
        article.inert = opacity < 0.5;
        article.setAttribute("aria-hidden", String(opacity < 0.5));
      });
      const svg = labelsRef.current;
      if (svg) {
        svg.setAttribute("viewBox", `0 0 ${projection.width} ${projection.height}`);
        for (const label of projection.labels) {
          const group = svg.querySelector<SVGGElement>(`[data-callout="${label.key}"]`)!;
          group.style.opacity = String(label.opacity);
          const endX = label.labelX + (label.side === "left" ? 12 : -12);
          const bendX = endX + (label.side === "left" ? 16 : -16);
          group.querySelector("path")!.setAttribute("d", `M${label.x},${label.y} L${bendX},${label.labelY} H${endX}`);
          const dot = group.querySelector("circle")!;
          dot.setAttribute("cx", String(label.x)); dot.setAttribute("cy", String(label.y));
          const text = group.querySelector("text")!;
          text.setAttribute("x", String(label.labelX)); text.setAttribute("y", String(label.labelY - 8));
          text.setAttribute("text-anchor", label.side === "left" ? "start" : "end");
        }
      }
      if (flameRef.current) {
        flameRef.current.style.cssText = `left:${projection.flame.x}px;top:${projection.flame.y}px;width:${projection.flame.width}px;opacity:${projection.glow}`;
      }
    }
    function update() {
      frame = 0;
      if (!viewer || !visible) return;
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      const range = Math.max(1, track.getBoundingClientRect().height - panel.getBoundingClientRect().height);
      const p = Math.max(0, Math.min(1, (top - track.getBoundingClientRect().top) / range));
      if (p === lastProgress) return;
      lastProgress = p;
      viewer.seek(p);
    }
    function schedule() { if (!frame && viewer && visible) frame = requestAnimationFrame(update); }
    function fail(nextStatus: Status) {
      if (abort.signal.aborted) return;
      abort.abort();
      viewer?.dispose(); viewer = null;
      setStatus(nextStatus);
    }
    async function load() {
      if (started) return;
      started = true; setStatus("loading");
      try {
        const { createRocketViewer } = await import("./rocket-model/viewer");
        if (abort.signal.aborted) return;
        const loaded = await createRocketViewer(host, modelUrl, abort.signal, () => fail("unsupported"), applyFrame);
        if (abort.signal.aborted) { loaded.dispose(); return; }
        viewer = loaded; setStatus("ready"); schedule();
      } catch (error) {
        if (!abort.signal.aborted) fail(error instanceof Error && error.name === "WebGLUnavailableError" ? "unsupported" : "error");
      }
    }
    const near = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { near.disconnect(); void load(); }
    }, { rootMargin: "600px 0px" });
    near.observe(track);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    visibility.observe(panel);
    const size = new ResizeObserver(() => { viewer?.resize(); schedule(); });
    size.observe(host); size.observe(track);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      near.disconnect(); visibility.disconnect(); size.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      abort.abort(); viewer?.dispose();
    };
  }, [modelUrl, attempt, reducedMotion]);

  function goToChapter(index: number) {
    const track = trackRef.current!, panel = panelRef.current!;
    const top = parseFloat(getComputedStyle(panel).top) || 0;
    const range = track.getBoundingClientRect().height - panel.getBoundingClientRect().height;
    window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top - top + range * (storyChapters[index].start + (index ? 0.025 : 0)), behavior: "smooth" });
  }

  return (
    <section id="rocket-model" aria-label="2026 火箭結構：六幕滾動展示" className={styles.section} data-mode={reducedMotion ? "static" : failed ? "fallback" : "story"}>
      <div ref={trackRef} className={styles.track} data-status={status} data-stage={activeStage + 1}>
        <div ref={panelRef} className={styles.panel}>
          <div aria-hidden="true" className={styles.atmosphere} />
          <div className={styles.masthead}><span>YZUME <i>/</i> STRUCTURAL STUDY</span><span>2026 · TAIWAN CUP</span></div>
          <div ref={copyRef} className={styles.copy}>
            {storyChapters.map((chapter, index) => (
              <article key={chapter.code} data-chapter={index} aria-hidden={index !== 0} className={styles.chapter}>
                <p className={styles.kicker}><span>{String(index + 1).padStart(2, "0")}</span> {chapter.code}</p>
                <h2>{chapter.title}</h2>
                <p className={styles.description}>{chapter.description}</p>
                <Evidence chapter={chapter} />
              </article>
            ))}
          </div>
          <div className={styles.visual}>
            <div ref={hostRef} className={styles.canvas} role="img" aria-label="隨捲動分解與組裝的火箭模型，鏡頭依序跟隨各結構" />
            <svg ref={labelsRef} className={styles.labels} aria-hidden="true">
              {callouts.map((callout) => <g key={callout.key} data-callout={callout.key} style={{ opacity: 0 }}><path /><circle r="2" /><text>{callout.label}</text></g>)}
            </svg>
            <div ref={flameRef} className={styles.flame} aria-hidden="true" />
            {status !== "ready" && <div className={styles.loading} role="status"><span />{status === "loading" ? "正在載入火箭模型" : "準備結構展示"}</div>}
          </div>
          <div className={styles.footer}>
            <nav aria-label="火箭故事章節">{storyChapters.map((chapter, index) => <button key={chapter.code} type="button" aria-label={`第 ${index + 1} 幕：${chapter.title.replace("\n", "")}`} aria-current={activeStage === index ? "step" : undefined} onClick={() => goToChapter(index)}>{String(index + 1).padStart(2, "0")}</button>)}</nav>
            <span className={styles.scrollCue}>SCROLL TO EXPLORE <span>↓</span></span>
            <a href="#rocket-structure">完整工程介紹 ↗</a>
          </div>
        </div>
      </div>
      <div className={styles.staticContent}>
        <div className={styles.staticHeading}><p className={styles.kicker}>YZUME / STRUCTURAL STUDY</p><h2>從結構，看見整個任務。</h2></div>
        {failed && <div className={styles.notice} role="status"><p>{status === "unsupported" ? "目前無法使用 WebGL 2，改以靜態圖文呈現火箭結構。" : "3D 模型暫時無法載入，您仍可閱讀完整工程圖文。"}</p><button type="button" onClick={() => { setStatus("idle"); setAttempt((value) => value + 1); }}>重試 3D 展示 ↗</button></div>}
        {reducedMotion && <p className={styles.staticNote}>已依減少動態效果偏好，提供靜態展示。</p>}
        <figure className={styles.staticRocket}><Image src="/images/rocket-structure/rocket-full.png" alt="2026 火箭完整結構圖" fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-contain" /></figure>
        <div className={styles.staticGrid}>{storyChapters.map((chapter, index) => <article key={chapter.code}><p className={styles.kicker}>{String(index + 1).padStart(2, "0")} / {chapter.code}</p><h3>{chapter.title.replace("\n", "")}</h3><p>{chapter.description}</p><Evidence chapter={chapter} /></article>)}</div>
      </div>
      <noscript><p>3D 敘事需要 JavaScript；下方保留完整火箭結構與工程介紹。</p></noscript>
    </section>
  );
}
