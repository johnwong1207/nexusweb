"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { CampusFallback, type CampusStation } from "../three/StemCampusScene";

const StemCampusScene = dynamic(() => import("../three/StemCampusScene"), {
  ssr: false,
  loading: () => <CampusFallback stations={[]} />,
});

export function StemCampus() {
  const { t } = useLanguage();
  const stations = t.campus.stations as unknown as CampusStation[];
  const [hovered, setHovered] = useState<{ i: number; s: CampusStation } | null>(null);

  return (
    <section className="relative bg-abyss py-20 md:py-28" aria-label={t.campus.label}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.campus.label} title={t.campus.title} subtitle={t.campus.subtitle} />
        <p className="mt-3 text-center font-mono text-[11px] tracking-[0.2em] text-silver">{t.campus.hint}</p>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[55%_45%]">
          <Reveal>
            <div className="etch rounded-xl p-4">
              <StemCampusScene
                stations={stations}
                onHover={(i, s) => setHovered(i === null || s === null ? null : { i, s })}
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="space-y-2">
              {stations.map((s, i) => {
                const active = hovered?.i === i;
                return (
                  <li
                    key={s.name}
                    onMouseEnter={() => setHovered({ i, s })}
                    onMouseLeave={() => setHovered(null)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${active ? "border-aqua/50 bg-aqua/[0.06]" : "hairline bg-deep/60"}`}
                  >
                    <span className={`font-mono text-[11px] font-bold ${active ? "text-aqua" : "text-silver"}`}>0{i + 1}</span>
                    <div>
                      <p className={`text-sm font-bold ${active ? "text-paper" : "text-silicon/85"}`}>{s.name}</p>
                      <p className="font-mono text-[11px] text-muted">{s.lab}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
