import Image from "next/image";

import Navbar from "@/components/Navbar";
import RocketStructureSection from "@/components/RocketStructureSection";

const competitionFacts = [
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
];

const teamFacts = [
  { value: "約 15 人", label: "團隊成員" },
  { value: "學生 3K 組第三名", label: "2026 台灣盃火箭競賽", featured: true },
  { value: "2027", label: "再次挑戰" },
];

const engineeringImages = [
  {
    src: "/images/rocket-internals.jpg",
    alt: "火大的元件團隊製作的火箭內部機構與系統整合細節",
    label: "結構與系統整合",
    description: "讓酬載、航電、回收與結構能在有限空間內可靠運作。",
  },
  {
    src: "/images/rocket-assembly.jpg",
    alt: "火大的元件團隊成員在比賽現場進行火箭組裝與檢查",
    label: "現場組裝與檢查",
    description: "發射前逐項確認各系統狀態，避免任何小問題變成飛行失敗。",
  },
  {
    src: "/images/technical-showcase.jpg",
    alt: "火大的元件團隊展示自行開發的航電與酬載系統",
    label: "航電與酬載",
    description: "讓感測、資料紀錄與酬載系統在飛行過程中穩定工作。",
  },
  {
    src: "/images/telemetry-dashboard.jpg",
    alt: "火大的元件團隊自行開發與使用的火箭遙測系統畫面",
    label: "遙測系統",
    description: "整理火箭姿態、位置與飛行資訊，讓我們知道升空後發生了什麼。",
    contain: true,
  },
];

const missionGoals = [
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
];

const fundingIncome = [
  { label: "官方補助", amount: "NT$40,000" },
  { label: "學校補助（系、院）", amount: "NT$46,825" },
  { label: "師長贊助", amount: "NT$24,500" },
  { label: "前期結餘（含利息）", amount: "NT$18,218" },
  { label: "競賽獎金", amount: "NT$15,000" },
];

const fundingExpenses = [
  { label: "火箭製作（結構、酬載、航電、回收）", amount: "NT$45,024" },
  { label: "住宿", amount: "NT$40,000" },
  { label: "交通", amount: "NT$35,223" },
  { label: "伙食", amount: "NT$11,895" },
  { label: "報名費", amount: "NT$6,000" },
  { label: "雜項", amount: "NT$384" },
];

const expenseBreakdown = [
  { label: "火箭製作", percentage: 32.5 },
  { label: "住宿", percentage: 28.9 },
  { label: "交通", percentage: 25.4 },
  { label: "其他", percentage: 13.2 },
];

const fundingBudget2027 = [
  { number: "01", label: "火箭結構、推進與製作材料", amount: "NT$50,000" },
  { number: "02", label: "航電、感測與遙測系統", amount: "NT$35,000" },
  { number: "03", label: "降落傘與回收系統改良", amount: "NT$20,000" },
  { number: "04", label: "地面測試、耗材與製作", amount: "NT$20,000" },
  { number: "05", label: "競賽交通", amount: "NT$35,000" },
  { number: "06", label: "競賽住宿", amount: "NT$30,000" },
  { number: "07", label: "報名及行政支出", amount: "NT$10,000" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden">
        <Image
          src="/images/hero-launch.jpg"
          alt="2026 台灣盃火箭競賽中，火大的元件火箭升空的瞬間"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(5,11,20,0.91)_38%,rgba(5,11,20,0.42)_68%,rgba(5,11,20,0.18)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28)_0%,transparent_46%,rgba(2,6,23,0.88)_100%)]"
        />
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60" />
      </div>

      <Navbar />

      <section
        id="home"
        className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl scroll-mt-24 items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[calc(100vh-74px)] lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-24"
      >
        <div className="max-w-4xl">
          <div
            className="mb-7 flex w-fit items-center gap-3 rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2 font-mono text-xs font-semibold tracking-[0.17em] text-orange-300 uppercase sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_12px_#fb923c]" />
            2027 Taiwan Cup Rocket Competition
          </div>

          <p className="mb-5 text-base font-semibold tracking-[0.08em] text-slate-300 sm:text-lg">
            火大的元件｜元智大學學生火箭團隊
          </p>
          <h1 className="text-balance text-5xl font-black leading-[1.06] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.75rem]">
            下一枚火箭，
            <span className="text-gradient block">從元智升空。</span>
          </h1>
          <p
            className="mt-8 max-w-2xl scroll-mt-32 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9"
          >
            我們正在準備挑戰 2027 台灣盃火箭競賽。從設計、製作、測試到真正升空，我們希望把 2026 累積的經驗，變成下一枚更可靠的火箭。
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#support"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_0_36px_rgba(249,115,22,0.32)] transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              支持我們
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </a>
            <a
              href="#about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
            >
              認識團隊
            </a>
          </div>
        </div>

          <div aria-hidden="true" className="hidden lg:block" />
      </section>

      <section
        id="competition"
        className="relative z-10 scroll-mt-24 border-t border-white/10 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                About the Competition
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                台灣盃火箭競賽是什麼？
              </h2>
            </div>
            <div className="space-y-5 self-end text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              <p>
                台灣盃火箭競賽是一項以學生實作為核心的火箭競賽。參賽團隊需要從設計、製造、航電、酬載、回收、地面測試到實際發射，完成一整套火箭系統。
              </p>
              <p>
                這不只是比飛得高不高，而是考驗整個團隊能不能把不同工程系統整合在一起，並在真正的發射環境中穩定運作。
              </p>
              <p>
                對學生來說，這是一個把課堂上的力學、電子、控制、程式設計與製造技術，真正放到現場驗證的機會。
              </p>
            </div>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {competitionFacts.map((fact) => (
              <li
                key={fact.number}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8"
              >
                <span className="font-mono text-sm font-bold tracking-[0.18em] text-orange-400">
                  {fact.number}
                </span>
                <h3 className="mt-8 text-2xl font-black text-white">{fact.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{fact.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RocketStructureSection />

      <section
        id="about"
        className="relative z-10 scroll-mt-24 border-t border-white/10 bg-slate-950/55 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
              About the team
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              我們是誰
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              我們是來自元智大學的學生火箭團隊「火大的元件」，目前約 15 人。團隊成員一起參與火箭的結構、航電、酬載、回收、測試與系統整合，從圖面、程式和零件開始，一路做到真正站上發射場。
              <br />
              <br />
              對我們來說，火箭不是一個展示作品，而是一個會逼著所有系統一起工作的工程專案。每一次設計、失敗、修改和測試，都是下一次升空的基礎。
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {teamFacts.map((fact) => (
                <div
                  key={fact.label}
                  className={`rounded-2xl border p-5 ${
                    fact.featured
                      ? "border-orange-400/35 bg-orange-500/[0.08]"
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <dt className="text-sm text-slate-400">{fact.label}</dt>
                  <dd
                    className={`mt-2 font-black text-white ${
                      fact.featured ? "text-lg leading-7" : "text-2xl"
                    }`}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
            <Image
              src="/images/team-rocket-2026.jpg"
              alt="火大的元件團隊成員與 2026 年參賽火箭合照"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
              <span className="font-mono text-xs tracking-[0.18em] text-orange-300 uppercase">
                Team Huoda Components
              </span>
              <span className="mt-2 block text-xl font-bold text-white sm:text-2xl">團隊與火箭｜2026</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="history-2026"
        className="relative z-10 scroll-mt-24 border-t border-white/10 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                2026 Mission Log
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                我們已經踏出第一步
              </h2>
              <p className="mt-5 text-lg font-bold text-orange-300 sm:text-xl">
                2026 台灣盃火箭競賽
              </p>
            </div>
            <p className="self-end text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              2026 年，我們第一次完整走過一枚學生火箭從設計、製作、測試到實際發射的流程。
              <br />
              <br />
              過程並不完美，但我們真的把火箭帶到了發射場，也在台灣盃火箭競賽學生 3K 組拿下第三名。更重要的是，我們第一次真正知道：哪些設計在紙上看起來沒問題，到了現場卻會成為問題。
              <br />
              <br />
              這些經驗，就是我們準備 2027 的起點。
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
              <Image
                src="/images/competition-team.jpg"
                alt="火大的元件團隊參加 2026 台灣盃火箭競賽的團隊合照"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24 sm:px-8 sm:pb-8">
                <span className="font-mono text-xs tracking-[0.18em] text-orange-300 uppercase">Competition Team</span>
                <span className="mt-2 block text-xl font-bold text-white sm:text-2xl">2026 台灣盃火箭競賽團隊</span>
              </figcaption>
            </figure>

            <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-orange-400/35 bg-slate-900 shadow-[0_0_40px_rgba(249,115,22,0.1)] lg:col-span-5 lg:aspect-auto lg:min-h-[34rem]">
              <Image
                src="/images/award-third-place.jpg"
                alt="火大的元件團隊獲得 2026 台灣盃火箭競賽學生 3K 組第三名的頒獎合照"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex rounded-full border border-orange-300/40 bg-orange-500/20 px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-orange-200 backdrop-blur-md">
                  2026 RESULT
                </span>
                <span className="mt-4 block text-2xl font-black text-white sm:text-3xl">學生 3K 組 第三名</span>
                <span className="mt-2 block text-sm text-slate-300">2026 台灣盃火箭競賽</span>
                <span className="mt-3 block max-w-md text-sm leading-6 text-slate-300">
                  第一次參賽，我們完成了火箭設計、製作、測試與實際發射，並獲得學生 3K 組第三名。
                </span>
              </figcaption>
            </figure>
          </div>

        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 bg-slate-950/55 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
              Engineering Process
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              從設計到升空
            </h2>
            <p className="mt-7 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              一枚火箭能不能飛，不只取決於單一零件，而是每一個系統能不能在同一時間正常工作。從結構、航電、酬載、回收到組裝與遙測，我們需要反覆設計、測試、修正，再重新驗證。
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {engineeringImages.map((image) => (
              <figure
                key={image.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`${
                    image.contain ? "object-contain p-4 sm:p-7" : "object-cover"
                  } transition duration-700 group-hover:scale-[1.02]`}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
                  <span className="font-mono text-xs tracking-[0.18em] text-orange-300 uppercase">Built by the team</span>
                  <span className="mt-2 block text-xl font-bold text-white sm:text-2xl">{image.label}</span>
                  <span className="mt-2 block max-w-xl text-sm leading-6 text-slate-300">{image.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                Flight Record
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                真正升空的那一刻
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              2026 台灣盃火箭競賽實際發射紀錄。
              <br />
              對我們來說，這 20 多秒，是前面幾個月設計、製作與測試的結果。
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-orange-400/25 bg-slate-950 shadow-[0_0_48px_rgba(249,115,22,0.08)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs tracking-[0.16em] text-slate-400 sm:px-6">
              <span>FLIGHT VIDEO / 2026</span>
              <span className="text-orange-300">TAIWAN CUP</span>
            </div>
            <video
              controls
              playsInline
              preload="metadata"
              aria-label="2026 台灣盃火箭競賽實際發射影片"
              className="aspect-video w-full bg-black object-contain"
            >
              <source src="/videos/rocket-launch-2026.mp4" type="video/mp4" />
              您的瀏覽器不支援 HTML5 影片播放。
            </video>
          </div>
        </div>
      </section>

      <section
        id="budget"
        className="relative z-10 scroll-mt-24 border-t border-white/10 bg-slate-950/80 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                2026 Funding Review
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                一枚火箭，真正需要多少資源？
              </h2>
            </div>
            <div className="space-y-5 self-end text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              <p>
                2026 年，我們實際支出 NT$138,526 完成火箭製作與參賽。其中官方補助為 NT$40,000，約占實際總支出的 28.9%。其餘經費來自學校、師長、前期結餘與競賽獎金等多方支持。
              </p>
              <p>
                真正參加一次火箭競賽，成本不只有火箭本身。材料、電子設備、測試、住宿、交通、報名與現場支出，每一項都會直接影響團隊能不能把設計真正帶到發射場。
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-orange-400/35 bg-orange-500/[0.08] p-7 sm:p-9">
              <p className="text-sm font-medium text-orange-200">2026 實際總支出</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">NT$138,526</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
              <p className="text-sm font-medium text-slate-400">官方補助</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">NT$40,000</p>
              <p className="mt-4 text-sm leading-6 text-orange-300">約占 2026 實際支出的 28.9%</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-5">
                <h3 className="text-xl font-black text-white">2026 收入</h3>
                <span className="font-mono text-xs tracking-[0.15em] text-slate-500">INCOME</span>
              </div>
              <dl className="mt-3">
                {fundingIncome.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-5 border-b border-white/[0.07] py-4 last:border-0">
                    <dt className="text-sm leading-6 text-slate-300 sm:text-base">{item.label}</dt>
                    <dd className="shrink-0 font-mono text-sm font-bold text-white sm:text-base">{item.amount}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex items-baseline justify-between gap-4 rounded-2xl bg-white/[0.05] px-5 py-4">
                <span className="font-bold text-white">總收入</span>
                <span className="font-mono text-lg font-black text-white">NT$144,543</span>
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-5">
                <h3 className="text-xl font-black text-white">2026 支出</h3>
                <span className="font-mono text-xs tracking-[0.15em] text-slate-500">EXPENSES</span>
              </div>
              <dl className="mt-3">
                {fundingExpenses.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-5 border-b border-white/[0.07] py-4 last:border-0">
                    <dt className="text-sm leading-6 text-slate-300 sm:text-base">{item.label}</dt>
                    <dd className="shrink-0 font-mono text-sm font-bold text-white sm:text-base">{item.amount}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex items-baseline justify-between gap-4 rounded-2xl bg-orange-500/[0.08] px-5 py-4">
                <span className="font-bold text-white">總支出</span>
                <span className="font-mono text-lg font-black text-orange-200">NT$138,526</span>
              </div>
            </article>
          </div>

          <div className="mt-4 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-xl font-black text-white">支出比例</h3>
              <p className="text-sm text-slate-500">依 2026 實際總支出計算</p>
            </div>
            <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2" role="img" aria-label="2026 年支出比例長條圖">
              {expenseBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-200">{item.label}</span>
                    <span className="font-mono font-bold text-orange-300">{item.percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="plan-2027"
        className="relative z-10 scroll-mt-24 border-t border-white/10 bg-slate-950/55 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                2027 Mission
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                2027，再飛一次，做得更好。
              </h2>
            </div>
            <p className="self-end text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              2026 讓我們第一次知道，一枚火箭真正飛起來之後，哪些地方還能做得更好。
              <br />
              <br />
              2027 年，我們希望不只是重新做一枚火箭，而是把上一年的問題真正解決。從結構、航電、遙測、回收到測試流程，我們會逐項改善，提升整體系統的可靠度，再次挑戰台灣盃火箭競賽。
            </p>
          </div>

          <ol className="mt-14 grid gap-4 sm:grid-cols-2">
            {missionGoals.map((goal) => (
              <li
                key={goal.number}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8"
              >
                <span className="font-mono text-sm font-bold tracking-[0.18em] text-orange-400">
                  {goal.number}
                </span>
                <h3 className="mt-8 text-2xl font-black text-white">{goal.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{goal.description}</p>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-6 right-4 font-mono text-8xl font-black text-white/[0.025]"
                >
                  {goal.number}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="support"
        className="relative z-10 scroll-mt-24 border-t border-orange-400/20 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 mx-auto h-96 max-w-5xl bg-orange-500/[0.06] blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                Support the Mission
              </p>
              <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                讓下一枚火箭，有更多可能。
              </h2>
              <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
                <p>
                  2026 年，我們投入約 13.9 萬元完成火箭製作與參賽，並在台灣盃火箭競賽學生 3K 組獲得第三名。
                </p>
                <p>
                  這個成果來自團隊投入的時間，也來自學校、師長與各界的支持。
                </p>
                <p>
                  2027 年，我們希望進一步改善火箭結構、航電、遙測與回收系統，並投入更多資源進行地面測試與系統驗證。
                </p>
                <p>
                  因此，我們希望募集 NT$200,000，讓下一枚火箭不是單純再做一次，而是真的比上一枚更完整、更可靠。
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-orange-400/35 bg-orange-500/[0.08] p-7 shadow-[0_0_48px_rgba(249,115,22,0.1)] sm:p-9">
              <p className="font-mono text-sm font-semibold tracking-[0.16em] text-orange-300 uppercase">
                2027 募款目標
              </p>
              <p className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                NT$200,000
              </p>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-xl font-black text-white">2027 建議預算</h3>
              <p className="text-sm text-slate-500">依下一階段開發與參賽需求規劃</p>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fundingBudget2027.map((item) => (
                <li
                  key={item.number}
                  className="flex min-h-28 flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-orange-400">{item.number}</span>
                    <span className="text-base font-medium leading-6 text-slate-200">{item.label}</span>
                  </div>
                  <span className="self-end font-mono text-lg font-black text-white">{item.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 rounded-[2rem] border border-orange-400/35 bg-orange-500/[0.08] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span className="text-lg font-black text-white">2027 建議預算合計</span>
              <span className="font-mono text-3xl font-black tracking-tight text-orange-200 sm:text-4xl">NT$200,000</span>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-10 text-center">
            <p className="mx-auto mb-8 max-w-3xl text-xl font-bold leading-9 text-white sm:text-2xl">
              讓下一次升空，從這裡開始。
            </p>
            <p className="mx-auto -mt-3 mb-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              您的支持，不只會變成一項材料、一組感測器或一次測試。它會讓一群學生有機會把課堂裡學到的知識，真正做成一套能接受實際飛行驗證的系統。
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-base font-semibold leading-8 text-orange-200">
              您支持的不只是一支火箭，而是一群學生把設計真正帶上天空、再從結果中繼續進步的機會。
            </p>
            <a
              href="https://donation.yzu.edu.tw/eform_add.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-lg font-black text-white shadow-[0_0_40px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              支持火大的元件
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </a>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400">
              所有捐款將透過元智大學官方募款系統進行，本網站不直接處理付款資訊。
            </p>

            <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 text-left sm:p-8">
              <h3 className="text-xl font-black text-white">您的支持，會留下什麼？</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                除了火箭本身，我們也希望把每一份支持轉化成可以被看見的成果。
              </p>
              <p className="mt-4 text-base leading-8 text-slate-300">
                在符合元智大學相關規範的前提下，我們預計透過成果報告、網站致謝、團隊海報與成果發表等方式，向支持我們的個人與企業分享計畫進度與成果。
              </p>
              <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-slate-500">
                實際回饋方式、企業名稱與 Logo 使用，將依元智大學相關規範及校方核准內容辦理。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
