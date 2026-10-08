"use client";

import { useEffect, useRef, useState } from "react";
import { TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import { vars } from "@/lib/util";
import SectionHead from "../ui/SectionHead";

const css = `
.tl{position:relative;margin-top:clamp(40px,6vw,72px);padding-left:44px}
.tl-line,.tl-fill{position:absolute;left:11px;top:6px;bottom:6px;width:2px;border-radius:2px}
.tl-line{background:var(--line)}
.tl-fill{background:var(--ink);transform-origin:top;transform:scaleY(var(--p,0))}
.stop{position:relative;padding:0 0 clamp(36px,5vw,56px);display:grid;gap:10px}
.stop::before{content:"";position:absolute;left:-44px;top:4px;width:24px;height:24px;border-radius:50%;background:var(--paper);
  box-shadow:inset 0 0 0 2px var(--faint);transition:box-shadow .6s var(--ease),background-color .6s var(--ease)}
.stop::after{content:"";position:absolute;left:-36px;top:12px;width:8px;height:8px;border-radius:50%;background:#fff;transform:scale(0);transition:transform .6s var(--ease)}
.stop.is-lit::before{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink)}
.stop.is-lit::after{transform:scale(1)}
.stop .per{font-family:var(--font-mono);font-size:13px;color:var(--mute)}
.stop .kind{display:inline-block;margin-left:10px;padding:2px 10px;border-radius:99px;font-size:11px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);color:var(--ink-2)}
.stop h3{font-size:clamp(24px,3vw,38px);font-weight:700;letter-spacing:-.04em;line-height:1.08}
.stop .pl{color:var(--mute);font-size:15px}
.stop .dt{max-width:62ch;color:var(--ink-2);font-size:15px}
.stop>*{opacity:.35;transition:opacity .7s var(--ease)}
.stop.is-lit>*{opacity:1}
.next{margin-top:8px;padding:28px clamp(20px,3vw,36px);border-radius:26px;border:1.5px dashed rgba(13,13,13,.28);display:flex;flex-wrap:wrap;align-items:baseline;gap:10px 18px}
.next .l{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.next .t{font-size:clamp(26px,3.6vw,46px);font-weight:700;letter-spacing:-.045em;line-height:1}
@media(min-width:760px){
  .stop{grid-template-columns:210px minmax(0,1fr);column-gap:32px;row-gap:6px}
  .stop .per{grid-row:1/4;padding-top:10px}
  .stop .kind{display:block;margin:8px 0 0;width:max-content}
}
@media(prefers-reduced-motion:reduce){.tl-fill{transform:scaleY(1)}}
`;

export default function Experience() {
  const tlRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(tlRef);
  const [geo, setGeo] = useState<{ h: number; tops: number[] }>({ h: 1, tops: [] });

  useEffect(() => {
    const measure = () => {
      const tl = tlRef.current;
      if (!tl) return;
      const tops = Array.from(tl.querySelectorAll<HTMLElement>(".stop")).map((s) => s.offsetTop + 16);
      setGeo({ h: Math.max(1, tl.offsetHeight), tops });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead index="05" label="Experience" title="Education and work," accent="one path." id="exp-title" />
        <div className="tl" ref={tlRef} style={vars({ "--p": p.toFixed(3) })}>
          <span className="tl-line" aria-hidden="true" />
          <span className="tl-fill" aria-hidden="true" />
          <ol>
            {TIMELINE.map((t, i) => {
              const lit = geo.tops[i] !== undefined && geo.tops[i] / geo.h <= p + 0.01;
              return (
                <li key={`${t.title}-${t.sort}`} className={`stop${lit ? " is-lit" : ""}`}>
                  <p className="per">{t.period}<span className="kind">{t.kind}</span></p>
                  <h3>{t.title}</h3>
                  <p className="pl">{t.place}</p>
                  <p className="dt">{t.detail}</p>
                </li>
              );
            })}
          </ol>
          <div className="next rv">
            <span className="l">Next</span>
            <span className="t">Your team?</span>
          </div>
        </div>
      </div>
    </section>
  );
}
