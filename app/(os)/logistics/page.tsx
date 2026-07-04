import { Truck, AlertTriangle, MapPin, DollarSign, Activity } from "lucide-react";
import { LOADS, customer, CITY_COORDS, project, type LoadStatus } from "@/lib/data";
import { usd, pct } from "@/lib/format";

const STATUS: Record<LoadStatus, string> = {
  Delivered: "good", "In transit": "signal", "At pickup": "steel", "Running late": "bad", Booked: "steel", "Needs cover": "warn",
};
const STATUS_HEX: Record<LoadStatus, string> = {
  Delivered: "#6f8f5f", "In transit": "#C7A76C", "At pickup": "#8E8E85", "Running late": "#8F3A2E", Booked: "#8E8E85", "Needs cover": "#b08a3c",
};
const EQUIP_HEX: Record<string, string> = { Reefer: "#C7A76C", "Dry van": "#6B6B62", Flatbed: "#E8DEC4" };
const ACTIVE = new Set<LoadStatus>(["In transit", "At pickup", "Running late"]);

const W = 900;
const H = 460;

export default function LogisticsPage() {
  const revenue = LOADS.reduce((s, l) => s + l.revenue, 0);
  const cost = LOADS.reduce((s, l) => s + l.cost, 0);
  const margin = revenue - cost;
  const attention = LOADS.filter((l) => l.status === "Running late" || l.status === "Needs cover");

  // ── map routes ──
  const routes = LOADS.map((l) => {
    const [o, d] = l.lane.split(" → ");
    const oc = CITY_COORDS[o], dc = CITY_COORDS[d];
    if (!oc || !dc) return null;
    return { l, o, d, a: project(oc.lng, oc.lat, W, H), b: project(dc.lng, dc.lat, W, H), active: ACTIVE.has(l.status) };
  }).filter(Boolean) as { l: (typeof LOADS)[number]; o: string; d: string; a: { x: number; y: number }; b: { x: number; y: number }; active: boolean }[];
  const cityNames = Array.from(new Set(routes.flatMap((r) => [r.o, r.d])));
  const cities = cityNames.map((n) => ({ n, p: project(CITY_COORDS[n].lng, CITY_COORDS[n].lat, W, H) }));

  // ── pipeline stages ──
  const STAGES: LoadStatus[] = ["Needs cover", "At pickup", "In transit", "Running late", "Delivered"];
  const stageCounts = STAGES.map((s) => ({ s, n: LOADS.filter((l) => l.status === s).length }));
  const maxStage = Math.max(...stageCounts.map((x) => x.n), 1);

  // ── equipment mix ──
  const equip = ["Reefer", "Dry van", "Flatbed"].map((e) => ({
    e, n: LOADS.filter((l) => l.equipment === e).length, rev: LOADS.filter((l) => l.equipment === e).reduce((s, l) => s + l.revenue, 0),
  }));
  let acc = 0;
  const stops = equip.map((x) => {
    const from = (acc / LOADS.length) * 360;
    acc += x.n;
    const to = (acc / LOADS.length) * 360;
    return `${EQUIP_HEX[x.e]} ${from}deg ${to}deg`;
  }).join(", ");

  // ── carrier leaderboard ──
  const byCarrier = Object.values(
    LOADS.filter((l) => l.carrier).reduce((m, l) => {
      const k = l.carrier as string;
      (m[k] ??= { carrier: k, n: 0, rev: 0 }).n++;
      m[k].rev += l.revenue;
      return m;
    }, {} as Record<string, { carrier: string; n: number; rev: number }>),
  ).sort((a, b) => b.rev - a.rev);

  return (
    <div className="page">
      <div className="crumb">Operations <b>/ Mission Control · live board</b></div>
      <h1 className="title">Operations</h1>
      <p className="intro">
        The living operations map — every load from quote to cash, visualized in real time. Lanes, pipeline, equipment,
        and carriers update as the board moves, and every event ripples into Commissions, Conversations, and the Brain.
      </p>

      <div className="grid cols-4 mt-lg">
        <div className="kpi"><span className="lab"><Truck size={14} /> Active loads</span><div className="big">{LOADS.length}</div></div>
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Revenue on board</span><div className="big">{usd(revenue)}</div></div>
        <div className="kpi"><span className="lab"><DollarSign size={14} /> Margin</span><div className="big">{usd(margin)}</div><div className="sub">{pct((margin / revenue) * 100)} of revenue</div></div>
        <div className="kpi"><span className="lab"><AlertTriangle size={14} color="var(--rust)" /> Need attention</span><div className="big" style={{ color: "var(--rust)" }}>{attention.length}</div></div>
      </div>

      {/* ── live lane network map ── */}
      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-h"><h2>Live lane network</h2><span className="sub"><Activity size={11} style={{ verticalAlign: "-1px" }} /> {routes.filter((r) => r.active).length} in motion</span></div>
        <div className="map-wrap">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
            {/* graticule */}
            {[-120, -105, -90, -75].map((lng) => {
              const p = project(lng, 49, W, H), p2 = project(lng, 24, W, H);
              return <line key={lng} className="map-graticule" x1={p.x} y1={p.y} x2={p2.x} y2={p2.y} strokeDasharray="2 8" opacity={0.5} />;
            })}
            {[45, 37, 30].map((lat) => {
              const p = project(-125, lat, W, H), p2 = project(-66, lat, W, H);
              return <line key={lat} className="map-graticule" x1={p.x} y1={p.y} x2={p2.x} y2={p2.y} strokeDasharray="2 8" opacity={0.5} />;
            })}
            {/* routes */}
            {routes.map((r, i) => (
              <g key={r.l.id}>
                <line x1={r.a.x} y1={r.a.y} x2={r.b.x} y2={r.b.y} stroke={STATUS_HEX[r.l.status]} strokeWidth={r.active ? 1.6 : 1} opacity={r.active ? 0.8 : 0.32} strokeDasharray={r.active ? undefined : "4 5"} />
                {r.active && (
                  <circle r="3.2" fill={STATUS_HEX[r.l.status]}>
                    <animateMotion dur="3.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M${r.a.x},${r.a.y} L${r.b.x},${r.b.y}`} />
                    <animate attributeName="opacity" values="0;1;1;0" dur="3.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
            {/* cities */}
            {cities.map((c) => (
              <g key={c.n}>
                <circle className="map-city" cx={c.p.x} cy={c.p.y} r="4.5" />
                <text className="map-city-lab" x={c.p.x + 8} y={c.p.y + 3}>{c.n.split(",")[0]}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="map-legend">
          {([["In transit", "In transit"], ["At pickup", "At pickup"], ["Running late", "Running late"], ["Needs cover", "Needs cover"], ["Delivered", "Delivered"]] as [LoadStatus, string][]).map(([s, lab]) => (
            <span key={s}><span className="dot" style={{ background: STATUS_HEX[s] }} /> {lab}</span>
          ))}
        </div>
      </div>

      {/* ── pipeline · equipment · carriers ── */}
      <div className="viz-grid">
        <div className="panel">
          <div className="panel-h"><h2>Load pipeline</h2><span className="sub">Quote → cash</span></div>
          <div className="panel-b">
            <div className="funnel">
              {stageCounts.map(({ s, n }) => (
                <div key={s} className="stage">
                  <div className="top"><span className="nm">{s}</span><span className="ct">{n}</span></div>
                  <div className="track"><i style={{ width: `${Math.max((n / maxStage) * 100, n ? 8 : 0)}%`, background: STATUS_HEX[s] }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-h"><h2>Equipment mix</h2><span className="sub">By load</span></div>
          <div className="panel-b flex" style={{ gap: 22, alignItems: "center" }}>
            <div className="donut" style={{ background: `conic-gradient(${stops})` }}>
              <div className="donut-c"><div className="n">{LOADS.length}</div><div className="l">Loads</div></div>
            </div>
            <div className="legend" style={{ flex: 1 }}>
              {equip.map((x) => (
                <div key={x.e} className="li">
                  <span className="sw" style={{ background: EQUIP_HEX[x.e] }} />
                  {x.e}
                  <span className="v">{x.n} · {usd(x.rev)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-h"><h2>Top carriers</h2><span className="sub">Revenue on board</span></div>
          <div className="panel-b">
            <div className="lead">
              {byCarrier.map((c) => (
                <div key={c.carrier} className="row">
                  <div>
                    <div className="nm">{c.carrier}</div>
                    <div className="sub">{c.n} load{c.n > 1 ? "s" : ""}</div>
                  </div>
                  <div className="v">{usd(c.rev)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
          <strong>Synchronized:</strong> load <span className="mono">M-80511</span> was created automatically from Remi&apos;s
          inbound Bluepeak call, and <span className="mono">M-80422</span> running late triggered the Westview escalation
          you see in Conversations — and a hold in Commissions. One board, wired to everything.
        </p>
      </div>
    </div>
  );
}
