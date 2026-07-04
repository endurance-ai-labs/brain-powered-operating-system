import { TrendingUp, DollarSign, Percent, Truck, Target } from "lucide-react";
import { REVENUE_SERIES, ANALYTICS, CUSTOMERS } from "@/lib/data";
import { usd, pct, compact } from "@/lib/format";

export default function AnalyticsPage() {
  const maxRev = Math.max(...REVENUE_SERIES.map((r) => r.revenue));
  const totalRev = CUSTOMERS.reduce((s, c) => s + c.ytdRevenue, 0);
  const ranked = [...CUSTOMERS].sort((a, b) => b.ytdRevenue - a.ytdRevenue);

  return (
    <div className="page">
      <div className="crumb">Analytics <b>/ Business health · YTD 2026</b></div>
      <h1 className="title">Analytics</h1>
      <p className="intro">
        The health of the whole business at a glance — revenue, margin, growth, and concentration. It assembles itself
        from operations and commissions data, so the number you see is the number that&apos;s true right now.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi">
          <span className="lab"><DollarSign size={14} /> Revenue YTD</span>
          <div className="big">{usd(ANALYTICS.revenueYTD)}</div>
          <div className="sub" style={{ color: "var(--signal)" }}><TrendingUp size={12} style={{ display: "inline", verticalAlign: "-1px" }} /> +7.4% MoM</div>
        </div>
        <div className="kpi">
          <span className="lab"><Percent size={14} /> Gross margin</span>
          <div className="big">{pct(ANALYTICS.marginPct)}</div>
          <div className="sub">{usd(ANALYTICS.marginYTD)} YTD</div>
        </div>
        <div className="kpi">
          <span className="lab"><Truck size={14} /> Loads YTD</span>
          <div className="big">{compact(ANALYTICS.loadsYTD)}</div>
          <div className="sub">{usd(ANALYTICS.avgMarginPerLoad)} avg margin/load</div>
        </div>
        <div className="kpi">
          <span className="lab"><Target size={14} /> On-time delivery</span>
          <div className="big">{pct(ANALYTICS.onTimePct)}</div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", marginTop: 20 }}>
        {/* revenue/margin bars */}
        <div className="panel">
          <div className="panel-h"><h2>Revenue &amp; margin</h2><span className="sub">Last 6 months</span></div>
          <div className="panel-b">
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 220, padding: "8px 4px 0" }}>
              {REVENUE_SERIES.map((r) => {
                const h = (r.revenue / maxRev) * 180;
                const mh = (r.margin / maxRev) * 180;
                return (
                  <div key={r.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 5, height: 188 }}>
                      <div title={`Revenue ${usd(r.revenue)}`} style={{ width: 18, height: h, background: "var(--signal)", borderRadius: "2px 2px 0 0" }} />
                      <div title={`Margin ${usd(r.margin)}`} style={{ width: 18, height: mh, background: "var(--signal-100)", borderRadius: "2px 2px 0 0", opacity: 0.55 }} />
                    </div>
                    <span className="small muted mono" style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>{r.m}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex mono" style={{ gap: 18, marginTop: 14, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--steel-400)" }}>
              <span className="flex" style={{ gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 2, background: "var(--signal)" }} /> Revenue</span>
              <span className="flex" style={{ gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 2, background: "var(--signal-100)", opacity: 0.55 }} /> Margin</span>
            </div>
          </div>
        </div>

        {/* concentration */}
        <div className="panel">
          <div className="panel-h"><h2>Customer concentration</h2><span className="sub">Share of revenue</span></div>
          <div className="panel-b" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ranked.map((c) => {
              const share = (c.ytdRevenue / totalRev) * 100;
              return (
                <div key={c.id}>
                  <div className="between" style={{ marginBottom: 5 }}>
                    <span style={{ color: "var(--bone)", fontWeight: 500, fontSize: 13 }}>{c.name}</span>
                    <span className="small muted mono">{pct(share)}</span>
                  </div>
                  <div className="barline"><i style={{ width: `${share}%`, background: c.health === "risk" ? "var(--rust)" : c.health === "watch" ? "var(--warn)" : "var(--signal)" }} /></div>
                </div>
              );
            })}
            <p className="small muted" style={{ borderTop: "1px solid var(--steel-800)", paddingTop: 12 }}>
              Top account is {pct(ANALYTICS.topCustomerShare)} of revenue — below the 20% single-point-risk line. Northstar
              (red) is actively re-bidding; the Brain flags it as the near-term exposure.
            </p>
          </div>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 20 }}>
        <p>
          <strong>Synchronized:</strong> these numbers aren&apos;t a monthly export — they recompute as loads close in
          Operations and the pay run settles in Commissions. Ask the Brain &quot;where&apos;s our revenue concentration risk?&quot;
          to see it reason across all of it.
        </p>
      </div>
    </div>
  );
}
