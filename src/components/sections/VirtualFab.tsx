"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { FabFallback } from "../three/VirtualFabScene";
import type { FilmMethod } from "../three/SemiconductorWafer";

const VirtualFabScene = dynamic(() => import("../three/VirtualFabScene"), {
  ssr: false,
  loading: () => <FabFallback stageLabel="···" />,
});

export function VirtualFab() {
  const { t } = useLanguage();
  const steps = t.fab.steps as unknown as { title: string; desc: string }[];
  const missions = t.fab.missions as unknown as string[];
  const [stage, setStage] = useState(0);
  const [film, setFilm] = useState<FilmMethod>("PVD");
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.stage);
            if (!Number.isNaN(i)) setStage(i);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="fab" className="relative bg-abyss py-20 md:py-28" aria-label={t.fab.label}>
      <div className="absolute inset-0 bg-blueprint-fine opacity-40 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,black,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={t.fab.label} title={t.fab.title} subtitle={t.fab.subtitle} />
        <p className="mx-auto mt-4 w-fit rounded-sm border border-signal/30 bg-signal/[0.06] px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-signal">
          {t.fab.target}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* sticky visual + mission console */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="etch rounded-xl p-4">
                <VirtualFabScene stage={stage} film={film} stageLabel={`0${stage + 1} · ${steps[stage]?.title ?? ""}`} />
                <p className="mt-2 text-center text-xs text-silver">{t.fab.note}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="etch mt-4 rounded-xl p-5" aria-label="mission console">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-amberx">{t.fabMission.mission}</p>
                  {stage === 4 && (
                    <div className="flex gap-1.5" role="group" aria-label="film method">
                      {(["PVD", "CVD"] as FilmMethod[]).map((m) => (
                        <button
                          key={m}
                          onClick={() => setFilm(m)}
                          aria-pressed={film === m}
                          className={`rounded-sm px-2.5 py-1 font-mono text-[11px] font-bold transition ${film === m ? "bg-signal/15 text-signal" : "text-silver hover:text-paper"}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-2 font-bold text-paper">{t.fabMission.title}</p>
                <p className="mt-1 text-[13px] text-muted">{t.fabMission.target}</p>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between font-mono text-[11px] text-silver">
                    <span>{t.fabMission.progress}</span>
                    <span className="text-signal">64%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]" role="progressbar" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-signal to-aqua" />
                  </div>
                </div>
                <button className="mt-4 w-full rounded-lg border border-aqua/40 bg-aqua/[0.07] px-4 py-2.5 text-[13px] font-bold text-aqua transition hover:bg-aqua/[0.14]">
                  🤖 {t.fabMission.tutor} — {t.fabMission.hint}
                </button>
              </div>
            </Reveal>
          </div>

          {/* scroll stages */}
          <ol className="space-y-3">
            {steps.map((s, i) => {
              const active = stage === i;
              return (
                <li
                  key={s.title}
                  data-stage={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={`rounded-xl border p-5 transition-all duration-300 ${active ? "border-signal/45 bg-signal/[0.05] shadow-glow" : "hairline bg-deep/60"}`}
                  aria-current={active ? "step" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${active ? "text-signal" : "text-silver"}`}>0{i + 1}</span>
                    <p className={`font-bold ${active ? "text-paper" : "text-silicon/85"}`}>{s.title}</p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
                  {i === 2 && active && (
                    <p className="mt-2 font-mono text-[11px] text-signal">wafer + photoresist + mask + ▓ light beam</p>
                  )}
                  {i === 3 && active && (
                    <div className="mt-2 flex gap-2 font-mono text-[11px]">
                      <span className="rounded-sm bg-aqua/10 px-2 py-1 text-aqua">Correct Etch</span>
                      <span className="rounded-sm bg-white/[0.04] px-2 py-1 text-silver">Under-Etch</span>
                      <span className="rounded-sm bg-amberx/10 px-2 py-1 text-amberx">Over-Etch</span>
                    </div>
                  )}
                  {i === 4 && active && (
                    <p className="mt-2 font-mono text-[11px] text-signal">PVD vs CVD — {film} active</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* missions + tutor */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="etch h-full rounded-xl p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.fab.missionsTitle}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {missions.map((m, i) => (
                  <li key={m} className="flex items-start gap-2 text-[13px] text-silicon/90">
                    <span aria-hidden className="font-mono text-[11px] text-signal">M0{i + 1}</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="etch h-full rounded-xl p-6">
              <p className="font-bold text-paper">🤖 {t.fab.tutorTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.fab.tutorDesc}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
