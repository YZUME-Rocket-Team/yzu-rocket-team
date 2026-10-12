import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import PageLinks from "@/components/PageLinks";
import { expenseBreakdown, fundingExpenses, fundingIncome, officialDonationUrl } from "@/data/siteContent";

export const metadata: Metadata = { title: "經費總結｜火大的元件" };

export default function BudgetPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <PageHeader eyebrow="2026 Funding Review" title="一枚火箭，真正需要多少資源？" description="2026 年，我們實際支出 NT$138,526 完成火箭製作與參賽。成本不只有火箭本身，還包含測試、住宿、交通、報名與現場支出。" />
      <section className="bg-slate-950/55 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2">
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
                <h2 className="text-xl font-black text-white">2026 收入</h2><span className="font-mono text-xs tracking-[0.15em] text-slate-500">INCOME</span>
              </div>
              <dl className="mt-3">
                {fundingIncome.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-5 border-b border-white/[0.07] py-4 last:border-0">
                    <dt className="text-sm leading-6 text-slate-300 sm:text-base">{item.label}</dt><dd className="shrink-0 font-mono text-sm font-bold text-white sm:text-base">{item.amount}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex items-baseline justify-between gap-4 rounded-2xl bg-white/[0.05] px-5 py-4"><span className="font-bold text-white">總收入</span><span className="font-mono text-lg font-black text-white">NT$144,543</span></div>
            </article>
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-5">
                <h2 className="text-xl font-black text-white">2026 支出</h2><span className="font-mono text-xs tracking-[0.15em] text-slate-500">EXPENSES</span>
              </div>
              <dl className="mt-3">
                {fundingExpenses.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-5 border-b border-white/[0.07] py-4 last:border-0">
                    <dt className="text-sm leading-6 text-slate-300 sm:text-base">{item.label}</dt><dd className="shrink-0 font-mono text-sm font-bold text-white sm:text-base">{item.amount}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex items-baseline justify-between gap-4 rounded-2xl bg-orange-500/[0.08] px-5 py-4"><span className="font-bold text-white">總支出</span><span className="font-mono text-lg font-black text-orange-200">NT$138,526</span></div>
            </article>
          </div>
          <div className="mt-4 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><h2 className="text-xl font-black text-white">支出比例</h2><p className="text-sm text-slate-500">依 2026 實際總支出計算</p></div>
            <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2" role="img" aria-label="2026 年支出比例長條圖">
              {expenseBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm"><span className="font-medium text-slate-200">{item.label}</span><span className="font-mono font-bold text-orange-300">{item.percentage}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-300" style={{ width: `${item.percentage}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PageLinks title="把資源變成下一次升空" links={[
        { href: "/plan-2027", label: "2027 計畫與預算", description: "查看團隊的改進目標與建議預算。" },
        { href: officialDonationUrl, label: "支持我們", description: "前往元智大學官方募款系統。" },
      ]} />
    </main>
  );
}
