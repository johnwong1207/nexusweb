"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const links = [
  { href: "#product", key: "product" },
  { href: "#schools", key: "schools" },
  { href: "#students", key: "students" },
  { href: "#parents", key: "parents" },
  { href: "#fab", key: "fab" },
  { href: "#robotics", key: "robotics" },
  { href: "#security", key: "security" },
  { href: "#pricing", key: "pricing" },
  { href: "#about", key: "about" },
] as const;

export function Header() {
  const { t, toggle, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#050B1E]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="NEXUS Learn home">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-cyan-600 text-sm font-black text-white shadow-glow"
          >
            N
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            NEXUS <span className="gradient-text">Learn</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="nav-link"
            >
              {t.nav[l.key as keyof typeof t.nav] as string}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggle}
            aria-label={t.nav.switchLabel}
            className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-sky-200 transition hover:bg-white/20"
          >
            {t.nav.switchTo}
          </button>
          <a href="#contact" className="btn-primary !px-5 !py-2.5 !text-[13px]">
            {t.nav.bookDemo}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            aria-label={t.nav.switchLabel}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-sky-200"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white"
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-4 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-white/10 bg-[#050B1E]/95 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4">
              {links.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  {t.nav[l.key as keyof typeof t.nav] as string}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                {t.nav.bookDemo}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
