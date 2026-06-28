"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, MessageSquare, Calculator, Radio, LineChart } from "lucide-react";

const LINKS = [
  { href: "/brain", label: "Brain", icon: Brain },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/commissions", label: "Commissions", icon: Calculator },
  { href: "/logistics", label: "Operations", icon: Radio },
  { href: "/analytics", label: "Analytics", icon: LineChart },
];

export default function TopNav() {
  const path = usePathname();
  return (
    <header className="topnav">
      <Link href="/" className="brand">
        <span className="brand-mark">
          <Brain size={18} strokeWidth={2} />
        </span>
        <span className="brand-name">
          Brain<b>OS</b>
        </span>
        <span className="brand-sub">Operating System</span>
      </Link>
      <nav className="nav-links">
        {LINKS.map((l) => {
          const Icon = l.icon;
          const active = path === l.href || path.startsWith(l.href + "/");
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""}>
              <Icon size={15} strokeWidth={1.9} />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="nav-spacer" />
      <div className="nav-right">
        <span className="nav-demo">Live demo · sample data</span>
        <span className="avatar">MF</span>
      </div>
    </header>
  );
}
