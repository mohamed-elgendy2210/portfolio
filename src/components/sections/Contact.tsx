"use client";

import { useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { vars } from "@/lib/util";

const css = `
.ct{padding-bottom:clamp(64px,9vh,110px)}
.ct-h{font-size:clamp(46px,10.5vw,176px);font-weight:700;letter-spacing:-.055em;line-height:.92;margin:6px 0 clamp(36px,5vw,64px)}
.ct-h .w{display:inline-block;white-space:nowrap}
.ct-h .ch{display:inline-block;will-change:transform}
.ct-h .ch:hover{animation:hop .65s var(--ease)}
.ct-h .l2{display:block}
.ct-h .serif-it .ch{font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-.02em}
@keyframes hop{0%{transform:translateY(0)}35%{transform:translateY(-.16em)}70%{transform:translateY(.02em)}100%{transform:none}}
.ct-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px 18px}
.ct-mail{font-size:clamp(22px,4.2vw,56px);font-weight:600;letter-spacing:-.04em;line-height:1.1;overflow-wrap:anywhere;
  text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.14em;text-decoration-color:rgba(13,13,13,.28);transition:text-decoration-color .3s var(--ease)}
.ct-mail:hover{text-decoration-color:var(--ink)}
.copy{height:34px;padding:0 14px;border-radius:99px;font-family:var(--font-mono);font-size:12px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.22);
  transition:background-color .3s var(--ease),color .3s var(--ease)}
.copy:hover,.copy.ok{background:var(--ink);color:#fff}
.ct-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
.ct-wrap{position:relative}
.badge{display:none;position:absolute;right:var(--gutter);top:-40px;width:150px;height:150px}
.badge svg{width:100%;height:100%;animation:spin 22s linear infinite}
.badge .c{position:absolute;inset:0;display:grid;place-items:center;font-size:30px}
@keyframes spin{to{transform:rotate(360deg)}}
@media(min-width:900px){.badge{display:block}}
.foot{border-top:1px solid var(--line);padding:26px 0}
.foot .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;font-size:13.5px;color:var(--mute)}
.foot button{text-decoration:underline;text-underline-offset:3px;color:var(--ink)}
@media(prefers-reduced-motion:reduce){.badge svg{animation:none}.ct-h .ch:hover{animation:none}}
`;

function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, wi, arr) => (
        <span key={wi}>
          <span className="w" aria-hidden="true">
            {w.split("").map((c, i) => (<span className="ch" key={i}>{c}</span>))}
          </span>
          {wi < arr.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section id="contact" className="section ct" aria-labelledby="contact-title">
        <style>{css}</style>
        <div className="wrap ct-wrap">
          <p className="tag rv"><b>06</b><i />Contact</p>
          <h2 id="contact-title" className="ct-h" aria-label="Let's build something together.">
            <span className="l2"><Letters text="Let's build" /></span>
            <span className="l2"><Letters text="something" /> <span className="serif-it"><Letters text="together." /></span></span>
          </h2>

          <div className="ct-row rv" style={vars({ "--i": 1 })}>
            <a className="ct-mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <button type="button" className={`copy${copied ? " ok" : ""}`} onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
            <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
          </div>

          <div className="ct-links rv" style={vars({ "--i": 2 })}>
            <a className="btn btn-primary" href={PROFILE.phoneHref}>{PROFILE.phone}</a>
            {PROFILE.github && <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {PROFILE.linkedin && <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </div>

          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 150 150">
              <defs><path id="circ" d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" /></defs>
              <text fontSize="12.5" fontFamily="var(--font-mono)" letterSpacing="3.2" fill="#0d0d0d">
                <textPath href="#circ">SAY HELLO • SAY HELLO • SAY HELLO •</textPath>
              </text>
            </svg>
            <span className="c">↘</span>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {PROFILE.name}</span>
          <button type="button" onClick={() => scrollToTarget(0)}>Back to top</button>
        </div>
      </footer>
    </>
  );
}
