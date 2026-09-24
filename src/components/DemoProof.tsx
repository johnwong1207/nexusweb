"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function DemoVideo() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#060D24] py-20 md:py-28" aria-label={t.demo.label}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-label">{t.demo.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.demo.title}</h2>
          <p className="mt-4 text-slate-300">{t.demo.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="group relative mx-auto mt-10 max-w-5xl">
            <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-sky-500 to-cyan-500 opacity-25 blur transition duration-700 group-hover:opacity-40" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-glass">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#0A1430] px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-silicon/40" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-silicon/30" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-signal/60" aria-hidden />
                <span className="ml-3 hidden text-xs text-slate-400 sm:block">nexus.learn/tour</span>
              </div>
              <video
                controls
                preload="none"
                playsInline
                aria-label={t.demo.playLabel}
                poster="/poster.svg"
                className="aspect-video w-full bg-[#050B1E]"
              >
                <source src="/demo.mp4" type="video/mp4" />
                <p className="p-8 text-center text-sm text-slate-300">
                  {t.demo.frameNote}
                </p>
              </video>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">{t.demo.frameNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SocialProof() {
  const { t } = useLanguage();
  return (
    <section className="bg-abyss py-20 md:py-24" aria-label={t.proof.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-label">{t.proof.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.proof.title}</h2>
          <p className="mt-4 text-slate-300">{t.proof.subtitle}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(t.proof.principles as unknown as { title: string; desc: string }[]).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="glass card-hover h-full rounded-3xl p-6">
                <p className="text-2xl" aria-hidden>{["👩‍🏫", "🌱", "🛡"][i]}</p>
                <h3 className="mt-3 font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="glass-strong mx-auto mt-8 flex max-w-4xl flex-col items-center gap-4 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="text-lg font-extrabold text-white">{t.proof.pilotTitle}</p>
              <p className="mt-2 text-sm text-slate-300">{t.proof.pilotDesc}</p>
            </div>
            <a href="#contact" className="btn-primary shrink-0">{t.proof.pilotCta}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
