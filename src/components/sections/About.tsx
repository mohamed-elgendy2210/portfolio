"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { vars } from "@/lib/util";

const css = `
.about{--pt:clamp(96px,14vh,160px);padding-top:var(--pt);overflow-x:clip}
.about-grid{display:grid;gap:56px;grid-template-columns:minmax(0,1fr);align-items:stretch}
.about-left,.about-right{display:flex;flex-direction:column;gap:26px}
.about-hi{font-size:clamp(44px,6.4vw,92px);font-weight:700;letter-spacing:-.045em;line-height:1}
.about-sum{font-size:clamp(17px,1.5vw,20px);line-height:1.6;color:var(--ink-2);max-width:56ch}
.about-extra{color:var(--mute);font-size:15px;max-width:56ch}
.about-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.about-mid{position:relative;min-height:500px}
.facts{padding:26px 28px;display:flex;flex-direction:column}
.facts h3{font-family:var(--font-mono);font-size:12px;font-weight:500;color:var(--mute);margin-bottom:8px}
.facts dl{margin:0}
.facts .row{display:grid;grid-template-columns:96px minmax(0,1fr);gap:14px;padding:14px 0;border-top:1px solid var(--line);font-size:15px}
.facts dt{color:var(--mute);font-size:13px;padding-top:1px}
.facts dd{margin:0;overflow-wrap:anywhere}
.facts a{text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(13,13,13,.3)}
.about-quote{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.2vw,30px);line-height:1.25;color:var(--ink-2);padding-left:18px;border-left:2px solid var(--ink)}

/* lanyard */
.lan{position:absolute;left:50%;top:0;width:300px;margin-left:-150px;transform-origin:50% 0;will-change:transform}
.rib{position:relative;width:30px;height:60px;margin:0 auto;background:var(--ink);overflow:hidden;border-radius:0 0 3px 3px}
.rib-track{position:absolute;inset:0 0 auto 0;display:flex;flex-direction:column;align-items:center;animation:rib 14s linear infinite}
.rib-track span{writing-mode:vertical-rl;font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;color:#fff;white-space:nowrap;padding:10px 0;text-transform:uppercase}
@keyframes rib{to{transform:translateY(-50%)}}
.clip{position:relative;width:22px;height:34px;margin:-2px auto -10px;border-radius:5px 5px 9px 9px;z-index:2;
  background:linear-gradient(90deg,#8e8c88,#e7e5e1 45%,#a9a6a0);box-shadow:inset 0 0 0 1px rgba(13,13,13,.25),0 2px 5px rgba(13,13,13,.25)}
.clip::after{content:"";position:absolute;left:50%;bottom:5px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 1px rgba(13,13,13,.35)}
.id3d{perspective:1300px;width:300px;height:404px;outline-offset:6px;border-radius:24px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.id-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .9s var(--ease)}
.id3d.is-flipped .id-in{transform:rotateY(180deg)}
.face{position:absolute;inset:0;border-radius:24px;background:var(--card);overflow:hidden;
  -webkit-backface-visibility:hidden;backface-visibility:hidden;
  box-shadow:inset 0 0 0 1px var(--line),0 40px 60px -34px rgba(13,13,13,.4),0 12px 24px -12px rgba(13,13,13,.18)}
.face.back{transform:rotateY(180deg);padding:28px 26px;display:flex;flex-direction:column}
.band{height:44px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:11px;letter-spacing:.28em;position:relative}
.band::before{content:"";position:absolute;top:10px;left:50%;width:44px;height:6px;margin-left:-22px;border-radius:3px;background:rgba(255,255,255,.2);display:none}
.photo{width:128px;height:156px;margin:14px auto 0;border-radius:20px;padding:4px;position:relative;
  background:linear-gradient(145deg,#d9d6d0,#8c8a85 50%,#e9e6e0);box-shadow:0 0 0 6px rgba(13,13,13,.04),0 18px 28px -14px rgba(13,13,13,.45)}
.photo .ph{width:100%;height:100%;border-radius:16px;overflow:hidden;background:var(--soft)}
.photo img{width:100%;height:100%;object-fit:cover;object-position:50% 20%;transition:transform .9s var(--ease)}
.id3d:hover .photo img{transform:scale(1.07)}
.idname{text-align:center;margin-top:12px;font-size:21px;font-weight:700;letter-spacing:-.035em;line-height:1.1}
.idrole{text-align:center;font-size:13px;color:var(--mute);margin-top:3px}
.idrows{margin:8px 22px 0;display:flex;flex-direction:column}
.idrows div{display:flex;justify-content:space-between;gap:12px;font-size:11px;padding:3px 0;border-top:1px solid var(--line)}
.idrows dt{font-family:var(--font-mono);color:var(--mute)}
.idrows dd{margin:0;font-weight:500;text-align:right}
.idfoot{position:absolute;left:22px;right:22px;bottom:14px;display:flex;align-items:flex-end;justify-content:space-between;gap:14px}
.barcode{height:22px;flex:1;background:repeating-linear-gradient(90deg,#0d0d0d 0 2px,transparent 2px 4px,#0d0d0d 4px 5px,transparent 5px 8px,#0d0d0d 8px 11px,transparent 11px 12px);opacity:.85}
.holo{width:30px;height:30px;border-radius:50%;flex:none;background:conic-gradient(from 20deg,#f2f1ef,#a9a6a0,#e9e6e0,#77756f,#f2f1ef);box-shadow:inset 0 0 0 1px rgba(13,13,13,.2)}
.back h4{font-family:var(--font-mono);font-size:11px;letter-spacing:.24em;font-weight:500;color:var(--mute);margin:0 0 14px}
.back .big{font-size:26px;font-weight:700;letter-spacing:-.04em;line-height:1.05;margin-bottom:16px}
.back ul{display:flex;flex-direction:column;gap:9px;font-size:13px;color:var(--ink-2)}
.back li{padding-top:9px;border-top:1px solid var(--line)}
.sig{margin-top:auto;font-family:var(--font-serif);font-style:italic;font-size:30px;line-height:1}
.hello{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;color:var(--mute);margin-top:6px}

@media(min-width:1000px){
  .about-grid{grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(28px,4vw,64px)}
  .about-mid{min-height:560px}
  .lan{top:calc(-1 * var(--pt))}
  .rib{height:calc(var(--pt) + 40px)}
}
@media(prefers-reduced-motion:reduce){.rib-track{animation:none}}
`;

export default function About() {
  const secRef = useRef<HTMLElement>(null);
  const lanRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef("mouse");

  // damped pendulum: pointer velocity kicks it, a spring pulls it back, a faint sway runs when idle
  useEffect(() => {
    const sec = secRef.current;
    const lan = lanRef.current;
    if (!sec || !lan || prefersReducedMotion()) return;
    let angle = 0;
    let vel = 0;
    let raf = 0;
    let last = 0;
    let running = false;
    let lastX: number | null = null;

    const frame = (now: number) => {
      const dt = Math.min(2, (now - (last || now)) / 16.67);
      last = now;
      const sway = Math.sin(now / 1100) * 0.9 + Math.sin(now / 2300) * 0.5;
      vel += (-0.035 * (angle - sway) - 0.04 * vel) * dt;
      angle += vel * dt;
      angle = Math.max(-11, Math.min(11, angle));
      lan.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (lastX !== null) {
        const dx = Math.max(-40, Math.min(40, e.clientX - lastX));
        vel += dx * 0.02;
      }
      lastX = e.clientX;
    };
    const onLeave = () => { lastX = null; };

    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!en.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(sec);
    sec.addEventListener("pointermove", onMove, { passive: true });
    sec.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      sec.removeEventListener("pointermove", onMove);
      sec.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const strapText = `${PROFILE.name} · ${PROFILE.role} · `;
  const projectNames = PROJECTS.map((p) => p.title).join(", ");

  return (
    <section id="about" ref={secRef} className="section about" aria-labelledby="about-title">
      <style>{css}</style>
      <div className="wrap about-grid">
        {/* left */}
        <div className="about-left">
          <p className="tag rv"><b>01</b><i />About</p>
          <h2 id="about-title" className="about-hi">
            <span className="rv-mask" style={vars({ "--i": 1 })}>
              <span>Hi, I&apos;m <span className="serif-it">{PROFILE.firstName}.</span></span>
            </span>
          </h2>
          <p className="about-sum rv" style={vars({ "--i": 2 })}>{PROFILE.resumeSummary}</p>
          <p className="about-extra rv" style={vars({ "--i": 3 })}>{PROFILE.extraLine}</p>
          <div className="about-btns rv" style={vars({ "--i": 4 })}>
            <a className="btn btn-primary" href={PROFILE.resume} download>Résumé</a>
            {PROFILE.github && <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {PROFILE.linkedin && <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </div>
        </div>

        {/* centre: lanyard */}
        <div className="about-mid">
          <div className="lan" ref={lanRef}>
            <div className="rib" aria-hidden="true">
              <div className="rib-track">
                {[0, 1, 2, 3].map((i) => (<span key={i}>{strapText}</span>))}
                {[0, 1, 2, 3].map((i) => (<span key={`b${i}`}>{strapText}</span>))}
              </div>
            </div>
            <div className="clip" aria-hidden="true" />
            <div
              className={`id3d${flipped ? " is-flipped" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label={`${PROFILE.name} developer ID card. Press to flip.`}
              onPointerEnter={(e) => { pointerType.current = e.pointerType; if (e.pointerType === "mouse") setFlipped(true); }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setFlipped(false); }}
              onPointerDown={(e) => { pointerType.current = e.pointerType; }}
              onClick={() => { if (pointerType.current !== "mouse") setFlipped((f) => !f); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
              }}
            >
              <div className="id-in">
                <div className="face front">
                  <div className="band">DEVELOPER ID</div>
                  <div className="photo">
                    <div className="ph">
                      <img src="/portrait-bust.webp" width={480} height={600} alt={`Portrait of ${PROFILE.name}`} draggable={false} />
                    </div>
                  </div>
                  <p className="idname">{PROFILE.name}</p>
                  <p className="idrole">{PROFILE.role}</p>
                  <dl className="idrows">
                    <div><dt>Dept.</dt><dd>Frontend</dd></div>
                    <div><dt>Degree</dt><dd>MIS · {PROFILE.grade}</dd></div>
                    <div><dt>Graduated</dt><dd>{PROFILE.graduated}</dd></div>
                  </dl>
                  <div className="idfoot" aria-hidden="true"><div className="barcode" /><div className="holo" /></div>
                </div>
                <div className="face back">
                  <h4>WHAT I AM</h4>
                  <p className="big">{PROFILE.role}.</p>
                  <ul>
                    <li>{PROFILE.degree}, {PROFILE.grade}</li>
                    <li>Training through ITI, DEPI and NTI</li>
                    <li>Built {projectNames}</li>
                    <li>5+ years in customer service and administrative operations</li>
                  </ul>
                  <p className="sig" aria-hidden="true">{PROFILE.name}</p>
                  <p className="hello">IF FOUND, SAY HELLO · {PROFILE.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="about-right">
          <div className="card facts rv" style={vars({ "--i": 1 })}>
            <h3>Quick facts</h3>
            <dl>
              <div className="row"><dt>Location</dt><dd>{PROFILE.location}</dd></div>
              <div className="row"><dt>Education</dt><dd>{PROFILE.degree}, {PROFILE.school}</dd></div>
              <div className="row"><dt>Currently</dt><dd>{PROFILE.currentRole} (part-time)</dd></div>
              <div className="row"><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
            </dl>
          </div>
          <blockquote className="about-quote rv" style={vars({ "--i": 2 })}>{PROFILE.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}
