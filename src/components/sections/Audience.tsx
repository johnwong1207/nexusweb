"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { TiltCard } from "../ui/TiltCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Magnetic } from "../ui/Magnetic";

type Accent = "cyan" | "aqua" | "blue";

const ACCENT: Record<Accent, { text: string; border: string; line: string; glow: string }> = {
  cyan: { text: "text-signal", border: "hover:border-signal/50", line: "from-signal to-signal/0", glow: "group-hover:shadow-glow" },
  aqua: { text: "text-aqua", border: "hover:border-aqua/50", line: "from-aqua to-aqua/0", glow: "group-hover:shadow-[0_0_32px_rgba(0,245,200,0.18)]" },
  blue: { text: "text-fabblue", border: "hover:border-fabblue/50", line: "from-fabblue to-fabblue/0", glow: "group-hover:shadow-[0_0_32px_rgba(19,136,255,0.22)]" },
};

export function Audience() {
  const { t } = useLanguage();

  const cards: { id: string; tag: string; headline: string; benefits: string[]; cta: string; href: string; badge?: string; icon: string; accent: Accent }[] = [
    {
      id: "schools",
      tag: t.audiences.schools.tag,
      headline: t.audiences.schools.headline,
      benefits: t.audiences.schools.benefits as unknown as string[],
      cta: t.audiences.schools.cta,
      href: "/schools/contact",
      icon: "▣",
      accent: "cyan",
    },
    {
      id: "students",
      tag: t.audiences.students.tag,
      headline: t.audiences.students.headline,
      benefits: t.audiences.students.benefits as unknown as string[],
      cta: t.audiences.students.cta,
      href: "/student/signup",
      badge: t.audiences.students.badge,
      icon: "◈",
      accent: "aqua",
    },
    {
      id: "parents",
      tag: t.audiences.families.tag,
      headline: t.audiences.families.headline,
      benefits: t.audiences.families.benefits as unknown as string[],
      cta: t.audiences.families.cta,
      href: "/family/signup",
      badge: t.audiences.families.note,
      icon: "⬢",
      accent: "blue",
    },
  ];

  return (
    <section id="product" className="relative bg-abyss py-20 md:py-28" aria-label={t.audiences.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.audiences.label} title={t.audiences.title} subtitle={t.audiences.subtitle} />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cards.map((c, i) => {
            const a = ACCENT[c.accent];
            return (
              <Reveal key={c.id} delay={i * 0.07}>
                <TiltCard className="h-full" maxTilt={4}>
                  <article
                    id={c.id === "schools" ? "schools" : c.id === "students" ? "students" : "parents"}
                    className={`group flex h-full flex-col rounded-xl border hairline bg-deep/70 p-7 transition-all duration-300 hover:-translate-y-1 ${a.border} ${a.glow}`}
                  >
                    {/* drawing top line */}
                    <span aria-hidden className={`absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r ${a.line} transition-transform duration-500 group-hover:scale-x-100`} />
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[11px] tracking-[0.24em] ${a.text}`}>{c.tag}</span>
                      <span aria-hidden className={`text-xl ${a.text} transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-6`}>
                        {c.icon}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold leading-snug text-paper">{c.headline}</h3>
                    <ul className="mt-5 flex-1 space-y-2">
                      {c.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-silicon/90">
                          <span aria-hidden className={a.text}>—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    {c.badge && (
                      <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-sm border border-aqua/30 bg-aqua/[0.07] px-2.5 py-1 font-mono text-[11px] text-aqua">
                        ✓ {c.badge}
                      </p>
                    )}
                    <Magnetic>
                      <a href={c.href} className="btn-secondary mt-6 w-full !py-3">
                        {c.cta} →
                      </a>
                    </Magnetic>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
