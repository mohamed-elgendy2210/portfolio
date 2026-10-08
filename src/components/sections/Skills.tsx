"use client";

import { useRef, useState } from "react";
import { SKILL_FAMILIES, SKILL_GROUPS, SKILL_PROJECTS, type Skill, type SkillFamily } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { vars } from "@/lib/util";
import SectionHead from "../ui/SectionHead";
import TechLogo, { isBrand, logoTint } from "../ui/TechLogo";

const css = `
.sk-layout{display:grid;gap:28px;grid-template-columns:minmax(0,1fr);margin-top:clamp(36px,5vw,64px)}
.sk-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:30px}
.chip{height:38px;padding:0 16px;border-radius:999px;font-size:13.5px;font-weight:500;box-shadow:inset 0 0 0 1px rgba(13,13,13,.18);
  transition:background-color .3s var(--ease),color .3s var(--ease),transform .5s var(--ease)}
.chip:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px var(--ink)}
.chip[aria-pressed="true"]{background:var(--ink);color:#fff;box-shadow:none}
.chip small{font-family:var(--font-mono);font-size:10.5px;opacity:.6;margin-left:6px}
.sk-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.tile{--d:var(--d4);position:relative;min-height:112px;border-radius:16px;background:var(--card);padding:8px 8px 9px;text-align:left;
  display:flex;flex-direction:column;overflow:hidden;box-shadow:inset 0 0 0 1px var(--line);
  transition:opacity .5s var(--ease),transform .6s var(--ease),box-shadow .4s var(--ease),background-color .4s var(--ease),filter .5s var(--ease)}
html.js .sk-grid:not(.go) .tile{opacity:0}
.sk-grid.go .tile{animation:tile-in .9s var(--ease) backwards;animation-delay:calc(var(--d) * 40ms)}
@keyframes tile-in{from{opacity:0;transform:translateY(16px) scale(.94)}}
.tile:hover,.tile.is-active{transform:translateY(-4px);box-shadow:inset 0 0 0 1.5px var(--ink),0 18px 30px -18px rgba(13,13,13,.4)}
.tile.is-dim{opacity:.3!important;filter:grayscale(1)}
.tile .n{font-family:var(--font-mono);font-size:10px;color:var(--mute)}
.tile .sym{font-size:clamp(24px,3.4vw,36px);font-weight:700;letter-spacing:-.05em;line-height:1;margin-top:auto}
.tile .nm{font-size:10px;line-height:1.2;margin-top:5px;font-weight:500;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow-wrap:anywhere}
.tile .fm{display:none;font-family:var(--font-mono);font-size:9px;color:var(--faint);margin-top:3px}
.insp{padding:26px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px}
.insp-logo{position:relative;width:170px;height:170px;display:grid;place-items:center;margin-bottom:10px}
.insp-glow{position:absolute;inset:0;border-radius:50%;filter:blur(22px)}
.insp-pop{position:relative;animation:pop .7s var(--ease) both;color:var(--ink)}
@keyframes pop{0%{transform:scale(.55);opacity:0}60%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}
.insp-txt{width:100%}
.insp-name{font-size:24px;font-weight:700;letter-spacing:-.04em;line-height:1.1}
.insp-fam{font-family:var(--font-mono);font-size:11.5px;color:var(--mute)}
.insp-used{width:100%;margin-top:14px;padding-top:14px;border-top:1px solid var(--line);text-align:left;font-size:13.5px;color:var(--ink-2)}
.insp-used h3{font-family:var(--font-mono);font-size:11px;font-weight:500;color:var(--mute);margin-bottom:8px}
.insp-used li{padding:3px 0}
@media(min-width:760px){
  .sk-grid{grid-template-columns:repeat(8,minmax(0,1fr));gap:10px}
  .tile{--d:var(--d8);padding:10px 11px 11px;min-height:124px}
  .tile .nm{font-size:11.5px}
  .tile .n{font-size:10.5px}
  .tile .fm{display:block}
}
@media(min-width:1280px){
  .sk-layout{grid-template-columns:minmax(0,1fr) 320px;gap:32px;align-items:start}
  .insp{position:sticky;top:104px}
}
@media(prefers-reduced-motion:reduce){.sk-grid.go .tile,.insp-pop{animation:none}}
`;

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const go = useInView(gridRef, { threshold: 0.1 });
  const [family, setFamily] = useState<SkillFamily | "All">("All");
  const [active, setActive] = useState(0);

  const all: Skill[] = SKILL_FAMILIES.flatMap((f) => SKILL_GROUPS[f]);
  const cur = all[active] ?? all[0];
  const used = SKILL_PROJECTS[cur.name] ?? [];
  const brand = isBrand(cur.logo);

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead index="02" label="Skills" title="The periodic table of" accent="my stack." id="skills-title" />

        <div className="sk-chips rv" role="group" aria-label="Filter skills by family" style={vars({ "--i": 1 })}>
          {(["All", ...SKILL_FAMILIES] as const).map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={family === f} onClick={() => setFamily(f)}>
              {f}
              <small>{f === "All" ? all.length : SKILL_GROUPS[f].length}</small>
            </button>
          ))}
        </div>

        <div className="sk-layout">
          <div ref={gridRef} className={`sk-grid${go ? " go" : ""}`}>
            {all.map((s, i) => {
              const dim = family !== "All" && s.family !== family;
              const d4 = Math.floor(i / 4) + (i % 4);
              const d8 = Math.floor(i / 8) + (i % 8);
              return (
                <button
                  key={s.name}
                  type="button"
                  className={`tile${active === i ? " is-active" : ""}${dim ? " is-dim" : ""}`}
                  style={vars({ "--d4": d4, "--d8": d8 })}
                  aria-label={`${s.name}, ${s.family}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="n">{i + 1}</span>
                  <span className="sym" aria-hidden="true">{s.symbol}</span>
                  <span className="nm">{s.name}</span>
                  <span className="fm">{s.family}</span>
                </button>
              );
            })}
          </div>

          <aside className="card insp" aria-label="Skill inspector">
            <div className="insp-logo">
              <span className="insp-glow" style={{ background: logoTint(cur.logo) }} aria-hidden="true" />
              <span className="insp-pop" key={cur.name}>
                <TechLogo name={cur.logo} size={brand ? 150 : 120} />
              </span>
            </div>
            <div className="insp-txt" aria-live="polite">
              <p className="insp-name">{cur.name}</p>
              <p className="insp-fam">{cur.family}</p>
              <div className="insp-used">
                <h3>{used.length ? "Used in" : "From my résumé"}</h3>
                {used.length ? (
                  <ul>{used.map((u) => (<li key={u}>{u}</li>))}</ul>
                ) : (
                  <p>Listed among my technical skills.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
