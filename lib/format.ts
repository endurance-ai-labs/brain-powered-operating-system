export const usd = (n: number, dp = 0) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: dp, maximumFractionDigits: dp });

export const num = (n: number) => n.toLocaleString("en-US");

export const pct = (n: number, dp = 1) => `${n.toFixed(dp)}%`;

export const compact = (n: number) =>
  n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });

export const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
