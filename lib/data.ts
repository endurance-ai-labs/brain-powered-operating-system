/* ============================================================
   Brain Powered Operating System — one synchronized dataset.

   Every module reads from THIS file. A call captured by Ella is
   linked to a load in Logistics, which is paid out in Commissions,
   rolled up in Analytics, and answerable by the Brain. That shared
   spine is what makes the OS feel like one nervous system.
   ============================================================ */

export const COMPANY = {
  name: "Meridian Freight Group",
  kind: "Freight brokerage & 3PL",
  hq: "Charlotte, NC",
  people: 41,
  weekEnding: "Jun 26, 2026",
};

/* ---------- Customers (the shared spine) ---------- */
export type Customer = {
  id: string;
  name: string;
  tier: "Key" | "Growth" | "New";
  owner: string; // broker who owns the relationship
  ytdRevenue: number;
  openLoads: number;
  lastContact: string;
  health: "good" | "watch" | "risk";
  memory: string; // what the Brain "remembers" across every channel
};

export const CUSTOMERS: Customer[] = [
  { id: "C-ARCADIA", name: "Arcadia Foods", tier: "Key", owner: "Marcus Vance", ytdRevenue: 1_240_000, openLoads: 7, lastContact: "2h ago", health: "good",
    memory: "12-month produce program, 5 lanes out of Salinas. Wants a dedicated reefer pool by Q4. CFO flagged detention charges twice — resolved." },
  { id: "C-WESTVIEW", name: "Westview Building Co.", tier: "Key", owner: "Marcus Vance", ytdRevenue: 880_000, openLoads: 4, lastContact: "Today", health: "watch",
    memory: "Flatbed steel + drywall. Closing on the Westview Tower job. Sensitive to running-late updates — escalates fast. Net-45 terms." },
  { id: "C-DELMAR", name: "Del Mar Beverage", tier: "Growth", owner: "Priya Shah", ytdRevenue: 612_000, openLoads: 5, lastContact: "Yesterday", health: "good",
    memory: "Seasonal beverage ramp May–Sept. Asked about a quarterly business review. Pays on time, low-drama, expanding into TX." },
  { id: "C-NORTHSTAR", name: "Northstar Retail", tier: "Growth", owner: "Devon Brooks", ytdRevenue: 498_000, openLoads: 6, lastContact: "3d ago", health: "risk",
    memory: "Two missed deliveries in May. Procurement re-bidding 3 lanes. Needs a save play this week or volume walks. Owner aware." },
  { id: "C-CEDAR", name: "Cedar & Co. Furniture", tier: "Growth", owner: "Priya Shah", ytdRevenue: 356_000, openLoads: 3, lastContact: "4d ago", health: "good",
    memory: "White-glove residential. Loves the proactive ETA texts. Open to a volume commitment if rates hold." },
  { id: "C-BLUEPEAK", name: "Bluepeak Industrial", tier: "New", owner: "Devon Brooks", ytdRevenue: 84_000, openLoads: 2, lastContact: "Today", health: "good",
    memory: "Onboarded 3 weeks ago via inbound call. First two loads delivered clean. Decision-maker is the ops manager, not procurement." },
];

/* ---------- Ella: conversations captured across every channel ---------- */
export type Channel = "Phone" | "Zoom" | "Teams" | "In-person" | "Google Meet";
export type Conversation = {
  id: string;
  customerId: string;
  who: string;
  channel: Channel;
  when: string;
  durationMin: number;
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
  followUp: string | null;
  linkedLoadId: string | null;
};

export const CONVERSATIONS: Conversation[] = [
  { id: "V-2041", customerId: "C-WESTVIEW", who: "Karen Liu (Westview)", channel: "Phone", when: "Today · 9:12 AM", durationMin: 6,
    sentiment: "negative", summary: "Asked why load M-80422 was running late to the Tower site. Crane crew is on the clock — wants it there by 2 PM or there's a penalty.",
    followUp: "Marcus to confirm revised ETA + comp the detention. Tied to load M-80422.", linkedLoadId: "M-80422" },
  { id: "V-2039", customerId: "C-ARCADIA", who: "Tom Reyes (Arcadia)", channel: "Teams", when: "Today · 8:04 AM", durationMin: 22,
    sentiment: "positive", summary: "Quarterly produce planning. Confirmed reefer pool expansion for Q4 — roughly 9 new lanes out of Salinas. Sent rate sheet.",
    followUp: "Priya to draft the Q4 reefer pool proposal by Fri.", linkedLoadId: null },
  { id: "V-2036", customerId: "C-BLUEPEAK", who: "Inbound caller (Bluepeak)", channel: "Phone", when: "Today · 7:41 AM", durationMin: 4,
    sentiment: "positive", summary: "New lane request, Cleveland → Atlanta, dry van, picks Thursday. Ella captured the lane, gave a quote band, booked a callback.",
    followUp: "Devon to quote lane M-80511 and call back before noon.", linkedLoadId: "M-80511" },
  { id: "V-2034", customerId: "C-NORTHSTAR", who: "Angela Pratt (Northstar)", channel: "Zoom", when: "Yesterday · 4:30 PM", durationMin: 18,
    sentiment: "negative", summary: "Re-bid conversation. Two May misses cost them a reset on 3 lanes. Open to keeping volume if we guarantee tracking + a service credit.",
    followUp: "Devon to send a save proposal w/ service credit by Mon AM.", linkedLoadId: null },
  { id: "V-2030", customerId: "C-DELMAR", who: "Sofia Marin (Del Mar)", channel: "In-person", when: "Yesterday · 11:00 AM", durationMin: 35,
    sentiment: "positive", summary: "On-site QBR. Beverage ramp tracking ahead of plan. Wants to add 2 Texas lanes in July. Very happy with on-time performance.",
    followUp: "Priya to add TX lanes to the August forecast.", linkedLoadId: null },
  { id: "V-2025", customerId: "C-CEDAR", who: "Ben Ortiz (Cedar & Co.)", channel: "Google Meet", when: "4 days ago", durationMin: 12,
    sentiment: "neutral", summary: "Discussed a volume commitment in exchange for locked rates through year-end. Wants numbers before committing.",
    followUp: "Priya to model a committed-volume rate card.", linkedLoadId: null },
];

/* ---------- Logistics: loads in motion ---------- */
export type LoadStatus = "Delivered" | "In transit" | "At pickup" | "Running late" | "Booked" | "Needs cover";
export type Load = {
  id: string;
  customerId: string;
  lane: string;
  equipment: "Reefer" | "Dry van" | "Flatbed";
  broker: string;
  carrier: string | null;
  revenue: number;
  cost: number;
  status: LoadStatus;
  eta: string;
};

export const LOADS: Load[] = [
  { id: "M-80422", customerId: "C-WESTVIEW", lane: "Birmingham, AL → Charlotte, NC", equipment: "Flatbed", broker: "Marcus Vance", carrier: "Ridgeline Carriers", revenue: 2_950, cost: 2_180, status: "Running late", eta: "Today 3:40 PM" },
  { id: "M-80419", customerId: "C-ARCADIA", lane: "Salinas, CA → Dallas, TX", equipment: "Reefer", broker: "Marcus Vance", carrier: "Coldway Logistics", revenue: 4_820, cost: 3_910, status: "In transit", eta: "Tomorrow 6:00 AM" },
  { id: "M-80511", customerId: "C-BLUEPEAK", lane: "Cleveland, OH → Atlanta, GA", equipment: "Dry van", broker: "Devon Brooks", carrier: null, revenue: 2_300, cost: 0, status: "Needs cover", eta: "Picks Thu 8 AM" },
  { id: "M-80402", customerId: "C-DELMAR", lane: "Houston, TX → Phoenix, AZ", equipment: "Dry van", broker: "Priya Shah", carrier: "Sunbelt Freight", revenue: 2_640, cost: 1_980, status: "In transit", eta: "Tomorrow 2:00 PM" },
  { id: "M-80388", customerId: "C-NORTHSTAR", lane: "Memphis, TN → Columbus, OH", equipment: "Dry van", broker: "Devon Brooks", carrier: "Quikhaul", revenue: 1_980, cost: 1_560, status: "At pickup", eta: "Today 5:00 PM" },
  { id: "M-80377", customerId: "C-CEDAR", lane: "High Point, NC → Boston, MA", equipment: "Dry van", broker: "Priya Shah", carrier: "Eastline Transport", revenue: 3_120, cost: 2_400, status: "Delivered", eta: "Delivered 11:20 AM" },
  { id: "M-80371", customerId: "C-ARCADIA", lane: "Salinas, CA → Denver, CO", equipment: "Reefer", broker: "Marcus Vance", carrier: "Coldway Logistics", revenue: 3_980, cost: 3_150, status: "Delivered", eta: "Delivered yest." },
  { id: "M-80366", customerId: "C-DELMAR", lane: "Houston, TX → Oklahoma City, OK", equipment: "Dry van", broker: "Priya Shah", carrier: "Sunbelt Freight", revenue: 1_540, cost: 1_180, status: "Delivered", eta: "Delivered yest." },
];

/* ---------- Commissions (Payline): this week's pay run ---------- */
export type Payee = {
  id: string;
  name: string;
  office: string;
  role: "Broker" | "Dispatcher" | "Team lead";
  loads: number;
  margin: number; // margin generated this week
  pay: number; // commission owed
  flag: "ok" | "warn" | "block";
};

export const PAYEES: Payee[] = [
  { id: "P-MV", name: "Marcus Vance", office: "Charlotte", role: "Team lead", loads: 14, margin: 11_240, pay: 3_372, flag: "ok" },
  { id: "P-PS", name: "Priya Shah", office: "Charlotte", role: "Broker", loads: 11, margin: 7_980, pay: 2_394, flag: "ok" },
  { id: "P-DB", name: "Devon Brooks", office: "Charlotte", role: "Broker", loads: 9, margin: 5_410, pay: 1_623, flag: "warn" },
  { id: "P-JC", name: "Jordan Cole", office: "Atlanta", role: "Broker", loads: 8, margin: 6_120, pay: 1_836, flag: "ok" },
  { id: "P-RW", name: "Renee Walsh", office: "Atlanta", role: "Dispatcher", loads: 6, margin: 2_040, pay: 612, flag: "ok" },
  { id: "P-TK", name: "Tariq Khan", office: "Charlotte", role: "Broker", loads: 7, margin: 4_360, pay: 1_308, flag: "block" },
];

export const COMMISSION_RUN = {
  weekEnding: "Jun 26, 2026",
  readyToPay: PAYEES.reduce((s, p) => s + p.pay, 0),
  loadsImported: 312,
  people: PAYEES.length,
  blockers: PAYEES.filter((p) => p.flag === "block").length,
  warnings: PAYEES.filter((p) => p.flag === "warn").length,
  blockerNote: "Tariq Khan — load M-80511 has no carrier cost yet (still needs cover), so margin can't be settled.",
  warningNote: "Devon Brooks — Northstar service credit pending may reduce payable margin.",
};

/* ---------- Analytics: business health ---------- */
export const REVENUE_SERIES = [
  { m: "Jan", revenue: 1_180_000, margin: 198_000 },
  { m: "Feb", revenue: 1_240_000, margin: 211_000 },
  { m: "Mar", revenue: 1_410_000, margin: 246_000 },
  { m: "Apr", revenue: 1_530_000, margin: 268_000 },
  { m: "May", revenue: 1_620_000, margin: 274_000 },
  { m: "Jun", revenue: 1_740_000, margin: 305_000 },
];

export const ANALYTICS = {
  revenueYTD: REVENUE_SERIES.reduce((s, r) => s + r.revenue, 0),
  marginYTD: REVENUE_SERIES.reduce((s, r) => s + r.margin, 0),
  marginPct: 17.4,
  loadsYTD: 9_840,
  avgMarginPerLoad: 318,
  topCustomerShare: 14.2, // Arcadia as % of revenue
  onTimePct: 96.3,
};

/* ---------- The synchronization proof: one event, many systems ---------- */
export type ActivityModule = "Ella" | "Logistics" | "Commissions" | "Analytics" | "Brain";
export type Activity = {
  id: string;
  module: ActivityModule;
  when: string;
  text: string;
  ripple: string; // what it triggered in OTHER systems
};

export const ACTIVITY: Activity[] = [
  { id: "A1", module: "Ella", when: "9:12 AM", text: "Captured an angry call from Westview about late load M-80422.",
    ripple: "Logistics flagged the load · Brain surfaced it to Marcus · Commissions held the margin" },
  { id: "A2", module: "Logistics", when: "9:13 AM", text: "Load M-80422 re-routed; new ETA pushed to the customer automatically.",
    ripple: "Ella logged the update on Westview's timeline" },
  { id: "A3", module: "Ella", when: "7:41 AM", text: "New inbound lane captured from Bluepeak → created load M-80511.",
    ripple: "Logistics opened the load · Commissions blocked Tariq's pay until it's covered" },
  { id: "A4", module: "Commissions", when: "6:30 AM", text: "Weekly pay run built: $11,145 ready across 6 payees.",
    ripple: "Analytics updated margin-per-load · Brain can now answer 'who gets paid what'" },
  { id: "A5", module: "Brain", when: "Live", text: "Answered 'which customers are at risk?' across calls, loads, and revenue.",
    ripple: "Pulled from Ella sentiment + Logistics misses + Analytics concentration" },
];

/* ---------- Module registry (used by landing + nav) ---------- */
export const MODULES = [
  { key: "brain", name: "The Brain", href: "/brain", tag: "Nervous system",
    blurb: "Ask anything about your company in plain English. The Brain reads every other system and answers with sources." },
  { key: "conversations", name: "Conversations", href: "/conversations", tag: "Ella",
    blurb: "Every customer call, video meeting, and in-person conversation — captured, transcribed, and remembered forever." },
  { key: "commissions", name: "Commissions", href: "/commissions", tag: "Payline",
    blurb: "Turn load data into a clean weekly pay run — splits, pools, reconciliation, statements, settled to the penny." },
  { key: "logistics", name: "Operations", href: "/logistics", tag: "Mission Control",
    blurb: "The living operations map — every load from quote to cash, what needs attention now, and what's automated." },
  { key: "analytics", name: "Analytics", href: "/analytics", tag: "Business health",
    blurb: "Revenue, margin, growth, and customer concentration — the health of the whole business at a glance." },
] as const;

/* ---------- helpers ---------- */
export const customer = (id: string) => CUSTOMERS.find((c) => c.id === id);
export const load = (id: string) => LOADS.find((l) => l.id === id);
