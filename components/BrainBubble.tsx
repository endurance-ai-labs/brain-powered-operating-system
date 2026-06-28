"use client";

import { useState, useRef, useEffect } from "react";
import { Brain, X, ArrowUp } from "lucide-react";
import { ask, SUGGESTED } from "@/lib/brain";

type Msg = { role: "user" | "brain"; text: string };

function render(text: string) {
  // minimal **bold** support
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>,
  );
}

export default function BrainBubble() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "brain", text: "Hi — I'm the Brain. I read every system in your company. Ask me anything, or tap a question below." },
  ]);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  function send(q: string) {
    const question = q.trim();
    if (!question) return;
    const a = ask(question);
    setMsgs((m) => [...m, { role: "user", text: question }, { role: "brain", text: a.text }]);
    setVal("");
  }

  return (
    <>
      {open && (
        <div className="bbl-panel">
          <div className="bbl-head">
            <span className="ic">
              <Brain size={17} />
            </span>
            <div style={{ flex: 1 }}>
              <div className="t">The Brain</div>
              <div className="s">Reads Conversations · Operations · Commissions · Analytics</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
              <X size={18} />
            </button>
          </div>
          <div className="bbl-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`bbl-msg ${m.role}`}>
                {render(m.text)}
              </div>
            ))}
            {msgs.length <= 1 && (
              <div className="bbl-sug">
                {SUGGESTED.slice(0, 4).map((s) => (
                  <button key={s} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="bbl-foot">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(val);
              }}
            >
              <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask the Brain anything…" />
              <button type="submit" aria-label="Send">
                <ArrowUp size={17} />
              </button>
            </form>
          </div>
        </div>
      )}
      <button className="bbl-fab" onClick={() => setOpen((o) => !o)} aria-label="Open the Brain">
        {open ? <X size={22} /> : <Brain size={24} />}
      </button>
    </>
  );
}
