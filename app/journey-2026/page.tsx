import type { Metadata } from "next";
import Image from "next/image";

import PageHeader from "@/components/PageHeader";
import PageLinks from "@/components/PageLinks";
import RocketModelSection from "@/components/RocketModelSection";
import RocketStructureSection from "@/components/RocketStructureSection";
import { engineeringImages } from "@/data/siteContent";

export const metadata: Metadata = { title: "2026 經歷｜火大的元件" };

export default function Journey2026Page() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <PageHeader
        eyebrow="2026 Mission Log"
        title="我們已經踏出第一步"
        description="2026 年，我們第一次完整走過一枚學生火箭從設計、製作、測試到實際發射的流程。"
      />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">2026 Result</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">學生 3K 組第三名</h2>
            </div>
            <p className="self-end text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              過程並不完美，但我們真的把火箭帶到了發射場，也在台灣盃火箭競賽學生 3K 組拿下第三名。更重要的是，我們第一次真正知道：哪些設計在紙上看起來沒問題，到了現場卻會成為問題。
              <br /><br />
              這些經驗，就是我們準備 2027 的起點。
            </p>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
              <Image src="/images/competition-team.jpg" alt="火大的元件團隊參加 2026 台灣盃火箭競賽的團隊合照" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24 sm:px-8 sm:pb-8">
                <span className="font-mono text-xs tracking-[0.18em] text-orange-300 uppercase">Competition Team</span>
                <span className="mt-2 block text-xl font-bold text-white sm:text-2xl">2026 台灣盃火箭競賽團隊</span>
              </figcaption>
            </figure>
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-orange-400/35 bg-slate-900 shadow-[0_0_40px_rgba(249,115,22,0.1)] lg:col-span-5 lg:aspect-auto lg:min-h-[34rem]">
              <Image src="/images/award-third-place.jpg" alt="火大的元件團隊獲得 2026 台灣盃火箭競賽學生 3K 組第三名的頒獎合照" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex rounded-full border border-orange-300/40 bg-orange-500/20 px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-orange-200 backdrop-blur-md">2026 RESULT</span>
                <span className="mt-4 block text-2xl font-black text-white sm:text-3xl">學生 3K 組 第三名</span>
                <span className="mt-2 block text-sm text-slate-300">2026 台灣盃火箭競賽</span>
                <span className="mt-3 block max-w-md text-sm leading-6 text-slate-300">第一次參賽，我們完成了火箭設計、製作、測試與實際發射。</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <RocketModelSection />

      <RocketStructureSection />

      <section className="border-t border-white/10 bg-slate-950/55 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">Engineering Process</p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">從設計到升空</h2>
            <p className="mt-7 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              一枚火箭能不能飛，不只取決於單一零件，而是每一個系統能不能在同一時間正常工作。從結構、航電、酬載、回收到組裝與遙測，我們需要反覆設計、測試、修正，再重新驗證。
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {engineeringImages.map((image) => (
              <figure key={image.src} className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className={`${image.contain ? "object-contain p-4 sm:p-7" : "object-cover"} transition duration-700 group-hover:scale-[1.02]`} />
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

      <section className="border-t border-white/10 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">Flight Record</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">真正升空的那一刻</h2>
            </div>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">2026 台灣盃火箭競賽實際發射紀錄。<br />對我們來說，這 20 多秒，是前面幾個月設計、製作與測試的結果。</p>
          </div>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-orange-400/25 bg-slate-950 shadow-[0_0_48px_rgba(249,115,22,0.08)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs tracking-[0.16em] text-slate-400 sm:px-6">
              <span>FLIGHT VIDEO / 2026</span><span className="text-orange-300">TAIWAN CUP</span>
            </div>
            <video controls playsInline preload="metadata" aria-label="2026 台灣盃火箭競賽實際發射影片" className="aspect-video w-full bg-black object-contain">
              <source src="/videos/rocket-launch-2026.mp4" type="video/mp4" />
              您的瀏覽器不支援 HTML5 影片播放。
            </video>
          </div>
        </div>
      </section>

      <PageLinks />
    </main>
  );
}
