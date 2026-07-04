"use client";

import { useState, useEffect } from "react";
import { asset } from "@/lib/base";

// SHA-256 of the access password. Change the password by replacing this hash
// (compute with: node -e "console.log(require('crypto').createHash('sha256').update('NEWPASS').digest('hex'))").
// Current password: BPOS
const HASH = "f09c4bb36ede0dff3e3aac1c48a8d71ceed3cf41501fb1bcc9bd0992c64c4e94";
const KEY = "bpos_unlocked";

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((x) => x.toString(16).padStart(2, "0")).join("");
}

export default function PasswordGate() {
  const [locked, setLocked] = useState(true);
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setLocked(false);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [locked]);

  if (!locked) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = (await sha256(val.trim())) === HASH;
    if (ok) {
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      setLocked(false);
    } else {
      setErr(true);
      setVal("");
    }
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999, background: "var(--ink)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/logo-endurance-white.svg")} alt="Endurance AI Labs" style={{ height: 20, margin: "0 auto 30px", display: "block" }} />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--signal)", marginBottom: 16 }}>
          Private preview · Brain Powered OS
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1.08, letterSpacing: "-.02em", fontWeight: 400, color: "var(--bone)", margin: "0 0 26px" }}>
          Enter password to continue.
        </h1>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password" autoFocus autoComplete="off" placeholder="Password"
            value={val}
            onChange={(e) => { setVal(e.target.value); setErr(false); }}
            style={{
              fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--bone)", background: "var(--ink-900)",
              border: "1px solid var(--steel-700)", borderRadius: 2, padding: "14px 16px", outline: "none", textAlign: "center",
            }}
          />
          <button
            type="submit"
            style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--ink)", background: "var(--bone)",
              border: "1px solid var(--bone)", borderRadius: 2, padding: 14, cursor: "pointer",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--signal)"; e.currentTarget.style.borderColor = "var(--signal)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "var(--bone)"; e.currentTarget.style.borderColor = "var(--bone)"; }}
          >
            Unlock
          </button>
        </form>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".04em", color: "var(--rust)", marginTop: 14, minHeight: 16, opacity: err ? 1 : 0, transition: "opacity .2s" }}>
          Incorrect password. Try again.
        </div>
      </div>
    </div>
  );
}
