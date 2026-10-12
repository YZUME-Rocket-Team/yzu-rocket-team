import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(249,115,22,0.12),transparent_28rem)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-sm font-semibold tracking-[0.2em] text-orange-400 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-5xl text-balance text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
