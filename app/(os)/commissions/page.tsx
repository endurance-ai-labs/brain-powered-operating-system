import { Calculator, AlertTriangle, Ban, CheckCircle2, Users, FileCheck2, Send } from "lucide-react";
import { PAYEES, COMMISSION_RUN } from "@/lib/data";
import { usd } from "@/lib/format";

const FLAG: Record<string, { c: string; icon: React.ElementType; t: string }> = {
  ok: { c: "good", icon: CheckCircle2, t: "Ready" },
  warn: { c: "warn", icon: AlertTriangle, t: "Warning" },
  block: { c: "bad", icon: Ban, t: "Blocked" },
};

export default function CommissionsPage() {
  const r = COMMISSION_RUN;
  const totalMargin = PAYEES.reduce((s, p) => s + p.margin, 0);

  return (
    <div className="page">
      <div className="crumb">Commissions <b>/ Payline · week ending {r.weekEnding}</b></div>
      <h1 className="title">Commissions</h1>
      <p className="intro">
        The weekly pay run builds itself from the same load data Operations already captured — splits, pools,
        reconciliation, and statements, settled to the penny. Nothing reaches payroll without a paper trail.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi">
          <span className="lab"><Calculator size={14} /> Ready to pay</span>
          <span className="big">{usd(r.readyToPay)}</span>
          <span className="sub">across {r.people} payees</span>
        </div>
        <div className="kpi"><span className="lab"><FileCheck2 size={14} /> Loads imported</span><span className="big">{r.loadsImported}</span></div>
        <div className="kpi"><span className="lab"><Ban size={14} color="var(--rust)" /> Blockers</span><span className="big" style={{ color: "var(--rust)" }}>{r.blockers}</span></div>
        <div className="kpi"><span className="lab"><AlertTriangle size={14} color="var(--warn)" /> Warnings</span><span className="big" style={{ color: "var(--warn)" }}>{r.warnings}</span></div>
      </div>

      {/* blockers callout */}
      <div className="grid cols-2" style={{ marginTop: 18 }}>
        <div className="callout" style={{ borderColor: "rgba(143,58,46,.5)", background: "rgba(143,58,46,.08)" }}>
          <div className="flex" style={{ gap: 8 }}><Ban size={16} color="var(--rust)" /><strong className="mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--rust)" }}>Blocked — clear before you run</strong></div>
          <p className="small" style={{ marginTop: 8 }}>{r.blockerNote}</p>
        </div>
        <div className="callout" style={{ borderColor: "rgba(176,138,60,.5)", background: "rgba(176,138,60,.08)" }}>
          <div className="flex" style={{ gap: 8 }}><AlertTriangle size={16} color="var(--warn)" /><strong className="mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--warn)" }}>Warning — worth a look</strong></div>
          <p className="small" style={{ marginTop: 8 }}>{r.warningNote}</p>
        </div>
      </div>

      {/* pay run table */}
      <div className="panel" style={{ marginTop: 18 }}>
        <div className="panel-h">
          <h2>This week&apos;s pay run</h2>
          <span className="sub">{usd(totalMargin)} margin generated · 30% commission base</span>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Payee</th>
              <th>Office</th>
              <th>Role</th>
              <th className="num">Loads</th>
              <th className="num">Margin</th>
              <th className="num">Commission</th>
              <th style={{ textAlign: "right" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {PAYEES.map((p) => {
              const f = FLAG[p.flag];
              const Icon = f.icon;
              return (
                <tr key={p.id}>
                  <td className="nm">{p.name}</td>
                  <td className="muted">{p.office}</td>
                  <td className="muted">{p.role}</td>
                  <td className="num">{p.loads}</td>
                  <td className="num">{usd(p.margin)}</td>
                  <td className="num" style={{ color: "var(--bone)", fontWeight: 600 }}>{usd(p.pay)}</td>
                  <td style={{ textAlign: "right" }}>
                    <span className={`tag ${f.c}`}><Icon size={11} /> {f.t}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="between" style={{ padding: "14px 20px", borderTop: "1px solid var(--steel-800)" }}>
          <span className="small mono muted"><Users size={13} style={{ verticalAlign: "-2px" }} /> {r.people} payees · {r.blockers} blocked, {r.warnings} flagged</span>
          <div className="flex">
            <button className="btn btn-sm btn-outline"><FileCheck2 size={15} /> Reconcile</button>
            <button className="btn btn-sm btn-signal"><Send size={15} /> Send statements</button>
          </div>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 18 }}>
        <p>
          <strong>Synchronized:</strong> both holds above trace back to live events in other systems — a load that still
          needs cover (opened from Ella&apos;s Bluepeak call) and a pending Northstar service credit. Resolve them there and
          this run settles itself.
        </p>
      </div>
    </div>
  );
}
