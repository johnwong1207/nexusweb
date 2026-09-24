"use client";

import { Suspense, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { NexusCore } from "./NexusCore";
import { useInViewPause, usePrefersReducedMotion, useWebGLAvailable } from "./webgl";

export function CoreFallback({ labels }: { labels: string[] }) {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[540px]"
      role="img"
      aria-label="NEXUS Learning Core: central wafer connected to AI Tutor, Student, Teacher, Parent, Assessment, Analytics, STEM and School"
    >
      <div className="absolute inset-[10%] rounded-full border border-signal/30" aria-hidden />
      <div className="absolute inset-[3%] rounded-full border border-aqua/20" aria-hidden />
      <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.16),transparent_70%)]" aria-hidden />
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal/60 bg-deep text-center font-mono text-[11px] font-bold tracking-[0.2em] text-signal shadow-glow">
        NEXUS
        <br />
        CORE
      </div>
      {/* circuit ticks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <span
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-3 w-px bg-signal/40"
            style={{ transform: `rotate(${a}rad) translateY(-88px)`, transformOrigin: "center" }}
          />
        );
      })}
      {labels.slice(0, 8).map((label, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 40;
        const y = 50 + Math.sin(angle) * 40;
        return (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-silicon/25 bg-abyss/90 px-2 py-0.5 font-mono text-[10px] tracking-wider text-paper"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

type Props = {
  labels: string[];
  heroRef: RefObject<HTMLElement>;
};

export default function LearningUniverse({ labels, heroRef }: Props) {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  const { ref, visible } = useInViewPause<HTMLDivElement>();

  if (webgl === "no") return <CoreFallback labels={labels} />;
  if (webgl === "checking") return <CoreFallback labels={labels} />;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 8.4], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={0.9} color="#F4FAFC" />
        <directionalLight position={[-5, -2, -3]} intensity={0.35} color="#00D9FF" />
        <Suspense fallback={null}>
          <NexusCore labels={labels} reduced={reduced} heroRef={heroRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
