/**
 * Values like "auth.keyra.ie" without a scheme are treated as paths on the
 * current origin in the browser. Always produce an absolute URL for fetch().
 */
export function normalizeAuthBackendBaseUrl(value: string): string {
  const trimmed = String(value ?? "").trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const hostOnly = trimmed.split("/")[0] ?? "";
  if (/^localhost(:\d+)?$/i.test(hostOnly) || /^127\.0\.0\.1(:\d+)?$/i.test(hostOnly)) {
    return `http://${trimmed}`;
  }
  return `https://${trimmed}`;
}

const raw = process.env.NEXT_PUBLIC_SIMSECURE_AUTH_BACKEND_URL ?? "http://localhost:4000";

/** Auth backend base URL for API calls (absolute). */
export const AUTH_BACKEND_URL = normalizeAuthBackendBaseUrl(raw) || "http://localhost:4000";
