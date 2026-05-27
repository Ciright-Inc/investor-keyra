/** Investor portal origin (no trailing slash). Used for SSR-safe return URLs. */
const LOCAL_INVESTORS = "http://localhost:3000";
const PRODUCTION_INVESTORS = "https://investors.keyra.ie";

/** Resolve investor portal origin (consistent on server + client for hydration). */
export function getInvestorPortalOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  const explicit = process.env.NEXT_PUBLIC_INVESTORS_URL?.trim().replace(/\/+$/, "");
  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development") {
    return LOCAL_INVESTORS;
  }

  return PRODUCTION_INVESTORS;
}
