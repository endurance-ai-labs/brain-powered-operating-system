import { Phone, Video, Users, MessageSquare, ArrowUpRight, Bell, Clock } from "lucide-react";
import { CONVERSATIONS, CUSTOMERS, customer, REMI_URL, type Channel } from "@/lib/data";
import { usd } from "@/lib/format";

const CH_ICON: Record<Channel, React.ElementType> = {
  Phone, Zoom: Video, Teams: Video, "Google Meet": Video, "In-person": Users,
};

const SENT: Record<string, { c: string; t: string }> = {
  positive: { c: "good", t: "Positive" },
  neutral: { c: "steel", t: "Neutral" },
  negative: { c: "bad", t: "Needs attention" },
};

export default function ConversationsPage() {
  const followUps = CONVERSATIONS.filter((c) => c.followUp);
  const captured = CONVERSATIONS.length;
  const minutes = CONVERSATIONS.reduce((s, c) => s + c.durationMin, 0);

  return (
    <div className="page">
      <div className="crumb">Conversations <b>/ Remi · captured today</b></div>
      <div className="between" style={{ alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
        <div>
          <h1 className="title">Conversations</h1>
          <p className="intro">
            Every customer conversation — phone, video, and in person — captured, transcribed, and remembered by{" "}
            <b style={{ color: "var(--bone)", fontWeight: 500 }}>Remi</b>. It files each one against the right customer and
            opens the follow-ups, so nothing slips and the Brain remembers everything.
          </p>
        </div>
        <a href={REMI_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
          Open the live Remi product <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="grid cols-4 mt-lg">
        <div className="kpi"><span className="lab"><MessageSquare size={14} /> Captured today</span><span className="big">{captured}</span></div>
        <div className="kpi"><span className="lab"><Clock size={14} /> Minutes transcribed</span><span className="big">{minutes}</span></div>
        <div className="kpi"><span className="lab"><Bell size={14} /> Follow-ups opened</span><span className="big">{followUps.length}</span></div>
        <div className="kpi"><span className="lab"><span className="dot bad" /> Need attention</span><span className="big" style={{ color: "var(--rust)" }}>{CONVERSATIONS.filter((c) => c.sentiment === "negative").length}</span></div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", marginTop: 20 }}>
        {/* inbox */}
        <div className="panel">
          <div className="panel-h"><h2>Conversation inbox</h2><span className="sub">Newest first · all channels</span></div>
          <div>
            {CONVERSATIONS.map((c) => {
              const Icon = CH_ICON[c.channel];
              const cust = customer(c.customerId);
              const s = SENT[c.sentiment];
              return (
                <div key={c.id} style={{ padding: "16px 22px", borderBottom: "1px solid var(--steel-800)" }}>
                  <div className="between">
                    <div className="flex">
                      <span className="avatarsm">
                        <Icon size={15} />
                      </span>
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--bone)" }}>{cust?.name}</div>
                        <div className="small mono" style={{ color: "var(--steel-500)" }}>{c.who} · {c.channel} · {c.durationMin} min</div>
                      </div>
                    </div>
                    <div className="flex" style={{ gap: 8 }}>
                      <span className={`tag ${s.c}`}>{s.t}</span>
                      <span className="small mono" style={{ color: "var(--steel-500)" }}>{c.when}</span>
                    </div>
                  </div>
                  <p className="small" style={{ marginTop: 10, color: "var(--steel-300)", lineHeight: 1.55 }}>{c.summary}</p>
                  {c.followUp && (
                    <div className="flex" style={{ marginTop: 10, gap: 8 }}>
                      <span className="tag signal"><Bell size={11} /> Follow-up</span>
                      <span className="small" style={{ color: "var(--steel-300)" }}>{c.followUp}</span>
                    </div>
                  )}
                  {c.linkedLoadId && (
                    <div className="small mono" style={{ marginTop: 8, color: "var(--signal)" }}>
                      <ArrowUpRight size={12} style={{ verticalAlign: "-1px" }} /> Linked to load {c.linkedLoadId} in Operations
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* customer memory */}
        <div className="grid" style={{ gap: 20, alignContent: "start" }}>
          <div className="panel">
            <div className="panel-h"><h2>Customer memory</h2><span className="sub">What the Brain remembers</span></div>
            <div>
              {CUSTOMERS.slice(0, 4).map((c) => (
                <div key={c.id} style={{ padding: "16px 22px", borderBottom: "1px solid var(--steel-800)" }}>
                  <div className="between">
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--bone)" }}>{c.name}</span>
                    <span className={`tag ${c.health === "good" ? "good" : c.health === "watch" ? "warn" : "bad"}`}>
                      {c.health === "good" ? "Healthy" : c.health === "watch" ? "Watch" : "At risk"}
                    </span>
                  </div>
                  <div className="small mono" style={{ marginTop: 4, color: "var(--steel-500)" }}>{usd(c.ytdRevenue)} YTD · {c.owner} · last contact {c.lastContact}</div>
                  <p className="small" style={{ marginTop: 8, color: "var(--steel-300)", lineHeight: 1.5 }}>{c.memory}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="callout">
            <div className="flex" style={{ gap: 8 }}>
              <MessageSquare size={15} color="var(--signal)" />
              <strong style={{ fontSize: 13.5, color: "var(--signal)" }}>Every channel, one memory</strong>
            </div>
            <p style={{ marginTop: 8 }}>
              Phone, Zoom, Teams, Google Meet, and in-person all flow into a single memory per customer — so Remi, your
              team, and the Brain never miss a detail or a promise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
