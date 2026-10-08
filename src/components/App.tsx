"use client";

import { ReactNode, useEffect } from "react";
import Navigation from "./Navigation";
import { LenisProvider } from "@/lib/scroll";

/** Adds .is-in-view once, the first time a .rv / .rv-mask element is seen. */
function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv, .rv-mask"));
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((e) => e.classList.add("is-in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in-view");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

export default function App({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <RevealObserver />
      <Navigation />
      {children}
    </LenisProvider>
  );
}
