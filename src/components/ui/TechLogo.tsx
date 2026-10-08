import type { ReactNode } from "react";

/**
 * Brand marks keep their brand colours (allowed by the design rules); concept skills get thin line icons.
 * NOTE: these are compact hand-built marks (GitHub's is the CC0 simple-icons path). To use the official
 * devicon / simple-icons artwork instead, drop the SVGs into public/logos and swap the bodies — see README.
 */
type Def = { viewBox: string; body: ReactNode; tint: string };

const T = (props: { x?: number; y?: number; size: number; fill: string; children: string; anchor?: "start" | "middle" | "end" }) => (
  <text x={props.x ?? 24} y={props.y ?? 30} fontSize={props.size} fontWeight={800} fill={props.fill} textAnchor={props.anchor ?? "middle"} fontFamily="Arial, Helvetica, sans-serif">
    {props.children}
  </text>
);

export const BRAND: Record<string, Def> = {
  html5: {
    viewBox: "0 0 48 48", tint: "rgba(228,77,38,.16)",
    body: (<><polygon points="7,4 41,4 38,38 24,44 10,38" fill="#E44D26" /><polygon points="24,40.6 35.2,37.5 37.6,7.4 24,7.4" fill="#F16529" /><T size={22} y={32} fill="#fff">5</T></>),
  },
  css3: {
    viewBox: "0 0 48 48", tint: "rgba(21,114,182,.16)",
    body: (<><polygon points="7,4 41,4 38,38 24,44 10,38" fill="#1572B6" /><polygon points="24,40.6 35.2,37.5 37.6,7.4 24,7.4" fill="#33A9DC" /><T size={22} y={32} fill="#fff">3</T></>),
  },
  javascript: {
    viewBox: "0 0 48 48", tint: "rgba(247,223,30,.28)",
    body: (<><rect x="4" y="4" width="40" height="40" rx="3" fill="#F7DF1E" /><T size={19} x={41} y={41} anchor="end" fill="#111">JS</T></>),
  },
  react: {
    viewBox: "0 0 48 48", tint: "rgba(97,218,251,.2)",
    body: (
      <g fill="none" stroke="#61DAFB" strokeWidth="2.2">
        <ellipse cx="24" cy="24" rx="20" ry="7.6" />
        <ellipse cx="24" cy="24" rx="20" ry="7.6" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="7.6" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3.4" fill="#61DAFB" stroke="none" />
      </g>
    ),
  },
  tailwind: {
    viewBox: "0 0 24 24", tint: "rgba(6,182,212,.18)",
    body: (<path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />),
  },
  bootstrap: {
    viewBox: "0 0 48 48", tint: "rgba(121,82,179,.18)",
    body: (<><rect x="4" y="4" width="40" height="40" rx="9" fill="#7952B3" /><T size={28} y={34} fill="#fff">B</T></>),
  },
  git: {
    viewBox: "0 0 48 48", tint: "rgba(240,80,50,.16)",
    body: (
      <>
        <rect x="9" y="9" width="30" height="30" rx="4" transform="rotate(45 24 24)" fill="#F05032" />
        <g stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round"><path d="M24 14v18M24 24l9-0" /></g>
        <g fill="#fff"><circle cx="24" cy="14" r="3.4" /><circle cx="24" cy="33" r="3.4" /><circle cx="33" cy="24" r="3.4" /></g>
      </>
    ),
  },
  github: {
    viewBox: "0 0 24 24", tint: "rgba(24,23,23,.1)",
    body: (<path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />),
  },
  vite: {
    viewBox: "0 0 48 48", tint: "rgba(100,108,255,.18)",
    body: (<><polygon points="3,8 24,44 45,8 24,13" fill="#646CFF" /><polygon points="33,4 18,26 25,26 21,40 38,17 29,17" fill="#FFC517" /></>),
  },
  vscode: {
    viewBox: "0 0 48 48", tint: "rgba(0,122,204,.18)",
    body: (<><polygon points="34,4 44,9 44,39 34,44 15,27 8,32 4,30 4,18 8,16 15,21" fill="#007ACC" /><polygon points="34,14 22,24 34,34" fill="#fff" opacity=".92" /></>),
  },
};

const L = (children: ReactNode): Def => ({
  viewBox: "0 0 24 24",
  tint: "rgba(13,13,13,.06)",
  body: (
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">{children}</g>
  ),
});

export const CONCEPT: Record<string, Def> = {
  responsive: L(<><rect x="2.5" y="4" width="14" height="10" rx="1.5" /><path d="M6 17.5h7M9.5 14v3.5" /><rect x="15" y="9" width="6.5" height="11" rx="1.4" /></>),
  rest: L(<path d="M4 8h14l-3-3M20 16H6l3 3" />),
  router: L(<><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h6.5a3.5 3.5 0 0 1 0 7h-5a3.5 3.5 0 0 0 0 5H16" /></>),
  context: L(<><circle cx="12" cy="5" r="2" /><circle cx="5.5" cy="18" r="2" /><circle cx="18.5" cy="18" r="2" /><path d="M12 7v4M12 11l-5.5 5M12 11l5.5 5" /></>),
  storage: L(<><ellipse cx="12" cy="6" rx="7" ry="2.8" /><path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /></>),
  rtl: L(<><path d="M20 5H9M20 10h-8M20 15H9M20 20h-8" /><path d="M8 10.5H3M5.5 8 3 10.5 5.5 13" /></>),
  form: L(<><rect x="4" y="3.5" width="16" height="17" rx="2" /><path d="M8 9l1.6 1.6L12.5 7.7M8 15h8" /></>),
  seo: L(<><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5M8 10.5l1.7 1.7 2.8-3.4" /></>),
  api: L(<path d="M8 4v5M16 4v5M6 9h12v3a6 6 0 0 1-12 0V9zM12 18v3" />),
};

export const isBrand = (key: string): boolean => key in BRAND;

export default function TechLogo({ name, size = 28, className }: { name: string; size?: number; className?: string }) {
  const def = BRAND[name] ?? CONCEPT[name];
  if (!def) return null;
  return (
    <svg width={size} height={size} viewBox={def.viewBox} className={className} aria-hidden="true" focusable="false">
      {def.body}
    </svg>
  );
}

export const logoTint = (name: string): string => (BRAND[name] ?? CONCEPT[name])?.tint ?? "transparent";
