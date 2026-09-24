"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type Node = { id: string; x: number; y: number; mastery: number; recent?: boolean };
type Edge = [string, string];

const NODES: Node[] = [
  { id: "Fractions", x: 0.16, y: 0.3, mastery: 92, recent: true },
  { id: "Algebra", x: 0.5, y: 0.22, mastery: 84, recent: true },
  { id: "Angles", x: 0.32, y: 0.66, mastery: 48 },
  { id: "Geometry", x: 0.62, y: 0.6, mastery: 54 },
  { id: "Statistics", x: 0.84, y: 0.32, mastery: 76 },
  { id: "Equations", x: 0.78, y: 0.74, mastery: 70 },
];

const EDGES: Edge[] = [
  ["Fractions", "Algebra"],
  ["Angles", "Geometry"],
  ["Geometry", "Algebra"],
  ["Algebra", "Statistics"],
  ["Geometry", "Equations"],
];

const PRACTICE_PATH = ["Angles", "Geometry", "Algebra"];

/** NEXUS Learning Graph — canvas constellation. Node size = confidence, glow = recent, dim = weak. */
export function LearningGraph() {
  const { t, lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 pulse along practice path
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let time = 0;
    let last = performance.now();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = Math.max(1, Math.floor(r.width * dpr));
      h = canvas.height = Math.max(1, Math.floor(r.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        loop();
      }
    });
    obs.observe(canvas);

    const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const pulse = lit ? progress : -1;

      // edges
      for (const [a, b] of EDGES) {
        const A = byId[a];
        const B = byId[b];
        const onPath =
          lit &&
          PRACTICE_PATH.includes(a) &&
          PRACTICE_PATH.includes(b) &&
          Math.abs(PRACTICE_PATH.indexOf(a) - PRACTICE_PATH.indexOf(b)) === 1;
        ctx.beginPath();
        ctx.moveTo(A.x * w, A.y * h);
        ctx.lineTo(B.x * w, B.y * h);
        ctx.strokeStyle = onPath ? "rgba(0,245,200,0.85)" : "rgba(0,217,255,0.16)";
        ctx.lineWidth = onPath ? 2 : 1;
        ctx.stroke();
      }

      // traveling pulse
      if (lit && pulse >= 0 && pulse <= 1 && !reduced.current) {
        const seg = Math.min(Math.floor(pulse * (PRACTICE_PATH.length - 1)), PRACTICE_PATH.length - 2);
        const f = pulse * (PRACTICE_PATH.length - 1) - seg;
        const A = byId[PRACTICE_PATH[seg]];
        const B = byId[PRACTICE_PATH[seg + 1]];
        const px = (A.x + (B.x - A.x) * f) * w;
        const py = (A.y + (B.y - A.y) * f) * h;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 22);
        g.addColorStop(0, "rgba(0,245,200,0.9)");
        g.addColorStop(1, "rgba(0,245,200,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of NODES) {
        const weak = n.mastery < 60;
        const r = (5 + n.mastery * 0.11) * (w / 600);
        const x = n.x * w;
        const y = n.y * h;
        if (n.recent && !weak) {
          ctx.shadowBlur = 16 + Math.sin(time * 2) * 4;
          ctx.shadowColor = "rgba(0,217,255,0.8)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = weak ? "rgba(113,129,141,0.35)" : "rgba(0,217,255,0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = weak ? "rgba(255,184,77,0.8)" : "rgba(244,250,252,0.5)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = weak ? "#FFB84D" : "#8FA8B5";
        ctx.font = `${Math.max(10, w / 52)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(`${n.id} ${n.mastery}`, x, y + r + 14);
      }
    }

    function loop() {
      if (!visible) return;
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      time += (now - last) / 1000;
      last = now;
      if (reduced.current && time > 0.1) {
        // static: draw once per state change
        cancelAnimationFrame(raf);
        draw();
        const check = setInterval(() => {
          if (visible) {
            draw();
            clearInterval(check);
          }
        }, 500);
        return;
      }
      draw();
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lit, progress]);

  function generate() {
    if (reduced.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(true);
      setProgress(1);
      return;
    }
    setLit(true);
    setProgress(0);
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / 2200, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <div className="etch rounded-xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{t.studentLife.graphTitle}</p>
          <p className="mt-1 text-[13px] text-muted">{t.studentLife.graphDesc}</p>
        </div>
      </div>
      <div ref={wrapRef} className="mt-4 h-64 w-full sm:h-72">
        <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label={t.studentLife.graphTitle} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={generate} className="btn-primary !px-5 !py-2.5 !text-[13px]">
          {t.studentLife.graphCta}
        </button>
        {lit && progress >= 1 && (
          <p className="text-[13px] font-semibold text-aqua" role="status">
            ✓ {t.studentLife.graphDone}
          </p>
        )}
      </div>
      <p className="sr-only" lang={lang === "zh" ? "zh-HK" : "en"}>
        {NODES.map((n) => `${n.id} ${n.mastery}`).join(", ")}
      </p>
    </div>
  );
}
