import Link from "next/link";

import { officialDonationUrl } from "@/data/siteContent";

const footerLinks = [
  { href: "/competition", label: "賽事簡介" },
  { href: "/about", label: "關於我們" },
  { href: "/journey-2026", label: "2026 經歷" },
  { href: "/budget", label: "經費總結" },
  { href: "/plan-2027", label: "2027 計畫" },
  { href: officialDonationUrl, label: "支持我們" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030711] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/" className="text-xl font-black text-white">
            火大的元件
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            元智大學學生火箭團隊，從設計、製作、測試到實際發射，持續讓下一枚火箭更可靠。
          </p>
        </div>
        <nav aria-label="頁尾導覽" className="flex max-w-2xl flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href === officialDonationUrl ? "_blank" : undefined}
              rel={link.href === officialDonationUrl ? "noopener noreferrer" : undefined}
              className="text-sm text-slate-400 transition hover:text-orange-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
