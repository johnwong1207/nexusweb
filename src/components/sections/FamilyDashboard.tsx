"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedNumber } from "../ui/AnimatedNumber";

function Trend({ from, to }: { from: number; to: number }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-end justify-between">
      <div className="flex items-baseline gap-2">
        <AnimatedNumber to={from} className="font-mono text-lg text-silver" />
        <span aria-hidden className="text-silver">→</span>
        <AnimatedNumber to={to} className="font-mono text-3xl font-bold text-paper" />
      </div>
      <span className="rounded-sm bg-aqua/10 px-2 py-0.5 font-mono text-[11px] text-aqua">↑ {t.familyDash.trendUp}</span>
    </div>
  );
}

export function FamilyDashboard() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-deep py-20 md:py-28" aria-label={t.familyDash.label}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <SectionHeader align="left" eyebrow={t.familyDash.label} title={t.familyDash.title} subtitle={t.familyDash.subtitle} />
        <Reveal delay={0.08}>
          <div className="etch rounded-xl p-6 sm:p-7" role="img" aria-label={t.familyDash.title}>
            <div className="flex items-center gap-2 border-b hairline pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-signal/70" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-aqua/70" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-silicon/40" aria-hidden />
              <span className="ml-2 font-mono text-[11px] text-silver">nexus.learn/family</span>
            </div>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-sm font-bold text-paper">{t.familyDash.math}</p>
                <Trend from={74} to={82} />
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden>
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-signal to-aqua" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-paper">{t.familyDash.english}</p>
                <Trend from={71} to={76} />
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden>
                  <div className="h-full w-[76%] rounded-full bg-fabblue" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-aqua/25 bg-aqua/[0.06] p-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-aqua">{t.familyDash.strongest}</p>
                  <p className="mt-1 font-bold text-paper">{t.familyDash.algebra}</p>
                </div>
                <div className="rounded-lg border border-amberx/30 bg-amberx/[0.07] p-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-amberx">{t.familyDash.needs}</p>
                  <p className="mt-1 font-bold text-paper">{t.familyDash.geometry}</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-4 py-3">
                <span className="text-[13px] text-muted">{t.familyDash.week}</span>
                <span className="font-mono text-[13px] font-bold text-signal">{t.familyDash.activities}</span>
              </div>
            </div>
          </div>
          <p className="mt-4 rounded-lg border border-signal/25 bg-signal/[0.06] p-4 text-center text-sm font-semibold text-paper">
            {t.familyDash.independent}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
