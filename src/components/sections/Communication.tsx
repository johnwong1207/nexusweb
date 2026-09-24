"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Communication() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [generated, setGenerated] = useState(false);
  const workflow = t.comms.workflow as unknown as string[];

  const fields =
    lang === "zh"
      ? [
          { label: t.noticeAI.event, value: "中二 STEM 參觀" },
          { label: t.noticeAI.audience, value: "中二家長" },
          { label: t.noticeAI.date, value: "11 月 18 日" },
          { label: t.noticeAI.reply, value: t.noticeAI.required },
        ]
      : [
          { label: t.noticeAI.event, value: "S2 STEM Visit" },
          { label: t.noticeAI.audience, value: "S2 Parents" },
          { label: t.noticeAI.date, value: "18 Nov" },
          { label: t.noticeAI.reply, value: t.noticeAI.required },
        ];

  return (
    <section className="relative bg-abyss py-20 md:py-28" aria-label={t.comms.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.comms.label} title={t.comms.title} subtitle={t.comms.subtitle} />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[38%_62%]">
          <Reveal>
            <div className="etch h-full rounded-xl p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.noticeAI.title}</p>
              <dl className="mt-4 space-y-2.5">
                {fields.map((f) => (
                  <div key={f.label} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2.5">
                    <dt className="font-mono text-[11px] text-silver">{f.label}</dt>
                    <dd className="text-[13px] font-bold text-paper">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={() => setGenerated(true)} className="btn-primary mt-4 w-full">
                {t.noticeAI.generate}
              </button>
              <ol className="mt-5 flex flex-wrap items-center gap-1.5" aria-label="approval workflow">
                {workflow.map((w, i) => (
                  <li key={w} className="flex items-center gap-1.5">
                    <span className={`rounded-sm px-2 py-1 font-mono text-[10px] font-bold ${i === workflow.length - 1 ? "bg-aqua/15 text-aqua" : "bg-white/[0.04] text-silicon/90"}`}>{w}</span>
                    {i < workflow.length - 1 && <span aria-hidden className="text-[10px] text-silver">→</span>}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="etch h-full rounded-xl p-6" aria-live="polite">
              {!generated ? (
                <div className="flex h-full min-h-56 items-center justify-center rounded-lg border border-dashed hairline text-sm text-silver">
                  — {t.noticeAI.generate} —
                </div>
              ) : (
                <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="rounded-lg bg-paper/[0.97] p-5 text-slate-800">
                    <p className="border-b border-slate-200 pb-2 text-center text-sm font-bold tracking-wide">
                      {lang === "zh" ? "學校通告 · School Notice" : "School Notice · 學校通告"}
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed">{t.noticeAI.previewEn}</p>
                    <p className="mt-2 text-[13px] leading-relaxed">{t.noticeAI.previewZh}</p>
                    <p className="mt-3 font-mono text-[11px] text-slate-500">e-slip · 電子回條 [ Accept 接受 / Decline 婉拒 ]</p>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted">{t.noticeAI.readNote}</p>
                  <p className="mt-2 rounded-lg border border-amberx/25 bg-amberx/[0.06] p-3 text-center text-[13px] text-amberx">
                    🔒 {t.comms.guardrail}
                  </p>
                </motion.div>
              )}
              <ul className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {(t.comms.features as unknown as string[]).slice(0, 6).map((f) => (
                  <li key={f} className="rounded-sm bg-white/[0.03] px-2 py-1.5 text-[11px] text-muted">{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
