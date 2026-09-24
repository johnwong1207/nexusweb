"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function SecuritySection() {
  const { t } = useLanguage();
  return (
    <section id="security" className="relative bg-abyss py-20 md:py-28" aria-label={t.security.label}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="section-label">{t.security.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.security.title}</h2>
          <p className="mt-4 text-slate-300">{t.security.subtitle}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {(t.security.features as unknown as string[]).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-200">
                <span aria-hidden className="text-emerald-300">🛡</span> {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-slate-400">{t.security.note}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-6 sm:p-8" role="img" aria-label={t.security.archTitle}>
            <p className="text-center text-sm font-bold uppercase tracking-wider text-sky-300">{t.security.archTitle}</p>
            <ol className="mx-auto mt-6 max-w-xs space-y-2 text-center">
              {(t.security.archSteps as unknown as string[]).map((s, i) => (
                <li key={s}>
                  <span className="block rounded-2xl border border-sky-300/25 bg-sky-400/10 px-4 py-3 font-bold text-white">{s}</span>
                  {i < 2 && <span aria-hidden className="my-1 block text-sky-400">↓</span>}
                </li>
              ))}
            </ol>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {(t.security.routerOptions as unknown as string[]).map((o) => (
                <span key={o} className="rounded-2xl border border-cyan-300/25 bg-cyan-500/10 px-2 py-3 text-[13px] font-bold text-cyan-100">{o}</span>
              ))}
            </div>
            <p className="mt-5 rounded-2xl bg-white/[0.04] p-4 text-center text-[13px] text-slate-300">{t.security.routerDesc}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TransformationSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="bg-[#060D24] py-20 md:py-28" aria-label={t.transformation.label}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="section-label">{t.transformation.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.transformation.title}</h2>
          <p className="mt-4 text-slate-300">{t.transformation.subtitle}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {(t.transformation.items as unknown as string[]).map((x) => (
              <li key={x} className="glass rounded-xl px-4 py-2.5 text-sm text-slate-100">✦ {x}</li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">{t.transformation.fundingNote}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            <p className="font-bold text-white">{t.transformation.trackerTitle}</p>
            <ol className="mt-5 space-y-3">
              {(t.transformation.trackerSteps as unknown as { title: string; desc: string; status: string }[]).map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${i === 0 ? "bg-emerald-400/20 text-emerald-200" : i === 1 ? "bg-sky-400/20 text-sky-200" : "bg-white/10 text-slate-300"}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-white">{s.title}</p>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-200">{s.status}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-slate-300">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={38} aria-valuemin={0} aria-valuemax={100} aria-label={t.transformation.trackerTitle}>
              <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
