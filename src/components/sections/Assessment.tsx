"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Assessment() {
  const { t } = useLanguage();
  const [state, setState] = useState<"idle" | "accepted" | "overridden" | "flagged">("idle");
  const points = t.assessmentReview.points as unknown as string[];

  return (
    <section className="relative bg-deep py-20 md:py-28" aria-label={t.assessment.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.assessment.label} title={t.assessment.title} subtitle={t.assessment.subtitle} />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* scanned answer */}
          <Reveal>
            <div className="etch h-full rounded-xl p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.assessmentReview.answerTitle}</p>
              <div className="mt-4 rounded-lg bg-paper/[0.96] p-5 font-mono text-[13px] leading-relaxed text-slate-800" aria-label="scanned work">
                <p className="font-bold">Q3 · Series circuit, R = 12Ω, V = 6V</p>
                <p className="mt-2">I = V / R = 6 / 12</p>
                <p>I = 0.5</p>
                <p className="mt-2 text-slate-500">[ student handwriting scan ]</p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {(t.assessment.features as unknown as string[]).slice(0, 4).map((f) => (
                  <li key={f} className="rounded-sm border hairline px-2.5 py-1 text-xs text-muted">{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* review panel */}
          <Reveal delay={0.08}>
            <div className="etch h-full rounded-xl border-signal/25 p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.assessmentReview.suggested}</p>
                <p className="font-mono text-3xl font-bold text-paper">3<span className="text-lg text-silver"> / 4</span></p>
              </div>
              <p className="mt-3 text-[13px] text-muted">
                {t.assessmentReview.confidence}: <span className="font-bold text-aqua">{t.assessmentReview.high}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {points.map((p, i) => (
                  <li key={p} className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] px-3 py-2 text-sm text-paper">
                    <span aria-hidden className={i < 2 ? "text-aqua" : "text-amberx"}>{i < 2 ? "✓" : "✗"}</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label="review decision">
                <button onClick={() => setState("accepted")} className={`rounded-lg px-3 py-2.5 text-[13px] font-bold transition ${state === "accepted" ? "bg-gradient-to-r from-signal to-aqua text-abyss" : "border hairline text-paper hover:border-aqua/50"}`}>
                  {t.assessmentReview.accept}
                </button>
                <button onClick={() => setState("overridden")} className={`rounded-lg px-3 py-2.5 text-[13px] font-bold transition ${state === "overridden" ? "border border-amberx/60 bg-amberx/10 text-amberx" : "border hairline text-paper hover:border-signal/50"}`}>
                  {t.assessmentReview.override}
                </button>
                <button onClick={() => setState("flagged")} className={`rounded-lg px-3 py-2.5 text-[13px] font-bold transition ${state === "flagged" ? "border border-fabblue/60 bg-fabblue/10 text-fabblue" : "border hairline text-paper hover:border-fabblue/50"}`}>
                  {t.assessmentReview.flag}
                </button>
              </div>
              {state !== "idle" && (
                <p className="mt-3 text-[13px] font-semibold text-aqua" role="status">
                  ✓ {state === "accepted" ? t.assessmentReview.accepted : state === "overridden" ? t.assessmentReview.override : t.assessmentReview.flag} — teacher recorded.
                </p>
              )}
              <p className="mt-4 border-t hairline pt-4 text-sm font-semibold text-paper">{t.assessmentReview.caption}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
