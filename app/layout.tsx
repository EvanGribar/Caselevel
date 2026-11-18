import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistSerifRegular } from "geist/font/serif/regular";
import { TasteRuntime } from "./taste-runtime";
import type { ReactNode } from "react";

const siteUrl = process.env.CASELEVEL_SITE_URL;
const shareImage = siteUrl ? new URL("/share.jpg", siteUrl).href : "/share.jpg";

export const viewport: Viewport = { themeColor: "#f9f8f5" };

export const metadata: Metadata = {
  title: "Caselevel | Consulting Interview Practice",
  description: "Explore Caselevel’s Strategy Consulting and Operations Consulting learning tracks for consulting interview preparation.",
  applicationName: "Caselevel",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  other: { "page-type": "software", "site-kind": "software" },
  openGraph: {
    type: "website",
    title: "Caselevel | Consulting Interview Practice",
    description: "Learn strategy and operations consulting through short lessons and business cases.",
  },
  icons: { icon: "/caselevel.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable + " " + GeistSerifRegular.variable} data-type="software" data-radius="soft" data-buttons="solid">
      <head>
        <meta property="og:image" content={shareImage} />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/caselevel.css" />
        <link rel="stylesheet" href="/kit/case-preview.css" />
      </head>
      <body>
        {children}
        <TasteRuntime />
      </body>
    </html>
  );
}
