import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./landing.css";

const siteUrl = process.env.CASELEVEL_SITE_URL;
const title = "Caselevel | Consulting Interview Practice";
const description = "Build your consulting interview skills with realistic business problems and feedback on your reasoning.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Caselevel",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: { type: "website", title, description },
  icons: { icon: "/caselevel.svg" },
};

export const viewport: Viewport = { themeColor: "#f8f7f5" };

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="caselevel-landing">
      <body>{children}</body>
    </html>
  );
}
