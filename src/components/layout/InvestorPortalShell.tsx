"use client";

import { KeyraLogo } from "@/components/ui/KeyraLogo";
import { InvestorUserMenu } from "@/components/layout/InvestorUserMenu";
import { useAuthStore } from "@/hooks/use-auth-store";
import { getSessionWelcomeLine } from "@/lib/session-display";

type InvestorPortalShellProps = {
  children: React.ReactNode;
};

export function InvestorPortalShell({ children }: InvestorPortalShellProps) {
  const user = useAuthStore((s) => s.user);
  const welcome = getSessionWelcomeLine(user);

  return (
    <div className="min-h-screen bg-[var(--ds-canvas)]" data-surface="dashboard">
      <header className="fixed top-0 z-50 w-full border-b border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)]">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-[clamp(20px,4vw,48px)]">
          <KeyraLogo href="/dashboard" size="md" variant="on-light" />
          <div className="flex items-center gap-4">
            <p className="hidden text-sm text-[var(--ds-muted)] sm:block">{welcome}</p>
            <InvestorUserMenu />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,48px)] pb-8 pt-24">
        {children}
      </main>
    </div>
  );
}
