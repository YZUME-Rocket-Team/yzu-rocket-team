import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import PageLinks from "@/components/PageLinks";
import { fundingBudget2027, missionGoals } from "@/data/siteContent";

export const metadata: Metadata = { title: "2027 計畫｜火大的元件" };

export default function Plan2027Page() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <PageHeader eyebrow="2027 Mission" title="2027，再飛一次，做得更好。" description="把 2026 的成果與現場經驗，轉化為 2027 可以逐項驗證的改進。" />
      <section className="bg-slate-950/45 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">從 2026 的成果，走向 2027 的改進。</h2>
            <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              <p>2026 年，我們投入約 13.9 萬元完成火箭製作與參賽，並在台灣盃火箭競賽學生 3K 組獲得第三名。</p>
              <p>這個成果來自團隊投入的時間，也來自學校、師長與各界的支持。</p>
              <p>2027 年，我們希望進一步改善火箭結構、航電、遙測與回收系統，並投入更多資源進行地面測試與系統驗證。</p>
              <p>因此，我們希望募集 NT$200,000，讓下一枚火箭不是單純再做一次，而是真的比上一枚更完整、更可靠。</p>
            </div>
          </div>
          <h2 className="mt-16 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">從結構、航電到回收與測試，逐項提升可靠度。</h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {missionGoals.map((goal) => (
              <li key={goal.number} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <span className="font-mono text-sm font-bold tracking-[0.18em] text-orange-400">{goal.number}</span>
                <h3 className="mt-8 text-2xl font-black text-white">{goal.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{goal.description}</p>
                <span aria-hidden="true" className="absolute -bottom-6 right-4 font-mono text-8xl font-black text-white/[0.025]">{goal.number}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-16">
            <div><p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">Proposed Budget</p><h2 className="mt-5 text-4xl font-black text-white sm:text-5xl">2027 建議預算</h2><p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">以下依下一階段的開發、測試與參賽需求，規劃各項支出用途。</p></div>
            <div className="rounded-[2rem] border border-orange-400/35 bg-orange-500/[0.08] p-7 sm:p-9"><p className="font-mono text-sm font-semibold tracking-[0.16em] text-orange-300 uppercase">2027 募款目標</p><p className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">NT$200,000</p></div>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fundingBudget2027.map((item) => (
              <li key={item.number} className="flex min-h-28 flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-start gap-4"><span className="font-mono text-xs font-bold text-orange-400">{item.number}</span><span className="text-base font-medium leading-6 text-slate-200">{item.label}</span></div>
                <span className="self-end font-mono text-lg font-black text-white">{item.amount}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 rounded-[2rem] border border-orange-400/35 bg-orange-500/[0.08] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="text-lg font-black text-white">2027 建議預算合計</span><span className="font-mono text-3xl font-black tracking-tight text-orange-200 sm:text-4xl">NT$200,000</span></div>
        </div>
      </section>
      <PageLinks />
    </main>
  );
}
