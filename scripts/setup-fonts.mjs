// Copies the self-hosted woff2 files from the @fontsource packages (dev deps)
// into public/fonts so nothing is fetched from a CDN at runtime.
// Never throws: if a file is missing the site falls back to system fonts.
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "fonts");
mkdirSync(out, { recursive: true });

const jobs = [
  ["@fontsource-variable/inter-tight", /-latin-wght-normal\.woff2$/, "inter-tight.woff2"],
  ["@fontsource-variable/jetbrains-mono", /-latin-wght-normal\.woff2$/, "jetbrains-mono.woff2"],
  ["@fontsource/instrument-serif", /-latin-400-normal\.woff2$/, "instrument-serif.woff2"],
  ["@fontsource/instrument-serif", /-latin-400-italic\.woff2$/, "instrument-serif-italic.woff2"],
];

for (const [pkg, re, name] of jobs) {
  try {
    const dir = join(root, "node_modules", pkg, "files");
    if (!existsSync(dir)) continue;
    const file = readdirSync(dir).find((f) => re.test(f));
    if (file) copyFileSync(join(dir, file), join(out, name));
  } catch (e) {
    console.warn("[fonts] skipped", pkg, e?.message ?? e);
  }
}
console.log("[fonts] ready in public/fonts");
