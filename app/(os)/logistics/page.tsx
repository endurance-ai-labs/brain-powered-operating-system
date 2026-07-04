import { Truck, AlertTriangle, MapPin, DollarSign } from "lucide-react";
import { LOADS, customer, type LoadStatus } from "@/lib/data";
import { usd, pct } from "@/lib/format";

const STATUS: Record<LoadStatus, string> = {
  Delivered: "good", "In transit": "signal", "At pickup": "steel", "Running late": "bad", Booked: "steel", "Needs cover": "warn",
};

export default function LogisticsPage() {
  const revenue = LOADS.reduce((s, l) => s + l.revenue, 0);
  const cost = LOADS.reduce((s, l) => s + l.cost, 0);
  const margin = revenue - cost;
  const attention = LOADS.filter((l) => l.status === "Running late" || l.status === "Needs cover");

  return (
    <div className="page">
      <div className="crumb">Operations <b>/ Mission Control · live board</b></div>
      <h1 className="title">Operations</h1>
      <p className="intro">
        The living operations map — every load from quote to cash. What needs attention right now is at the top, the
        economics update in real time, and every event ripples into Commissions, Conversations, and the Brain.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi"><span className="lab"><Truck size={14} /> Active loads</span><div className="big">{LOADS.length}</div></div>
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Revenue on board</span><div className="big">{usd(revenue)}</div></div>
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Margin</span><div className="big">{usd(margin)}</div><div className="sub">{pct((margin / revenue) * 100)} of revenue</div></div>
        <div className="kpi"><span className="lab"><AlertTriangle size={14} color="var(--rust)" /> Need attention</span><div className="big" style={{ color: "var(--rust)" }}>{attention.length}</div></div>
      </div>

      {/* needs attention */}
      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-h"><h2>Needs attention now</h2><span className="sub">Triaged by the OS</span></div>
        <div>
          {attention.map((l) => {
            const cust = customer(l.customerId);
            return (
              <div key={l.id} className="between" style={{ padding: "14px 22px", borderBottom: "1px solid var(--steel-800)" }}>
                <div>
                  <div className="flex" style={{ gap: 9 }}>
                    <span className="code">{l.id}</span>
                    <span className={`tag ${STATUS[l.status]}`}>{l.status}</span>
                    <span style={{ color: "var(--bone)", fontWeight: 500, fontSize: 14 }}>{cust?.name}</span>
                  </div>
                  <div className="small muted mono" style={{ marginTop: 6 }}>
                    <MapPin size={11} color="var(--steel-400)" style={{ display: "inline", verticalAlign: "-1px" }} /> {l.lane} · {l.equipment} · {l.broker}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "var(--bone)", fontSize: 14 }}>{l.eta}</div>
                  <div className="small muted mono">{l.carrier ?? "No carrier yet"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* full board */}
      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-h"><h2>Live load board</h2><span className="sub">All {LOADS.length} loads</span></div>
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
                  <td className="code">{l.id}</td>
                  <td className="nm">{cust?.name}</td>
                  <td className="muted small">{l.lane}</td>
                  <td className="muted">{l.equipment}</td>
                  <td className="muted small">{l.carrier ?? "—"}</td>
                  <td className="num">{usd(l.revenue)}</td>
                  <td className="num" style={{ color: m > 0 ? "var(--signal)" : "var(--steel-500)" }}>{m > 0 ? usd(m) : "—"}</td>
                  <td><span className={`tag ${STATUS[l.status]}`}>{l.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="callout" style={{ marginTop: 20 }}>
        <p>
          <strong>Synchronized:</strong> load <span className="mono">M-80511</span> was created automatically from Ella&apos;s
          inbound Bluepeak call, and <span className="mono">M-80422</span> running late triggered the Westview escalation
          you see in Conversations — and a hold in Commissions. One board, wired to everything.
        </p>
      </div>
    </div>
  );
}
