"use client";

import { useState, useRef, useEffect } from "react";
import { Brain, ArrowUp, MessageSquare, Radio, Calculator, LineChart, Sparkles } from "lucide-react";
import { ask, SUGGESTED, type Source } from "@/lib/brain";

const SRC_ICON: Record<Source["module"], React.ElementType> = {
  Ella: MessageSquare, Logistics: Radio, Commissions: Calculator, Analytics: LineChart,
};
const SRC_HUE: Record<Source["module"], string> = {
  Ella: "var(--m-ella)", Logistics: "var(--m-ops)", Commissions: "var(--m-comm)", Analytics: "var(--m-analytics)",
};

function render(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={{ margin: i === 0 ? 0 : "10px 0 0" }}>
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>,
        )}
      </p>
    );
  });
}

type Entry = { role: "user"; text: string } | { role: "brain"; text: string; sources: Source[] };

export default function BrainPage() {
  const [thread, setThread] = useState<Entry[]>([]);
  const [val, setVal] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  function send(q: string) {
    const question = q.trim();
    if (!question) return;
    const a = ask(question);
    setThread((t) => [...t, { role: "user", text: question }, { role: "brain", text: a.text, sources: a.sources }]);
    setVal("");
  }

  return (
    <div className="page">
      <div className="crumb">
        Brain <b>/ Ask anything</b>
      </div>
      <h1 className="title">The Brain</h1>
      <p className="lede">
        One question, answered across every system. The Brain reads your conversations, operations, commissions, and
        analytics — then reasons over all of them and shows its sources.
      </p>

      <div className="brain-shell mt-lg">
        {/* thread */}
        <div className="card card-p">
          <div className="brain-thread">
            {thread.length === 0 && (
              <div className="msg brain rise">
                <span className="who"><Brain size={16} /></span>
                <div className="body">
                  <p>
                    Ask me anything about {""}
                    <strong>Meridian Freight Group</strong>. I&apos;ve already read every call Ella captured, every load on
                    the board, this week&apos;s pay run, and the financials. I&apos;ll join them and answer with sources. Try one
                    of these:
                  </p>
                  <div className="src-row" style={{ borderTop: "none", paddingTop: 4 }}>
                    {SUGGESTED.map((s) => (
                      <button key={s} className="src" style={{ cursor: "pointer", border: "1px solid var(--accent-line)" }} onClick={() => send(s)}>
                        <Sparkles size={12} /> {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {thread.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="msg user rise">
                  <div className="body">
                    <p>{m.text}</p>
                  </div>
                  <span className="who">You</span>
                </div>
              ) : (
                <div key={i} className="msg brain rise">
                  <span className="who"><Brain size={16} /></span>
                  <div className="body">
                    {render(m.text)}
                    <div className="src-row">
                      {m.sources.map((s, j) => {
                        const Icon = SRC_ICON[s.module];
                        return (
                          <span key={j} className="src" title={s.label}>
                            <Icon size={12} color={SRC_HUE[s.module]} />
                            <b style={{ color: SRC_HUE[s.module] }}>{s.module}</b>
                            <span className="muted" style={{ fontWeight: 500 }}>· {s.label}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ),
            )}
            <div ref={endRef} />
          </div>

          <form
            className="ask-bar mt"
            onSubmit={(e) => {
              e.preventDefault();
              send(val);
            }}
          >
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask the Brain about a customer, load, payee, or the whole business…" />
            <button className="btn btn-accent" type="submit" aria-label="Ask">
              <ArrowUp size={18} />
            </button>
          </form>
        </div>

        {/* sidebar */}
        <div className="grid" style={{ gap: 16, alignContent: "start" }}>
          <div className="card">
            <div className="card-h"><h2>Suggested</h2></div>
            <div className="card-p suggest">
              {SUGGESTED.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h2>What the Brain reads</h2></div>
            <div className="card-p" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { m: "Conversations", icon: MessageSquare, hue: "var(--m-ella)", n: "6 calls & meetings" },
                { m: "Operations", icon: Radio, hue: "var(--m-ops)", n: "8 active loads" },
                { m: "Commissions", icon: Calculator, hue: "var(--m-comm)", n: "This week's pay run" },
                { m: "Analytics", icon: LineChart, hue: "var(--m-analytics)", n: "6 months of P&L" },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.m} className="flex">
                    <span className="avatarsm" style={{ background: `color-mix(in srgb, ${r.hue} 14%, white)`, color: r.hue }}>
                      <Icon size={15} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 650, fontSize: 13.5 }}>{r.m}</div>
                      <div className="small muted">{r.n}</div>
                    </div>
                  </div>
                );
              })}
              <p className="small muted" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                In a live deployment this is your real data, refreshed continuously and private to your company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
