"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";
import { vars } from "@/lib/util";

const css = `
.hero{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding-top:84px}
.hero-ghost{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-weight:800;text-transform:uppercase;white-space:nowrap;
  font-size:clamp(70px,15.5vw,300px);letter-spacing:-.06em;line-height:.8;color:transparent;-webkit-text-stroke:1px rgba(13,13,13,.16);
  pointer-events:none;user-select:none;z-index:0}
.hero-stage{display:flex;justify-content:center;max-width:100%}
.hero-video-wrap{position:relative;z-index:1;height:62svh;aspect-ratio:768/960;max-width:100%;mix-blend-mode:multiply;background:#fff}
.hero-video{width:100%;height:100%;object-fit:cover;background:#fff}
.hero-copy{position:relative;z-index:2;width:100%;padding:8px var(--gutter) 56px;display:flex;flex-direction:column;gap:22px;max-width:1320px;margin-inline:auto}
.hero-kicker{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.hero-h1{font-size:clamp(46px,13vw,76px);font-weight:700;letter-spacing:-.05em;line-height:.95}
.hero-h1 em{font-family:var(--font-serif);font-weight:400;color:var(--mute);letter-spacing:-.02em;display:block}
.hero-cta{display:flex;flex-wrap:wrap;gap:10px}
.hero-meta{display:none}
.hero-sound{position:absolute;right:var(--gutter);top:calc(62svh + 84px - 70px);z-index:3;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;
  display:grid;place-items:center;transition:transform .5s var(--ease),background-color .3s var(--ease)}
.hero-sound:hover{transform:scale(1.08);background:#2a2a2a}
.hero-sound svg{width:16px;height:16px;fill:currentColor}
.hero-sound.is-blocked::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 1px rgba(13,13,13,.45);animation:hero-ping 1.8s var(--ease) infinite}
@keyframes hero-ping{0%{transform:scale(1);opacity:.9}100%{transform:scale(1.9);opacity:0}}
@media(min-width:900px){
  .hero{height:min(100svh,1100px);min-height:640px;padding-top:0;justify-content:flex-end}
  .hero-ghost{top:46%}
  .hero-stage{position:absolute;left:0;right:0;bottom:0;pointer-events:none}
  .hero-video-wrap{height:min(96svh,1040px)}
  .hero-copy{position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:100%;padding-bottom:clamp(40px,10vh,96px);
    display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:0;pointer-events:none}
  .hero-copy>*{pointer-events:auto}
  .hero-left{display:flex;flex-direction:column;gap:22px;max-width:560px;grid-column:1}
  .hero-h1{font-size:clamp(56px,6.6vw,104px)}
  .hero-meta{display:flex;flex-direction:column;gap:6px;grid-column:3;justify-self:end;text-align:right;font-family:var(--font-mono);font-size:12px;color:var(--mute)}
  .hero-sound{top:auto;bottom:clamp(40px,10vh,96px);right:auto;left:calc(50% + min(38.4svh,416px) + 12px)}
}
`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useRef(true);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(true);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => undefined);
  }, []);

  // autoplay: try with sound first, fall back to muted
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReducedMotion()) {
      v.pause();
      return;
    }
    v.muted = false;
    v.play()
      .then(() => {
        setSoundOn(true);
        setBlocked(false);
      })
      .catch(() => {
        v.muted = true;
        setSoundOn(false);
        setBlocked(true);
        v.play().catch(() => undefined);
      });
  }, []);

  // unlock sound on the first user gesture
  useEffect(() => {
    if (!blocked) return;
    const unlock = () => {
      const v = videoRef.current;
      if (!v || !visible.current || prefersReducedMotion()) return;
      v.muted = false;
      v.play()
        .then(() => {
          setSoundOn(true);
          setBlocked(false);
        })
        .catch(() => {
          v.muted = true;
        });
    };
    const evts: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchend"];
    evts.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true }));
    return () => evts.forEach((e) => window.removeEventListener(e, unlock));
  }, [blocked]);

  // pause (and silence) the video when less than 35% of the hero is visible
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const show = entry.intersectionRatio >= 0.35;
        visible.current = show;
        if (show) {
          if (!prefersReducedMotion() || !v.muted) tryPlay();
        } else v.pause();
      },
      { threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tryPlay]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted || v.paused) {
      v.muted = false;
      v.play()
        .then(() => {
          setSoundOn(true);
          setBlocked(false);
        })
        .catch(() => undefined);
    } else {
      v.muted = true;
      setSoundOn(false);
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <style>{css}</style>
      <div className="hero-ghost" aria-hidden="true">{PROFILE.firstName}</div>

      <div className="hero-stage">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/poster.jpg"
          aria-label={`Video: ${PROFILE.name} introduces himself. Use the sound button to hear it.`}
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>
      </div>

      <button
        type="button"
        className={`hero-sound${blocked && !soundOn ? " is-blocked" : ""}`}
        onClick={toggleSound}
        aria-label={soundOn ? "Turn intro sound off" : "Turn intro sound on"}
        aria-pressed={soundOn}
      >
        {soundOn ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.4" height="12" rx="1" /><rect x="9.6" y="2" width="3.4" height="12" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6a.6.6 0 0 0 .9.5l9-5.8a.6.6 0 0 0 0-1L4.9 1.7a.6.6 0 0 0-.9.5z" /></svg>
        )}
      </button>

      <div className="hero-copy">
        <div className="hero-left">
          <p className="hero-kicker rv" style={vars({ "--i": 0 })}>
            {PROFILE.name} · {PROFILE.location}
          </p>
          <h1 id="hero-title" className="hero-h1">
            <span className="rv-mask"><span>Frontend</span></span>
            <span className="rv-mask" style={vars({ "--i": 1 })}><span><em>Developer.</em></span></span>
          </h1>
          <div className="hero-cta rv" style={vars({ "--i": 2 })}>
            <a href="#work" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToTarget("work"); }}>Explore work</a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); scrollToTarget("contact"); }}>Let&apos;s talk</a>
            <a href={PROFILE.resume} className="btn btn-ghost" download>Résumé</a>
          </div>
        </div>
        <div className="hero-meta rv" style={vars({ "--i": 3 })}>
          <span>MIS graduate · {PROFILE.grade}</span>
          <span>Training: ITI · DEPI · NTI</span>
        </div>
      </div>
    </section>
  );
}
