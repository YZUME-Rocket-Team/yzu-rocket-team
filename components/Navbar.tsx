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
  const revealRef = useRef<HTMLButtonElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [isPointerWithin, setIsPointerWithin] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isDesktopSupportActive, setIsDesktopSupportActive] = useState(false);
  const [isMobileSupportActive, setIsMobileSupportActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSupportActive = isDesktopSupportActive || isMobileSupportActive;
  const isCollapsed = isPastThreshold && !isPointerWithin && !hasKeyboardFocus
    && !isManuallyExpanded && !isMenuOpen && !isSupportActive;

  useEffect(() => {
    const updateNavbar = () => {
      setIsScrolled(window.scrollY > 8);
      // A small dead band avoids repeated toggles near the scroll threshold.
      setIsPastThreshold((past) => window.scrollY > (past ? 96 : 120));
      if (window.scrollY <= 96) setIsManuallyExpanded(false);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      setHasKeyboardFocus(false);
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsManuallyExpanded(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || isSupportActive
        || document.querySelector("dialog[open]")
        || (!isMenuOpen && !headerRef.current?.contains(document.activeElement))) return;
      event.preventDefault();
      setIsMenuOpen(false);
      setIsManuallyExpanded(false);
      if (isPastThreshold) {
        setIsPointerWithin(false);
        setHasKeyboardFocus(false);
        requestAnimationFrame(() => revealRef.current?.focus({ preventScroll: true }));
      } else if (isMenuOpen) {
        mobileToggleRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen, isPastThreshold, isSupportActive]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      setIsMenuOpen(false);
      setIsManuallyExpanded(false);
      setIsPointerWithin(false);
      setHasKeyboardFocus(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const handleNavigation = () => {
    setIsMenuOpen(false);
    setIsManuallyExpanded(false);
    setHasKeyboardFocus(false);
    setIsPointerWithin(false);
  };

  const revealNavigation = (fromKeyboard: boolean) => {
    setIsManuallyExpanded(true);
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    if (mobile) setIsMenuOpen(true);
    if (fromKeyboard) requestAnimationFrame(() => {
      if (mobile) mobileToggleRef.current?.focus({ preventScroll: true });
      else headerRef.current?.querySelector<HTMLAnchorElement>(".site-navbar a")?.focus({ preventScroll: true });
    });
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header
      ref={headerRef}
      className="site-navbar-shell"
      data-collapsed={isCollapsed}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse"
          || !window.matchMedia("(min-width: 1024px) and (hover: hover)").matches) return;
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsPointerWithin(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
          setIsPointerWithin(false);
          setIsManuallyExpanded(false);
        }, 180);
      }}
      onFocusCapture={(event) => {
        if (event.target === revealRef.current) return;
        setHasKeyboardFocus(event.target.matches(":focus-visible"));
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
      }}
      onKeyDownCapture={(event) => {
        if (event.key === "Tab" && event.target !== revealRef.current) setHasKeyboardFocus(true);
      }}
    >
      <button
        ref={revealRef}
        type="button"
        className="site-navbar-reveal"
        tabIndex={isCollapsed ? 0 : -1}
        aria-label="展開導覽列"
        aria-controls="site-navbar-panel"
        aria-expanded={!isCollapsed}
        onClick={(event) => revealNavigation(event.detail === 0)}
      >
        <span aria-hidden="true" />
      </button>
      <div
        id="site-navbar-panel"
        className="site-navbar"
        data-over-hero={pathname === "/"}
        data-scrolled={isScrolled}
        inert={isCollapsed}
      >
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
                    ? "text-orange-400"
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
            <SupportMenu onActiveChange={setIsDesktopSupportActive} />
          </div>
        </nav>

        <button
          ref={mobileToggleRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "關閉導覽選單" : "開啟導覽選單"}
          onClick={() => {
            setIsMenuOpen((open) => !open);
            setIsManuallyExpanded(false);
          }}
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
          className={`absolute inset-x-0 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-var(--site-navbar-height)-1.5rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#08101c]/90 p-3 shadow-[0_12px_32px_rgba(2,6,23,0.3)] backdrop-blur-[18px] backdrop-saturate-[130%] transition-all duration-300 motion-reduce:transition-none lg:hidden ${
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
            <SupportMenu key={isMenuOpen ? "open" : "closed"} mobile onActiveChange={setIsMobileSupportActive} />
          </div>
        </nav>
      </div>
    </header>
  );
}
