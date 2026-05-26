"use client";

import { KeyraLogo } from "@/components/ui/KeyraLogo";

type SessionSplashProps = {
  message?: string;
  eyebrow?: string;
};

export function SessionSplash({
  message = "Loading session…",
  eyebrow = "Investor Portal",
}: SessionSplashProps) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[var(--ds-canvas)] px-6"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <KeyraLogo href={undefined} size="md" variant="on-light" />
      <p className="ds-caption-uppercase mt-8">{eyebrow}</p>
      <p className="mt-3 text-base font-medium text-[var(--ds-ink)]">{message}</p>
      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-[var(--ds-hairline-strong)]">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--ds-ink)]" />
      </div>
    </div>
  );
}
