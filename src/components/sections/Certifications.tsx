"use client";

import { CERTIFICATIONS } from "@/lib/data";
import { vars } from "@/lib/util";
import SectionHead from "../ui/SectionHead";

const css = `
.cert{background:var(--card);border-block:1px solid var(--line)}
.cert-grid{display:grid;gap:40px;grid-template-columns:minmax(0,1fr)}
.cert-left{display:flex;flex-direction:column;gap:22px}
.cert-count{font-family:var(--font-mono);font-size:13px;color:var(--mute)}
.cert-list{border-top:1px solid var(--line)}
.crow{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:14px;padding:24px 18px;
  border-bottom:1px solid var(--line);overflow:hidden;isolation:isolate;outline-offset:-3px;
  transition:color .45s var(--ease)}
.crow::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:left center;
  transition:transform .8s var(--ease);z-index:-1}
.crow:hover::before,.crow:focus-visible::before{transform:scaleX(1)}
.crow:hover,.crow:focus-visible{color:#fff}
.crow:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.crow .no{font-family:var(--font-mono);font-size:12px;color:var(--mute);transition:color .45s var(--ease)}
.crow:hover .no,.crow:focus-visible .no,.crow:hover .iss,.crow:focus-visible .iss{color:rgba(255,255,255,.7)}
.crow .ttl{font-size:clamp(22px,2.6vw,34px);font-weight:600;letter-spacing:-.035em;line-height:1.1}
.crow .iss{display:block;margin-top:6px;font-size:14px;color:var(--mute);transition:color .45s var(--ease)}
.crow .dt{font-family:var(--font-mono);font-size:12px;color:var(--mute);text-align:right;transition:color .45s var(--ease)}
.crow:hover .dt,.crow:focus-visible .dt{color:rgba(255,255,255,.7)}
.crow .ar{position:absolute;right:18px;top:50%;margin-top:-12px;opacity:0;transform:translateX(-14px);transition:opacity .5s var(--ease),transform .6s var(--ease);font-size:22px;line-height:1}
.crow:hover .ar,.crow:focus-visible .ar{opacity:1;transform:none}
.crow:hover .dt,.crow:focus-visible .dt{transform:translateX(-34px)}
.crow .dt{transition:color .45s var(--ease),transform .6s var(--ease)}
@media(min-width:960px){
  .cert-grid{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,96px);align-items:start}
  .cert-left{position:sticky;top:120px}
}
@media(max-width:520px){.crow{grid-template-columns:32px minmax(0,1fr)}.crow .dt{grid-column:2;text-align:left}.crow:hover .dt,.crow:focus-visible .dt{transform:none}.crow .ar{display:none}}
`;

const years = CERTIFICATIONS.map((c) => Number(c.date.split("/")[1]));

export default function Certifications() {
  return (
    <section id="certifications" className="section cert" aria-labelledby="cert-title">
      <style>{css}</style>
      <div className="wrap cert-grid">
        <div className="cert-left">
          <SectionHead index="04" label="Certifications" title="Always" accent="learning." id="cert-title" />
          <p className="cert-count rv" style={vars({ "--i": 2 })}>
            {String(CERTIFICATIONS.length).padStart(2, "0")} certifications · {Math.min(...years)} – {Math.max(...years)}
          </p>
        </div>
        <ol className="cert-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="crow rv" tabIndex={0} style={vars({ "--i": i })}>
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="ttl">{c.title}</span>
                <span className="iss">{c.issuer}</span>
              </span>
              <span className="dt">{c.date}</span>
              <span className="ar" aria-hidden="true">→</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
