import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { officialDonationUrl, pageLinks } from "@/data/siteContent";

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
            <Link href="/about" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10">
              認識團隊
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="hidden lg:block" />
      </section>

      <section className="relative z-10 border-t border-white/10 bg-slate-950/80 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">Mission Portal</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl">從 2026 的升空，走向 2027。</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              這裡是網站的任務入口。你可以分別了解競賽、團隊、2026 年的發射與火箭結構，以及我們為 2027 規劃的改進與經費用途。
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pageLinks.map((item) => (
              <Link key={item.href} href={item.href} target={item.href === officialDonationUrl ? "_blank" : undefined} rel={item.href === officialDonationUrl ? "noopener noreferrer" : undefined} className="group flex min-h-64 flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-orange-400/35 hover:bg-orange-500/[0.07] sm:p-8">
                <div>
                  <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange-400 uppercase">{item.eyebrow}</p>
                  <h3 className="mt-5 text-2xl font-black leading-9 text-white transition group-hover:text-orange-200">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
                </div>
                <span className="mt-8 font-mono text-xs font-bold tracking-[0.14em] text-orange-400 uppercase">開啟傳送門 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
