/** Public get-started app origin (no trailing slash). */
const LOCAL_GET_STARTED = "http://localhost:5173";
const PRODUCTION_GET_STARTED = "https://get-started.keyra.ie";

function isLocalHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/** Resolve get-started origin for the current environment (safe on server + client). */
export function getGetStartedPublicOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_GET_STARTED_URL?.trim().replace(/\/+$/, "");
  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development") {
    return LOCAL_GET_STARTED;
  }

  if (typeof window !== "undefined" && isLocalHostname(window.location.hostname)) {
    return LOCAL_GET_STARTED;
  }

  return PRODUCTION_GET_STARTED;
}
