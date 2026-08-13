import type { Metadata } from "next";
import "./globals.css";
import PasswordGate from "@/components/PasswordGate";

export const metadata: Metadata = {
  title: "Brain Powered Operating System — One company. One brain.",
  description:
    "The Brain Powered Operating System by Endurance AI Labs connects every part of your company — conversations, operations, commissions, and analytics — into one cited, self-correcting brain. Run leaner, decide faster, stop hiring around your software.",
  applicationName: "Brain Powered Operating System",
  openGraph: {
    title: "Brain Powered Operating System — Endurance AI Labs",
    description:
      "One brain connecting every system in your company. Conversations, operations, commissions, and analytics — synchronized, and answerable in plain English.",
    type: "website",
    siteName: "Endurance AI Labs",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain" />
        <PasswordGate />
        {children}
      </body>
    </html>
  );
}
