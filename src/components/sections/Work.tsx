"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import { vars } from "@/lib/util";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";

const css = `
.wk{display:flex;flex-direction:column;gap:10px;margin-top:clamp(36px,5vw,64px)}
.pn{position:relative;display:grid;grid-template-rows:auto 0fr;border-radius:26px;background:var(--card);overflow:hidden;
  box-shadow:inset 0 0 0 1px var(--line);transition:grid-template-rows .9s var(--ease),box-shadow .6s var(--ease)}
.pn.is-open{grid-template-rows:auto 1fr;box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -42px rgba(13,13,13,.35)}
.pn:has(.spine:focus-visible){outline:2px solid var(--ink);outline-offset:3px}
.spine{display:flex;align-items:center;gap:14px;width:100%;padding:20px 22px;text-align:left;border-radius:26px}
.spine:focus-visible{outline:none}
.spine .no{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.spine .vt{flex:1;font-size:18px;font-weight:600;letter-spacing:-.03em;line-height:1.15}
.plus{position:relative;flex:none;width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);
  transition:transform .6s var(--ease),background-color .3s var(--ease),color .3s var(--ease)}
.plus::before,.plus::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:1.5px;margin:-.75px 0 0 -6px;background:currentColor}
.plus::after{transform:rotate(90deg)}
.spine:hover .plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.pn.is-open .plus{transform:rotate(45deg)}
.bw{min-height:0;overflow:hidden}
.pn:not(.is-open) .bw{visibility:hidden;transition:visibility 0s linear .9s}
.body{display:grid;gap:22px;padding:6px 22px 24px}
.pk{font-family:var(--font-mono);font-size:12px;color:var(--mute);display:flex;gap:10px;align-items:center}
.pk b{font-weight:500;color:var(--ink)}
.pt{font-size:clamp(34px,5vw,54px);font-weight:700;letter-spacing:-.045em;line-height:1;margin:10px 0 14px}
.pd{font-size:15px;color:var(--ink-2);max-width:46ch}
.feat{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 16px;margin-top:16px;font-size:13px;color:var(--ink-2)}
.feat li{position:relative;padding-left:14px}
.feat li::before{content:"";position:absolute;left:0;top:.62em;width:5px;height:5px;border-radius:50%;background:var(--ink)}
.tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}
.tech li{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 11px 0 8px;border-radius:99px;background:var(--paper);font-size:12px;font-weight:500;box-shadow:inset 0 0 0 1px var(--line)}
.tech li.nologo{padding-left:11px}

.mock{position:relative;aspect-ratio:5/6;border-radius:18px;background:var(--soft);overflow:hidden;box-shadow:inset 0 0 0 1px var(--line),0 24px 40px -28px rgba(13,13,13,.45);
  clip-path:inset(0 100% 0 0);transition:clip-path .5s var(--ease)}
.mock img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 0%;transform:scale(1.1);transition:transform 1.6s var(--ease)}
.pn.is-open .mock{clip-path:inset(0 0 0 0);transition:clip-path 1.2s var(--ease) .3s}
.pn.is-open .mock img{transform:scale(1);transition-delay:.3s}
.pbtns{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}

@media(min-width:1000px){
  .wk{flex-direction:row;height:min(78svh,600px);min-height:540px}
  .pn{display:block;flex:1 1 0;min-width:0;transition:flex .9s var(--ease),box-shadow .6s var(--ease)}
  .pn.is-open{flex:8}
  .spine{position:absolute;inset:0;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;gap:0;transition:opacity .4s var(--ease)}
  .spine .vt{flex:none;writing-mode:vertical-rl;transform:rotate(180deg);font-size:20px;white-space:nowrap}
  .pn.is-open .spine{opacity:0;pointer-events:none}
  .bw{position:absolute;inset:0}
  .pn:not(.is-open) .bw{transition-delay:.5s}
  .body{min-width:640px;height:100%;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:28px;padding:34px;opacity:0;transition:opacity .3s var(--ease)}
  .pn.is-open .body{opacity:1;transition:opacity .6s var(--ease) .4s}
  .mock{aspect-ratio:auto;align-self:stretch;min-height:0}
}
@media(prefers-reduced-motion:reduce){.pn,.mock,.body{transition:none!important}}
`;

export default function Work() {
  const [open, setOpen] = useState(0);

  const hoverOpen = (i: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1000px)").matches) setOpen(i);
  };

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead index="03" label="Selected work" title="Things I've" accent="built." id="work-title" />
        <div className="wk">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <article
                key={p.id}
                className={`pn${isOpen ? " is-open" : ""}`}
                onMouseEnter={() => hoverOpen(i)}
                onFocus={() => setOpen(i)}
              >
                <button
                  type="button"
                  className="spine"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${p.id}`}
                  aria-label={`${p.index} ${p.title}`}
                  onClick={() => setOpen(i)}
                >
                  <span className="no">{p.index}</span>
                  <span className="vt">{p.title}</span>
                  <span className="plus" aria-hidden="true" />
                </button>
                <div className="bw" id={`panel-${p.id}`} role="region" aria-label={p.title} inert={!isOpen}>
                  <div className="body">
                    <div>
                      <p className="pk"><b>{p.index}</b>{p.kicker}</p>
                      <h3 className="pt">{p.title}</h3>
                      <p className="pd">{p.description}</p>
                      <ul className="feat">{p.features.map((f) => (<li key={f}>{f}</li>))}</ul>
                      <ul className="tech" aria-label="Technologies">
                        {p.tech.map((t, k) => (
                          <li key={t} className={p.techLogos[k] ? "" : "nologo"}>
                            {p.techLogos[k] && <TechLogo name={p.techLogos[k]} size={14} />}
                            {t}
                          </li>
                        ))}
                      </ul>
                      <div className="pbtns">
                        {p.demo && (
                          <a className="btn btn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">Live demo<span aria-hidden="true"> ↗</span></a>
                        )}
                        {p.github && (
                          <a className="btn btn-ghost" href={p.github} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        )}
                      </div>
                    </div>
                    <div className="mock" style={vars({ "--i": i })}>
                      <img src={p.image} width={800} height={1180} alt={`${p.title} website screenshot`} loading="lazy" decoding="async" draggable={false} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
