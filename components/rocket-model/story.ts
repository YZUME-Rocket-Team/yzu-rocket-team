import { structureStages } from "@/data/rocketStructure";

export const storyChapters = [
  { start: 0, code: "VEHICLE / 2026", title: "一枚火箭。\n無數個選擇。", description: "從結構、航電到回收，讓每一個系統在同一時間正常工作。" },
  {
    start: 0.15, code: "NOSE & PAYLOAD", title: "承載任務，\n也承接回程。",
    description: "鼻錐整合回收機構；模組化酬載段，為不同設備留出空間。",
    evidence: { src: structureStages[2].image, alt: structureStages[2].imageAlt, title: "酬載船 / 返航任務", description: "希望在落海後釋放酬載船，帶回重要航電與飛行資料。" },
  },
  {
    start: 0.33, code: "STRUCTURE & AVIONICS", title: "讓系統，\n在一起工作。",
    description: "從酬載內架、航電配置，到連接環與尾翼，逐一看見整合的細節。",
    evidence: { src: structureStages[3].image, alt: structureStages[3].imageAlt, title: "航電系統 / 記錄每次升空", description: "記錄高度、氣壓、溫度與姿態，透過 LoRa 回傳地面站。" },
  },
  { start: 0.55, code: "EXPLODED ASSEMBLY", title: "每個部件，\n都有它的位置。", description: "拉開距離，看見各結構之間的關係，以及它們如何組成一枚火箭。" },
  { start: 0.69, code: "SYSTEM INTEGRATION", title: "從零件，\n回到整體。", description: "回到共同的軸線。組裝，是各個系統再次相遇的過程。" },
  { start: 0.88, code: "FLIGHT / TRANSITION", title: "下一幕，\n是升空。", description: "從圖面與程式，走到真正的發射場。繼續閱讀我們的 2026 工程紀錄。" },
] as const;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

export function chapterAt(progress: number) {
  return storyChapters.reduce((active, chapter, index) => progress >= chapter.start ? index : active, 0);
}

/** Shared scroll clock for the model, camera, typography and launch wrapper. */
export function storyFrame(progress: number, start = 1 / 24, end = 12) {
  const p = clamp01(progress);
  const exploded = Math.min(6, end);
  const payload = Math.min(3.4, exploded);
  const time = p < 0.15 ? start
    : p < 0.33 ? start + (p - 0.15) / 0.18 * (payload - start)
    : p < 0.55 ? payload + (p - 0.33) / 0.22 * (exploded - payload)
    : p < 0.69 ? exploded
    : p < 0.88 ? exploded + (p - 0.69) / 0.19 * (end - exploded)
    : end;
  return {
    progress: p, stage: chapterAt(p), time,
    launch: p <= 0.9 ? 0 : Math.pow(clamp01((p - 0.9) / 0.1), 2),
    glow: smoothstep(0.89, 0.93, p) * (1 - smoothstep(0.98, 1, p)),
  };
}

export function chapterOpacity(progress: number, index: number) {
  const start = storyChapters[index].start;
  const end = storyChapters[index + 1]?.start ?? 2;
  // Fade through the background, keeping outgoing and incoming text from overlapping.
  return (index === 0 ? 1 : smoothstep(start + 0.001, start + 0.02, progress))
    * (1 - smoothstep(end - 0.02, end - 0.001, progress));
}

export const callouts = [
  { key: "nose", node: "GROUP_NoseCone", label: "鼻錐 / 回收", side: "right", stages: [1, 3], mobile: true },
  { key: "payload", node: "GROUP_PayloadTube", label: "模組化酬載段", side: "left", stages: [1, 3], mobile: true },
  { key: "internal", node: "GROUP_PayloadInternal", label: "酬載內架", side: "right", stages: [2, 3], mobile: true },
  { key: "ring", node: "GROUP_ConnectingRing", label: "連接環", side: "left", stages: [2, 3], mobile: false },
  { key: "body", node: "GROUP_MotorTube", label: "箭體", side: "right", stages: [3], mobile: false },
  { key: "fins", node: "GROUP_FinAssembly", label: "尾翼模組", side: "left", stages: [2, 3], mobile: true },
  { key: "tail", node: "GROUP_TailStructure", label: "尾部結構", side: "right", stages: [3], mobile: false },
] as const;
