"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function ProductLoop() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const steps = t.loop.steps as unknown as { title: string; desc: string }[];

  return (
    <section className="relative overflow-hidden bg-abyss py-20 md:py-28" aria-label={t.loop.label}>
      <div className="absolute inset-0 bg-grid-faint opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="section-label">{t.loop.label}</span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.loop.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">{t.loop.subtitle}</p>
        </Reveal>

        <ol className="relative mx-auto mt-14 max-w-2xl">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-sky-400/60 via-cyan-400/50 to-emerald-300/60 sm:left-[31px]" aria-hidden />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduce ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3) }}
              className="relative flex gap-5 pb-7 last:pb-0"
            >
              <span
                aria-hidden
                className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-sm font-black sm:h-16 sm:w-16 ${
                  i === steps.length - 1
                    ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-200 shadow-glow"
                    : i >= 3
                      ? "border-cyan-300/30 bg-cyan-500/15 text-cyan-200"
                      : "border-sky-300/30 bg-sky-500/15 text-sky-200"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="glass flex-1 rounded-2xl p-5">
                <h3 className="font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
                {i < steps.length - 1 && (
                  <span aria-hidden className="mt-3 block text-sky-400/70">
                    ↓
                  </span>
                )}
                {i === steps.length - 1 && (
                  <span className="mt-3 inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                    ⟳ {t.loop.loopNote}
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
