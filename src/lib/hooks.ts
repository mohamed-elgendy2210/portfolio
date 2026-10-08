"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once the element has entered the viewport (fires once by default). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {},
): boolean {
  const { threshold = 0.2, rootMargin = "0px", once = true } = options;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);
  return inView;
}

/** 0 → 1 progress of `ref` scrolling through the viewport (top at 80% → bottom at 60%). */
export function useScrollProgress<T extends Element>(ref: RefObject<T | null>): number {
  const [p, setP] = useState(0);
  const last = useRef(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = vh * 0.6;
      const v = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
      if (Math.abs(v - last.current) > 0.002) {
        last.current = v;
        setP(v);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/** Whole-page scroll progress 0 → 1 and the raw scrollY. */
export function usePageScroll(): { y: number; progress: number } {
  const [s, setS] = useState({ y: 0, progress: 0 });
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setS((prev) => {
        const progress = max > 0 ? Math.min(1, y / max) : 0;
        const crossed = (y > 40) !== (prev.y > 40);
        return crossed || Math.abs(progress - prev.progress) > 0.001 ? { y, progress } : prev;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return s;
}
