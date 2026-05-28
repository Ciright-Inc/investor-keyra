"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useAuthStore } from "@/hooks/use-auth-store";
import { cn } from "@/lib/cn";
import {
  formatSessionPhone,
  getSessionUserFullName,
  getSessionUserLabel,
} from "@/lib/session-display";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20v-1a6.5 6.5 0 0 1 13 0v1" />
    </svg>
  );
}

function accountMenuInitials(label: string | null): string | null {
  if (!label || /^\+?[\d\s().-]+$/.test(label.trim())) return null;
  const parts = label.trim().split(/\s+/).filter((p) => /[A-Za-z]/.test(p));
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return null;
}

function InvestorIdentityMark({
  label,
  size = "sm",
}: {
  label: string | null;
  size?: "sm" | "md";
}) {
  const initials = accountMenuInitials(label);
  const isMd = size === "md";

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full",
        "bg-[var(--ds-primary)] text-[var(--ds-on-primary)]",
        "shadow-[0_2px_10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.18)]",
        "ring-2 ring-white/90",
        isMd ? "size-10" : "size-7",
      )}
      aria-hidden
    >
      {initials ? (
        <span
          className={cn(
            "font-semibold leading-none tracking-tight",
            isMd ? "text-[13px]" : "text-[11px]",
          )}
        >
          {initials}
        </span>
      ) : (
        <PersonIcon className={isMd ? "size-6" : "size-5"} />
      )}
      <span
        className="absolute -bottom-px -right-px size-2 rounded-full border-[1.5px] border-white bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.55)]"
        aria-hidden
      />
    </span>
  );
}

export function InvestorUserMenu() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const fullName = getSessionUserFullName(user);
  const label = getSessionUserLabel(user);
  const phone = user?.phone ? formatSessionPhone(user.phone) : null;
  const headerLabel = fullName || label;
  const initials = accountMenuInitials(headerLabel);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  async function handleLogout() {
    setSigningOut(true);
    setOpen(false);
    await signOut();
  }

  if (!user) return null;

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        disabled={signingOut}
        className={cn(
          "flex h-10 items-center rounded-[var(--ds-radius-pill)] border text-left text-[13px] font-semibold text-[var(--ds-ink)]",
          "border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md",
          "transition-[border-color,background-color,box-shadow] duration-150 ease-out",
          "hover:bg-[var(--ds-canvas)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.55)]",
          "active:scale-[0.99]",
          open &&
            "bg-[var(--ds-canvas)] shadow-[0_4px_18px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-black/10",
          "max-lg:h-10 max-lg:w-10 max-lg:max-w-none max-lg:justify-center max-lg:p-0",
          "lg:max-w-[260px] lg:gap-2.5 lg:pl-1 lg:pr-2.5 lg:text-sm",
        )}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <InvestorIdentityMark label={headerLabel} />
        <span className="hidden min-w-0 truncate lg:inline">{headerLabel}</span>
        <ChevronDownIcon
          className={cn(
            "hidden shrink-0 text-[var(--ds-muted)] transition-[transform,color] duration-150 lg:block",
            open && "rotate-180 text-[var(--ds-ink)]",
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-[60] min-w-[220px] overflow-hidden rounded-[var(--ds-radius-lg)] border border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)] py-2 shadow-[var(--ds-shadow-soft)]"
        >
          <div className="flex items-center gap-3 border-b border-[var(--ds-hairline)] bg-gradient-to-br from-black/[0.08] via-black/[0.03] to-transparent px-4 py-3.5">
            <InvestorIdentityMark label={headerLabel} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-[var(--ds-ink)]">
                {headerLabel}
              </p>
              {phone ? (
                <p className="mt-0.5 truncate text-[12px] text-[var(--ds-body)]">{phone}</p>
              ) : null}
              {user.email ? (
                <p className="mt-0.5 truncate text-[12px] text-[var(--ds-body)]">{user.email}</p>
              ) : null}
              <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/70">
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                Signed in
              </p>
            </div>
          </div>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[14px] text-[var(--ds-body)] transition hover:bg-[var(--ds-canvas-soft)] hover:text-[var(--ds-ink)]"
            onClick={() => void handleLogout()}
            disabled={signingOut}
          >
            <Icon name="logout" size={18} className="text-current" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
