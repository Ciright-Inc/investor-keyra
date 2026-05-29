import { buildInvestorReturnUrl } from "@/lib/pending-auth-return";
import { getGetStartedPublicOrigin } from "@/lib/get-started-public-origin";

/** get-started URL with ?return= pointing back to the investor portal. */
export function buildGetStartedSignInUrl(
  returnPath = "/dashboard",
  portalOrigin?: string,
): string {
  const returnTo = buildInvestorReturnUrl(returnPath, portalOrigin);
  return `${getGetStartedPublicOrigin()}/?return=${encodeURIComponent(returnTo)}`;
}
