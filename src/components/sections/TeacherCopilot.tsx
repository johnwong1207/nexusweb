"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function TeacherCopilot() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(0);

  const outputs = t.copilot.outputs as unknown as string[];
  const flow = t.copilotDemo.flow as unknown as string[];

  function generate() {
    if (started) return;
    setStarted(true);
    if (reduce) {
      setDone(outputs.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDone(i);
      if (i >= outputs.length) clearInterval(id);
    }, 320);
  }

  const fields = [
    { label: t.copilotDemo.grade, value: "S2" },
    { label: t.copilotDemo.subject, value: t.copilot.inputs[1] as string },
    { label: t.copilotDemo.topic, value: "Electricity" },
    { label: t.copilotDemo.objective, value: "Understand series and parallel circuits", wide: true },
  ];

  return (
    <section className="relative bg-abyss py-20 md:py-28" aria-label={t.copilot.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.copilot.label} title={t.copilot.title} subtitle={t.copilot.subtitle} />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[42%_58%]">
          {/* input panel */}
          <Reveal>
            <div className="etch h-full rounded-xl p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.copilot.inputTitle}</p>
              <dl className="mt-4 space-y-3">
                {fields.map((f) => (
                  <div key={f.label} className="rounded-lg border hairline bg-white/[0.02] px-4 py-3">
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-silver">{f.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-paper">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={generate} disabled={started} className="btn-primary mt-5 w-full disabled:opacity-50">
                {started ? t.copilotDemo.generating : t.copilotDemo.generate}
              </button>
            </div>
          </Reveal>

          {/* output panel */}
          <Reveal delay={0.08}>
            <div className="etch h-full rounded-xl p-6" aria-live="polite">
              <p className="font-mono text-[11px] tracking-[0.2em] text-aqua">{t.copilot.outputTitle}</p>
              <ul className="mt-4 space-y-2">
                {outputs.slice(0, 6).map((o, i) => {
                  const ready = i < done;
                  return (
                    <li key={o}>
                      <AnimatePresence>
                        {(!started && i === 0) || ready || !started ? (
                          <motion.div
                            initial={reduce ? false : { opacity: 0, x: 10 }}
                            animate={{ opacity: ready ? 1 : 0.35, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between rounded-lg border hairline bg-white/[0.02] px-4 py-2.5 text-sm"
                          >
                            <span className={ready ? "text-paper" : "text-silver"}>{o}</span>
                            <span className={`font-mono text-xs font-bold ${ready ? "text-aqua" : "text-silver/50"}`}>
                              {ready ? "✓" : "···"}
                            </span>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
              {!started && <p className="mt-4 text-[13px] text-silver">—</p>}
              {done >= 6 && (
                <motion.ol
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex flex-wrap items-center gap-2 border-t hairline pt-4"
                >
                  {flow.map((f, i) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className={`rounded-sm px-3 py-1.5 font-mono text-[11px] font-bold ${i === flow.length - 1 ? "bg-aqua/15 text-aqua" : "bg-white/[0.04] text-silicon/90"}`}>
                        {f}
                      </span>
                      {i < flow.length - 1 && <span aria-hidden className="text-silver">↓</span>}
                    </li>
                  ))}
                </motion.ol>
              )}
              <p className="mt-4 text-xs leading-relaxed text-silver">◈ {t.copilot.humanNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
