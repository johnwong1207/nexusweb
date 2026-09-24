"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../ui/SectionHeader";

function Packets({ reduced }: { reduced: boolean }) {
  const { t } = useLanguage();
  const steps = t.security.archSteps as unknown as string[];
  const routes = t.security.routerOptions as unknown as string[];

  // Node coordinates in a 320x460 viewBox
  const nodes = [
    { label: steps[0], x: 160, y: 34 },
    { label: steps[1], x: 160, y: 134 },
    { label: steps[2], x: 160, y: 234 },
  ];
  const outs = [
    { label: routes[0], x: 62, y: 350, dx: -98, color: "#00F5C8" },
    { label: routes[1], x: 160, y: 362, dx: 0, color: "#00D9FF" },
    { label: routes[2], x: 258, y: 350, dx: 98, color: "#1388FF" },
  ];

  return (
    <svg viewBox="0 0 320 420" className="mx-auto w-full max-w-[340px]" role="img" aria-label={t.security.archTitle}>
      <defs>
        <path id="p-main" d="M160,52 L160,116 M160,152 L160,216" fill="none" />
        <path id="p-left" d="M160,252 L62,332" fill="none" />
        <path id="p-mid" d="M160,252 L160,344" fill="none" />
        <path id="p-right" d="M160,252 L258,332" fill="none" />
      </defs>

      {/* static traces */}
      <g stroke="rgba(0,217,255,0.3)" strokeWidth="1.5">
        <line x1="160" y1="52" x2="160" y2="116" />
        <line x1="160" y1="152" x2="160" y2="216" />
        <line x1="160" y1="252" x2="62" y2="332" stroke="#00F5C8" strokeOpacity="0.5" strokeDasharray="5 4" />
        <line x1="160" y1="252" x2="160" y2="344" strokeOpacity="0.5" strokeDasharray="5 4" />
        <line x1="160" y1="252" x2="258" y2="332" stroke="#1388FF" strokeOpacity="0.5" strokeDasharray="5 4" />
      </g>

      {/* animated packets */}
      {!reduced && (
        <g>
          <circle r="4" fill="#00F5C8">
            <animateMotion dur="2.6s" repeatCount="indefinite">
              <mpath href="#p-main" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#00F5C8" opacity="0.9">
            <animateMotion dur="2.2s" begin="0.4s" repeatCount="indefinite" path="M160,252 L62,332" />
          </circle>
          <circle r="3.5" fill="#00D9FF" opacity="0.9">
            <animateMotion dur="2.2s" begin="1s" repeatCount="indefinite" path="M160,252 L160,344" />
          </circle>
          <circle r="3.5" fill="#1388FF" opacity="0.9">
            <animateMotion dur="3.1s" begin="1.6s" repeatCount="indefinite" path="M160,252 L258,332" />
          </circle>
        </g>
      )}

      {/* nodes */}
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 72} y={n.y - 18} width="144" height="36" rx="6" fill="#0A1722" stroke="rgba(0,217,255,0.45)" strokeWidth="1.2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#F4FAFC" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">
            {n.label}
          </text>
        </g>
      ))}
      {outs.map((o) => (
        <g key={o.label}>
          <rect x={o.x - 56} y={o.y - 18} width="112" height="40" rx="6" fill="#0A1722" stroke={o.color} strokeOpacity="0.55" strokeWidth="1.2" />
          <text x={o.x} y={o.y + 5} textAnchor="middle" fill="#F4FAFC" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
            {o.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Security() {
  const { t } = useLanguage();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <section id="security" className="relative bg-abyss py-20 md:py-28" aria-label={t.security.label}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeader align="left" eyebrow={t.security.label} title={t.security.title} subtitle={t.security.subtitle} />
          <ul className="mt-7 grid gap-2 sm:grid-cols-2">
            {(t.security.features as unknown as string[]).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-silicon/90">
                <span aria-hidden className="text-aqua">◈</span> {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-silver">{t.security.note}</p>
        </div>
        <Reveal delay={0.08}>
          <div className="etch rounded-xl p-6 sm:p-7">
            <p className="text-center font-mono text-[11px] tracking-[0.2em] text-signal">{t.security.archTitle}</p>
            <div className="mt-2">
              <Packets reduced={reduced} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-aqua/30 bg-aqua/[0.05] p-4">
                <p className="text-[13px] font-bold text-aqua">{t.secRoutes.sensitive}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{t.secRoutes.sensitiveDesc}</p>
              </div>
              <div className="rounded-lg border border-fabblue/30 bg-fabblue/[0.06] p-4">
                <p className="text-[13px] font-bold text-fabblue">{t.secRoutes.standard}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{t.secRoutes.standardDesc}</p>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-silver">✓ {t.secRoutes.packet}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
