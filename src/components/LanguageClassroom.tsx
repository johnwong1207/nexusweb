"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function LanguageCoachSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-abyss py-20 md:py-28" aria-label={t.languageCoach.label}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="section-label">{t.languageCoach.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.languageCoach.title}</h2>
          <p className="mt-4 text-slate-300">{t.languageCoach.subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {(t.languageCoach.skills as unknown as string[]).map((s) => (
              <li key={s} className="rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-1.5 text-sm font-semibold text-sky-100">{s}</li>
            ))}
          </ul>
          <div className="glass mt-6 rounded-2xl p-5">
            <p className="text-sm font-bold text-white">{t.languageCoach.reviewTitle}</p>
            <p className="mt-1.5 text-sm text-slate-300">{t.languageCoach.reviewDesc}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">{t.languageCoach.missionTitle}</p>
            {(t.languageCoach.missions as unknown as { title: string; desc: string }[]).map((m, i) => (
              <div key={m.title} className="glass-strong card-hover rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-base" aria-hidden>
                    {["☀️", "📖", "🎙️"][i] ?? "✦"}
                  </span>
                  <p className="font-bold text-white">{m.title}</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">{m.desc}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" style={{ width: `${62 + i * 12}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ClassroomSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#060D24] py-20 md:py-28" aria-label={t.classroom.label}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal delay={0.05}>
          <div className="glass-strong rounded-3xl p-6 sm:p-8" aria-label="classroom mock">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-3 w-3 rounded-full bg-silicon/40" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-silicon/30" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-signal/60" aria-hidden />
              <span className="ml-3 rounded-lg bg-white/10 px-3 py-1 text-xs text-slate-300">nexus.learn/class/s2-maths</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {["📚", "📝", "📊"].map((e, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-2xl" aria-hidden>{e}</div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-sky-300/20 bg-sky-400/[0.07] p-4">
              <p className="text-sm text-sky-100">💬 “{t.classroom.quote}”</p>
              <p className="mt-2 rounded-xl bg-[#0A1430] p-3 text-[13px] leading-relaxed text-slate-200">
                ✓ {((t.classroom.features as unknown as string[])[6])} — grounded in this week&apos;s slides + worksheet.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-300">
              {(t.classroom.features as unknown as string[]).slice(0, 6).map((f) => (
                <span key={f} className="rounded-lg bg-white/5 px-2 py-2">{f}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <span className="section-label">{t.classroom.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.classroom.title}</h2>
          <p className="mt-4 text-slate-300">{t.classroom.subtitle}</p>
          <ul className="mt-6 space-y-2.5">
            {(t.classroom.features as unknown as string[]).map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/20 text-[11px] text-cyan-200">✓</span>{f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
