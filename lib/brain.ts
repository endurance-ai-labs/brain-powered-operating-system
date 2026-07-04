import { CUSTOMERS, LOADS, PAYEES, CONVERSATIONS, COMMISSION_RUN, ANALYTICS } from "./data";
import { usd } from "./format";

export type Source = { module: "Ella" | "Logistics" | "Commissions" | "Analytics"; label: string };
export type Answer = { text: string; sources: Source[] };

/* The Brain reasons across every module. These canned answers each pull
   facts from MORE THAN ONE system — that cross-system join is the point. */

export const SUGGESTED = [
  "Which customers are at risk this week?",
  "What's the status of the Westview deal?",
  "Who gets paid what this week, and why is anything blocked?",
  "What does the late load M-80422 mean for our margin?",
  "Where is our revenue concentration risk?",
];

export function ask(qRaw: string): Answer {
  const q = qRaw.toLowerCase();

  // at-risk customers — joins Ella sentiment + Logistics misses + Analytics
  if (q.includes("risk") && (q.includes("customer") || q.includes("account"))) {
    const ns = CUSTOMERS.find((c) => c.id === "C-NORTHSTAR")!;
    const wv = CUSTOMERS.find((c) => c.id === "C-WESTVIEW")!;
    return {
      text:
        `Two accounts need attention right now.\n\n` +
        `• **${ns.name}** (${usd(ns.ytdRevenue)} YTD, owned by ${ns.owner}) — flagged **risk**. Remi logged a negative re-bid call yesterday after two May delivery misses, and procurement is re-bidding 3 lanes. There's no save proposal sent yet. This is the priority.\n\n` +
        `• **${wv.name}** (${usd(wv.ytdRevenue)} YTD, ${wv.owner}) — flagged **watch**. A late flatbed (M-80422) drew an angry call this morning; they escalate fast and are Net-45. Confirm the revised ETA and comp the detention today.\n\n` +
        `Everyone else is green.`,
      sources: [
        { module: "Ella", label: "Northstar re-bid call (V-2034) · Westview late-load call (V-2041)" },
        { module: "Logistics", label: "May delivery misses · load M-80422 running late" },
        { module: "Analytics", label: "Customer health flags" },
      ],
    };
  }

  // Westview deal status — joins Ella + Logistics + Commissions
  if (q.includes("westview")) {
    return {
      text:
        `**Westview Building Co.** — $880K YTD, owned by Marcus Vance, currently **watch**.\n\n` +
        `Live picture: load **M-80422** (Birmingham → Charlotte, flatbed) is **running late**, ETA now ~3:40 PM. Karen Liu called at 9:12 AM — the crane crew is on the clock and she wants it there by 2 PM or there's a penalty. Remi opened a follow-up: confirm the revised ETA and comp the detention.\n\n` +
        `Money angle: the load carries ${usd(2950)} revenue / ${usd(770)} margin. If we comp detention it trims Marcus's payable margin this week, which Commissions will reflect automatically. Recommend: call Karen now, then send the goodwill credit.`,
      sources: [
        { module: "Ella", label: "Westview call V-2041 (negative, 6 min)" },
        { module: "Logistics", label: "Load M-80422 — running late" },
        { module: "Commissions", label: "Marcus Vance payable margin" },
      ],
    };
  }

  // pay run — Commissions + Logistics + Ella for the why
  if ((q.includes("pay") || q.includes("paid") || q.includes("commission")) && !q.includes("late")) {
    const lines = PAYEES.map((p) => `• ${p.name} — ${usd(p.pay)} (${p.loads} loads)${p.flag === "block" ? " ⛔ blocked" : p.flag === "warn" ? " ⚠ warning" : ""}`).join("\n");
    return {
      text:
        `This week's run (ending ${COMMISSION_RUN.weekEnding}): **${usd(COMMISSION_RUN.readyToPay)} ready** across ${COMMISSION_RUN.people} payees, ${COMMISSION_RUN.loadsImported} loads imported.\n\n${lines}\n\n` +
        `**Why the holds:** ${COMMISSION_RUN.blockerNote} ${COMMISSION_RUN.warningNote}\n\n` +
        `Note both holds trace back to live events — a load that still needs cover (from Remi's Bluepeak call) and a pending service credit. Clear those two and the run settles to the penny.`,
      sources: [
        { module: "Commissions", label: "Pay run — week ending Jun 26" },
        { module: "Logistics", label: "Load M-80511 needs cover (no carrier cost)" },
        { module: "Ella", label: "Bluepeak inbound call V-2036 · Northstar credit V-2034" },
      ],
    };
  }

  // M-80422 margin impact
  if (q.includes("m-80422") || (q.includes("late") && q.includes("margin")) || q.includes("80422")) {
    return {
      text:
        `Load **M-80422** (Westview, Birmingham → Charlotte) bills ${usd(2950)} against ${usd(2180)} carrier cost — **${usd(770)} margin (26%)**.\n\n` +
        `It's running late and the customer is threatening a detention penalty. If we comp detention (~$250–$400) as goodwill, margin drops to roughly ${usd(420)}–${usd(520)}. That flows straight into Marcus Vance's commission for the week, so the Commissions run will recalc on its own — no spreadsheet surgery.\n\n` +
        `Across the book it's immaterial to monthly margin (${usd(ANALYTICS.marginYTD / 6)}/mo avg), but the relationship risk is the real cost — Westview is an $880K Net-45 key account.`,
      sources: [
        { module: "Logistics", label: "Load M-80422 economics" },
        { module: "Commissions", label: "Marcus Vance — margin-linked pay" },
        { module: "Ella", label: "Westview escalation call V-2041" },
      ],
    };
  }

  // concentration / revenue risk
  if (q.includes("concentration") || (q.includes("revenue") && q.includes("risk")) || q.includes("biggest customer")) {
    return {
      text:
        `Revenue concentration is healthy but worth watching. Your top account, **Arcadia Foods**, is ~${ANALYTICS.topCustomerShare}% of revenue (${usd(1_240_000)} YTD) — below the 20% line where it'd be a real single-point risk.\n\n` +
        `The bigger near-term exposure is **Northstar Retail**: only ~6% of revenue but actively re-bidding 3 lanes after service misses. Losing it dents growth, not survival. Meanwhile Arcadia is *expanding* (Q4 reefer pool, +9 lanes from this morning's call), which would push concentration up — a good problem, but plan a second reefer-heavy account to balance it.`,
      sources: [
        { module: "Analytics", label: `Top-customer share ${ANALYTICS.topCustomerShare}%` },
        { module: "Ella", label: "Arcadia Q4 expansion call V-2039 · Northstar re-bid V-2034" },
        { module: "Logistics", label: "Lane mix by customer" },
      ],
    };
  }

  // fallback — still demonstrates the cross-system framing
  return {
    text:
      `I read across all five systems — Conversations (Remi), Operations, Commissions, and Analytics — to answer that.\n\n` +
      `Right now the live picture: ${usd(COMMISSION_RUN.readyToPay)} is ready to pay this week, ${LOADS.filter((l) => l.status === "Running late" || l.status === "Needs cover").length} loads need attention, and ${CUSTOMERS.filter((c) => c.health !== "good").length} accounts are flagged. Try one of the suggested questions, or ask about a specific customer, load, or payee — I'll join the data for you.`,
    sources: [
      { module: "Logistics", label: "Live load board" },
      { module: "Commissions", label: "This week's run" },
      { module: "Analytics", label: "Business health" },
    ],
  };
}
