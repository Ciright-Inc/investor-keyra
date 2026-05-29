"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { KeyraLogo } from "@/components/ui/KeyraLogo";
import { POST_LOGOUT_STORAGE_KEY } from "@/hooks/use-auth-store";
import { buildGetStartedSignInUrl } from "@/lib/get-started-sign-in-url";

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  /** SSR cannot know Railway/custom host; resolve on client so ?return= matches this origin. */
  const [getStartedUrl, setGetStartedUrl] = useState<string | null>(null);

  useLayoutEffect(() => {
    setGetStartedUrl(buildGetStartedSignInUrl("/dashboard", window.location.origin));
  }, []);

  useEffect(() => {
    sessionStorage.removeItem(POST_LOGOUT_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-[var(--ds-canvas)] transition-all duration-200 ${
        scrolled ? "border-b border-[var(--ds-hairline-strong)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-[clamp(20px,4vw,48px)]">
        <KeyraLogo href="/" size="md" variant="on-light" />
        <div className="flex items-center gap-3">
          <a
            href={getStartedUrl ?? "#"}
            className="ds-btn-primary is-sm"
            aria-disabled={!getStartedUrl}
            onClick={(e) => {
              if (!getStartedUrl) e.preventDefault();
            }}
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
