import { Phone, Video, Users, MessageSquare, ArrowUpRight, Bell, Clock } from "lucide-react";
import { CONVERSATIONS, CUSTOMERS, customer, type Channel } from "@/lib/data";
import { usd } from "@/lib/format";

const CH_ICON: Record<Channel, React.ElementType> = {
  Phone, Zoom: Video, Teams: Video, "Google Meet": Video, "In-person": Users,
};

const SENT: Record<string, { c: string; t: string }> = {
  positive: { c: "ok", t: "Positive" },
  neutral: { c: "neutral", t: "Neutral" },
  negative: { c: "bad", t: "Needs attention" },
};

export default function ConversationsPage() {
  const followUps = CONVERSATIONS.filter((c) => c.followUp);
  const captured = CONVERSATIONS.length;
  const minutes = CONVERSATIONS.reduce((s, c) => s + c.durationMin, 0);

  return (
    <div className="page page-wide">
      <div className="crumb">Conversations <b>/ Ella · captured today</b></div>
      <h1 className="title">Conversations</h1>
      <p className="lede">
        Every customer conversation — phone, video, and in person — captured, transcribed, and remembered. Ella
        files each one against the right customer and opens the follow-ups, so nothing slips and the Brain remembers
        everything.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi"><span className="lab"><MessageSquare size={14} /> Captured today</span><span className="big">{captured}</span></div>
        <div className="kpi"><span className="lab"><Clock size={14} /> Minutes transcribed</span><span className="big">{minutes}</span></div>
        <div className="kpi"><span className="lab"><Bell size={14} /> Follow-ups opened</span><span className="big">{followUps.length}</span></div>
        <div className="kpi"><span className="lab"><span className="dot bad" /> Need attention</span><span className="big" style={{ color: "var(--bad)" }}>{CONVERSATIONS.filter((c) => c.sentiment === "negative").length}</span></div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", marginTop: 18 }}>
        {/* inbox */}
        <div className="card">
          <div className="card-h"><h2>Conversation inbox</h2><span className="sub">Newest first · all channels</span></div>
          <div>
            {CONVERSATIONS.map((c) => {
              const Icon = CH_ICON[c.channel];
              const cust = customer(c.customerId);
              const s = SENT[c.sentiment];
              return (
                <div key={c.id} style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
                  <div className="between">
                    <div className="flex">
                      <span className="avatarsm" style={{ background: "color-mix(in srgb, var(--m-ella) 13%, white)", color: "var(--m-ella)" }}>
                        <Icon size={15} />
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{cust?.name}</div>
                        <div className="small muted">{c.who} · {c.channel} · {c.durationMin} min</div>
                      </div>
                    </div>
                    <div className="flex" style={{ gap: 8 }}>
                      <span className={`chip ${s.c}`}>{s.t}</span>
                      <span className="small muted">{c.when}</span>
                    </div>
                  </div>
                  <p className="small" style={{ marginTop: 10, color: "var(--ink-2)", lineHeight: 1.55 }}>{c.summary}</p>
                  {c.followUp && (
                    <div className="flex" style={{ marginTop: 10, gap: 8 }}>
                      <span className="chip accent"><Bell size={11} /> Follow-up</span>
                      <span className="small" style={{ color: "var(--ink-2)" }}>{c.followUp}</span>
                    </div>
                  )}
                  {c.linkedLoadId && (
                    <div className="small" style={{ marginTop: 8, color: "var(--m-ops)", fontWeight: 600 }}>
                      <ArrowUpRight size={12} style={{ verticalAlign: "-1px" }} /> Linked to load {c.linkedLoadId} in Operations
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* customer memory */}
        <div className="grid" style={{ gap: 16, alignContent: "start" }}>
          <div className="card">
            <div className="card-h"><h2>Customer memory</h2><span className="sub">What the Brain remembers</span></div>
            <div>
              {CUSTOMERS.slice(0, 4).map((c) => (
                <div key={c.id} style={{ padding: "14px 20px", borderBottom: "1px solid var(--line)" }}>
                  <div className="between">
                    <span style={{ fontWeight: 700, fontSize: 13.5 }}>{c.name}</span>
                    <span className={`chip ${c.health === "good" ? "ok" : c.health === "watch" ? "warn" : "bad"}`}>
                      {c.health === "good" ? "Healthy" : c.health === "watch" ? "Watch" : "At risk"}
                    </span>
                  </div>
                  <div className="small muted" style={{ marginTop: 3 }}>{usd(c.ytdRevenue)} YTD · {c.owner} · last contact {c.lastContact}</div>
                  <p className="small" style={{ marginTop: 8, color: "var(--ink-2)", lineHeight: 1.5 }}>{c.memory}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-p" style={{ background: "var(--accent-soft)", borderColor: "var(--accent-line)" }}>
            <div className="flex" style={{ gap: 8 }}>
              <MessageSquare size={16} color="var(--accent)" />
              <strong style={{ fontSize: 13.5 }}>Every channel, one memory</strong>
            </div>
            <p className="small" style={{ marginTop: 8, color: "var(--ink-2)" }}>
              Phone, Zoom, Teams, Google Meet, and in-person all flow into a single memory per customer — so Ella, your
              team, and the Brain never miss a detail or a promise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
