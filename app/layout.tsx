import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brain Powered Operating System — one brain, every system",
  description:
    "The Brain Powered Operating System connects every part of your company — conversations, operations, commissions, and analytics — onto one synchronized brain. Run leaner, decide faster, and replace the back office you keep hiring around.",
  applicationName: "Brain Powered Operating System",
  openGraph: {
    title: "Brain Powered Operating System",
    description:
      "One brain connecting every system in your company. Conversations, operations, commissions, and analytics — synchronized, and answerable in plain English.",
    type: "website",
    siteName: "Brain Powered Operating System",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;850&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
