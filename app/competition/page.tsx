import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import PageLinks from "@/components/PageLinks";
import { competitionFacts } from "@/data/siteContent";

export const metadata: Metadata = { title: "賽事簡介｜火大的元件" };

export default function CompetitionPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <PageHeader
        eyebrow="About the Competition"
        title="2027 台灣盃火箭競賽"
        description={
          <>
            2027 台灣盃火箭競賽（Rocket Taiwan Cup 2027）是由
            <strong className="font-bold text-white">國家太空中心（TASA）與屏東縣政府共同舉辦</strong>
            的第三屆台灣盃火箭競賽，旨在推廣火箭科技教育、培育太空工程人才，並提供參賽團隊從設計、製作、測試到實際發射的完整科研火箭實作經驗。
          </>
        }
      />
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
      <PageLinks links={[
        { href: "/about", label: "認識參賽團隊", description: "了解火大的元件如何一起把火箭帶到發射場。" },
        { href: "/journey-2026", label: "查看 2026 任務", description: "從參賽成果、發射影片到火箭結構。" },
      ]} />
    </main>
  );
}
