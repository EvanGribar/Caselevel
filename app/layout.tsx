import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistSerifRegular } from "geist/font/serif/regular";
import { TasteRuntime } from "./taste-runtime";
import type { ReactNode } from "react";

const siteUrl = process.env.CASELEVEL_SITE_URL;
const shareImage = siteUrl ? new URL("/share.jpg", siteUrl).href : "/share.jpg";

export const viewport: Viewport = { themeColor: "#ffffff" };

export const metadata: Metadata = {
  title: "Caselevel | Consulting Interview Practice",
  description: "Build consulting interview skills with short lessons, focused practice, realistic cases, and feedback on your reasoning.",
  applicationName: "Caselevel",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  other: { "page-type": "software", "site-kind": "software" },
  openGraph: {
    type: "website",
    title: "Caselevel | Consulting Interview Practice",
    description: "Learn a concept, apply it to a business problem, and review your reasoning before the interview.",
  },
  icons: { icon: "/caselevel.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable + " " + GeistSerifRegular.variable} data-type="software" data-radius="round" data-buttons="pill" data-motion="on" data-ground="sand" suppressHydrationWarning>
      <head>
        <meta property="og:image" content={shareImage} />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/caselevel.css" />
        <link rel="stylesheet" href="/kit/case-preview.css" />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/liquid-type/moment.js" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('m-enter','mo-js');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)" }} />
        <script src="/assets/backgrounds/backgrounds.js" />
      </head>
      <body>
        {children}
        <TasteRuntime />
      </body>
    </html>
  );
}
