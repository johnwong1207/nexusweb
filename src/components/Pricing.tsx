"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { pricingConfig, type PricingCategory } from "@/config/pricing";
import { Reveal } from "./Reveal";

const tabs: PricingCategory[] = ["students", "families", "schools"];

export function Pricing() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<PricingCategory>("students");
  const tiers = pricingConfig[tab];

  return (
    <section id="pricing" className="bg-abyss py-20 md:py-28" aria-label={t.pricing.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-label">{t.pricing.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{t.pricing.title}</h2>
          <p className="mt-4 text-slate-300">{t.pricing.subtitle}</p>
        </Reveal>

        <div className="mt-8 flex justify-center" role="tablist" aria-label={t.pricing.label}>
          <div className="glass inline-flex rounded-2xl p-1.5">
            {(t.pricing.tabs as unknown as string[]).map((label, i) => {
              const key = tabs[i];
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition sm:px-8 ${tab === key ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow" : "text-slate-300 hover:text-white"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className={`mx-auto mt-10 grid max-w-5xl gap-5 ${tiers.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"} ${tiers.length === 3 ? "lg:grid-cols-3 lg:max-w-6xl" : ""}`}
          >
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  tier.highlighted
                    ? "border-sky-400/40 bg-gradient-to-b from-sky-500/[0.12] to-cyan-500/[0.10] shadow-glow"
                    : "glass"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white">
                    {lang === "zh" ? tier.badgeZh ?? t.pricing.popular : tier.badgeEn ?? t.pricing.popular}
                  </span>
                )}
                <h3 className="text-lg font-extrabold text-white">{lang === "zh" ? tier.nameZh : tier.nameEn}</h3>
                <p className="mt-1 text-sm text-slate-300">{lang === "zh" ? tier.taglineZh : tier.taglineEn}</p>
                <p className="mt-4 text-3xl font-black text-white">
                  {lang === "zh" ? tier.priceZh : tier.priceEn}
                  {(tier.unitEn || tier.unitZh) && (
                    <span className="text-sm font-semibold text-slate-300"> {lang === "zh" ? tier.unitZh : tier.unitEn}</span>
                  )}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {(lang === "zh" ? tier.featuresZh : tier.featuresEn).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                      <span aria-hidden className="mt-0.5 text-emerald-300">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href={tier.href} className={`${tier.highlighted ? "btn-primary" : "btn-secondary"} mt-6 w-full`}>
                  {lang === "zh" ? tier.ctaZh : tier.ctaEn}
                </a>
                <p className="mt-3 text-center text-xs text-slate-400">
                  {tab === "students" ? t.pricing.studentNote : tab === "families" ? t.pricing.familyNote : t.pricing.schoolNote}
                </p>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        <ul className="mx-auto mt-10 max-w-3xl space-y-2 text-center text-[13px] text-slate-400">
          {(t.pricing.disclaimers as unknown as string[]).map((d) => (
            <li key={d}>• {d}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
