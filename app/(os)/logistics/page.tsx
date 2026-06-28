import { Radio, Truck, AlertTriangle, MapPin, DollarSign, ArrowUpRight } from "lucide-react";
import { LOADS, customer, type LoadStatus } from "@/lib/data";
import { usd, pct } from "@/lib/format";

const STATUS: Record<LoadStatus, string> = {
  Delivered: "ok", "In transit": "accent", "At pickup": "neutral", "Running late": "bad", Booked: "neutral", "Needs cover": "warn",
};

export default function LogisticsPage() {
  const revenue = LOADS.reduce((s, l) => s + l.revenue, 0);
  const cost = LOADS.reduce((s, l) => s + l.cost, 0);
  const margin = revenue - cost;
  const attention = LOADS.filter((l) => l.status === "Running late" || l.status === "Needs cover");

  return (
    <div className="page page-wide">
      <div className="crumb">Operations <b>/ Mission Control · live board</b></div>
      <h1 className="title">Operations</h1>
      <p className="lede">
        The living operations map — every load from quote to cash. What needs attention right now is at the top, the
        economics update in real time, and every event ripples into Commissions, Conversations, and the Brain.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi"><span className="lab"><Truck size={14} /> Active loads</span><span className="big">{LOADS.length}</span></div>
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Revenue on board</span><span className="big">{usd(revenue)}</span></div>
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Margin</span><span className="big">{usd(margin)}</span><span className="small muted" style={{ marginTop: 4 }}>{pct((margin / revenue) * 100)} of revenue</span></div>
        <div className="kpi"><span className="lab"><AlertTriangle size={14} color="var(--bad)" /> Need attention</span><span className="big" style={{ color: "var(--bad)" }}>{attention.length}</span></div>
      </div>

      {/* needs attention */}
      <div className="card" style={{ marginTop: 18 }}>
        <div className="card-h"><h2>Needs attention now</h2><span className="sub">Triaged by the OS</span></div>
        <div>
          {attention.map((l) => {
            const cust = customer(l.customerId);
            return (
              <div key={l.id} className="between" style={{ padding: "14px 20px", borderBottom: "1px solid var(--line)" }}>
                <div>
                  <div className="flex" style={{ gap: 9 }}>
                    <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{l.id}</span>
                    <span className={`chip ${STATUS[l.status]}`}>{l.status}</span>
                    <span style={{ fontWeight: 650, fontSize: 13.5 }}>{cust?.name}</span>
                  </div>
                  <div className="small muted" style={{ marginTop: 4 }}><MapPin size={11} style={{ verticalAlign: "-1px" }} /> {l.lane} · {l.equipment} · {l.broker}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{l.eta}</div>
                  <div className="small muted">{l.carrier ?? "No carrier yet"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* full board */}
      <div className="card" style={{ marginTop: 18 }}>
        <div className="card-h"><h2>Live load board</h2><span className="sub">All {LOADS.length} loads</span></div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Load</th><th>Customer</th><th>Lane</th><th>Equip.</th><th>Carrier</th>
              <th className="num">Revenue</th><th className="num">Margin</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {LOADS.map((l) => {
              const cust = customer(l.customerId);
              const m = l.revenue - l.cost;
              return (
                <tr key={l.id}>
                  <td className="mono" style={{ fontWeight: 650 }}>{l.id}</td>
                  <td className="tname">{cust?.name}</td>
                  <td className="muted small">{l.lane}</td>
                  <td className="muted">{l.equipment}</td>
                  <td className="muted small">{l.carrier ?? "—"}</td>
                  <td className="num">{usd(l.revenue)}</td>
                  <td className="num" style={{ color: m > 0 ? "var(--good)" : "var(--muted)" }}>{m > 0 ? usd(m) : "—"}</td>
                  <td><span className={`chip ${STATUS[l.status]}`}>{l.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card card-p" style={{ marginTop: 18, background: "var(--accent-soft)", borderColor: "var(--accent-line)" }}>
        <p className="small" style={{ color: "var(--ink-2)" }}>
          <strong>Synchronized:</strong> load <span className="mono">M-80511</span> was created automatically from Ella&apos;s
          inbound Bluepeak call, and <span className="mono">M-80422</span> running late triggered the Westview escalation
          you see in Conversations — and a hold in Commissions. One board, wired to everything.
        </p>
      </div>
    </div>
  );
}
