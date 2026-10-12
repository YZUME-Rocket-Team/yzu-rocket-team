export const officialDonationUrl = "https://donation.yzu.edu.tw/eform_add.aspx";

export const competitionFacts = [
  {
    number: "01",
    title: "自己設計",
    description: "從結構、航電到回收系統，由學生團隊完成設計與整合。",
  },
  {
    number: "02",
    title: "實際製造",
    description: "不是紙上作業，而是把零件、電子系統與火箭真正做出來。",
  },
  {
    number: "03",
    title: "真正發射",
    description: "所有設計最後都要接受實際飛行與回收的驗證。",
  },
] as const;

export const teamFacts = [
  { value: "約 15 人", label: "團隊成員", featured: false },
  { value: "學生 3K 組第三名", label: "2026 台灣盃火箭競賽", featured: true },
  { value: "2027", label: "再次挑戰", featured: false },
] as const;

export const engineeringImages = [
  {
    src: "/images/rocket-internals.jpg",
    alt: "火大的元件團隊製作的火箭內部機構與系統整合細節",
    label: "結構與系統整合",
    description: "讓酬載、航電、回收與結構能在有限空間內可靠運作。",
    contain: false,
  },
  {
    src: "/images/rocket-assembly.jpg",
    alt: "火大的元件團隊成員在比賽現場進行火箭組裝與檢查",
    label: "現場組裝與檢查",
    description: "發射前逐項確認各系統狀態，避免任何小問題變成飛行失敗。",
    contain: false,
  },
  {
    src: "/images/technical-showcase.jpg",
    alt: "火大的元件團隊展示自行開發的航電與酬載系統",
    label: "航電與酬載",
    description: "讓感測、資料紀錄與酬載系統在飛行過程中穩定工作。",
    contain: false,
  },
  {
    src: "/images/telemetry-dashboard.jpg",
    alt: "火大的元件團隊自行開發與使用的火箭遙測系統畫面",
    label: "遙測系統",
    description: "整理火箭姿態、位置與飛行資訊，讓我們知道升空後發生了什麼。",
    contain: true,
  },
] as const;

export const missionGoals = [
  {
    number: "01",
    title: "結構優化",
    description: "在兼顧強度與安全的前提下減少不必要重量，改善整體結構設計。",
  },
  {
    number: "02",
    title: "航電與遙測",
    description: "改善感測、資料紀錄與通訊，取得更完整的飛行資訊。",
  },
  {
    number: "03",
    title: "回收系統",
    description: "提升降落傘部署與回收流程的可靠度，增加火箭安全回收的機會。",
  },
  {
    number: "04",
    title: "測試驗證",
    description: "在正式比賽前增加地面測試與系統整合測試，把問題盡量留在地面解決。",
  },
] as const;

export const fundingIncome = [
  { label: "官方補助", amount: "NT$40,000" },
  { label: "學校補助（系、院）", amount: "NT$46,825" },
  { label: "師長贊助", amount: "NT$24,500" },
  { label: "前期結餘（含利息）", amount: "NT$18,218" },
  { label: "競賽獎金", amount: "NT$15,000" },
] as const;

export const fundingExpenses = [
  { label: "火箭製作（結構、酬載、航電、回收）", amount: "NT$45,024" },
  { label: "住宿", amount: "NT$40,000" },
  { label: "交通", amount: "NT$35,223" },
  { label: "夥食", amount: "NT$11,895" },
  { label: "報名費", amount: "NT$6,000" },
  { label: "雜項", amount: "NT$384" },
] as const;

export const expenseBreakdown = [
  { label: "火箭製作", percentage: 32.5 },
  { label: "住宿", percentage: 28.9 },
  { label: "交通", percentage: 25.4 },
  { label: "其他", percentage: 13.2 },
] as const;

export const fundingBudget2027 = [
  { number: "01", label: "火箭結構、推進與製作材料", amount: "NT$50,000" },
  { number: "02", label: "航電、感測與遙測系統", amount: "NT$35,000" },
  { number: "03", label: "降落傘與回收系統改良", amount: "NT$20,000" },
  { number: "04", label: "地面測試、耗材與製作", amount: "NT$20,000" },
  { number: "05", label: "競賽交通", amount: "NT$35,000" },
  { number: "06", label: "競賽住宿", amount: "NT$30,000" },
  { number: "07", label: "報名及行政支出", amount: "NT$10,000" },
] as const;

export const pageLinks = [
  {
    href: "/competition",
    eyebrow: "Competition",
    title: "認識台灣盃火箭競賽",
    description: "了解學生團隊如何將設計、製造與發射整合成一項完整任務。",
  },
  {
    href: "/about",
    eyebrow: "Team",
    title: "認識火大的元件",
    description: "來自元智大學、從圖面與程式一路做到發射場的學生火箭團隊。",
  },
  {
    href: "/journey-2026",
    eyebrow: "2026 Journey",
    title: "從第一次參賽到學生 3K 組第三名",
    description: "查看發射影片、工程過程與完整的火箭 exploded view。",
  },
  {
    href: "/budget",
    eyebrow: "2026 Budget",
    title: "經費從哪裡來、用在哪裡",
    description: "公開 2026 實際收支與參賽成本的組成。",
  },
  {
    href: "/plan-2027",
    eyebrow: "2027 Mission",
    title: "再飛一次，做得更好",
    description: "從結構、航電到回收與測試，逐項提升系統可靠度。",
  },
  {
    href: officialDonationUrl,
    eyebrow: "Support",
    title: "讓下一枚火箭有更多可能",
    description: "透過元智大學官方募款系統，支持學生團隊繼續驗證與進步。",
  },
] as const;
