// Base path the app is served under (set to "/BPOS" for endurancelabs.ai/BPOS).
// Empty string when served at the domain root.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset with the active base path. */
export const asset = (p: string) => `${BASE}${p}`;
