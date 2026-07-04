import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import TopNav from "@/components/TopNav";
import BrainBubble from "@/components/BrainBubble";
import { MODULES, ACTIVITY, COMPANY } from "@/lib/data";

const MODULE_HUE: Record<string, string> = {
  Ella: "Conversations", Logistics: "Operations", Commissions: "Commissions",
  Analytics: "Analytics", Brain: "The Brain",
};

/* orbiting-brain motif — the Endurance hero SVG, relabeled for the OS */
function BrainCore() {
  const nodes = [
    { x: 200, y: 12 }, { x: 333, y: 67 }, { x: 388, y: 200 }, { x: 333, y: 333 },
    { x: 200, y: 388 }, { x: 67, y: 333 }, { x: 12, y: 200 }, { x: 67, y: 67 },
  ];
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <radialGradient id="bcore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C7A76C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C7A76C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="188" fill="none" stroke="#23231F" />
      <circle cx="200" cy="200" r="140" fill="none" stroke="#23231F" />
      <circle cx="200" cy="200" r="92" fill="none" stroke="#343430" strokeDasharray="3 7">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="30s" repeatCount="indefinite" />
      </circle>
      <g>
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 200 200" to="360 200 200" dur="48s" repeatCount="indefinite" />
        <g stroke="#2a2a26">
          {nodes.map((n, i) => <line key={i} x1={n.x} y1={n.y} x2="200" y2="200" />)}
        </g>
        <g fill="#C7A76C">
          {nodes.map((n, i) => (
            <circle key={i} r="3">
              <animateMotion dur="3s" repeatCount="indefinite" path={`M${n.x},${n.y} L200,200`} begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        <g fill="#171E33" stroke="#343430">
          {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="6" />)}
        </g>
      </g>
      <circle cx="200" cy="200" r="120" fill="url(#bcore)" />
      <circle cx="200" cy="200" r="52" fill="#171E33" stroke="#C7A76C" strokeWidth="1.5" />
      <text x="200" y="196" fill="#F4F2ED" fontFamily="'JetBrains Mono',monospace" fontSize="14" letterSpacing="2" textAnchor="middle">ONE</text>
      <text x="200" y="215" fill="#C7A76C" fontFamily="'JetBrains Mono',monospace" fontSize="11" letterSpacing="3" textAnchor="middle">BRAIN</text>
      <circle cx="200" cy="200" r="58" fill="none" stroke="#C7A76C" strokeWidth="1">
        <animate attributeName="r" values="52;78" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function Landing() {
  return (
    <div>
      <TopNav />

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-lines" />
        <div className="hero-grid">
          <div className="rise">
            <div className="eyebrow"><span className="blink" /> Endurance AI Labs · Brain Powered OS</div>
            <h1>
              One company.<br />
              <span className="it">One brain.</span>
            </h1>
            <p className="hero-lede">
              Most companies bolt together a dozen disconnected tools, then hire people to sit in the gaps.
              We connect every part of your business — conversations, operations, commissions, and analytics —
              into one cited, self-correcting brain that sees everything and answers in plain English.
            </p>
            <div className="hero-cta">
              <Link href="/brain" className="btn btn-primary">Talk to the Brain <span className="arr">↗</span></Link>
              <Link href="/commissions" className="btn btn-outline">Explore the systems</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-svg"><BrainCore /></div>
            <div className="stat-bar">
              <div className="stat-item"><div className="stat-num">5</div><div className="stat-label">Systems</div></div>
              <div className="stat-item"><div className="stat-num">1</div><div className="stat-label">Brain</div></div>
              <div className="stat-item"><div className="stat-num">0</div><div className="stat-label">Seams</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM (light) ══ */}
      <section className="sec-light pad-sec">
        <div className="wrap">
          <div className="rise" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 64, alignItems: "start" }}>
            <div>
              <div className="eyebrow muted">01 — The problem today</div>
              <h2 className="h-section" style={{ color: "var(--ink)" }}>
                Your tools don&apos;t talk. So you <span className="serif-quote" style={{ color: "var(--signal-ink)" }}>hire people to translate.</span>
              </h2>
            </div>
            <div>
              <p className="lede on-light" style={{ maxWidth: 560 }}>
                Every disconnected system is a seam — and every seam needs a human to copy data across it, chase the
                follow-up, reconcile the numbers, and remember what was said. That&apos;s the back office you keep growing.
              </p>
              <ul className="ps-list on-light">
                {[
                  "A call happens in one tool, the deal lives in another, the invoice in a third — none know about each other.",
                  "Someone re-keys load data into a spreadsheet every week just to run commissions.",
                  "An asset or portfolio manager spends the week assembling a status nobody fully trusts.",
                  "\"What did we promise this customer?\" means three threads and a guess.",
                ].map((t, i) => (
                  <li key={i}><span className="ps-mk">✕</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SOLUTIONS / MODULES (dark) ══ */}
      <section id="systems" className="pad-sec sec-line">
        <div className="wrap">
          <div className="rise" style={{ maxWidth: 780, marginBottom: 48 }}>
            <div className="eyebrow">02 — One OS, five systems</div>
            <h2 className="h-section">
              Pick the system you need today. <span className="it serif-quote">Run the whole company tomorrow.</span>
            </h2>
            <p className="lede" style={{ marginTop: 22 }}>
              One connected brain at the center. Each system stands on its own and earns its keep alone — together,
              sharing that brain, they become an operating system that runs the parts of your company you currently staff around.
            </p>
          </div>

          <div className="grid-dark g3">
            {MODULES.map((m, i) => (
              <Link key={m.key} href={m.href} className="mod-cell">
                <div className="between">
                  <span className="mod-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mod-tag">{m.tag}</span>
                </div>
                <h3>{m.name}</h3>
                <p>{m.blurb}</p>
                <span className="mod-go">Open {m.name} <ArrowRight size={13} /></span>
              </Link>
            ))}
            <div className="mod-cell">
              <div className="between">
                <span className="mod-num">06</span>
                <span className="mod-tag">Tailored</span>
              </div>
              <h3>Your system here</h3>
              <p>
                CRM, accounting, scheduling, inventory, HR — any process you run today can be modeled as a system on the
                same brain. The OS is built to fit your company, not the other way around.
              </p>
              <span className="mod-go">Customizable to you</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SYNCHRONIZATION (dark) ══ */}
      <section className="pad-sec sec-line">
        <div className="wrap">
          <div className="rise" style={{ maxWidth: 780, marginBottom: 40 }}>
            <div className="eyebrow">03 — The synchronization</div>
            <h2 className="h-section">One event. <span className="it serif-quote">Every system updates itself.</span></h2>
            <p className="lede" style={{ marginTop: 22 }}>
              A single morning at {COMPANY.name}. A customer call ripples through operations, commissions, and analytics
              without anyone re-typing a thing — because it&apos;s all one brain.
            </p>
          </div>
          <div className="sync-feed">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="sync-row">
                <span className="sync-when">{a.when}</span>
                <span className="tag signal">{MODULE_HUE[a.module] ?? a.module}</span>
                <div>
                  <div className="sync-text">{a.text}</div>
                  <div className="sync-ripple"><span className="arr">↳</span> {a.ripple}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REPLACE HEADCOUNT (light) ══ */}
      <section className="sec-light pad-sec">
        <div className="wrap">
          <div className="rise" style={{ maxWidth: 760, marginBottom: 24 }}>
            <div className="eyebrow muted">04 — The real ROI</div>
            <h2 className="h-section" style={{ color: "var(--ink)" }}>
              Stop hiring <span className="serif-quote" style={{ color: "var(--signal-ink)" }}>around your software.</span>
            </h2>
            <p className="lede on-light" style={{ marginTop: 22 }}>
              These roles mostly exist to move information between systems and assemble it into something decision-ready.
              When the systems share one brain, that work disappears — and your best people do the judgment, not the data entry.
            </p>
          </div>
          <div className="replace-row" style={{ borderTop: "1px solid var(--steel-200)" }}>
            {[
              { role: "Administrative staff", was: "Re-keys data between tools all day", now: "The brain syncs every system in real time" },
              { role: "Asset / portfolio manager", was: "Builds the weekly status by hand", now: "Ask the Brain — status, with sources, instantly" },
              { role: "Commissions / payroll clerk", was: "Rebuilds the pay run in spreadsheets", now: "Runs itself from operations data, to the penny" },
              { role: "Front-desk / follow-up", was: "Misses calls and forgets promises", now: "Every conversation captured and remembered" },
            ].map((r) => (
              <div key={r.role} className="replace-item" style={{ borderColor: "var(--steel-200)" }}>
                <div>
                  <div className="replace-role" style={{ color: "var(--ink)" }}>{r.role}</div>
                  <div className="replace-was" style={{ textDecoration: "line-through" }}>{r.was}</div>
                </div>
                <div className="replace-now" style={{ color: "var(--steel-600)" }}>
                  <span className="k" style={{ color: "var(--signal-ink)" }}>On BrainOS</span>{r.now}
                </div>
              </div>
            ))}
          </div>
          <p className="small" style={{ marginTop: 22, color: "var(--steel-500)", fontFamily: "var(--font-mono)" }}>
            Not about cutting people — about not having to hire the next five just to keep up.
          </p>
        </div>
      </section>

      {/* ══ CUSTOMIZATION (dark) ══ */}
      <section className="pad-sec sec-line">
        <div className="wrap">
          <div className="rise" style={{ maxWidth: 760, marginBottom: 40 }}>
            <div className="eyebrow">05 — Built around your company</div>
            <h2 className="h-section">Your data. Your workflows. <span className="it serif-quote">Your brain.</span></h2>
          </div>
          <div className="grid-dark g3">
            {[
              { h: "Modeled to your operation", p: "Freight, real estate, services, distribution — we map your real entities, rules, and pay structures, not a generic CRM schema." },
              { h: "Connected to what you run", p: "TMS, ERP, phone, email, accounting, and the spreadsheets that secretly run the place — all feeding one brain." },
              { h: "Private and yours", p: "Your brain is trained on your data and stays yours. Role-based access, full audit trail, nothing leaves without permission." },
            ].map((c) => (
              <div key={c.h} className="cell-950">
                <h3 className="serif-quote" style={{ fontStyle: "normal", fontFamily: "var(--font-display)", fontSize: 24, color: "var(--bone)" }}>{c.h}</h3>
                <p style={{ marginTop: 12, color: "var(--steel-400)", fontSize: 14.5, lineHeight: 1.55 }}>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="final">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Ready when you are</div>
          <h2 className="h-display" style={{ maxWidth: "16ch", margin: "0 auto" }}>
            See your company on <span className="it">one brain.</span>
          </h2>
          <p className="lede" style={{ margin: "22px auto 34px", maxWidth: "56ch" }}>
            Walk through the live systems, then ask the Brain anything about the business — it already read every one of them.
          </p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link href="/brain" className="btn btn-primary">Ask the Brain <span className="arr">↗</span></Link>
            <a href="https://endurancelabs.ai/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Book a walkthrough <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-endurance-white.svg" alt="Endurance AI Labs" className="logo" />
          <div className="fmeta">One brain connecting every system in your company.</div>
          <div className="fmeta">© 2026 · An Endurance AI Labs product</div>
        </div>
      </footer>

      <BrainBubble />
    </div>
  );
}
