import { getInvestorPortalOrigin } from "@/lib/investor-portal-origin";

/** Paths that may receive users after get-started sign-in. */
export const AUTH_RETURN_DESTINATION_PREFIXES = ["/dashboard"] as const;

export const AUTH_RETURN_PARAM = "auth_return";

export const AUTH_RETURN_STORAGE_KEY = "keyra_investors_pending_auth_return";

let authReturnLatched = false;

export function markPendingAuthReturn() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(AUTH_RETURN_STORAGE_KEY, "1");
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-auth-return", "1");
  }
}

export function clearPendingAuthReturn() {
  authReturnLatched = false;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem(AUTH_RETURN_STORAGE_KEY);
  }
  if (typeof document !== "undefined") {
    document.documentElement.removeAttribute("data-auth-return");
  }
}

export function readAuthReturnFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get(AUTH_RETURN_PARAM) === "1";
}

export function consumeAuthReturnUrlParam() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(AUTH_RETURN_PARAM)) return;
  url.searchParams.delete(AUTH_RETURN_PARAM);
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, "", next);
}

export function scheduleConsumeAuthReturnUrlParam(delayMs = 2500) {
  if (typeof window === "undefined") return;
  window.setTimeout(() => consumeAuthReturnUrlParam(), delayMs);
}

export function isAuthReturnDestinationPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return AUTH_RETURN_DESTINATION_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function getAuthEntryPendingSnapshot(): boolean {
  if (typeof window === "undefined") return false;

  if (readAuthReturnFromUrl()) {
    authReturnLatched = true;
    markPendingAuthReturn();
    scheduleConsumeAuthReturnUrlParam();
    return true;
  }

  return authReturnLatched;
}

/** @param portalOrigin Override (e.g. `window.location.origin`) so client links match the live host. */
export function buildInvestorReturnUrl(path = "/dashboard", portalOrigin?: string): string {
  const base = portalOrigin?.trim() || getInvestorPortalOrigin();
  return new URL(path, base).toString();
}
