import type { Metadata } from "next";
import Image from "next/image";

import PageLinks from "@/components/PageLinks";
import TeamDivisionSection from "@/components/TeamDivisionSection";
import HomeAboutSection from "@/components/HomeAboutSection";

export const metadata: Metadata = {
  title: "火大的元件｜元智大學學生火箭團隊",
};

export default function Home() {
  return (
    <main className="home-page relative min-h-screen overflow-x-clip">
      <section aria-labelledby="hero-title" className="home-hero relative isolate overflow-hidden bg-[#020617]">
        <div className="home-hero-photo pointer-events-none absolute">
          <Image
            src="/images/hero-launch.png"
            alt="2026 台灣盃火箭競賽中，火大的元件火箭升空的瞬間"
            fill
            preload
            sizes="(min-width: 1024px) 85vw, 100vw"
            className="home-hero-image object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="home-hero-shade pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="home-hero-edge pointer-events-none absolute inset-0"
        />
        <div aria-hidden="true" className="home-hero-nav-photo pointer-events-none absolute inset-x-0 top-0 lg:hidden">
          <Image
            src="/images/hero-launch.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 1px, 100vw"
            className="origin-top scale-[2.5] object-cover object-top"
          />
        </div>

        <div className="home-hero-content relative z-10 mx-auto flex max-w-7xl items-start px-5 sm:px-8 lg:items-center lg:px-12">
          <div className="w-full max-w-2xl lg:w-[62%] lg:max-w-none">
            <div className="mb-7 flex w-fit max-w-full items-center gap-2.5 rounded-full border border-orange-400/25 bg-[#0b1422]/45 px-3 py-2 font-mono text-[0.58rem] font-semibold tracking-[0.12em] text-orange-300 uppercase min-[375px]:text-[0.65rem] sm:px-4 sm:text-xs sm:tracking-[0.17em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
              2027 Taiwan Cup Rocket Competition
            </div>
            <p className="mb-5 text-sm font-semibold tracking-[0.06em] text-slate-300 sm:text-lg">
              元智大學機械工程學系 | YZUME
            </p>
            <h1 id="hero-title" className="text-balance text-5xl font-black leading-[1.12] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.75rem]">
              火大的元件
              <span className="mt-3 block whitespace-nowrap bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-[clamp(1.05rem,4.35vw,2.75rem)] leading-[1.3] tracking-[-0.04em] text-transparent">
                挑戰 2027 台灣盃火箭競賽
              </span>
            </h1>
            <p className="mt-6 max-w-[38rem] text-base leading-8 text-slate-200 sm:mt-7 sm:text-lg sm:leading-9">
              我們正在準備挑戰 2027 台灣盃火箭競賽。從設計、製作、測試到真正升空，我們希望把 2026 累積的經驗，變成下一枚更可靠的火箭。
            </p>
            <a href="#about" className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-sm py-2 text-base font-medium text-white transition-colors duration-200 hover:text-orange-200 focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-orange-300 motion-reduce:transition-none sm:mt-10 sm:text-lg">
              向下探索我們的故事
              <span aria-hidden="true" className="text-xl text-orange-400 transition-[translate,color] duration-200 group-hover:text-orange-300 motion-safe:group-hover:translate-y-1 motion-safe:group-focus-visible:translate-y-1 motion-reduce:transition-none">↓</span>
            </a>
          </div>
        </div>
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

        <HomeAboutSection />

        <div className="relative mx-auto max-w-7xl">
          <TeamDivisionSection />

        </div>
      </section>

      <PageLinks />
    </main>
  );
}
