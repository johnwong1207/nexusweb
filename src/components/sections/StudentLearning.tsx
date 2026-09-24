"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { LearningGraph } from "../three/LearningGraph";

const SKILLS = [
  { en: "Fractions", zh: "分數", v: 92 },
  { en: "Algebra", zh: "代數", v: 84 },
  { en: "Geometry", zh: "幾何", v: 54 },
  { en: "Statistics", zh: "統計", v: 76 },
];

export function StudentLearning() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-abyss py-20 md:py-28" aria-label={t.studentLife.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.studentLife.label} title={t.studentLife.title} subtitle={t.studentLife.subtitle} />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {/* animated learning map */}
          <Reveal>
            <div className="etch rounded-xl p-6 sm:p-7" role="img" aria-label={t.studentLife.mapTitle}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.studentLife.mapTitle}</p>
                <span className="rounded-sm bg-aqua/10 px-2 py-0.5 font-mono text-[10px] text-aqua">● LIVE</span>
              </div>
              <div className="mt-6 space-y-5">
                {SKILLS.map((s, i) => {
                  const weak = s.v < 60;
                  return (
                    <div key={s.en}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-semibold text-paper">{lang === "zh" ? s.zh : s.en}</span>
                        <span className={`font-mono font-bold ${weak ? "text-amberx" : "text-signal"}`}>{s.v}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <motion.div
                          initial={false}
                          whileInView={{ width: `${s.v}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={reduce ? { duration: 0 } : { duration: 1, delay: i * 0.12, ease: "easeOut" }}
                          className={`h-full rounded-full ${weak ? "bg-amberx" : "bg-gradient-to-r from-signal to-aqua"}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* weakness → mastery flow */}
              <ol className="mt-7 border-t hairline pt-5" aria-label="recovery flow">
                {(t.studentLife.flow as unknown as string[]).map((f, i, arr) => (
                  <motion.li
                    key={f}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: 0.5 + i * 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-bold ${i === 0 ? "bg-amberx/15 text-amberx" : i === arr.length - 1 ? "bg-aqua/15 text-aqua" : "bg-signal/10 text-signal"}`}>
                      {i + 1}
                    </span>
                    <span className="py-1.5 text-sm font-semibold text-paper">{f}</span>
                    {i < arr.length - 1 && <span aria-hidden className="ml-9 block h-4 w-px bg-signal/30" />}
                  </motion.li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-aqua/30 bg-aqua/[0.07] px-2.5 py-1 font-mono text-[11px] text-aqua">
                  ✓ {t.studentLife.badge}
                </span>
                <span className="text-xs text-muted">{t.studentLife.hintLine}</span>
              </div>
            </div>
          </Reveal>

          {/* constellation + chips */}
          <div className="space-y-6">
            <Reveal delay={0.08}>
              <LearningGraph />
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="flex flex-wrap gap-2" aria-label="capabilities">
                {(t.studentLife.chips as unknown as string[]).map((c) => (
                  <li key={c} className="rounded-sm border hairline bg-deep/70 px-3 py-1.5 text-[13px] text-silicon/90">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
