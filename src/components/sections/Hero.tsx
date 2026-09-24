"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { CoreFallback } from "../three/LearningUniverse";
import { TechBackground } from "../ui/TechBackground";
import { Magnetic } from "../ui/Magnetic";

const LearningUniverse = dynamic(() => import("../three/LearningUniverse"), {
  ssr: false,
  loading: () => <CoreFallback labels={[]} />,
});

const LABELS_EN = ["AI Tutor", "Student", "Teacher", "Parent", "Assessment", "Analytics", "STEM", "School"];
const LABELS_ZH = ["AI 導師", "學生", "教師", "家長", "評核", "數據分析", "STEM", "學校"];

export function Hero() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const labels = lang === "zh" ? LABELS_ZH : LABELS_EN;

  return (
    <section ref={heroRef} id="top" className="relative overflow-hidden pb-14 pt-28 md:pt-36" aria-label="Hero">
      <div className="absolute inset-0 bg-abyss" aria-hidden />
      <TechBackground variant="hero" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[45%_55%] lg:gap-4 lg:px-8">
        {/* copy */}
        <div className="text-left">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 inline-flex items-center gap-2.5"
          >
            <span className="h-px w-8 bg-gradient-to-r from-signal to-aqua" aria-hidden />
            <span className="eyebrow">NEXUS Learn · {t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-balance text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-paper sm:text-6xl xl:text-[4.2rem]"
          >
            {t.hero.titlePre}
            <span className="text-gradient">{t.hero.titleHi}</span>
            {t.hero.titlePost}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a href="#product" className="btn-primary w-full sm:w-auto">
                {t.hero.primary}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-secondary w-full sm:w-auto">
                {t.hero.secondary}
              </a>
            </Magnetic>
          </motion.div>
          <a
            href="#pricing"
            className="mt-5 inline-block font-mono text-xs tracking-wider text-signal underline-offset-4 hover:underline"
          >
            {t.hero.tertiary} →
          </a>

          {/* trust strip */}
          <dl className="mt-10 grid max-w-md grid-cols-1 gap-px overflow-hidden rounded-lg border hairline bg-silicon/10 sm:grid-cols-3">
            {[
              { t: t.hero.trust1Title, d: t.hero.trust1Desc },
              { t: t.hero.trust2Title, d: t.hero.trust2Desc },
              { t: t.hero.trust3Title, d: t.hero.trust3Desc },
            ].map((x) => (
              <div key={x.t} className="bg-abyss/95 p-4">
                <dt className="text-[13px] font-bold text-paper">{x.t}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted">{x.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3D core */}
        <div className="relative">
          <p className="mb-1 text-center font-mono text-[11px] tracking-[0.24em] text-signal/80">
            {t.hero.coreLabel}
          </p>
          <LearningUniverse labels={labels} heroRef={heroRef} />
          <p className="mt-1 text-center text-[11px] text-silver">{t.hero.coreHint}</p>
        </div>
      </div>
    </section>
  );
}
