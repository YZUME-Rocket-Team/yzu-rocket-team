import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageLinks from "@/components/PageLinks";
import TeamDivisionSection from "@/components/TeamDivisionSection";
import { officialDonationUrl, teamFacts } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "火大的元件｜元智大學學生火箭團隊",
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100vh-4.5rem)] overflow-hidden">
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28)_0%,transparent_46%,rgba(2,6,23,0.9)_100%)]"
        />
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-24">
        <div className="max-w-4xl">
          <div className="mb-7 flex w-fit items-center gap-3 rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2 font-mono text-xs font-semibold tracking-[0.17em] text-orange-300 uppercase sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_12px_#fb923c]" />
            2027 Taiwan Cup Rocket Competition
          </div>
          <p className="mb-5 text-base font-semibold tracking-[0.08em] text-slate-300 sm:text-lg">
            元智大學機械工程學系 | YZUME
          </p>
          <h1 className="text-balance text-5xl font-black leading-[1.06] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.75rem]">
            火大的元件
            <span className="block whitespace-nowrap bg-gradient-to-r from-white via-orange-300 to-orange-600 bg-clip-text text-[clamp(1.15rem,4.2vw,3rem)] leading-[1.25] text-transparent">
              挑戰 2027 台灣盃火箭競賽
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            我們正在準備挑戰 2027 台灣盃火箭競賽。從設計、製作、測試到真正升空，我們希望把 2026 累積的經驗，變成下一枚更可靠的火箭。
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={officialDonationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_0_36px_rgba(249,115,22,0.32)] transition hover:-translate-y-0.5 hover:bg-orange-400">
              支持我們 <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <Link href="#about" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10">
              認識團隊
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="hidden lg:block" />
      </section>

      <section
        id="about"
        aria-labelledby="about-title"
        className="relative z-10 scroll-mt-20 overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#020617_0%,#07111f_48%,#050b14_100%)] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[32rem] opacity-25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
                About the Team
              </p>
              <h2
                id="about-title"
                className="mt-5 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl"
              >
                我們是誰
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              來自元智大學的學生火箭團隊，從圖面、程式和零件開始，一路做到真正站上發射場。
            </p>
          </div>

          <div className="mt-12 grid items-center gap-12 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
                <p>
                  我們是來自元智大學的學生火箭團隊「火大的元件」，目前約 15 人。團隊成員一起參與火箭的結構、航電、酬載、回收、測試與系統整合。
                </p>
                <p>
                  對我們來說，火箭不是一個展示作品，而是一個會逼著所有系統一起工作的工程專案。每一次設計、失敗、修改和測試，都是下一次升空的基礎。
                </p>
              </div>
              <dl className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                className="object-cover transition duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
                <span className="font-mono text-xs tracking-[0.18em] text-orange-300 uppercase">
                  Team Huoda Components
                </span>
                <span className="mt-2 block text-xl font-bold text-white sm:text-2xl">
                  團隊與火箭｜2026
                </span>
              </figcaption>
            </figure>
          </div>

          <TeamDivisionSection />

        </div>
      </section>

      <PageLinks />
    </main>
  );
}
