"use client";

import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useWebGLAvailable() {
  const [state, setState] = useState<"checking" | "ok" | "no">("checking");
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setState(gl ? "ok" : "no");
    } catch {
      setState("no");
    }
  }, []);
  return state;
}

/** Tracks element visibility to pause render loops offscreen. */
export function useInViewPause<T extends HTMLElement>() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.02 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
