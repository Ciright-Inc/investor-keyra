import { buildInvestorReturnUrl } from "@/lib/pending-auth-return";
import { getGetStartedPublicOrigin } from "@/lib/get-started-public-origin";

/** get-started URL with ?return= pointing back to the investor portal. */
export function buildGetStartedSignInUrl(returnPath = "/dashboard"): string {
  const returnTo = buildInvestorReturnUrl(returnPath);
  return `${getGetStartedPublicOrigin()}/?return=${encodeURIComponent(returnTo)}`;
}
