"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/base";

const LINKS = [
  { href: "/brain", label: "The Brain" },
  { href: "/conversations", label: "Conversations" },
  { href: "/commissions", label: "Commissions" },
  { href: "/logistics", label: "Operations" },
  { href: "/analytics", label: "Analytics" },
];

export default function TopNav() {
  const path = usePathname();
  return (
    <header className="topnav">
      <div className="topnav-inner">
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/logo-endurance-white.svg")} alt="Endurance AI Labs" className="logo" />
          <span className="divider-v" />
          <span className="brand-sub">Brain OS</span>
        </Link>
        <nav className="nav-links">
          {LINKS.map((l) => {
            const active = path === l.href || path.startsWith(l.href + "/");
            return (
              <Link key={l.href} href={l.href} className={active ? "active" : ""}>
                {l.label}
              </Link>
            );
          })}
          <Link href="/console" className={`console-tab${path.startsWith("/console") ? " active" : ""}`}>
            Console ↗
          </Link>
        </nav>
        <div className="nav-spacer" />
        <div className="nav-right">
          <span className="nav-demo">Live demo · sample data</span>
          <span className="avatar">MF</span>
        </div>
      </div>
    </header>
  );
}
