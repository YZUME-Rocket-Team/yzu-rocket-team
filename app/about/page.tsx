import type { Metadata } from "next";
import Image from "next/image";

import PageHeader from "@/components/PageHeader";
import PageLinks from "@/components/PageLinks";
import { teamFacts } from "@/data/siteContent";

export const metadata: Metadata = { title: "關於我們｜火大的元件" };

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <PageHeader eyebrow="About the Team" title="我們是誰" description="來自元智大學的學生火箭團隊，從圖面、程式和零件開始，一路做到真正站上發射場。" />
      <section className="bg-slate-950/45 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              我們是來自元智大學的學生火箭團隊「火大的元件」，目前約 15 人。團隊成員一起參與火箭的結構、航電、酬載、回收、測試與系統整合。
              <br /><br />
              對我們來說，火箭不是一個展示作品，而是一個會逼著所有系統一起工作的工程專案。每一次設計、失敗、修改和測試，都是下一次升空的基礎。
            </p>
            <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {teamFacts.map((fact) => (
                <div key={fact.label} className={`rounded-2xl border p-5 ${fact.featured ? "border-orange-400/35 bg-orange-500/[0.08]" : "border-white/10 bg-white/[0.035]"}`}>
                  <dt className="text-sm text-slate-400">{fact.label}</dt>
                  <dd className={`mt-2 font-black text-white ${fact.featured ? "text-lg leading-7" : "text-2xl"}`}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
            <Image src="/images/team-rocket-2026.jpg" alt="火大的元件團隊成員與 2026 年參賽火箭合照" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
              <span className="font-mono text-xs tracking-[0.18em] text-orange-300 uppercase">Team Huoda Components</span>
              <span className="mt-2 block text-xl font-bold text-white sm:text-2xl">團隊與火箭｜2026</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <PageLinks links={[
        { href: "/journey-2026", label: "我們的 2026 經歷", description: "看團隊如何完成第一次比賽與發射。" },
        { href: "/plan-2027", label: "下一步的計畫", description: "了解團隊準備如何改進下一枚火箭。" },
      ]} />
    </main>
  );
}
