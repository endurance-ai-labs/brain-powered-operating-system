"use client";

import { useState, useRef, useEffect } from "react";
import { ask, SUGGESTED, type Source } from "@/lib/brain";

const SRC_LABEL: Record<Source["module"], string> = {
  Ella: "Conversations", Logistics: "Operations", Commissions: "Commissions", Analytics: "Analytics",
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
      <div className="crumb">Brain <b>/ Ask anything</b></div>
      <h1 className="title">The Brain</h1>
      <p className="intro">
        One question, answered across every system. The Brain reads your conversations, operations, commissions, and
        analytics — then reasons over all of them and shows its sources.
      </p>

      <div className="brain-shell mt-lg">
        <div className="panel panel-b">
          <div className="thread">
            {thread.length === 0 && (
              <div className="msg brain rise">
                <span className="who">AI</span>
                <div className="body">
                  <p>
                    Ask me anything about <strong>Meridian Freight Group</strong>. I&apos;ve already read every call
                    Conversations captured, every load on the board, this week&apos;s pay run, and the financials. I&apos;ll join
                    them and answer with sources.
                  </p>
                  <div className="src-row" style={{ borderTop: "none", paddingTop: 4 }}>
                    {SUGGESTED.map((s) => (
                      <button key={s} className="src" style={{ cursor: "pointer" }} onClick={() => send(s)}>
                        ↗ {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {thread.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="msg user rise">
                  <div className="body"><p>{m.text}</p></div>
                  <span className="who">YOU</span>
                </div>
              ) : (
                <div key={i} className="msg brain rise">
                  <span className="who">AI</span>
                  <div className="body">
                    {render(m.text)}
                    <div className="src-row">
                      {m.sources.map((s, j) => (
                        <span key={j} className="src" title={s.label}>
                          <span className="dot signal" style={{ width: 6, height: 6 }} />
                          <b style={{ color: "var(--signal)" }}>{SRC_LABEL[s.module]}</b>
                          <span style={{ color: "var(--steel-500)" }}>· {s.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
            <div ref={endRef} />
          </div>

          <form
            className="ask-bar mt-lg"
            onSubmit={(e) => {
              e.preventDefault();
              send(val);
            }}
          >
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask about a customer, load, payee, or the whole business…" />
            <button className="btn btn-signal" type="submit">Ask ↗</button>
          </form>
        </div>

        <div className="grid" style={{ gap: 20, alignContent: "start" }}>
          <div className="panel">
            <div className="panel-h"><h2>Suggested</h2></div>
            <div className="suggest" style={{ border: "none", borderRadius: 0 }}>
              {SUGGESTED.map((s) => (
                <button key={s} onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel-h"><h2>What it reads</h2></div>
            <div className="panel-b" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { m: "Conversations", n: "6 calls & meetings" },
                { m: "Operations", n: "8 active loads" },
                { m: "Commissions", n: "This week's pay run" },
                { m: "Analytics", n: "6 months of P&L" },
              ].map((r) => (
                <div key={r.m} className="flex">
                  <span className="avatarsm mono" style={{ fontSize: 10 }}>{r.m[0]}</span>
                  <div>
                    <div style={{ color: "var(--bone)", fontSize: 13.5 }}>{r.m}</div>
                    <div className="small mono" style={{ color: "var(--steel-500)" }}>{r.n}</div>
                  </div>
                </div>
              ))}
              <p className="small" style={{ borderTop: "1px solid var(--steel-800)", paddingTop: 14, color: "var(--steel-400)", lineHeight: 1.55 }}>
                In a live deployment this is your real data, refreshed continuously and private to your company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
