"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SemiconductorWafer, type FilmMethod } from "./SemiconductorWafer";
import { useInViewPause, usePrefersReducedMotion, useWebGLAvailable } from "./webgl";

export function FabFallback({ stageLabel }: { stageLabel: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]" role="img" aria-label={`Stylised semiconductor wafer, ${stageLabel}`}>
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.14),transparent_70%)]" aria-hidden />
      <div className="absolute inset-[14%] rounded-full border border-signal/50 bg-gradient-to-br from-panel to-abyss shadow-glow" aria-hidden />
      <div className="absolute inset-[24%] rounded-full border border-signal/30" aria-hidden />
      <div className="absolute inset-[34%] rounded-full border border-aqua/25" aria-hidden />
      <div className="absolute inset-[44%] rounded-full bg-aqua/20" aria-hidden />
      {/* die grid hint */}
      <div
        aria-hidden
        className="absolute inset-[24%] rounded-full opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.25) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-signal/40 bg-abyss/80 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-signal">
        {stageLabel}
      </div>
    </div>
  );
}

type Props = {
  stage: number;
  film?: FilmMethod;
  stageLabel: string;
};

export default function VirtualFabScene({ stage, film = "PVD", stageLabel }: Props) {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  const { ref, visible } = useInViewPause<HTMLDivElement>();

  if (webgl === "no" || webgl === "checking") return <FabFallback stageLabel={stageLabel} />;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[460px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.1, 5.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={0.9} color="#F4FAFC" />
        <directionalLight position={[-4, 1, -3]} intensity={0.4} color="#00D9FF" />
        <Suspense fallback={null}>
          <SemiconductorWafer stage={stage} film={film} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
