import { fundingBudget2027 } from "./siteContent";

export const planGoalMedia = [
  { src: "/images/rocket-internals.jpg", alt: "團隊實際製作的火箭內部結構與整合機構", label: "團隊結構實作", position: "50% 36%", diagram: false, icon: "layers" },
  { src: "/images/avionics/avionics-module.png", alt: "團隊自製航電電路板、通訊模組與電池", label: "團隊自製航電", position: "55% 15%", diagram: false, icon: "chip" },
  { src: "/images/team-groups/recovery.png", alt: "雙降落傘與火箭回收系統設計示意圖", label: "回收系統示意", position: "50% 0%", diagram: true, icon: "parachute" },
  { src: "/images/rocket-assembly.jpg", alt: "團隊於競賽現場組裝火箭並進行檢查", label: "現場組裝與檢查", position: "50% 45%", diagram: false, icon: "chart" },
] as const;

const budgetColors = ["#ff7900", "#ffab39", "#ffc18b", "#ffe5c8", "#ffda58", "#e9b554", "#d88b36"] as const;

// Derive the chart and percentages from the existing seven amounts.
const budgetValues2027 = fundingBudget2027.map((item) => Number(item.amount.replace(/[^\d]/g, "")));
export const budgetTotal2027 = budgetValues2027.reduce((total, value) => total + value, 0);
export const planBudget2027 = fundingBudget2027.map((item, index) => {
  const value = budgetValues2027[index];
  const offset = budgetValues2027.slice(0, index).reduce((total, previous) => total + previous, 0) / budgetTotal2027 * 100;
  return { ...item, value, offset, percentage: value / budgetTotal2027 * 100, color: budgetColors[index] };
});
export const formatBudgetAmount = (amount: number) => `NT$${amount.toLocaleString("en-US")}`;

export const calendarSource2027 = {
  url: "https://www.tasa.org.tw/zh-TW/events/detail/20ca1542-ba86-4900-9b59b12361623e33",
  checkedAt: "2026-11-02",
  timezone: "UTC+8",
} as const;

export type CalendarEvent2027 = {
  id: string;
  start: string;
  end?: string;
  title: string;
  note?: string;
  annotation?: string;
  tentative?: boolean;
  milestone?: { icon: "clipboard" | "document" | "users" | "gear" | "helmet" | "rocket" | "flag" };
};

// All 18 entries in TASA's section 六「重要期程及活動內容」.
// Sorted by start date; milestones are derived from these same records.
// Recheck the source and checkedAt together whenever TASA revises the calendar.
export const competitionCalendar2027: readonly CalendarEvent2027[] = [
  { id: "registration", start: "2026-09-08", end: "2026-11-13", title: "受理報名作業" },
  { id: "briefing", start: "2026-09-15", title: "火箭競賽線上說明會", note: "12:00–13:00（UTC+8）" },
  { id: "mdr", milestone: { icon: "document" }, annotation: "計畫書DeadLine", start: "2026-10-19", end: "2026-11-20", title: "繳交任務計畫書（MDR）", note: "繳交期限依 2026/10/19 公告延至 11/20。" },
  { id: "workshop", start: "2026-11-15", title: "啟動暨 MDR 設計工作坊", note: "由原訂 10/17 延期至 11/15。" },
  { id: "qualification", start: "2026-11-21", end: "2026-12-12", title: "報名資料、資格及任務計畫書審查" },
  { id: "shortlist", milestone: { icon: "users" }, annotation: "10隊晉級複賽", start: "2026-12-14", title: "公布入圍團隊" },
  { id: "registration-fee", start: "2026-12-14", end: "2026-12-21", title: "入圍團隊繳交報名費" },
  { id: "first-design", milestone: { icon: "document" }, annotation: "報告DeadLine", start: "2027-01-21", end: "2027-01-31", title: "第一次火箭設計報告收件" },
  { id: "first-review", start: "2027-02-01", end: "2027-02-28", title: "第一次火箭設計報告審查" },
  { id: "second-design", milestone: { icon: "gear" }, annotation: "報告DeadLine", start: "2027-04-17", end: "2027-05-05", title: "第二次火箭設計報告收件" },
  { id: "1k-review", start: "2027-05-08", title: "學生 1K 組實體審查與射場安全集訓", note: "第二次火箭設計報告實體審查，含初級火箭發射執照測驗。", tentative: true },
  { id: "3k-review", milestone: { icon: "helmet" }, annotation: "在逢甲線下報告&測驗", start: "2027-05-09", title: "學生 3K 組及社會 3K 組實體審查與射場安全集訓", note: "第二次火箭設計報告實體審查，含初級火箭發射執照測驗。", tentative: true },
  { id: "review-summary", start: "2027-05-10", end: "2027-05-14", title: "審查委員總評作業" },
  { id: "finalists", milestone: { icon: "flag" }, annotation: "7隊晉級決賽", start: "2027-05-17", title: "公告晉級決賽團隊", tentative: true },
  { id: "frr-submission", milestone: { icon: "clipboard" }, annotation: "報告DeadLine", start: "2027-06-14", end: "2027-06-30", title: "發射備便報告（FRR）收件" },
  { id: "frr-review", start: "2027-07-01", end: "2027-07-16", title: "發射備便報告（FRR）審查" },
  { id: "final", annotation: "我們在旭海升空!", start: "2027-07-23", end: "2027-07-25", title: "火箭競賽決賽", tentative: true, note: "將視天候與行政等因素調整。" },
  { id: "backup", start: "2027-07-30", end: "2027-08-01", title: "備援日一", tentative: true },
];

export function formatCalendarDate(date: string) {
  return date.replaceAll("-", "/");
}
