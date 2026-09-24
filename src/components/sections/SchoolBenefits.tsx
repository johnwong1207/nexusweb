"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { Magnetic } from "../ui/Magnetic";

const ICONS = ["✎", "◉", "✓", "⇄", "◈"];

export function SchoolBenefits() {
  const { t } = useLanguage();
  const items = t.school.items as unknown as { title: string; desc: string }[];

  return (
    <section className="relative bg-deep py-20 md:py-28" aria-label={t.school.label}>
      <div className="absolute inset-0 bg-blueprint-fine opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.school.label} title={t.school.title} subtitle={t.school.subtitle} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border hairline bg-silicon/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.05, 0.2)} className="h-full">
              <div className="group flex h-full flex-col bg-abyss/95 p-7 transition-colors hover:bg-panel">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-lg border border-signal/25 bg-signal/[0.07] font-mono text-base text-signal transition-transform duration-300 group-hover:-translate-y-1">
                    {ICONS[i % ICONS.length]}
                  </span>
                  <span aria-hidden className="font-mono text-[11px] text-silver">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-bold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
          {/* CTA cell */}
          <Reveal delay={0.2} className="h-full">
            <div className="flex h-full flex-col justify-center bg-gradient-to-br from-signal/[0.10] to-aqua/[0.06] p-7">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal">NEXT STEP</p>
              <Magnetic>
                <a href="/schools/contact" className="btn-primary mt-4 w-full">
                  {t.school.cta}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
