import type { Metadata } from "next";
import Image from "next/image";

import PageLinks from "@/components/PageLinks";
import { competitionFacts } from "@/data/siteContent";
import competitionHeroImage from "@/public/images/competition/rtc-2027-hero-bg.png";

export const metadata: Metadata = { title: "賽事簡介｜火大的元件" };

const processIconPaths = {
  "01": "m12 3 9 5v8l-9 5-9-5V8l9-5Zm0 9 9-4M12 12 3 8m9 4v9M7.5 5.5l9 5",
  "02": "m9 3-.7 3-2.6 1.5L3 6.6 1.5 9.2l2 2.1v3l-2 2.1L3 19l2.7-.9 2.6 1.5.7 3h3l.7-3 2.6-1.5 2.7.9 1.5-2.6-2-2.1v-3l2-2.1L18 6.6l-2.7.9L12.7 6 12 3H9Zm5 9.8a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z",
  "03": "M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6",
  "04": "M14 5c3-3 7-2 7-2s1 4-2 7l-8 8-5-5 8-8ZM6 13l-3-1 1-5 7-1m0 12 1 3 5-1 1-7M7 17l-4 4m1-5-2 2m6 2-2 2M15 7l2 2",
} as const;

const eventPhotos = [
  {
    src: "/images/competition/rtc-group-coast-2026.jpg.jpg",
    alt: "參賽團隊與活動人員在旭海海岸發射場齊聚合影",
    title: "齊聚發射場",
    description: "來自全台的參賽團隊齊聚旭海場域，共同迎接火箭升空的挑戰。",
    label: "AT THE LAUNCH SITE",
  },
  {
    src: "/images/competition/rtc-group-indoor-2026.jpg.jpg",
    alt: "參賽學生與活動人員在室內場地交流合影",
    title: "交流與傳承",
    description: "透過競賽、技術交流與經驗分享，培養更多投入航太工程領域的學生。",
    label: "CONNECT & INSPIRE",
  },
] as const;

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 id={id} className="text-balance text-2xl leading-snug font-black tracking-tight text-white sm:text-[1.75rem] lg:text-4xl">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-orange-400/80 shadow-[0_0_12px_rgba(249,115,22,0.25)] sm:w-10" />
    </div>
  );
}

export default function CompetitionPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <section
        aria-labelledby="competition-title"
        className="relative px-5 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10 lg:px-12 lg:pt-10 lg:pb-12"
      >
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-sky-300/25 bg-[#061120] shadow-[0_0_0_1px_rgba(56,189,248,0.04),0_24px_70px_rgba(2,8,23,0.35)]">
          <div className="relative aspect-[1.65] overflow-hidden sm:aspect-[2.7] md:aspect-[2.9]">
            <Image
              src={competitionHeroImage}
              alt=""
              fill
              preload
              sizes="(min-width: 1376px) 1280px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="object-cover object-[62%_center] sm:object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,24,0.58)_0%,rgba(3,10,24,0.12)_55%,transparent_85%)] sm:bg-[linear-gradient(90deg,rgba(3,10,24,0.2),transparent_70%)]"
            />
            <div aria-hidden="true" className="media-grid absolute inset-0 hidden opacity-[0.08] md:block" />

            <div className="absolute inset-0 z-10 flex items-start p-6 sm:p-8 lg:p-12">
              <div className="text-left text-white drop-shadow-[0_3px_18px_rgba(2,6,23,0.72)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="relative block h-6 w-6 shrink-0 overflow-hidden rounded-full shadow-[0_0_18px_rgba(96,165,250,0.6)] lg:h-9 lg:w-9"
                  >
                    <Image
                      src="/images/competition/rtc-2027-original.jpg"
                      alt=""
                      width={1200}
                      height={450}
                      unoptimized
                      className="absolute -left-[75px] -top-[35px] h-[360px] w-[960px] max-w-none lg:-left-[113px] lg:-top-[53px] lg:h-[540px] lg:w-[1440px]"
                    />
                  </span>
                  <p className="font-mono text-sm font-bold tracking-[0.16em] text-white sm:text-base lg:text-xl">
                    RTC 2027
                  </p>
                </div>
                <h1
                  id="competition-title"
                  className="mt-4 text-[clamp(1.5rem,5.4vw,4.5rem)] leading-[1.15] font-black tracking-tight text-white [text-shadow:0_0_18px_rgba(96,165,250,0.4),0_3px_3px_rgba(2,6,23,0.5)] lg:mt-6"
                >
                  台灣盃火箭競賽
                </h1>
                <p className="mt-2 font-mono text-[clamp(0.65rem,2.35vw,2rem)] leading-snug font-bold tracking-[0.12em] text-white [text-shadow:0_0_16px_rgba(96,165,250,0.4)] sm:mt-3">
                  ROCKET TAIWAN CUP
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_100%_100%,rgba(249,115,22,0.07),transparent_22rem),linear-gradient(180deg,#050f1e,#050c18)] px-6 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-20 w-20 rounded-tr-3xl border-r border-t border-orange-400/25"
            />
            <div
              aria-hidden="true"
              className="absolute right-0 bottom-0 h-16 w-24 rounded-bl-3xl border-b border-l border-orange-400/20"
            />
            <div className="relative">
              <div className="flex items-center gap-4">
                <p className="font-mono text-[0.65rem] font-bold tracking-[0.18em] text-orange-400 uppercase sm:text-xs sm:tracking-[0.22em] lg:text-sm">
                  ABOUT THE COMPETITION
                </p>
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-orange-400/80" />
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                2027 台灣盃火箭競賽（Rocket Taiwan Cup 2027）是由
                <strong className="font-bold text-white">國家太空中心（TASA）與屏東縣政府共同舉辦</strong>
                的第三屆台灣盃火箭競賽，旨在推廣火箭科技教育、培育太空工程人才，並提供參賽團隊從設計、製作、測試到實際發射的完整科研火箭實作經驗。
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-9 sm:space-y-10 lg:space-y-14">
          <section aria-labelledby="engineering-title">
            <SectionHeading id="engineering-title">競賽組別與完整工程挑戰</SectionHeading>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              <p>
                競賽分為
                <strong className="font-bold text-white">學生 1K 組、學生 3K 組及社會 3K 組</strong>
                。其中學生 3K 組主要開放給國內外大學以上在學生參加，每隊人數上限為 15 人。
              </p>
              <p>
                這不只是一次發射，而是從圖面走向飛行的完整工程挑戰。團隊需歷經培訓、設計與文件審查、系統測試及發射前安全審查，逐步整合
                <strong className="font-semibold text-slate-100">結構、航電、推進、回收與通訊</strong>
                ，讓每個環節都能在真實任務中接受驗證。
              </p>
            </div>
            <ol className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-4 lg:gap-4">
              {competitionFacts.map((fact) => (
                <li key={fact.number} className="relative rounded-[1.25rem] border border-white/10 bg-[linear-gradient(145deg,rgba(20,34,49,0.65),rgba(8,18,29,0.85))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_8px_24px_rgba(0,0,0,0.12)] lg:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-orange-400">
                      <path d={processIconPaths[fact.number]} />
                    </svg>
                    <span aria-hidden="true" className="font-mono text-[0.65rem] tracking-[0.14em] text-slate-500">{fact.number}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white sm:text-lg lg:text-xl">{fact.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{fact.description}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-l-2 border-orange-400/40 pl-4 text-sm leading-7 text-slate-400">
              火大的元件將以元智大學機械工程學系學生團隊的身分，挑戰
              <strong className="font-semibold text-slate-200">2027 學生 3K 組</strong>
              ，延續參賽經驗，持續改良結構、航電、遙測、回收與系統整合能力。
            </p>
          </section>

          <section aria-labelledby="launch-title" className="relative isolate overflow-hidden rounded-3xl border border-sky-300/25 bg-[#071421] shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
            <div className="relative z-10 p-6 sm:p-8 md:flex md:min-h-[22rem] md:w-[49%] md:flex-col md:items-start lg:min-h-[30rem] lg:p-12">
              <p className="flex items-center gap-3 font-mono text-[0.65rem] font-bold tracking-[0.15em] text-orange-400 sm:text-xs lg:tracking-[0.2em]">
                FROM DESIGN TO LAUNCH
                <span aria-hidden="true" className="h-px w-7 shrink-0 bg-orange-400/70" />
              </p>
              <h2 id="launch-title" className="mt-4 text-balance text-3xl leading-tight font-black tracking-tight text-white sm:text-[2.1rem] lg:text-5xl">
                從設計到真實升空
              </h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:mt-6 lg:text-lg lg:leading-9">
                <p>火箭競賽不只是理論驗證，更是從設計、製作、測試，到實際升空的完整工程挑戰。</p>
                <p>每一次發射，都是團隊知識、技術與努力的實際展現。</p>
              </div>
              <div className="mt-6 rounded-lg border border-sky-200/15 bg-[#041020]/65 px-3 py-2 md:mt-8 lg:mt-10">
                <p className="font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-slate-200 sm:text-[0.65rem]">RTC 2026 · LAUNCH</p>
                <p className="mt-1 text-xs text-slate-300">火大的元件｜火箭發射紀錄</p>
              </div>
            </div>
            <div className="relative aspect-[3/2] md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[72%]">
              <Image
                src="/images/competition/rtc-launch-yzume-2026.jpg.jpg"
                alt="火大的元件火箭在海岸發射場升空，尾端留下筆直煙柱"
                fill
                sizes="(min-width: 1376px) 920px, (min-width: 768px) 72vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="object-cover object-[43%_center]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#071421,transparent_20%)] md:bg-[linear-gradient(90deg,#071421_0%,rgba(7,20,33,0.88)_10%,rgba(7,20,33,0.4)_30%,transparent_55%)]" />
            </div>
          </section>

          <section aria-labelledby="community-title">
            <SectionHeading id="community-title">競賽現場與團隊交流</SectionHeading>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              台灣盃火箭競賽匯集各地學生與參賽團隊。除了發射任務，更透過技術觀摩、經驗分享與團隊交流，讓航太工程的知識與熱情持續傳承。
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:gap-6">
              {eventPhotos.map((photo) => (
                <article key={photo.src} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0a1623]/70 shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1376px) 626px, (min-width: 768px) calc((100vw - 88px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                      className="object-cover object-center"
                    />
                    <p className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-[#041020]/70 px-3 py-2 font-mono text-[0.6rem] tracking-[0.12em] text-white backdrop-blur-sm sm:text-[0.65rem]">
                      {photo.label}
                    </p>
                  </div>
                  <div className="p-5 lg:p-6">
                    <h3 className="text-xl font-bold text-white lg:text-2xl">{photo.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{photo.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="tasa-title" className="relative isolate overflow-hidden rounded-3xl border border-sky-200/20 bg-[#041020] shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
            <Image
              src="/images/competition/tasa-earth-bg.jpg.png"
              alt=""
              fill
              sizes="(min-width: 1376px) 1280px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="object-cover object-[75%_center] md:object-center"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,12,24,0.96)_0%,rgba(3,12,24,0.85)_48%,rgba(3,12,24,0.12)_100%)] md:bg-[linear-gradient(90deg,rgba(3,12,24,0.96)_0%,rgba(3,12,24,0.85)_36%,rgba(3,12,24,0.25)_72%,rgba(3,12,24,0.08)_100%)]" />
            <div className="relative z-10 px-6 pt-6 pb-40 sm:px-8 sm:pt-8 md:py-8 lg:p-10">
              <p className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.18em] text-orange-400">
                ABOUT TASA
                <span aria-hidden="true" className="h-px w-7 bg-orange-400/70" />
              </p>
              <h2 id="tasa-title" className="mt-4 text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">國家太空中心</h2>
              <p className="mt-2 font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-slate-200 sm:text-xs">TAIWAN SPACE AGENCY</p>
              <p className="mt-4 text-sm leading-7 text-slate-200 md:max-w-[75%] lg:max-w-[68%] lg:text-base lg:leading-8">
                國家太空中心（TASA）致力於推動台灣太空科技發展，涵蓋衛星研發、太空任務及相關人才培育。透過台灣盃火箭競賽等活動，讓更多學生有機會將工程知識應用於真實的航太挑戰。
              </p>
              <a
                href="https://www.tasa.org.tw/zh-TW"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="探索 TASA 官方網站（開啟新分頁）"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-orange-400 underline-offset-4 transition-colors hover:text-orange-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300 motion-reduce:transition-none"
              >
                探索 TASA 官方網站 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </div>
      </div>
      <PageLinks compact />
    </main>
  );
}
