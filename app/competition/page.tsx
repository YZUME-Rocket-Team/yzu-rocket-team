import type { Metadata } from "next";
import Image from "next/image";

import PageLinks from "@/components/PageLinks";
import { competitionFacts } from "@/data/siteContent";
import competitionHeroImage from "@/public/images/competition/rtc-2027-hero-bg.png";

export const metadata: Metadata = { title: "賽事簡介｜火大的元件" };

export default function CompetitionPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <section
        aria-labelledby="competition-title"
        className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      >
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.75rem] border border-sky-400/35 bg-[#061120] shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_28px_80px_rgba(2,8,23,0.48)] sm:rounded-[2rem]">
          <div className="relative flex flex-col overflow-hidden md:block md:min-h-[32rem] lg:min-h-[34rem]">
            <Image
              src={competitionHeroImage}
              alt=""
              preload
              sizes="(max-width: 767px) calc(100vw - 72px), (min-width: 1536px) 1536px, 100vw"
              className="order-2 mx-4 mb-8 h-auto w-[calc(100%_-_2rem)] rounded-lg border border-white/10 object-contain shadow-[0_16px_36px_rgba(2,6,23,0.32)] md:absolute md:inset-0 md:m-0 md:h-full md:w-full md:rounded-none md:border-0 md:object-cover md:object-[68%_center] md:shadow-none lg:object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(3,10,24,0.34)_0%,rgba(3,10,24,0.06)_50%,transparent_75%)] md:block"
            />
            <div aria-hidden="true" className="media-grid absolute inset-0 hidden opacity-[0.08] md:block" />

            <div className="relative z-10 order-1 mx-auto flex w-full max-w-7xl items-start px-5 pt-9 pb-7 md:absolute md:inset-x-0 md:top-0 md:min-h-[32rem] md:px-10 md:py-12 lg:min-h-[34rem] lg:px-16 lg:py-14">
              <div className="max-w-4xl text-white drop-shadow-[0_3px_18px_rgba(2,6,23,0.72)]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    aria-hidden="true"
                    className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-[0_0_18px_rgba(96,165,250,0.6)] sm:h-9 sm:w-9"
                  >
                    <Image
                      src="/images/competition/rtc-2027-original.jpg"
                      alt=""
                      width={1200}
                      height={450}
                      unoptimized
                      className="absolute -left-[113px] -top-[53px] h-[540px] w-[1440px] max-w-none"
                    />
                  </span>
                  <p className="font-mono text-lg font-black tracking-[0.12em] text-white sm:text-xl md:text-2xl lg:text-3xl">
                    RTC 2027
                  </p>
                </div>
                <h1
                  id="competition-title"
                  className="mt-5 text-[2rem] leading-[1.08] font-black tracking-[0.02em] text-white [text-shadow:0_0_18px_rgba(96,165,250,0.7),0_3px_3px_rgba(2,6,23,0.5)] sm:text-[2.25rem] md:mt-7 md:text-6xl lg:text-[5.25rem] xl:text-8xl"
                >
                  台灣盃火箭競賽
                </h1>
                <p className="mt-3 font-mono text-sm leading-tight font-black tracking-[0.12em] text-white [text-shadow:0_0_16px_rgba(96,165,250,0.62)] sm:text-base md:text-3xl lg:text-[2.65rem] xl:text-5xl">
                  ROCKET TAIWAN CUP
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(30,64,175,0.13),transparent_38rem),linear-gradient(180deg,rgba(5,15,30,0.98),#050c18)] px-5 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-24 w-20 rounded-tr-[2rem] border-r border-t border-orange-400/60 shadow-[8px_-8px_24px_rgba(249,115,22,0.12)] sm:w-28"
            />
            <div
              aria-hidden="true"
              className="absolute right-0 bottom-0 h-20 w-28 rounded-bl-[2rem] border-b border-l border-orange-400/50 shadow-[-8px_8px_24px_rgba(249,115,22,0.1)] sm:w-40"
            />
            <div className="relative mx-auto max-w-7xl lg:px-16">
              <div className="flex items-center gap-4">
                <p className="font-mono text-xs font-bold tracking-[0.2em] text-orange-400 uppercase max-[359px]:text-[0.65rem] max-[359px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.24em]">
                  ABOUT THE COMPETITION
                </p>
                <span aria-hidden="true" className="h-px w-10 bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.65)]" />
              </div>
              <p className="mt-7 max-w-5xl text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
                2027 台灣盃火箭競賽（Rocket Taiwan Cup 2027）是由
                <strong className="font-bold text-white">國家太空中心（TASA）與屏東縣政府共同舉辦</strong>
                的第三屆台灣盃火箭競賽，旨在推廣火箭科技教育、培育太空工程人才，並提供參賽團隊從設計、製作、測試到實際發射的完整科研火箭實作經驗。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-5xl">競賽組別與完整工程挑戰</h2>
            <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              <p>
                競賽分為
                <strong className="font-bold text-white">學生 1K 組、學生 3K 組及社會 3K 組</strong>
                。其中學生 3K 組主要開放給國內外大學以上在學生參加，每隊人數上限為 15 人。
              </p>
              <p>
                台灣盃火箭競賽不只是最終的火箭發射，而是一段長時間的工程挑戰。參賽團隊需歷經專業培訓、多階段設計與文件審查、系統測試及發射前安全審查，最終才能進入實際飛行測試階段。競賽希望透過這樣的過程，培養學生在
                <strong className="font-bold text-white">機械結構、航電系統、推進、回收、通訊與系統整合</strong>
                等跨領域工程能力。
              </p>
              <p>
                「<strong className="font-bold text-white">火大的元件</strong>」將以
                <strong className="font-bold text-white">元智大學機械工程學系</strong>
                學生團隊的身分，挑戰
                <strong className="font-bold text-white">2027 台灣盃火箭競賽學生 3K 組</strong>
                ，延續過去參賽經驗，持續改良火箭結構、航電、遙測、回收與整體系統整合能力。
              </p>
            </div>
          </div>
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {competitionFacts.map((fact) => (
              <li key={fact.number} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <span className="font-mono text-sm font-bold tracking-[0.18em] text-orange-400">{fact.number}</span>
                <h3 className="mt-8 text-2xl font-black text-white">{fact.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{fact.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <PageLinks />
    </main>
  );
}
