"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { usePageScroll } from "@/lib/hooks";
import { scrollToTarget, setScrollLocked } from "@/lib/scroll";
import { vars } from "@/lib/util";

const css = `
.nav{position:fixed;inset:0 0 auto 0;z-index:50;display:flex;align-items:center;justify-content:space-between;
  padding:18px var(--gutter);pointer-events:none}
.nav>*{pointer-events:auto}
.nav-progress{position:fixed;top:0;left:0;right:0;height:2px;background:var(--ink);transform-origin:0 50%;z-index:60;pointer-events:none}
.nav-brand{display:flex;align-items:center;gap:12px;border-radius:999px}
.nav-mark{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:14px;letter-spacing:-.04em;
  box-shadow:inset 0 0 0 1.5px var(--ink);color:var(--ink);background:transparent;
  transition:background-color .4s var(--ease),color .4s var(--ease),transform .9s var(--ease)}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.nav.is-scrolled .nav-mark{background:var(--ink);color:#fff}
.nav-name{font-weight:600;letter-spacing:-.02em;font-size:15px;transition:opacity .4s var(--ease),transform .4s var(--ease)}
.nav.is-scrolled .nav-name{opacity:0;transform:translateX(-8px);pointer-events:none}
.nav-pill{position:relative;display:none;align-items:center;gap:2px;padding:5px;border-radius:999px;
  transition:background-color .4s var(--ease),box-shadow .4s var(--ease),backdrop-filter .4s var(--ease)}
.nav.is-scrolled .nav-pill{background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
  box-shadow:inset 0 0 0 1px var(--line),0 12px 32px -18px rgba(13,13,13,.25)}
.nav-ind{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;background:var(--ink);opacity:0;
  transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s var(--ease);z-index:0}
.nav-link{position:relative;z-index:1;padding:9px 16px;border-radius:999px;font-size:14px;font-weight:500;letter-spacing:-.01em;
  color:var(--ink-2);transition:color .35s var(--ease)}
.nav-link:hover{color:var(--ink)}
.nav-link.is-active{color:#fff}
.nav-menu{height:44px;padding:0 20px;border-radius:999px;font-size:14px;font-weight:500;background:rgba(255,255,255,.72);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line);position:relative;z-index:80}
@media(min-width:900px){.nav-pill{display:flex}.nav-menu{display:none}}

.ov{position:fixed;inset:0;z-index:70;background:var(--paper);display:flex;flex-direction:column;justify-content:center;
  padding:96px var(--gutter) 40px;clip-path:circle(0px at calc(100% - 64px) 40px);visibility:hidden;
  transition:clip-path .9s var(--ease),visibility 0s linear .9s}
.ov.is-open{clip-path:circle(150% at calc(100% - 64px) 40px);visibility:visible;transition:clip-path .9s var(--ease),visibility 0s}
.ov a{display:flex;align-items:baseline;gap:16px;padding:10px 0;font-size:clamp(34px,10vw,64px);font-weight:700;letter-spacing:-.045em;line-height:1.05;
  border-bottom:1px solid var(--line);opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.ov.is-open a{opacity:1;transform:none;transition-delay:calc(.15s + var(--i)*60ms)}
.ov a span{font-family:var(--font-mono);font-size:12px;font-weight:400;color:var(--mute);letter-spacing:0}
.ov-foot{margin-top:28px;font-family:var(--font-mono);font-size:12px;color:var(--mute)}
@media(min-width:900px){.ov{display:none}}
`;

export default function Navigation() {
  const { y, progress } = usePageScroll();
  const scrolled = y > 40;
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState({ x: 0, w: 0 });
  const pillRef = useRef<HTMLDivElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  // active section tracking
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const current = NAV.filter((n) => seen.get(n.id)).map((n) => n.id).pop() ?? "";
        setActive(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // indicator position
  const measure = useCallback(() => {
    const el = links.current[active];
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active]);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // mobile menu: Esc + scroll lock
  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useEffect(() => () => setScrollLocked(false), []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      setScrollLocked(false);
      requestAnimationFrame(() => scrollToTarget(id));
    } else scrollToTarget(id);
  };

  return (
    <>
      <style>{css}</style>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <a href="#top" className="nav-brand" aria-label={`${PROFILE.name}, back to top`} onClick={(e) => { e.preventDefault(); scrollToTarget(0); }}>
          <span className="nav-mark" aria-hidden="true">{PROFILE.initials}</span>
          <span className="nav-name">{PROFILE.name}</span>
        </a>

        <nav aria-label="Primary" className="nav-pill" ref={pillRef}>
          <span className="nav-ind" aria-hidden="true" style={{ width: ind.w, transform: `translateX(${ind.x}px)`, opacity: active ? 1 : 0 }} />
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              ref={(el) => { links.current[n.id] = el; }}
              className={`nav-link${active === n.id ? " is-active" : ""}`}
              aria-current={active === n.id ? "true" : undefined}
              onClick={go(n.id)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button type="button" className="nav-menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div id="mobile-menu" className={`ov${open ? " is-open" : ""}`} role="dialog" aria-label="Menu" aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} style={vars({ "--i": i })} tabIndex={open ? 0 : -1} onClick={go(n.id)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <p className="ov-foot">{PROFILE.email}</p>
      </div>
    </>
  );
}
