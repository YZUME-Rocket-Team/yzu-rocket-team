"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import DonationTutorialModal from "@/components/DonationTutorialModal";
import { officialDonationUrl } from "@/data/siteContent";

const pageSequence = [
  { href: "/", label: "首頁" },
  { href: "/competition", label: "賽事簡介" },
  { href: "/journey-2026", label: "2026 經歷" },
  { href: "/budget", label: "經費總結" },
  { href: "/plan-2027", label: "2027 計畫" },
] as const;

type Direction = "previous" | "next";

type NavigationCard = {
  direction: Direction;
  href: string;
  label: string;
  support?: boolean;
};

function PortalCard({
  direction,
  href,
  label,
  support = false,
  fullWidth = false,
  compact = false,
  onOpenTutorial,
  tutorialButtonRef,
}: NavigationCard & {
  fullWidth?: boolean;
  compact?: boolean;
  onOpenTutorial?: () => void;
  tutorialButtonRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const isPrevious = direction === "previous";
  const imageSrc = isPrevious
    ? "/images/navigation/previous.png"
    : "/images/navigation/next.png";
  const cardClassName = `group relative isolate flex overflow-hidden border border-white/15 bg-slate-900 shadow-[0_20px_70px_rgba(2,6,23,0.38)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-orange-400/55 hover:shadow-[0_22px_75px_rgba(249,115,22,0.18)] focus-within:border-orange-400/55 focus-within:shadow-[0_22px_75px_rgba(249,115,22,0.18)] motion-reduce:transform-none motion-reduce:transition-none ${
    compact
      ? "h-[clamp(12rem,19vw,17rem)] rounded-3xl"
      : "h-[clamp(16rem,38vw,25rem)] rounded-[2rem]"
  }`;
  const focusClassName =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300";

  const background = (
    <>
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes={
          fullWidth
            ? "(min-width: 1280px) 1280px, 100vw"
            : "(min-width: 1280px) 630px, (min-width: 768px) 50vw, 100vw"
        }
        className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045] motion-reduce:transform-none motion-reduce:transition-none ${compact ? "object-[center_60%]" : "object-[68%_center]"}`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.58)_48%,rgba(2,6,23,0.18)_100%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.76)_0%,rgba(2,6,23,0.2)_72%,transparent_100%)]"
      />
    </>
  );

  const text = (
    <span className={`pointer-events-none relative z-20 flex w-full flex-col items-start px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8 ${compact ? "lg:px-8 lg:pb-8 lg:pt-8" : "lg:px-10 lg:pb-10 lg:pt-10"}`}>
      <span className={`inline-flex items-center gap-2 font-mono font-bold tracking-[0.09em] text-orange-300 ${compact ? "text-xs sm:text-sm" : "text-base sm:text-lg"}`}>
        {isPrevious && (
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          >
            ←
          </span>
        )}
        <span>{support ? "支持我們" : isPrevious ? "上一頁" : "下一頁"}</span>
        {!isPrevious && (
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          >
            →
          </span>
        )}
      </span>
      <span className={`mt-3 max-w-2xl text-balance font-black leading-[1.12] text-white drop-shadow-lg ${compact ? "text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]"}`}>
        {label}
      </span>
    </span>
  );

  if (support) {
    return (
      <div className={`${cardClassName} flex-col items-start`}>
        {background}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}（開啟新分頁）`}
          className={`absolute inset-0 z-10 rounded-[2rem] ${focusClassName}`}
        />
        {text}
        <button
          ref={tutorialButtonRef}
          type="button"
          onClick={onOpenTutorial}
          className={`relative z-30 mx-6 -mt-1 inline-flex min-h-11 items-center rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-left text-sm font-semibold text-slate-100 backdrop-blur-sm transition-colors hover:border-orange-400/40 hover:bg-orange-500/15 hover:text-orange-200 sm:mx-8 sm:text-base lg:mx-10 ${focusClassName} motion-reduce:transition-none`}
        >
          查看捐款教學
        </button>
      </div>
    );
  }

  return (
    <Link href={href} className={`${cardClassName} ${focusClassName}`}>
      {background}
      {text}
    </Link>
  );
}

export default function PageLinks({ compact = false, nextLabel }: { compact?: boolean; nextLabel?: string }) {
  const pathname = usePathname();
  const [showTutorial, setShowTutorial] = useState(false);
  const tutorialButtonRef = useRef<HTMLButtonElement>(null);
  const currentIndex = pageSequence.findIndex((page) => page.href === pathname);

  if (currentIndex === -1) return null;

  const previousPage = currentIndex > 0 ? pageSequence[currentIndex - 1] : null;
  const nextPage = pageSequence[currentIndex + 1] ?? null;
  const cards: NavigationCard[] = [];

  if (previousPage) {
    cards.push({
      direction: "previous",
      href: previousPage.href,
      label: previousPage.label,
    });
  }

  if (nextPage) {
    cards.push({
      direction: "next",
      href: nextPage.href,
      label: nextLabel ?? nextPage.label,
    });
  } else {
    cards.push({
      direction: "next",
      href: officialDonationUrl,
      label: "支持我們的下一段旅程",
      support: true,
    });
  }

  const closeTutorial = () => {
    setShowTutorial(false);
    requestAnimationFrame(() => tutorialButtonRef.current?.focus());
  };

  return (
    <>
      <nav
        aria-label="前後頁導覽"
        className={`relative px-5 sm:px-8 lg:px-12 ${compact ? "pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-8 lg:pb-16" : "border-t border-white/10 bg-slate-950/70 py-16 sm:py-20 lg:py-24"}`}
      >
        <div
          className={`mx-auto grid max-w-7xl gap-5 ${cards.length === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}
        >
          {cards.map((card) => (
            <PortalCard
              key={`${card.direction}-${card.href}`}
              {...card}
              fullWidth={cards.length === 1}
              compact={compact}
              onOpenTutorial={card.support ? () => setShowTutorial(true) : undefined}
              tutorialButtonRef={card.support ? tutorialButtonRef : undefined}
            />
          ))}
        </div>
      </nav>
      {showTutorial ? <DonationTutorialModal onClose={closeTutorial} /> : null}
    </>
  );
}
