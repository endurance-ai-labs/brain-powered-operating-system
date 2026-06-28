import Link from "next/link";
import {
  Brain, MessageSquare, Calculator, Radio, LineChart, ArrowRight, ArrowUpRight,
  Sparkles, Plug, SlidersHorizontal, ShieldCheck, Users, Building2, Phone,
} from "lucide-react";
import TopNav from "@/components/TopNav";
import BrainBubble from "@/components/BrainBubble";
import { MODULES, ACTIVITY, COMPANY } from "@/lib/data";

const MOD_META: Record<string, { icon: React.ElementType; hue: string }> = {
  brain: { icon: Brain, hue: "var(--m-brain)" },
  conversations: { icon: MessageSquare, hue: "var(--m-ella)" },
  commissions: { icon: Calculator, hue: "var(--m-comm)" },
  logistics: { icon: Radio, hue: "var(--m-ops)" },
  analytics: { icon: LineChart, hue: "var(--m-analytics)" },
};

const MODULE_HUE: Record<string, string> = {
  Ella: "var(--m-ella)", Logistics: "var(--m-ops)", Commissions: "var(--m-comm)",
  Analytics: "var(--m-analytics)", Brain: "var(--m-brain)",
};

const ORBIT = [
  { label: "Conversations", icon: MessageSquare, style: { left: "0%", top: "12%" }, angle: 20, len: 220 },
  { label: "Operations", icon: Radio, style: { right: "0%", top: "12%" }, angle: 160, len: 220 },
  { label: "Commissions", icon: Calculator, style: { left: "4%", bottom: "8%", top: "auto" as const }, angle: -20, len: 210 },
  { label: "Analytics", icon: LineChart, style: { right: "4%", bottom: "8%", top: "auto" as const }, angle: -160, len: 210 },
];

export default function Landing() {
  return (
    <div className="lp">
      <TopNav />

      {/* ───────── Hero ───────── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <span className="lp-eyebrow">
            <Sparkles size={14} /> One brain. Every system. Your whole company, synchronized.
          </span>
          <h1>
            The operating system that runs on <span className="grad">one brain.</span>
          </h1>
          <p className="lp-lede">
            Most companies bolt together a dozen disconnected tools and then hire people to sit in the gaps.
            The Brain Powered Operating System connects every part of your business — conversations, operations,
            commissions, and analytics — onto a single brain that sees everything and answers in plain English.
          </p>
          <div className="lp-cta">
            <Link href="/brain" className="btn btn-accent btn-lg">
              Talk to the Brain <ArrowRight size={17} />
            </Link>
            <Link href="/commissions" className="btn btn-ghost btn-lg" style={{ background: "rgba(255,255,255,.08)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }}>
              Explore the systems
            </Link>
          </div>
          <div className="lp-trust">
            <span className="dot live" /> Live interactive demo · sample data for <b>&nbsp;{COMPANY.name}</b>
          </div>

          {/* orbit */}
          <div className="orbit" aria-hidden="true">
            {ORBIT.map((n) => (
              <span key={n.label} className="orbit-line" style={{ width: n.len, transform: `rotate(${n.angle}deg)` }} />
            ))}
            <div className="orbit-core">
              <Brain size={30} color="#fff" />
            </div>
            {ORBIT.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.label} className="orbit-node" style={n.style}>
                  <Icon size={15} /> {n.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Problem / Solution ───────── */}
      <section className="lp-section">
        <div className="sec-head">
          <span className="sec-eyebrow">Why this exists</span>
          <h2>Your tools don&apos;t talk. So you hire people to translate.</h2>
          <p>
            Every disconnected system is a seam — and every seam needs a human to copy data across it,
            chase the follow-up, reconcile the numbers, and remember what was said. That&apos;s the back office
            you keep growing. The OS removes the seams.
          </p>
        </div>
        <div className="ps-grid">
          <div className="ps-col bad">
            <h3>The way it works today</h3>
            <ul className="ps-list">
              {[
                "A call happens in one tool, the deal lives in another, the invoice in a third — and none of them know about each other.",
                "Someone re-keys load data into a spreadsheet every week to run commissions.",
                "An asset or portfolio manager spends their week assembling a status nobody trusts.",
                "\"What did we promise this customer?\" means three Slack threads and a guess.",
                "You scale headcount just to keep the systems in sync.",
              ].map((t, i) => (
                <li key={i}><span className="mk">✕</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="ps-col good">
            <h3>The way it works on BrainOS</h3>
            <ul className="ps-list">
              {[
                "Every conversation, load, and dollar flows into one brain the moment it happens.",
                "Commissions build themselves from the same data operations already captured.",
                "The status assembles itself — ask the Brain and it answers, with sources, in seconds.",
                "\"What did we promise?\" is one question. The Brain remembers every channel, forever.",
                "You scale output without scaling the back office.",
              ].map((t, i) => (
                <li key={i}><span className="mk">✓</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── Modules ───────── */}
      <section className="lp-section tight">
        <div className="sec-head">
          <span className="sec-eyebrow">One OS, five systems</span>
          <h2>Pick the system you need today. Run the whole company tomorrow.</h2>
          <p>
            Each system stands on its own and earns its keep alone. Together, sharing one brain, they become an
            operating system that runs the parts of your company you currently staff around.
          </p>
        </div>
        <div className="mod-grid">
          {MODULES.map((m) => {
            const meta = MOD_META[m.key];
            const Icon = meta.icon;
            return (
              <Link key={m.key} href={m.href} className="mod-card">
                <div className="mod-ic" style={{ background: meta.hue }}>
                  <Icon size={22} />
                </div>
                <h3>
                  {m.name}
                  <span className="mod-tag">{m.tag}</span>
                </h3>
                <p>{m.blurb}</p>
                <span className="mod-go">
                  Open {m.name} <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
          <div className="mod-card" style={{ background: "linear-gradient(135deg,#f3f1fe,#eef3ff)", borderColor: "var(--accent-line)" }}>
            <div className="mod-ic" style={{ background: "var(--ink-deep)" }}>
              <Plug size={22} />
            </div>
            <h3>Your system here</h3>
            <p>
              CRM, accounting, scheduling, inventory, HR — any process you run today can be modeled as a system on
              the same brain. The OS is built to fit your company, not the other way around.
            </p>
            <span className="mod-go">Tailored to you</span>
          </div>
        </div>
      </section>

      {/* ───────── Synchronized demo ───────── */}
      <section className="lp-section">
        <div className="sync-wrap">
          <span className="sec-eyebrow">The synchronization</span>
          <h2 style={{ fontSize: 30, marginTop: 10, maxWidth: "18ch" }}>One event. Every system updates itself.</h2>
          <p style={{ color: "#aab0d4", fontSize: 16, marginTop: 12, maxWidth: "62ch" }}>
            Watch a single morning at {COMPANY.name}. A customer call ripples through operations, commissions, and
            analytics without anyone re-typing a thing — because it&apos;s all one brain.
          </p>
          <div className="sync-feed">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="sync-row">
                <span className="sync-when">{a.when}</span>
                <div>
                  <span className="sync-mod" style={{ background: `color-mix(in srgb, ${MODULE_HUE[a.module]} 22%, transparent)`, color: "#fff" }}>
                    <span className="dot" style={{ background: MODULE_HUE[a.module] }} /> {a.module}
                  </span>
                  <div className="sync-text">{a.text}</div>
                  <div className="sync-ripple">
                    <span className="arrow">↳</span> {a.ripple}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Replace headcount ───────── */}
      <section className="lp-section tight">
        <div className="replace">
          <div className="sec-head" style={{ margin: 0, textAlign: "left", maxWidth: "100%" }}>
            <span className="sec-eyebrow">The real ROI</span>
            <h2 style={{ fontSize: 32 }}>Stop hiring around your software.</h2>
            <p style={{ fontSize: 16 }}>
              The roles below mostly exist to move information between systems and assemble it into something
              decision-ready. When the systems share one brain, that work disappears — and your best people get to
              do the judgment, not the data entry.
            </p>
          </div>
          <div className="replace-grid">
            {[
              { role: "Administrative staff", was: "Re-keys data between tools all day", now: "The brain syncs every system in real time" },
              { role: "Asset / portfolio manager", was: "Builds the weekly status by hand", now: "Ask the Brain — status, with sources, instantly" },
              { role: "Commissions / payroll clerk", was: "Rebuilds the pay run in spreadsheets", now: "Runs itself from operations data, to the penny" },
              { role: "Front-desk / follow-up", was: "Misses calls and forgets promises", now: "Every conversation captured and remembered" },
            ].map((r) => (
              <div key={r.role} className="replace-card">
                <div className="role">{r.role}</div>
                <div className="was">{r.was}</div>
                <div className="now"><Sparkles size={13} /> {r.now}</div>
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 18 }}>
            Not about cutting people — about not having to hire the next five just to keep up.
          </p>
        </div>
      </section>

      {/* ───────── Customization ───────── */}
      <section className="lp-section tight">
        <div className="sec-head">
          <span className="sec-eyebrow">Built around your company</span>
          <h2>Your data. Your workflows. Your brain.</h2>
          <p>The OS isn&apos;t a template you bend your company into. We model your actual processes and wire them to a brain trained on your business.</p>
        </div>
        <div className="cust-grid">
          {[
            { icon: SlidersHorizontal, h: "Modeled to your operation", p: "Freight, real estate, services, distribution — we map your real entities, rules, and pay structures, not a generic CRM schema." },
            { icon: Plug, h: "Connected to what you run", p: "TMS, ERP, phone, email, accounting, and the spreadsheets that secretly run the place — all feeding one brain." },
            { icon: ShieldCheck, h: "Private and yours", p: "Your brain is trained on your data and stays yours. Role-based access, full audit trail, nothing leaves without permission." },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.h} className="cust-card">
                <div className="ic"><Icon size={19} /></div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <div className="lp-final">
        <h2>See your company on one brain.</h2>
        <p>
          Walk through the live systems below, then ask the Brain anything about the business — it already read every
          one of them.
        </p>
        <div className="lp-cta" style={{ justifyContent: "center" }}>
          <Link href="/brain" className="btn btn-accent btn-lg">
            <Brain size={17} /> Ask the Brain
          </Link>
          <a href="https://endurancelabs.ai/" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.22)" }}>
            Book a walkthrough <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* ───────── Footer ───────── */}
      <footer className="lp-foot">
        <div className="lp-foot-inner">
          <div className="flex">
            <span className="brand-mark" style={{ width: 26, height: 26 }}><Brain size={15} /></span>
            <span style={{ fontWeight: 750 }}>Brain Powered Operating System</span>
          </div>
          <div>One brain connecting every system in your company.</div>
          <div>© 2026 · An Endurance Labs product</div>
        </div>
      </footer>

      <BrainBubble />
    </div>
  );
}
