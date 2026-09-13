"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  { id: "home", label: "首頁", href: "#home" },
  { id: "competition", label: "賽事簡介", href: "#competition" },
  { id: "about", label: "關於我們", href: "#about" },
  { id: "history-2026", label: "2026 經歷", href: "#history-2026" },
  { id: "budget", label: "經費總結", href: "#budget" },
  { id: "plan-2027", label: "2027 計畫", href: "#plan-2027" },
];

const supportItem = { id: "support", label: "支持我們", href: "#support" };
const sectionIds = [...navigation.map((item) => item.id), supportItem.id];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 8);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!header || sections.length === 0) return;

    let animationFrame: number | null = null;

    const updateActiveSection = () => {
      animationFrame = null;
      const navbarHeight = Math.ceil(header.getBoundingClientRect().height);
      const readingLine =
        navbarHeight + (window.innerHeight - navbarHeight) * 0.25;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        currentSection = section;
      }

      setActiveSection((current) =>
        current === currentSection.id ? current : currentSection.id,
      );
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(header);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

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
        <a
          href="#home"
          onClick={() => handleNavigation("home")}
          className="flex w-fit items-center gap-3 text-lg font-black tracking-tight text-white"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-400/50 bg-orange-500/10 text-orange-400"
          >
            ▲
          </span>
          火大的元件
        </a>

        <nav aria-label="主要導覽" className="hidden lg:block">
          <div className="flex items-center gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => handleNavigation(item.id)}
                className={`group relative rounded-full px-2.5 py-2 text-sm font-medium transition-all duration-300 hover:text-orange-300 xl:px-3.5 ${
                  activeSection === item.id
                    ? "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.32)]"
                    : "text-slate-300"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-px origin-center bg-orange-400 transition-transform duration-300 group-hover:scale-x-100 ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
            <a
              href={supportItem.href}
              aria-current={activeSection === supportItem.id ? "location" : undefined}
              onClick={() => handleNavigation(supportItem.id)}
              className={`ml-1 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-400 ${
                activeSection === supportItem.id
                  ? "shadow-[0_0_34px_rgba(251,146,60,0.5)] ring-1 ring-orange-200/50"
                  : "shadow-[0_0_28px_rgba(249,115,22,0.28)]"
              }`}
            >
              {supportItem.label}
            </a>
          </div>
        </nav>

        <button
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
          className={`absolute inset-x-5 top-[calc(100%+0.5rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#050816]/95 p-3 shadow-[0_18px_48px_rgba(2,6,23,0.65)] backdrop-blur-xl transition-all duration-300 sm:inset-x-8 lg:hidden ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 pointer-events-none opacity-0"
          }`}
        >
          <div className="grid gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => handleNavigation(item.id)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-300 ${
                  activeSection === item.id
                    ? "border-orange-400/20 bg-orange-500/10 text-orange-300"
                    : "border-transparent text-slate-200"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={supportItem.href}
              aria-current={activeSection === supportItem.id ? "location" : undefined}
              onClick={() => handleNavigation(supportItem.id)}
              className={`mt-1 rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white transition-all duration-300 hover:bg-orange-400 ${
                activeSection === supportItem.id
                  ? "shadow-[0_0_34px_rgba(251,146,60,0.48)] ring-1 ring-orange-200/50"
                  : "shadow-[0_0_28px_rgba(249,115,22,0.24)]"
              }`}
            >
              {supportItem.label}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
