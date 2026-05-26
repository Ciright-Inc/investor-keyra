"use client";

import { useEffect } from "react";
import { POST_LOGOUT_STORAGE_KEY, useAuthStore } from "@/hooks/use-auth-store";
import { buildGetStartedSignInUrl } from "@/lib/get-started-sign-in-url";

export function InvestorAuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated || user) return;
    if (
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(POST_LOGOUT_STORAGE_KEY) === "1"
    ) {
      return;
    }
    window.location.href = buildGetStartedSignInUrl("/dashboard");
  }, [hydrated, user]);

  if (!hydrated || !user) {
    return null;
  }

  return <>{children}</>;
}
