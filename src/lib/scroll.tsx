"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

/** Smooth-scroll to a section id (or y offset). Falls back to native scrolling. */
export function scrollToTarget(target: string | number, offset = 0) {
  if (typeof window === "undefined") return;
  const el = typeof target === "string" ? document.getElementById(target) : null;
  if (lenis) {
    if (el) lenis.scrollTo(el, { offset, duration: 1.4 });
    else if (typeof target === "number") lenis.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  else if (typeof target === "number") window.scrollTo({ top: target });
}

/** Freeze / release page scroll (used by the mobile menu). */
export function setScrollLocked(locked: boolean) {
  if (typeof document === "undefined") return;
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis = instance;
    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);
  return <>{children}</>;
}
