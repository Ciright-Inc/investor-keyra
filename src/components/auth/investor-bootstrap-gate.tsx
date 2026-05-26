"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useClientAuthReturnFlow } from "@/hooks/use-client-auth-return-flow";
import { SessionSplash } from "@/components/layout/session-splash";
import { MIN_SESSION_SPLASH_MS } from "@/lib/session-splash";
import { clearPendingAuthReturn } from "@/lib/pending-auth-return";
import { getSessionWelcomeLine } from "@/lib/session-display";

export function InvestorBootstrapGate({ children }: { children: React.ReactNode }) {
  const authReturnFlow = useClientAuthReturnFlow();
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);
  const [bootMinElapsed, setBootMinElapsed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBootMinElapsed(true), MIN_SESSION_SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  const waitingAuth = !hydrated;
  const showSplash = waitingAuth || !bootMinElapsed;

  useEffect(() => {
    if (!showSplash) clearPendingAuthReturn();
  }, [showSplash]);

  if (showSplash) {
    const message = !hydrated
      ? authReturnFlow
        ? "Signing you in…"
        : "Loading session…"
      : getSessionWelcomeLine(user);

    return (
      <SessionSplash
        message={message}
        eyebrow={authReturnFlow ? "Investor Portal" : "Keyra"}
      />
    );
  }

  return <>{children}</>;
}
