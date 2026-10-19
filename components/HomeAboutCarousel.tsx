"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import styles from "./HomeAboutSection.module.css";

const photos = [
  {
    src: "/images/home-about/team-competition-01.jpg.jpg",
    alt: "火大的元件團隊在 2026 台灣盃火箭競賽看板前與火箭合影",
    title: "競賽現場",
    description: "團隊與自製火箭的參賽合影。",
  },
  {
    src: "/images/home-about/team-competition-02.jpg.jpg",
    alt: "團隊成員戴著安全帽，在海岸發射場留下合影",
    title: "海岸發射場",
    description: "走進真實的發射場，一起迎接飛行任務。",
  },
  {
    src: "/images/home-about/team-workshop-03.webp.png",
    alt: "團隊成員在工坊中與製作中的火箭合影",
    title: "工坊日常",
    description: "從零件製作到組裝，讓設計逐步成形。",
  },
] as const;

export default function HomeAboutCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationCycle, setRotationCycle] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const id = useId();
  const isPlaying = reduceMotion === false && !isHovered
    && !hasFocus && !isDragging && isInView && isPageVisible;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.2), { threshold: 0.2 });
    observer.observe(root);
    const updateVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => setActiveIndex((current) => (current + 1) % photos.length), 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, rotationCycle, isPlaying]);

  const selectPhoto = (index: number) => {
    setActiveIndex((index + photos.length) % photos.length);
    setRotationCycle((cycle) => cycle + 1);
  };

  return (
    <div
      ref={rootRef}
      className={styles.gallery}
      role="region"
      aria-roledescription="輪播"
      aria-label="團隊照片"
      aria-describedby={`${id}-help`}
      data-playing={isPlaying}
      data-active-photo={activeIndex + 1}
      data-reduced-motion={reduceMotion === true}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setIsHovered(true); }}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDownCapture={() => setHasFocus(false)}
      onFocusCapture={(event) => setHasFocus(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false); }}
      onKeyDown={(event) => {
        setHasFocus(true);
        if (event.key === "ArrowLeft") { event.preventDefault(); selectPhoto(activeIndex - 1); }
        if (event.key === "ArrowRight") { event.preventDefault(); selectPhoto(activeIndex + 1); }
        if (event.key === "Home") { event.preventDefault(); selectPhoto(0); }
        if (event.key === "End") { event.preventDefault(); selectPhoto(photos.length - 1); }
      }}
    >
      <p id={`${id}-help`} className={styles.srOnly}>可用左右方向鍵、箭頭或縮圖切換照片，也可左右滑動。滑鼠移入或鍵盤操作時會暫停自動輪播。</p>
      <div
        id={`${id}-photos`}
        className={styles.stage}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
          dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.id !== event.pointerId) return;
          const deltaX = event.clientX - drag.x;
          const deltaY = event.clientY - drag.y;
          if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            selectPhoto(activeIndex + (deltaX < 0 ? 1 : -1));
          }
          dragRef.current = null;
          setIsDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { dragRef.current = null; setIsDragging(false); }}
        onLostPointerCapture={() => { dragRef.current = null; setIsDragging(false); }}
      >
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className={styles.slide}
            data-active={index === activeIndex}
            aria-hidden={index !== activeIndex}
            role="group"
            aria-roledescription="投影片"
            aria-label={`${index + 1} / ${photos.length}：${photo.title}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1600px) 840px, (min-width: 1200px) 54vw, 100vw"
              className={styles.photo}
              draggable={false}
            />
            <figcaption className={styles.caption}>
              <strong>{String(index + 1).padStart(2, "0")} / {photo.title}</strong>
              <span>{photo.description}</span>
            </figcaption>
          </figure>
        ))}

        <button type="button" aria-label="上一張團隊照片" aria-controls={`${id}-photos`} className={`${styles.arrow} ${styles.previous}`} onClick={() => selectPhoto(activeIndex - 1)}>‹</button>
        <button type="button" aria-label="下一張團隊照片" aria-controls={`${id}-photos`} className={`${styles.arrow} ${styles.next}`} onClick={() => selectPhoto(activeIndex + 1)}>›</button>

        <div className={styles.controls}>
          <div className={styles.indicators} role="group" aria-label="照片進度">
            {photos.map((photo, index) => (
              <button key={photo.src} type="button" aria-label={`顯示第 ${index + 1} 張照片`} aria-current={index === activeIndex ? "true" : undefined} aria-controls={`${id}-photos`} onClick={() => selectPhoto(index)}><span /></button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.thumbnails} role="group" aria-label="照片縮圖">
        {photos.map((photo, index) => (
          <button key={photo.src} type="button" className={styles.thumbnail} aria-label={`選擇照片 ${index + 1}：${photo.title}`} aria-current={index === activeIndex ? "true" : undefined} aria-controls={`${id}-photos`} onClick={() => selectPhoto(index)}>
            <Image src={photo.src} alt="" fill sizes="(min-width: 1200px) 260px, 30vw" className={styles.photo} draggable={false} />
            <span className={styles.srOnly}>{photo.title}</span>
          </button>
        ))}
      </div>
      <p className={styles.srOnly} aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">第 {activeIndex + 1} 張，共 {photos.length} 張：{photos[activeIndex].title}</p>
    </div>
  );
}
