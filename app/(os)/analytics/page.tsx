import { LineChart, TrendingUp, DollarSign, Percent, Truck, Target } from "lucide-react";
import { REVENUE_SERIES, ANALYTICS, CUSTOMERS } from "@/lib/data";
import { usd, pct, compact } from "@/lib/format";

export default function AnalyticsPage() {
  const maxRev = Math.max(...REVENUE_SERIES.map((r) => r.revenue));
  const totalRev = CUSTOMERS.reduce((s, c) => s + c.ytdRevenue, 0);
  const ranked = [...CUSTOMERS].sort((a, b) => b.ytdRevenue - a.ytdRevenue);

  return (
    <div className="page page-wide">
      <div className="crumb">Analytics <b>/ Business health · YTD 2026</b></div>
      <h1 className="title">Analytics</h1>
      <p className="lede">
        The health of the whole business at a glance — revenue, margin, growth, and concentration. It assembles itself
        from operations and commissions data, so the number you see is the number that&apos;s true right now.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Revenue YTD</span><span className="big">{usd(ANALYTICS.revenueYTD)}</span><span className="delta up"><TrendingUp size={12} style={{ verticalAlign: "-1px" }} /> +7.4% MoM</span></div>
        <div className="kpi"><span className="lab"><Percent size={14} /> Gross margin</span><span className="big">{pct(ANALYTICS.marginPct)}</span><span className="small muted" style={{ marginTop: 4 }}>{usd(ANALYTICS.marginYTD)} YTD</span></div>
        <div className="kpi"><span className="lab"><Truck size={14} /> Loads YTD</span><span className="big">{compact(ANALYTICS.loadsYTD)}</span><span className="small muted" style={{ marginTop: 4 }}>{usd(ANALYTICS.avgMarginPerLoad)} avg margin/load</span></div>
        <div className="kpi"><span className="lab"><Target size={14} /> On-time delivery</span><span className="big">{pct(ANALYTICS.onTimePct)}</span></div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", marginTop: 18 }}>
        {/* revenue/margin bars */}
        <div className="card">
          <div className="card-h"><h2>Revenue & margin</h2><span className="sub">Last 6 months</span></div>
          <div className="card-p">
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 220, padding: "8px 4px 0" }}>
              {REVENUE_SERIES.map((r) => {
                const h = (r.revenue / maxRev) * 180;
                const mh = (r.margin / maxRev) * 180;
                return (
                  <div key={r.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 5, height: 188 }}>
                      <div title={`Revenue ${usd(r.revenue)}`} style={{ width: 18, height: h, background: "linear-gradient(180deg,#6a5bf5,#4a3cd6)", borderRadius: "5px 5px 0 0" }} />
                      <div title={`Margin ${usd(r.margin)}`} style={{ width: 18, height: mh, background: "#2766d6", borderRadius: "5px 5px 0 0", opacity: 0.55 }} />
                    </div>
                    <span className="small muted" style={{ fontWeight: 600 }}>{r.m}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex" style={{ gap: 18, marginTop: 14, fontSize: 12.5 }}>
              <span className="flex" style={{ gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: "linear-gradient(180deg,#6a5bf5,#4a3cd6)" }} /> Revenue</span>
              <span className="flex" style={{ gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: "#2766d6", opacity: .55 }} /> Margin</span>
            </div>
          </div>
        </div>

        {/* concentration */}
        <div className="card">
          <div className="card-h"><h2>Customer concentration</h2><span className="sub">Share of revenue</span></div>
          <div className="card-p" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ranked.map((c) => {
              const share = (c.ytdRevenue / totalRev) * 100;
              return (
                <div key={c.id}>
                  <div className="between" style={{ marginBottom: 5 }}>
                    <span style={{ fontWeight: 650, fontSize: 13 }}>{c.name}</span>
                    <span className="small muted mono">{pct(share)}</span>
                  </div>
                  <div className="barline"><i style={{ width: `${share}%`, background: c.health === "risk" ? "var(--bad)" : c.health === "watch" ? "var(--warn)" : "var(--accent)" }} /></div>
                </div>
              );
            })}
            <p className="small muted" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
              Top account is {pct(ANALYTICS.topCustomerShare)} of revenue — below the 20% single-point-risk line. Northstar
              (red) is actively re-bidding; the Brain flags it as the near-term exposure.
            </p>
          </div>
        </div>
      </div>

      <div className="card card-p" style={{ marginTop: 18, background: "var(--accent-soft)", borderColor: "var(--accent-line)" }}>
        <p className="small" style={{ color: "var(--ink-2)" }}>
          <strong>Synchronized:</strong> these numbers aren&apos;t a monthly export — they recompute as loads close in
          Operations and the pay run settles in Commissions. Ask the Brain &quot;where&apos;s our revenue concentration risk?&quot;
          to see it reason across all of it.
        </p>
      </div>
    </div>
  );
}
