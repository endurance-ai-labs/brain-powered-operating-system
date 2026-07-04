import Link from "next/link";
import { Brain, ArrowUpRight, Phone, Video, Users } from "lucide-react";
import {
  COMPANY, COMMISSION_RUN, LOADS, CONVERSATIONS, CUSTOMERS, customer, type Channel,
} from "@/lib/data";
import { ask } from "@/lib/brain";
import { usd } from "@/lib/format";

const CH_ICON: Record<Channel, React.ElementType> = {
  Phone, Zoom: Video, Teams: Video, "Google Meet": Video, "In-person": Users,
};

const SRC_LABEL: Record<string, string> = {
  Ella: "Conversations", Logistics: "Operations", Commissions: "Commissions", Analytics: "Analytics",
};

function bold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>,
  );
}

// Cross-system items that need a human right now — each blends >1 system.
const NEEDS = [
  { sev: "bad", title: "Westview load M-80422 is running late", src: "Operations · Conversations", action: "Call Karen · comp detention" },
  { sev: "warn", title: "Bluepeak load M-80511 still needs a carrier", src: "Operations · Commissions", action: "Cover the load" },
  { sev: "bad", title: "Northstar is re-bidding 3 lanes after May misses", src: "Conversations · Analytics", action: "Send save proposal" },
  { sev: "warn", title: "Tariq Khan's commission is blocked", src: "Commissions", action: "Clear the block" },
];

export default function ConsolePage() {
  const attention = LOADS.filter((l) => l.status === "Running late" || l.status === "Needs cover").length;
  const atRisk = CUSTOMERS.filter((c) => c.health !== "good").length;
  const followUps = CONVERSATIONS.filter((c) => c.followUp);
  const answers = ["Which customers are at risk this week?", "Who gets paid what this week, and why is anything blocked?"].map((q) => ({ q, a: ask(q) }));

  return (
    <div className="page">
      <div className="con-banner">
        <span className="pill">LIVE</span>
        <span><b>{COMPANY.name}</b> · {COMPANY.hq}</span>
        <span>The Brain is reading <b>4 systems</b> in real time</span>
        <span className="out">● Updated just now</span>
      </div>

      <div style={{ marginTop: 22 }}>
        <div className="crumb">Console <b>/ Today with your Brain</b></div>
        <h1 className="title">Good morning.</h1>
        <p className="intro">
          Your whole company, right now — assembled by the Brain across every system. What needs you is at the top;
          everything else is handled.
        </p>
      </div>

      {/* stat cards */}
      <div className="con-stats mt-lg">
        <div className="con-stat memory">
          <div className="k"><Brain size={13} /> The Brain</div>
          <div className="v">4 / 4</div>
          <div className="barline"><i style={{ width: "100%" }} /></div>
          <div className="cap">Conversations · Operations · Commissions · Analytics — all synced</div>
          <Link href="/brain" className="con-act mt" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14 }}>
            Ask the Brain anything <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="con-stat">
          <div className="k"><span className="dot signal" /> Ready to pay</div>
          <div className="v">{usd(COMMISSION_RUN.readyToPay)}</div>
          <div className="cap">{COMMISSION_RUN.people} payees · {COMMISSION_RUN.blockers} blocked</div>
        </div>
        <div className="con-stat">
          <div className="k"><span className="dot bad" /> Needs attention</div>
          <div className="v">{attention + atRisk}</div>
          <div className="cap">{attention} loads · {atRisk} accounts flagged</div>
        </div>
        <div className="con-stat">
          <div className="k"><span className="dot warn" /> Captured today</div>
          <div className="v">{CONVERSATIONS.length}</div>
          <div className="cap">{followUps.length} follow-ups opened by the Brain</div>
        </div>
      </div>

      {/* lower grid */}
      <div className="con-grid">
        {/* needs attention */}
        <div className="panel con-need">
          <div className="panel-h"><h2>Needs your attention</h2><span className="sub">Triaged across systems</span></div>
          <div>
            {NEEDS.map((n) => (
              <div key={n.title} className="between" style={{ padding: "16px 22px", borderBottom: "1px solid var(--steel-800)" }}>
                <div className="flex" style={{ gap: 12, alignItems: "flex-start" }}>
                  <span className={`dot ${n.sev}`} style={{ marginTop: 6 }} />
                  <div>
                    <div style={{ color: "var(--bone)", fontSize: 14, fontWeight: 500 }}>{n.title}</div>
                    <div className="small mono" style={{ color: "var(--steel-500)", marginTop: 4 }}>{n.src}</div>
                  </div>
                </div>
                <span className="con-act">{n.action} →</span>
              </div>
            ))}
          </div>
          <div className="between" style={{ padding: "14px 22px", borderTop: "1px solid var(--steel-800)" }}>
            <span className="small mono muted">The Brain handled everything else automatically.</span>
            <Link href="/logistics" className="con-act">Open Operations →</Link>
          </div>
        </div>

        {/* today's follow-ups */}
        <div className="panel">
          <div className="panel-h"><h2>Today&apos;s follow-ups</h2><span className="sub">Opened by the Brain</span></div>
          <div>
            {followUps.map((c) => {
              const Icon = CH_ICON[c.channel];
              const cust = customer(c.customerId);
              return (
                <div key={c.id} className="con-up-row">
                  <span className="av"><Icon size={13} /></span>
                  <div>
                    <div className="t">{cust?.name}</div>
                    <div className="s">{c.followUp}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* what the brain answered */}
      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-h">
          <h2>The Brain already answered</h2>
          <Link href="/brain" className="sub" style={{ color: "var(--signal)" }}>Ask your own →</Link>
        </div>
        <div>
          {answers.map(({ q, a }) => (
            <div key={q} className="con-ans">
              <div className="q"><Brain size={15} color="var(--signal)" style={{ flexShrink: 0, marginTop: 2 }} /> {q}</div>
              <div className="a">{bold(a.text.split("\n")[0])}</div>
              <div className="cite">
                {a.sources.map((s, i) => (
                  <span key={i}>◦ {SRC_LABEL[s.module]}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
