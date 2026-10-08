# Mohamed Elgendy — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lenis (the only animation dependency).
White / black / gray only, no loader, no WebGL, no GSAP.

## Run

```bash
npm install        # also copies the self-hosted fonts into public/fonts (postinstall)
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Sections

| # | Section | Component | Motion |
|---|---------|-----------|--------|
| – | Hero | `hero/Hero.tsx` | looping intro video, multiply-blended into the paper; voice pauses when < 35 % of the hero is visible |
| 01 | About | `sections/About.tsx` | damped-pendulum lanyard ID card, 3D flip (hover / tap / Enter / Space) |
| 02 | Skills | `sections/Skills.tsx` | periodic-table tiles, diagonal wave entrance, family filter, sticky inspector |
| 03 | Work | `sections/Work.tsx` | expanding accordion gallery (vertical accordion on mobile), clip-path wipe on the project screenshot |
| 04 | Certifications | `sections/Certifications.tsx` | ink-flood rows |
| 05 | Experience | `sections/Experience.tsx` | scroll-drawn timeline merging education, work and training |
| 06 | Contact | `sections/Contact.tsx` | hopping letters, copy-email chip, spinning badge, footer |

Project screenshots live in `public/projects/` (4:5 crops). Each project has a placeholder `demo` link in `src/lib/data.ts` — replace the `https://example.com/...` values with your real demo URLs.

All text lives in `src/lib/data.ts` and comes from `public/resume.pdf`.

## What the résumé does NOT contain (so it is not on the site)

- No GitHub profile and no project repository links → no GitHub buttons, no "View on GitHub".
- No competitive-programming ranks, awards or numbers → the **Achievements** section and its nav link were removed.
- No CGPA, intermediate school, or ID number → not shown.
- The role in the résumé is **Frontend Developer** (not Full Stack), so that is the hero heading.

Add any of these to `data.ts` (`PROFILE.github`, `PROJECTS[n].github`, …) and the UI shows them automatically.

## Rebuild the hero video

```bash
python3 scripts/build-hero-assets.py intro.mp4 portrait-bust.jpg
```

Needs `ffmpeg` (libx264, libvpx-vp9, libopus), `numpy`, `Pillow`. The script detects the person, crops head-to-toe at 4:5,
whitens the backdrop (`colorlevels`), cross-fades the last 0.5 s into the first 0.5 s (video with `xfade`, audio sample-accurately
in numpy), and writes `public/hero/hero.mp4`, `hero.webm`, `public/portrait-bust.webp` and `public/og.jpg`.
Override the crop with `CROP_X`, `CROP_W`, `CROP_H` if needed. The source clip is 6.6 s, so the loop is 6.1 s.

## Fonts

Inter Tight, Instrument Serif and JetBrains Mono are self-hosted: `scripts/setup-fonts.mjs` copies the woff2 files from the
`@fontsource*` dev-dependencies into `public/fonts`, and `globals.css` declares them with `@font-face`. Nothing is fetched at runtime.
If the files are missing the site falls back to system fonts and still builds.

## Logos — credits and licences

The tech marks in `src/components/ui/TechLogo.tsx` are compact hand-built SVGs in each brand's colours
(HTML5, CSS3, JavaScript, React, Tailwind CSS, Bootstrap, Git, Vite, VS Code). The GitHub mark is the CC0 path from
[simple-icons](https://simpleicons.org). All trademarks belong to their owners. To use the official artwork
(devicon "original" SVGs, MIT), replace the bodies in the `BRAND` map and keep the licence files next to them in `public/logos`.
Concept skills (Responsive Design, REST APIs, …) use custom thin line icons.

## Notes

- `NEXT_PUBLIC_SITE_URL` sets the Open Graph base URL (defaults to `http://localhost:3000`).
- Browsers usually block autoplay with sound: the hero plays muted, shows a ping ring on the sound button, and unlocks the voice on the first pointer / key / touch.
- `prefers-reduced-motion` disables Lenis, the pendulum, the video autoplay and decorative animation.
