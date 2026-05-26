"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyraLogo } from "@/components/ui/KeyraLogo";
import { POST_LOGOUT_STORAGE_KEY, useAuthStore } from "@/hooks/use-auth-store";
import { buildGetStartedSignInUrl } from "@/lib/get-started-sign-in-url";

export function PublicNav() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const getStartedUrl = useMemo(() => buildGetStartedSignInUrl("/dashboard"), []);

  useEffect(() => {
    sessionStorage.removeItem(POST_LOGOUT_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hydrated && user && sessionStorage.getItem(POST_LOGOUT_STORAGE_KEY) !== "1") {
      router.replace("/dashboard");
    }
  }, [hydrated, user, router]);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-[var(--ds-canvas)] transition-all duration-200 ${
        scrolled ? "border-b border-[var(--ds-hairline-strong)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-[clamp(20px,4vw,48px)]">
        <KeyraLogo href="/" size="md" variant="on-light" />
        <div className="flex items-center gap-3">
          {!hydrated ? (
            <span className="inline-block h-9 w-24 animate-pulse rounded-md bg-[var(--ds-surface-strong)]" />
          ) : user ? (
            <Link href="/dashboard" className="ds-btn-primary is-sm">
              Library
            </Link>
          ) : (
            <a href={getStartedUrl} className="ds-btn-primary is-sm">
              Get started
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
