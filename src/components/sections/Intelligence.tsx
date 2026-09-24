"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Intelligence() {
  const { t } = useLanguage();
  return (
    <section className="bg-deep py-20 md:py-28" aria-label={t.intelligence.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.intelligence.label} title={t.intelligence.title} subtitle={t.intelligence.subtitle} />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="etch h-full rounded-xl p-6">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="dashboard levels">
                {(t.intelligence.levels as unknown as string[]).map((l, i) => (
                  <span key={l} role="tab" aria-selected={i === 1} className={`rounded-sm px-3 py-1.5 font-mono text-[11px] font-bold ${i === 1 ? "bg-signal/15 text-signal" : "bg-white/[0.03] text-muted"}`}>{l}</span>
                ))}
              </div>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {(t.intelligence.examples as unknown as string[]).map((e) => (
                  <div key={e} className="rounded-lg border hairline bg-white/[0.02] p-4">
                    <p className="text-sm font-bold text-paper">{e}</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden>
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-signal to-aqua" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="etch h-full rounded-xl border-fabblue/25 p-6">
              <p className="font-bold text-paper">✦ {t.intelligence.askTitle}</p>
              <p className="mt-1 text-sm text-muted">{t.intelligence.askDesc}</p>
              <ul className="mt-4 space-y-2">
                {(t.intelligence.questions as unknown as string[]).map((q) => (
                  <li key={q} className="rounded-lg border border-fabblue/20 bg-fabblue/[0.06] px-4 py-3 text-sm text-paper">
                    “{q}”
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
