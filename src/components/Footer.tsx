"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/10 bg-[#04081A] py-14" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-cyan-600 text-sm font-black text-white">N</span>
              <span className="text-lg font-extrabold text-white">NEXUS <span className="gradient-text">Learn</span></span>
            </div>
            <p className="mt-4 max-w-xs text-lg font-bold leading-snug text-white">{t.footer.tagline}</p>
            <p className="mt-2 text-xs text-slate-500">AI Education Operating System · EN / 繁中</p>
          </div>
          <nav aria-label={t.footer.product}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.footer.product}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#product">NEXUS Learn</a></li>
              <li><a className="hover:text-white" href="#fab">Virtual FAB</a></li>
              <li><a className="hover:text-white" href="#pricing">{t.nav.pricing}</a></li>
              <li><a className="hover:text-white" href="#contact">{t.footer.demo}</a></li>
            </ul>
          </nav>
          <nav aria-label={t.footer.audiences}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.footer.audiences}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#schools">{t.nav.schools}</a></li>
              <li><a className="hover:text-white" href="#students">{t.nav.students}</a></li>
              <li><a className="hover:text-white" href="#parents">{t.nav.parents}</a></li>
            </ul>
          </nav>
          <nav aria-label={t.footer.trust}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.footer.trust}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#security">{t.nav.security}</a></li>
              <li><a className="hover:text-white" href="/privacy">Privacy</a></li>
              <li><a className="hover:text-white" href="/terms">Terms</a></li>
              <li><a className="hover:text-white" href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>{t.footer.rights}</p>
          <p>Learn better. Teach smarter. Build the future.</p>
        </div>
      </div>
    </footer>
  );
}
