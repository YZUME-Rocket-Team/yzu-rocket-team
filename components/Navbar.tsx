"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import SupportMenu from "@/components/SupportMenu";

const navigation = [
  { label: "首頁", href: "/" },
  { label: "賽事簡介", href: "/competition" },
  { label: "2026 經歷", href: "/journey-2026" },
  { label: "經費總結", href: "/budget" },
  { label: "2027 計畫", href: "/plan-2027" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 8);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || document.querySelector("dialog[open]")) return;
      setIsMenuOpen(false);
      mobileToggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-[100] border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-white/10 bg-[#050816]/90 shadow-[0_12px_36px_rgba(2,6,23,0.42)]"
          : "border-white/5 bg-[#050816]/35 shadow-none"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          onClick={handleNavigation}
          className="flex w-fit items-center gap-3 text-lg font-black tracking-tight text-white"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-400/50 bg-orange-500/10 text-orange-400"
          >
            ▲
          </span>
          火大的元件
        </Link>

        <nav aria-label="主要導覽" className="hidden lg:block">
          <div className="flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={handleNavigation}
                className={`group relative rounded-full px-2.5 py-2 text-sm font-medium transition-all duration-300 hover:text-orange-300 xl:px-3.5 ${
                  isActive(item.href)
                    ? "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.32)]"
                    : "text-slate-300"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-px origin-center bg-orange-400 transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
            <SupportMenu />
          </div>
        </nav>

        <button
          ref={mobileToggleRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "關閉導覽選單" : "開啟導覽選單"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-orange-400/40 hover:bg-orange-500/10 lg:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <nav
          id="mobile-navigation"
          aria-label="行動版主要導覽"
          className={`absolute inset-x-5 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-[#050816]/95 p-3 shadow-[0_18px_48px_rgba(2,6,23,0.65)] backdrop-blur-xl transition-all duration-300 sm:inset-x-8 lg:hidden ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 pointer-events-none opacity-0"
          }`}
        >
          <div className="grid gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={handleNavigation}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-300 ${
                  isActive(item.href)
                    ? "border-orange-400/20 bg-orange-500/10 text-orange-300"
                    : "border-transparent text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <SupportMenu key={isMenuOpen ? "open" : "closed"} mobile />
          </div>
        </nav>
      </div>
    </header>
  );
}
