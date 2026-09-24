"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";

function Missions() {
  const { t } = useLanguage();
  const missions = t.lab.missions as unknown as string[];
  return (
    <div className="etch rounded-xl p-6">
      <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.lab.missionsTitle}</p>
      <p className="mt-1 text-xs text-silver">{t.lab.pathwayLabel}</p>
      <ol className="mt-4 space-y-2">
        {missions.map((m, i) => (
          <Reveal key={m} delay={Math.min(i * 0.04, 0.2)}>
            <li className="group flex items-center gap-3 rounded-lg border hairline bg-white/[0.02] px-4 py-3 transition-colors hover:border-aqua/40">
              <span className="font-mono text-[11px] font-bold text-aqua">M{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
              <span className="flex-1 text-sm font-semibold text-paper">{m}</span>
              <span aria-hidden className="text-silver transition-transform group-hover:translate-x-1">→</span>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(t.lab.pathwayTopics as unknown as string[]).map((topic) => (
          <span key={topic} className="rounded-sm bg-white/[0.04] px-2 py-1 text-[11px] text-muted">{topic}</span>
        ))}
      </div>
    </div>
  );
}

function Progression() {
  const { t } = useLanguage();
  const steps = t.lab.progression as unknown as string[];
  return (
    <div className="etch h-full rounded-xl p-6">
      <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.lab.progressionTitle}</p>
      <p className="mt-1 text-xs text-silver">{t.lab.progressionSub}</p>
      <ol className="relative mt-5">
        <div className="absolute bottom-5 left-[15px] top-5 w-px bg-gradient-to-b from-signal via-aqua to-fabblue" aria-hidden />
        {steps.map((s, i) => (
          <Reveal key={s} delay={i * 0.05}>
            <li className="relative flex items-center gap-4 py-2.5">
              <span aria-hidden className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] font-bold ${i === 0 ? "border-aqua/50 bg-aqua/10 text-aqua" : i === steps.length - 1 ? "border-signal/50 bg-signal/10 text-signal" : "border-silicon/25 bg-abyss text-silicon"}`}>
                {i + 1}
              </span>
              <span className={`rounded-lg border px-4 py-2 text-sm font-bold ${i === steps.length - 1 ? "border-signal/40 bg-signal/[0.07] text-paper" : "hairline bg-white/[0.02] text-silicon/90"}`}>
                {s}
              </span>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function RobotLab() {
  const { t } = useLanguage();
  const flow = t.lab.robotFlow as unknown as string[];
  return (
    <div className="etch rounded-xl p-6">
      <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.lab.robotTitle}</p>
      <p className="mt-1 text-xs text-silver">{t.lab.robotSub}</p>
      {/* pipeline */}
      <ol className="mt-4 flex flex-wrap items-center gap-1.5" aria-label="robot pipeline">
        {flow.map((f, i) => (
          <li key={f} className="flex items-center gap-1.5">
            <span className={`rounded-sm px-2.5 py-1.5 font-mono text-[11px] font-bold ${i === flow.length - 1 ? "bg-aqua/15 text-aqua" : "bg-white/[0.04] text-silicon/90"}`}>{f}</span>
            {i < flow.length - 1 && <span aria-hidden className="text-[11px] text-signal">→</span>}
          </li>
        ))}
      </ol>
      {/* params */}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {(t.lab.robotParams as unknown as string[]).map((p) => (
          <li key={p} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 text-[13px] text-silicon/90">
            {p}
            <span className="h-1.5 w-1.5 rounded-full bg-signal/70" aria-hidden />
          </li>
        ))}
      </ul>
      {/* mini telemetry */}
      <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-center" role="img" aria-label="robot telemetry">
        {[
          { k: "PWM", v: "68%" },
          { k: "DIST", v: "24cm" },
          { k: "LINE", v: "◉○◉" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-signal/20 bg-abyss px-2 py-2.5">
            <p className="text-[10px] tracking-[0.18em] text-silver">{s.k}</p>
            <p className="mt-0.5 text-sm font-bold text-signal">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StemBuilder() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(0);
  const outputs = t.lab.builderOutputs as unknown as string[];
  const flow = t.lab.builderFlow as unknown as string[];

  const fields =
    lang === "zh"
      ? [
          { label: t.lab.platform, value: "micro:bit" },
          { label: t.lab.programming, value: "MakeCode" },
          { label: t.lab.hardware, value: "micro:bit + 車架 + 超聲波傳感器" },
          { label: t.lab.grade, value: "P5" },
          { label: t.lab.duration, value: "60 分鐘" },
          { label: t.lab.objective, value: "理解傳感器與簡單自主控制", wide: true },
        ]
      : [
          { label: t.lab.platform, value: "micro:bit" },
          { label: t.lab.programming, value: "MakeCode" },
          { label: t.lab.hardware, value: "micro:bit + robot chassis + ultrasonic sensor" },
          { label: t.lab.grade, value: "P5" },
          { label: t.lab.duration, value: "60 minutes" },
          { label: t.lab.objective, value: "Understand sensors and simple autonomous control", wide: true },
        ];

  function build() {
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
    }, 220);
  }

  return (
    <div className="etch rounded-xl p-6 sm:p-7">
      <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.lab.builderTitle}</p>
      <p className="mt-1 text-[13px] text-muted">{t.lab.builderSub}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <dl className="grid grid-cols-2 gap-2">
            {fields.map((f) => (
              <div key={f.label} className={`rounded-lg border hairline bg-white/[0.02] px-3 py-2.5 ${f.wide ? "col-span-2" : ""}`}>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-silver">{f.label}</dt>
                <dd className="mt-0.5 text-[13px] font-semibold text-paper">{f.value}</dd>
              </div>
            ))}
          </dl>
          <button onClick={build} disabled={started} className="btn-primary mt-4 w-full disabled:opacity-50">
            {t.lab.builderGenerate}
          </button>
        </div>
        <div aria-live="polite">
          <ul className="space-y-1.5">
            {outputs.map((o, i) => (
              <li key={o}>
                <AnimatePresence>
                  {(started && i < done) || (!started && i === 0 && false) ? (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 text-[13px] text-paper"
                    >
                      {o}
                      <span className="font-mono text-[11px] font-bold text-aqua">✓</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                {!started && i === 0 && <p className="rounded-lg border border-dashed hairline px-3 py-2 text-[13px] text-silver">···</p>}
              </li>
            ))}
          </ul>
          {done >= outputs.length && (
            <ol className="mt-4 flex flex-wrap items-center gap-1.5 border-t hairline pt-3">
              {flow.map((f, i) => (
                <li key={f} className="flex items-center gap-1.5">
                  <span className={`rounded-sm px-2 py-1 font-mono text-[10px] font-bold ${i === flow.length - 1 ? "bg-aqua/15 text-aqua" : "bg-white/[0.04] text-silicon/90"}`}>{f}</span>
                  {i < flow.length - 1 && <span aria-hidden className="text-[10px] text-silver">→</span>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export function PhysicalComputing() {
  const { t } = useLanguage();
  return (
    <section id="robotics" className="relative bg-deep py-20 md:py-28" aria-label={t.lab.label}>
      <div className="absolute inset-0 bg-blueprint-fine opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.lab.label} title={t.lab.title} subtitle={t.lab.subtitle} />
        <Reveal className="mt-6 flex flex-wrap justify-center gap-2">
          {(t.lab.platforms as unknown as string[]).map((p) => (
            <span key={p} className="rounded-sm border border-signal/25 bg-signal/[0.06] px-3 py-1.5 font-mono text-xs text-paper">{p}</span>
          ))}
          {(t.lab.parts as unknown as string[]).map((p) => (
            <span key={p} className="rounded-sm border hairline bg-abyss/70 px-3 py-1.5 font-mono text-xs text-muted">{p}</span>
          ))}
        </Reveal>

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
          <Missions />
          <div className="space-y-5">
            <Progression />
          </div>
        </div>
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
          <RobotLab />
          <div className="etch rounded-xl p-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-signal">SAFETY & EXTENSION</p>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              <li>✓ { (t.lab.builderOutputs as unknown as string[])[8] } — low-voltage builds, supervised wiring</li>
              <li>✓ { (t.lab.builderOutputs as unknown as string[])[9] } — maze finals, radio relay races</li>
            </ul>
            <div className="mt-4 rounded-lg bg-gradient-to-r from-signal/[0.08] to-aqua/[0.06] p-4 text-[13px] text-silicon/90">
              micro:bit → Arduino → ESP32 / IoT → STM32 → Advanced Robotics → AI Robotics
            </div>
          </div>
        </div>
        <Reveal className="mt-5">
          <StemBuilder />
        </Reveal>
      </div>
    </section>
  );
}
