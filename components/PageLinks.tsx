import Link from "next/link";

import { officialDonationUrl } from "@/data/siteContent";

type PageLink = {
  href: string;
  label: string;
  description: string;
};

export default function PageLinks({
  eyebrow = "Continue the Journey",
  title = "繼續了解這次任務",
  links,
}: {
  eyebrow?: string;
  title?: string;
  links: readonly PageLink[];
}) {
  return (
    <section className="relative border-t border-white/10 bg-slate-950/55 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs font-semibold tracking-[0.2em] text-orange-400 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">{title}</h2>
        <div className={`mt-8 grid gap-4 ${links.length > 2 ? "lg:grid-cols-3" : "sm:grid-cols-2"}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href === officialDonationUrl ? "_blank" : undefined}
              rel={link.href === officialDonationUrl ? "noopener noreferrer" : undefined}
              className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-orange-400/35 hover:bg-orange-500/[0.07]"
            >
              <span className="text-xl font-black text-white transition group-hover:text-orange-200">
                {link.label}
              </span>
              <span className="mt-3 block text-sm leading-6 text-slate-400">{link.description}</span>
              <span className="mt-5 inline-flex font-mono text-xs font-bold tracking-[0.14em] text-orange-400 uppercase">
                前往頁面 →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
