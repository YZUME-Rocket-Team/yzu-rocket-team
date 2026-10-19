"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type AnimationSequence,
} from "framer-motion";

import {
  structureStages,
  structureStats,
  verificationStatement,
  type StructureStage,
} from "@/data/rocketStructure";

const overview = {
  stage: "STAGE 00",
  title: "從外殼到尾翼，每一段都有自己的任務。",
  description:
    "整支火箭由鼻錐、箭身、連接段、酬載段與尾翼模組組成。設計時除了考慮飛行時的結構受力，也必須讓航電、酬載與回收系統能被可靠固定，同時維持整體重量與空氣動力表現。",
  image: "/images/rocket-structure/rocket-full.png",
  imageAlt: "火箭從鼻錐、箭身、酬載段到尾翼模組的完整結構外觀",
};

const rocketAnchors = {
  nose: {
    x: 6.5,
    y: 27.5,
    width: "8.5%",
    aspectRatio: "420 / 614",
    rotate: -74,
    anchorScale: 1,
  },
  payload: {
    x: 41,
    y: 44,
    width: "6.2%",
    aspectRatio: "277 / 790",
    rotate: -74,
    anchorScale: 1,
  },
  avionics: {
    x: 55,
    y: 50.5,
    width: "64%",
    aspectRatio: "1247 / 1261",
    rotate: 16,
    anchorScale: 0.125,
  },
  fin: {
    x: 78,
    y: 63,
    width: "23%",
    aspectRatio: "1258 / 506",
    rotate: 16,
    anchorScale: 1,
  },
} as const;

const explodedOffsets = {
  nose: { x: -2.5, y: -3 },
  payload: { x: 0, y: -8 },
  avionics: { x: -1.5, y: -8 },
  fin: { x: 10, y: 2.5 },
} as const;

const focusTargets = {
  nose: { x: 42, y: 48, scale: 3.5, rotate: -74 },
  payload: { x: 43, y: 49, scale: 3.16, rotate: -74 },
  avionics: { x: 47, y: 50, scale: 1, rotate: -2 },
  fin: { x: 43, y: 52, scale: 2.84, rotate: 16 },
} as const;

const launchVector = {
  x: "-88vw",
  y: "-52vh",
} as const;

const exhaustAnchor = {
  x: 94.5,
  y: 67,
  length: 20,
  thickness: 5,
  rotate: 16,
} as const;

const retainedOffsets = {
  nose: { x: 3, y: -4 },
  payload: { x: 0, y: -6 },
  avionics: { x: 0, y: -5 },
  fin: { x: 5, y: 1.5 },
} as const;

const FINAL_STAGE_FRAME = 6;

const payloadBoatOverview = {
  src: "/images/payload-boat/payload-boat-overview.png?v=2",
  alt: "酬載船完整示意圖，包含船舵、推進器、伺服馬達、通訊艙與電池盒",
  width: "82%",
  aspectRatio: "1653 / 849",
  anchor: {
    x: rocketAnchors.payload.x,
    y: rocketAnchors.payload.y,
    scale: 0.42,
  },
  focus: {
    x: 50,
    y: 50,
    scale: 1.16,
  },
} as const;

const payloadBoatLabels = [
  {
    id: "rudder",
    title: "船舵",
    x: 2.5,
    y: 13,
    accent: "#60a5fa",
  },
  {
    id: "underwater-thruster",
    title: "水下推進器",
    x: 34,
    y: 2,
    accent: "#f87171",
  },
  {
    id: "servo-motor",
    title: "伺服馬達",
    x: 72,
    y: 2,
    accent: "#cbd5e1",
  },
  {
    id: "communication-bay",
    title: "通訊艙",
    x: 43,
    y: 74,
    accent: "#4ade80",
  },
  {
    id: "battery-compartment",
    title: "電池盒",
    x: 74,
    y: 68,
    accent: "#facc15",
  },
] as const;

const avionicsLabels = [
  { id: "storage", title: "資料儲存", x: 2, y: 24 },
  { id: "controller", title: "主控", x: 67, y: 43 },
  { id: "imu", title: "IMU", x: 1, y: 68 },
  { id: "barometer", title: "氣壓計", x: 24, y: 78 },
  { id: "gps", title: "GPS", x: 51, y: 82 },
] as const;

type RocketPart = keyof typeof rocketAnchors;

function StructureImage({
  src,
  alt,
  label,
  sizes,
  className = "object-contain p-5 sm:p-8",
  unoptimized = false,
}: {
  src: string;
  alt: string;
  label: string;
  sizes: string;
  className?: string;
  unoptimized?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <div aria-hidden="true" className="media-grid absolute inset-0 opacity-55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_62%)]"
      />
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-orange-400 uppercase">
              Structure image
            </span>
            <p className="mt-3 text-base font-bold text-slate-300">{label}</p>
            <p className="mt-2 text-sm text-slate-500">結構圖準備中</p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized={unoptimized}
          className={className}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function PartImage({
  src,
  alt,
  label,
  sizes = "30vw",
  unoptimized = false,
  highDetail = false,
}: {
  src: string;
  alt: string;
  label: string;
  sizes?: string;
  unoptimized?: boolean;
  highDetail?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-orange-400/30 bg-slate-900/80 p-4 text-center font-mono text-xs text-orange-300">
        {label}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={unoptimized}
      className={
        highDetail
          ? "object-contain"
          : "object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)]"
      }
      onError={() => setFailed(true)}
    />
  );
}

function AvionicsLabels({ active = true }: { active?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {avionicsLabels.map((label, index) => (
        <motion.div
          key={label.id}
          initial={false}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
          transition={{
            duration: active ? 0.28 : 0.18,
            delay: active ? 0.48 + index * 0.055 : 0,
            ease: "easeOut",
          }}
          className="absolute whitespace-nowrap font-mono [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]"
          style={{ left: `${label.x}%`, top: `${label.y}%` }}
        >
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-px w-3 bg-orange-400" />
            <span className="text-[0.62rem] font-bold tracking-[0.08em] text-white sm:text-xs">
              {label.title}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StageDetails({ stage, compact = false }: { stage: StructureStage; compact?: boolean }) {
  const isAvionics = stage.stage === "STAGE 04";
  const isVerification = stage.stage === "STAGE 06";

  return (
    <div>
      <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400 uppercase">
        {stage.eyebrow ?? stage.stage}
      </p>
      <h3
        className={`mt-3 font-black tracking-tight text-white ${
          compact ? "text-2xl xl:text-3xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {stage.title}
      </h3>
      {stage.subtitle ? (
        <p className="mt-2 text-lg font-bold tracking-wide text-orange-200">{stage.subtitle}</p>
      ) : null}
      {stage.introduction ? (
        <p className={`mt-4 text-slate-300 ${compact ? "text-sm leading-6" : "text-base leading-8"}`}>
          {stage.introduction}
        </p>
      ) : null}

      {isAvionics && stage.specifications ? (
        <dl
          className={`grid border-y border-white/10 ${
            compact ? "mt-5 grid-cols-3" : "mt-7 sm:grid-cols-3"
          }`}
        >
          {stage.specifications.map((specification) => (
            <div
              key={specification.label}
              className={`border-white/10 py-3.5 ${
                compact
                  ? "border-r px-3 last:border-r-0"
                  : "border-b px-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              }`}
            >
              <dt className="font-mono text-[0.68rem] font-bold tracking-[0.15em] text-orange-400">
                {specification.label}
              </dt>
              <dd className="mt-3">
                {specification.value ? (
                  <span className="block font-mono text-xl font-black text-white">
                    {specification.value}
                  </span>
                ) : null}
                {specification.details.map((detail) => (
                  <span key={detail} className="block text-xs leading-5 text-slate-400">
                    {detail}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {isAvionics && stage.mainSystems ? (
        <div className={compact ? "mt-5" : "mt-7"}>
          <p className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-slate-500">
            COMPONENT INDEX
          </p>
          <dl className="mt-2">
            {stage.mainSystems.map((system) => (
              <div
                key={system.title}
                className={`grid items-baseline border-t border-white/10 ${
                  compact
                    ? "grid-cols-[5.25rem_1fr] gap-3 py-1.5"
                    : "grid-cols-[6.5rem_1fr] gap-4 py-2"
                }`}
              >
                <dt className="text-xs font-bold text-white">{system.title}</dt>
                <dd className="font-mono text-[0.68rem] leading-5 text-slate-400/80">
                  {system.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {!isAvionics ? <ol
        className={
          isVerification
            ? compact
              ? "mt-5 grid gap-2.5"
              : "mt-7 grid gap-4 md:grid-cols-3"
            : compact
              ? "mt-5 space-y-3"
              : "mt-7 space-y-4"
        }
      >
        {stage.points.map((point, index) => (
          <li
            key={point.title}
            className={
              isVerification
                ? `rounded-2xl border border-white/10 bg-white/[0.035] ${compact ? "p-3.5" : "p-5"}`
                : `border-l border-orange-400/35 ${compact ? "pl-4" : "pl-5"}`
            }
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-bold text-orange-400">
                {point.number ?? String(index + 1).padStart(2, "0")}
              </span>
              <h4 className={`${compact ? "text-sm" : "text-lg"} font-black text-white`}>
                {point.title}
              </h4>
            </div>
            <p className={`mt-1.5 text-slate-400 ${compact ? "text-sm leading-5" : "text-base leading-7"}`}>
              {point.description}
            </p>
          </li>
        ))}
      </ol> : null}

      {stage.conclusion ? (
        <p
          className={`border-t border-orange-400/25 font-bold text-orange-200 ${
            compact ? "mt-4 pt-4 text-sm leading-6" : "mt-7 pt-6 text-lg leading-8"
          }`}
        >
          {stage.conclusion}
        </p>
      ) : null}

      {isVerification ? (
        <p
          className={`border-t border-orange-400/25 font-bold text-orange-200 ${
            compact ? "mt-4 pt-4 text-sm leading-6" : "mt-7 pt-6 text-lg leading-8"
          }`}
        >
          {verificationStatement}
        </p>
      ) : null}
    </div>
  );
}

function PayloadBoatOverviewLayer({ activeFrame }: { activeFrame: number }) {
  const isActive = activeFrame === 3;
  const { anchor, focus } = payloadBoatOverview;

  const position = isActive
    ? {
        left: [
          `${anchor.x}%`,
          `${anchor.x + (focus.x - anchor.x) * 0.24}%`,
          `${focus.x}%`,
        ],
        top: [
          `${anchor.y}%`,
          `${anchor.y + (focus.y - anchor.y) * 0.24}%`,
          `${focus.y}%`,
        ],
      }
    : { left: `${anchor.x}%`, top: `${anchor.y}%` };

  return (
    <motion.div
      aria-label="酬載船完整結構示意圖"
      initial={false}
      animate={position}
      transition={
        isActive
          ? {
              left: { duration: 0.78, times: [0, 0.25, 1], ease: ["easeOut", "easeInOut"] },
              top: { duration: 0.78, times: [0, 0.25, 1], ease: ["easeOut", "easeInOut"] },
            }
          : { duration: 0.48, ease: "easeInOut" }
      }
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${anchor.x}%`,
        top: `${anchor.y}%`,
        width: payloadBoatOverview.width,
        aspectRatio: payloadBoatOverview.aspectRatio,
      }}
    >
      <motion.div
        initial={false}
        animate={
          isActive
            ? { opacity: 1, scale: focus.scale, filter: "brightness(1.06)" }
            : { opacity: 0, scale: anchor.scale, filter: "brightness(0.55)" }
        }
        transition={{
          scale: { type: "spring", stiffness: 105, damping: 22 },
          opacity: { duration: isActive ? 0.42 : 0.32, ease: "easeOut" },
          filter: { duration: 0.36, ease: "easeOut" },
        }}
        className="relative h-full w-full will-change-transform"
      >
        <PartImage
          src={payloadBoatOverview.src}
          alt={payloadBoatOverview.alt}
          label="酬載船完整示意圖"
          unoptimized
        />

        <div aria-hidden="true" className="absolute inset-0 z-10">
          {payloadBoatLabels.map((label, index) => (
            <motion.div
              key={label.id}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{
                duration: isActive ? 0.3 : 0.22,
                delay: isActive ? 0.68 + index * 0.06 : 0,
                ease: "easeOut",
              }}
              className="absolute whitespace-nowrap font-mono [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]"
              style={{
                left: `${label.x}%`,
                top: `${label.y}%`,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-4 shrink-0 rounded-full"
                  style={{ backgroundColor: label.accent }}
                />
                <h4 className="text-base font-bold leading-tight text-white xl:text-lg">
                  {label.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExplodedRocketVisual({
  activeFrame,
  stageSixRun,
  shouldReduceMotion,
}: {
  activeFrame: number;
  stageSixRun: number;
  shouldReduceMotion: boolean;
}) {
  const [scope, animate] = useAnimate();
  const [completedLogoRun, setCompletedLogoRun] = useState(-1);
  const partFrames: Record<RocketPart, number> = { nose: 1, payload: 2, avionics: 4, fin: 5 };
  const showLogo = activeFrame === FINAL_STAGE_FRAME && completedLogoRun === stageSixRun;

  const animationMode =
    activeFrame === 0
      ? "assembled"
      : activeFrame === FINAL_STAGE_FRAME
        ? "reassembling-and-launching"
        : "focusing-part";

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (activeFrame !== FINAL_STAGE_FRAME) {
      const resetSequence: AnimationSequence = [
        [
          "[data-flight-group]",
          { x: "0%", y: "0%", scale: 1, opacity: 1, filter: "blur(0px)" },
          { duration: 0 },
        ],
        ["[data-exhaust]", { opacity: 0, scaleX: 0.35 }, { duration: 0, at: 0 }],
        ["[data-smoke]", { opacity: 0, scale: 0.65 }, { duration: 0, at: 0 }],
      ];

      const resetControls = animate(resetSequence);
      return () => resetControls.stop();
    }

    const stageSixSequence: AnimationSequence = [
      [
        '[data-part-position="nose"]',
        { left: `${rocketAnchors.nose.x}%`, top: `${rocketAnchors.nose.y}%` },
        { duration: 0.62, ease: "easeInOut" },
      ],
      [
        '[data-part-position="payload"]',
        { left: `${rocketAnchors.payload.x}%`, top: `${rocketAnchors.payload.y}%` },
        { duration: 0.62, ease: "easeInOut", at: 0 },
      ],
      [
        '[data-part-position="avionics"]',
        { left: `${rocketAnchors.avionics.x}%`, top: `${rocketAnchors.avionics.y}%` },
        { duration: 0.62, ease: "easeInOut", at: 0 },
      ],
      [
        '[data-part-position="fin"]',
        { left: `${rocketAnchors.fin.x}%`, top: `${rocketAnchors.fin.y}%` },
        { duration: 0.62, ease: "easeInOut", at: 0 },
      ],
      [
        '[data-part-visual]:not([data-part-visual="avionics"])',
        { opacity: 0.42, scale: 0.9, filter: "brightness(0.62)" },
        { duration: 0.62, ease: "easeInOut", at: 0 },
      ],
      [
        '[data-part-visual="avionics"]',
        {
          opacity: 0.42,
          scale: rocketAnchors.avionics.anchorScale * 0.9,
          rotate: rocketAnchors.avionics.rotate,
          filter: "none",
        },
        { duration: 0.62, ease: "easeInOut", at: 0 },
      ],
      [
        "[data-full-rocket]",
        { opacity: 0.2, scale: 0.94, filter: "brightness(0.58)" },
        { duration: 0.62, ease: "easeInOut", at: 0 },
      ],
      [
        "[data-flight-group]",
        { x: "0%", y: "0%", scale: 1, opacity: 1, filter: "blur(0px)" },
        { duration: 0, at: 0 },
      ],
      ["[data-exhaust]", { opacity: 0, scaleX: 0.35 }, { duration: 0, at: 0 }],
      ["[data-smoke]", { opacity: 0, scale: 0.65 }, { duration: 0, at: 0 }],
      ["[data-part-visual]", { opacity: 0 }, { duration: 0.18, at: 0.62 }],
      [
        "[data-full-rocket]",
        { opacity: 1, scale: 1, filter: "brightness(1.06)" },
        { duration: 0.32, ease: "easeOut", at: 0.62 },
      ],
      ["[data-axis-guide]", { opacity: 0 }, { duration: 0.28, at: 0.62 }],
      [
        "[data-exhaust]",
        { opacity: [0, 0.95, 0.78], scaleX: [0.35, 1.08, 1] },
        { duration: 0.42, ease: "easeInOut", at: 0.94 },
      ],
      [
        "[data-flight-group]",
        { y: ["0%", "0.8%", "0%"], scale: [1, 0.995, 1] },
        { duration: 0.42, ease: "easeInOut", at: 0.94 },
      ],
      [
        "[data-flight-group]",
        {
          x: ["0vw", "-3vw", launchVector.x],
          y: ["0vh", "-2vh", launchVector.y],
          scale: [1, 1.015, 0.9],
          filter: ["blur(0px)", "blur(0px)", "blur(2px)"],
        },
        { duration: 1.15, times: [0, 0.36, 1], ease: [0.4, 0, 1, 1], at: 1.36 },
      ],
      [
        "[data-exhaust]",
        { opacity: [0.78, 1, 0.22], scaleX: [1, 1.35, 1.9] },
        { duration: 1.15, ease: "circIn", at: 1.36 },
      ],
      [
        "[data-smoke]",
        {
          opacity: [0, 0.38, 0],
          scale: [0.65, 1.2, 1.55],
          filter: ["blur(5px)", "blur(10px)", "blur(16px)"],
        },
        { duration: 0.76, ease: "easeOut", at: 2.51 },
      ],
      ["[data-exhaust]", { opacity: 0 }, { duration: 0.35, ease: "easeOut", at: 2.51 }],
    ];

    let logoDelay: number | undefined;
    let cancelled = false;
    const timelineControls = animate(stageSixSequence);

    timelineControls.then(() => {
      if (cancelled) return;
      logoDelay = window.setTimeout(() => {
        if (!cancelled) setCompletedLogoRun(stageSixRun);
      }, 400);
    });

    return () => {
      cancelled = true;
      if (logoDelay !== undefined) window.clearTimeout(logoDelay);
      timelineControls.stop();
    };
  }, [activeFrame, animate, shouldReduceMotion, stageSixRun]);

  const getPartState = (part: RocketPart) => {
    const anchor = rocketAnchors[part];
    const partFrame = partFrames[part];
    const isActive = activeFrame === partFrame;
    const isIntroduced = activeFrame > partFrame;
    const isVerification = activeFrame === FINAL_STAGE_FRAME;
    const anchorScale = anchor.anchorScale;
    const atAnchor = {
      left: `${anchor.x}%`,
      top: `${anchor.y}%`,
    };

    if (activeFrame === 0 || activeFrame < partFrame) {
      return {
        ...atAnchor,
        opacity: 0,
        scale: anchorScale * 0.8,
        rotate: anchor.rotate,
        filter: "brightness(0.5)",
      };
    }

    if (isActive) {
      const extractionPoint = {
        x: anchor.x + explodedOffsets[part].x,
        y: anchor.y + explodedOffsets[part].y,
      };

      return {
        left: [`${anchor.x}%`, `${extractionPoint.x}%`, `${focusTargets[part].x}%`],
        top: [`${anchor.y}%`, `${extractionPoint.y}%`, `${focusTargets[part].y}%`],
        opacity: 1,
        scale:
          part === "avionics"
            ? [anchorScale, anchorScale * 1.15, focusTargets[part].scale]
            : focusTargets[part].scale,
        rotate:
          part === "avionics"
            ? [anchor.rotate, 8, focusTargets[part].rotate]
            : focusTargets[part].rotate,
        filter: part === "avionics" ? "none" : "brightness(1.1)",
      };
    }

    if (isVerification) {
      return {
        ...atAnchor,
        opacity: 0.42,
        scale: anchorScale * 0.9,
        rotate: anchor.rotate,
        filter: part === "avionics" ? "none" : "brightness(0.62)",
      };
    }

    if (isIntroduced) {
      return {
        left: `${anchor.x + retainedOffsets[part].x}%`,
        top: `${anchor.y + retainedOffsets[part].y}%`,
        opacity: part === "nose" ? 0.22 : 0.26,
        scale: anchorScale * 0.86,
        rotate: anchor.rotate,
        filter: part === "avionics" ? "none" : "brightness(0.52)",
      };
    }

    return {
      ...atAnchor,
      opacity: 0,
      scale: anchorScale * 0.8,
      rotate: anchor.rotate,
      filter: "brightness(0.5)",
    };
  };

  const fullRocketState =
    activeFrame === 0
      ? { opacity: 1, scale: 1, filter: "brightness(1)" }
      : activeFrame === FINAL_STAGE_FRAME
        ? { opacity: 0.2, scale: 0.94, filter: "brightness(0.58)" }
        : { opacity: 0.2, scale: 0.94, filter: "brightness(0.52)" };

  const partTransition = {
    scale: { type: "spring" as const, stiffness: 110, damping: 22 },
    opacity: { duration: 0.36, ease: "easeOut" as const },
    filter: { duration: 0.36, ease: "easeOut" as const },
  };

  const fullRocketTransition = { duration: 0.4, ease: "easeOut" as const };

  const parts = [
    {
      key: "nose" as const,
      src: "/images/rocket-structure/nose-cone.png",
      alt: "3D 列印 PLA 鼻錐與內部降落傘釋放裝置",
      label: "鼻錐與連接段",
    },
    {
      key: "payload" as const,
      src: "/images/rocket-structure/payload-module.png",
      alt: "以碳纖維板與鋁圓棒製作的多層模組化酬載段",
      label: "模組化酬載段",
    },
    {
      key: "avionics" as const,
      src: "/images/avionics/avionics-module.png",
      alt: "Arduino Mega、感測器、LoRa 通訊與電池組組成的航電模組",
      label: "航電系統",
    },
    {
      key: "fin" as const,
      src: "/images/rocket-structure/fin-module.png",
      alt: "碳纖維尾翼、鋁製固定環與推進器固定模組",
      label: "尾翼與推進器固定",
    },
  ];

  return (
    <div
      ref={scope}
      data-animation-mode={animationMode}
      className="relative h-full w-full overflow-hidden"
    >
      <div aria-hidden="true" className="media-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.13),transparent_58%)]"
      />

      <div
        className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2"
        style={{ aspectRatio: "962 / 577" }}
      >
        <motion.div data-flight-group className="absolute inset-0 will-change-transform">
          <motion.div
            data-full-rocket
            animate={fullRocketState}
            transition={fullRocketTransition}
            className="absolute inset-0 will-change-transform"
          >
            <PartImage src={overview.image} alt={overview.imageAlt} label="完整火箭" />
          </motion.div>

          <motion.div
            data-exhaust
            aria-hidden="true"
            initial={false}
            className="absolute rounded-full bg-gradient-to-r from-orange-100 via-orange-500/90 to-orange-500/0 opacity-0 blur-[2px]"
            style={{
              left: `${exhaustAnchor.x}%`,
              top: `${exhaustAnchor.y}%`,
              width: `${exhaustAnchor.length}%`,
              height: `${exhaustAnchor.thickness}%`,
              y: "-50%",
              rotate: exhaustAnchor.rotate,
              scaleX: 0.35,
              transformOrigin: "left center",
            }}
          />
        </motion.div>

        <motion.div
          data-smoke
          aria-hidden="true"
          initial={false}
          className="absolute h-[12%] w-[12%] rounded-full bg-orange-100/25 opacity-0"
          style={{
            left: `${exhaustAnchor.x}%`,
            top: `${exhaustAnchor.y}%`,
            x: "-50%",
            y: "-50%",
            scale: 0.65,
            filter: "blur(5px)",
          }}
        />

        <motion.div
          data-axis-guide
          aria-hidden="true"
          animate={{
            opacity: activeFrame === 0 ? 0 : activeFrame === FINAL_STAGE_FRAME ? 0.22 : 0.7,
          }}
          transition={{ duration: 0.35 }}
          className="absolute left-[4%] right-[4%] top-1/2 h-px bg-gradient-to-r from-transparent via-orange-300/45 to-transparent"
        />

        {parts.map((part) => {
          const anchor = rocketAnchors[part.key];
          const state = getPartState(part.key);
          const isActive = activeFrame === partFrames[part.key];

          return (
            <motion.div
              key={part.key}
              data-part-position={part.key}
              initial={false}
              animate={{ left: state.left, top: state.top }}
              transition={
                isActive
                  ? {
                      left: { duration: 0.76, times: [0, 0.3, 1], ease: ["easeOut", "easeInOut"] },
                      top: { duration: 0.76, times: [0, 0.3, 1], ease: ["easeOut", "easeInOut"] },
                    }
                  : {
                      left: { duration: 0.44, ease: "easeOut" },
                      top: { duration: 0.44, ease: "easeOut" },
                    }
              }
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${anchor.x}%`,
                top: `${anchor.y}%`,
                width: anchor.width,
                aspectRatio: anchor.aspectRatio,
              }}
            >
              <motion.div
                data-part-visual={part.key}
                initial={false}
                animate={
                  part.key === "avionics"
                    ? {
                        opacity: state.opacity,
                        scale: state.scale,
                        rotate: state.rotate,
                      }
                    : {
                        opacity: state.opacity,
                        scale: state.scale,
                        rotate: state.rotate,
                        filter: state.filter,
                      }
                }
                transition={
                  part.key === "avionics" && isActive
                    ? {
                        ...partTransition,
                        scale: {
                          duration: 0.76,
                          times: [0, 0.3, 1],
                          ease: ["easeOut", "easeInOut"],
                        },
                        rotate: {
                          duration: 0.76,
                          times: [0, 0.35, 1],
                          ease: ["easeOut", "easeInOut"],
                        },
                      }
                    : partTransition
                }
                className={`relative h-full w-full ${
                  part.key === "avionics" ? "" : "will-change-transform"
                }`}
              >
                <PartImage
                  src={part.src}
                  alt={part.alt}
                  label={part.label}
                  sizes={
                    part.key === "avionics"
                      ? "(min-width: 1536px) 550px, (min-width: 1280px) 480px, (min-width: 1024px) 42vw, 90vw"
                      : undefined
                  }
                  unoptimized={part.key === "avionics"}
                  highDetail={part.key === "avionics"}
                />
                {part.key === "avionics" ? <AvionicsLabels active={isActive} /> : null}
              </motion.div>
            </motion.div>
          );
        })}

        <PayloadBoatOverviewLayer activeFrame={activeFrame} />
      </div>

      <motion.div
        data-final-logo
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-transform"
        initial={false}
        animate={showLogo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={
          showLogo
            ? { duration: 0.65, ease: "easeOut" }
            : { duration: 0.2, ease: "easeOut" }
        }
      >
        <div className="relative aspect-square w-[52%] drop-shadow-[0_0_28px_rgba(249,115,22,0.16)]">
          <Image
            src="/images/team-logo.png"
            alt="火大的元件團隊 Logo"
            fill
            sizes="(min-width: 1280px) 28vw, 30vw"
            className="object-contain"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-5 top-5 flex justify-between font-mono text-[0.7rem] tracking-[0.14em] text-slate-500">
        <span>YZU / HUODA</span>
        <span>EXPLODED STRUCTURE</span>
      </div>
    </div>
  );
}

function StaticStages() {
  return (
    <div className="mt-14 space-y-8">
      <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
        <figure className="relative aspect-[16/9] border-b border-white/10">
          <StructureImage
            src={overview.image}
            alt={overview.imageAlt}
            label="完整火箭"
            sizes="100vw"
            className="object-contain p-4 sm:p-8"
          />
        </figure>
        <div className="p-6 sm:p-9">
          <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400">STAGE 00</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {overview.title}
          </h3>
          <p className="mt-5 text-base leading-8 text-slate-300">{overview.description}</p>
        </div>
      </article>

      {structureStages.map((stage) => (
        <article
          key={stage.stage}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
        >
          <figure className="relative aspect-[4/3] border-b border-white/10 sm:aspect-[16/9]">
            <StructureImage
              src={stage.stage === "STAGE 03" ? payloadBoatOverview.src : stage.image}
              alt={stage.imageAlt}
              label={stage.title}
              sizes="(min-width: 1024px) 70vw, 100vw"
              unoptimized={stage.stage === "STAGE 03"}
              className={stage.stage === "STAGE 03" ? "object-contain p-2 sm:p-4" : undefined}
            />
            {stage.stage === "STAGE 04" ? (
              <div className="pointer-events-none absolute inset-y-5 left-1/2 aspect-[1247/1261] -translate-x-1/2 sm:inset-y-8">
                <AvionicsLabels />
              </div>
            ) : null}
          </figure>
          <div className="p-6 sm:p-9">
            <StageDetails stage={stage} />
          </div>
        </article>
      ))}
    </div>
  );
}

export default function RocketStructureSection() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const activeFrameRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [activeFrame, setActiveFrame] = useState(0);
  const [stageSixRun, setStageSixRun] = useState(0);
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    const nextFrame = Math.min(
      Math.floor(latest * (structureStages.length + 1)),
      FINAL_STAGE_FRAME,
    );

    if (activeFrameRef.current === nextFrame) return;
    if (nextFrame === FINAL_STAGE_FRAME) setStageSixRun((current) => current + 1);
    activeFrameRef.current = nextFrame;
    setActiveFrame(nextFrame);
  });

  const frameLabels = [overview.stage, ...structureStages.map((stage) => stage.stage)];
  const currentStage = activeFrame === 0 ? null : structureStages[activeFrame - 1];

  return (
    <section
      id="rocket-structure"
      className="relative z-10 scroll-mt-8 border-t border-white/10 bg-slate-950/65"
    >
      <div className="px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:px-12 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                Rocket Structure
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                一枚火箭，是怎麼組成的？
              </h2>
            </div>
            <div className="space-y-5 self-end text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              <p>
                火箭不是一根單純的管子，而是一套必須同時承受高速、加速度、震動與發射環境的整合系統。
              </p>
              <p>
                我們的結構設計以最高約 Mach 0.9、最大約 9G 的飛行條件為設計考量，同時兼顧抗衝擊、抗震動、重量與結構可靠度。
              </p>
            </div>
          </div>

          <dl className="mt-14 grid gap-3 md:grid-cols-[0.72fr_0.72fr_1.56fr]">
            {structureStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
              >
                <dt className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400">
                  {stat.label}
                </dt>
                <dd
                  className={`mt-4 font-black text-white ${
                    stat.label === "DESIGN FOCUS" ? "text-xl leading-8 sm:text-2xl" : "text-4xl"
                  }`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-8 font-mono text-xs tracking-[0.16em] text-slate-500 lg:mt-20">
            <span className="h-px flex-1 bg-gradient-to-r from-orange-400/60 to-transparent" />
            SCROLL TO EXPLORE
            <span className="h-px flex-1 bg-gradient-to-l from-orange-400/60 to-transparent" />
          </div>
        </div>
      </div>

      <div
        className={
          shouldReduceMotion
            ? "px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12 lg:pb-36"
            : "px-5 pb-24 sm:px-8 sm:pb-28 lg:hidden"
        }
      >
        <div className="mx-auto max-w-7xl">
          <StaticStages />
        </div>
      </div>

      <div
        ref={scrollSectionRef}
        className={shouldReduceMotion ? "hidden" : "relative hidden h-[420vh] lg:block"}
      >
        <div className="sticky top-0 h-screen overflow-hidden border-y border-white/10 bg-[#050b14] px-7 py-7 xl:px-12">
          <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-45" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_47%_48%,rgba(249,115,22,0.1),transparent_34rem)]"
          />

          <div className="relative mx-auto grid h-full max-w-[96rem] grid-cols-[7rem_minmax(25rem,1.1fr)_minmax(20rem,0.9fr)] items-center gap-5 xl:grid-cols-[9rem_minmax(34rem,1.2fr)_minmax(25rem,0.8fr)] xl:gap-9">
            <nav aria-label="火箭結構捲動階段" className="self-center">
              <p className="mb-7 font-mono text-xs tracking-[0.16em] text-slate-500">EXPLODED VIEW</p>
              <ol className="space-y-6">
                {frameLabels.map((label, index) => (
                  <li key={label} className="relative pl-4">
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 top-0 w-px transition-colors duration-300 ${
                        activeFrame === index ? "bg-orange-400" : "bg-white/10"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs font-bold tracking-[0.1em] transition-colors duration-300 ${
                        activeFrame === index ? "text-orange-300" : "text-slate-600"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="relative aspect-[16/11] max-h-[72vh] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_0_60px_rgba(249,115,22,0.08)]">
              <ExplodedRocketVisual
                activeFrame={activeFrame}
                stageSixRun={stageSixRun}
                shouldReduceMotion={Boolean(shouldReduceMotion)}
              />
            </div>

            <div className="relative h-[86vh] max-h-[54rem] min-h-[32rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeFrame}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center"
                >
                  <div className="max-h-full w-full overflow-y-auto py-6 pr-2">
                    {currentStage ? (
                      <StageDetails stage={currentStage} compact />
                    ) : (
                      <div>
                        <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400">
                          STAGE 00
                        </p>
                        <h3 className="mt-4 text-3xl font-black tracking-tight text-white xl:text-4xl">
                          {overview.title}
                        </h3>
                        <p className="mt-6 text-base leading-8 text-slate-300">
                          {overview.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
