# Brain Powered Operating System

**One brain connecting every system in your company.**

A live, interactive demo that unifies four Endurance Labs products into a single, synchronized
operating system — so prospects can see that they can adopt any one system today, or run their
whole company on one brain tomorrow.

## The idea

Most companies bolt together a dozen disconnected tools and then hire people to sit in the gaps —
re-keying data, chasing follow-ups, reconciling numbers, and assembling status nobody trusts.

The Brain Powered Operating System removes the seams. Every part of the business feeds **one brain**
that sees everything and answers in plain English. The result: scale output without scaling the
back office (administrative staff, asset/portfolio managers, commissions clerks, front-desk).

## The five systems

| System | a.k.a. | What it does |
| --- | --- | --- |
| **The Brain** | Nervous system | Ask anything in plain English. Reads every other system, answers with sources. |
| **Conversations** | Ella | Captures every call, video meeting, and in-person conversation — transcribed and remembered. |
| **Commissions** | Payline | Turns load data into a clean weekly pay run — splits, pools, reconciliation, statements. |
| **Operations** | Mission Control | The living operations map — every load from quote to cash, triaged in real time. |
| **Analytics** | Business health | Revenue, margin, growth, and customer concentration, assembled from the live data. |

## The synchronization

The demo runs on **one connected dataset** (`lib/data.ts`) for a fictional company,
**Meridian Freight Group**. A single event ripples through every system:

> An angry customer call is **captured by Ella** → the late load is **flagged in Operations** →
> the affected margin is **held in Commissions** → it rolls into **Analytics** → and the **Brain**
> can answer "which customers are at risk?" by joining all of it.

That shared spine is what makes it feel like one nervous system instead of four apps.

## Tech

- Next.js 15 (App Router) · React 19 · TypeScript
- No database, no auth — fully self-contained sample data, deploys anywhere
- `lib/data.ts` — the one synchronized dataset every module reads
- `lib/brain.ts` — the cross-system Q&A engine (each answer joins ≥2 systems, with cited sources)

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

---

© 2026 · An Endurance Labs product. Customizable to any company's data and infrastructure.
