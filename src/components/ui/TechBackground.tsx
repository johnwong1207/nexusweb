"use client";

import { useEffect, useRef } from "react";

const CIRCUIT_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'%3E%3Cg fill='none' stroke='%2300D9FF' stroke-opacity='0.10' stroke-width='1'%3E%3Cpath d='M20 40h70v50h60'/%3E%3Ccircle cx='20' cy='40' r='3'/%3E%3Ccircle cx='150' cy='90' r='3'/%3E%3Cpath d='M300 200v60h-50v40'/%3E%3Ccircle cx='300' cy='200' r='3'/%3E%3Ccircle cx='250' cy='300' r='3'/%3E%3Cpath d='M60 300h40v-30h50'/%3E%3Ccircle cx='60' cy='300' r='3'/%3E%3Cpath d='M250 60h50v40'/%3E%3Ccircle cx='250' cy='60' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const N = 42;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00012,
      a: 0.12 + Math.random() * 0.25,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.floor(rect.width));
      h = canvas.height = Math.max(1, Math.floor(rect.height));
    };
    resize();
    window.addEventListener("resize", resize);

    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop();
    });
    obs.observe(canvas);

    function loop() {
      if (!visible) return;
      raf = requestAnimationFrame(loop);
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${p.a})`;
        ctx.fill();
      }
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

/** Understated technical backdrop: grid + circuit traces + drifting particles + noise. */
export function TechBackground({ variant = "page" }: { variant?: "page" | "hero" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 ${variant === "hero" ? "bg-blueprint" : "bg-blueprint-fine"} opacity-70`} />
      <div
        className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
        style={{ backgroundImage: CIRCUIT_SVG }}
      />
      <Particles />
      <div className="noise absolute inset-0" />
      {variant === "hero" && (
        <>
          <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-fabblue/[0.07] blur-[130px]" />
          <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-signal/[0.06] blur-[130px]" />
        </>
      )}
    </div>
  );
}
