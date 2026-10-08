import type { Metadata, Viewport } from "next";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${PROFILE.role} based in ${PROFILE.location}. MIS graduate with training through ITI, DEPI and NTI, building responsive, user-focused web applications with React and Tailwind CSS.`;

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: `${PROFILE.name} · ${PROFILE.role}`,
  description,
  openGraph: {
    title: `${PROFILE.name} · ${PROFILE.role}`,
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${PROFILE.name}, ${PROFILE.role}` }],
  },
  twitter: { card: "summary_large_image", title: `${PROFILE.name} · ${PROFILE.role}`, description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#f4f2ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
