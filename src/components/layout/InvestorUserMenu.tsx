"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useAuthStore } from "@/hooks/use-auth-store";
import {
  formatSessionPhone,
  getSessionUserFullName,
  getSessionUserLabel,
} from "@/lib/session-display";

export function InvestorUserMenu() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const fullName = getSessionUserFullName(user);
  const label = getSessionUserLabel(user);
  const phone = user?.phone ? formatSessionPhone(user.phone) : null;

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
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="investor-user-pill"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        disabled={signingOut}
      >
        <span className="investor-user-pill__avatar" aria-hidden>
          <Icon name="person" size={18} className="text-[var(--ds-on-primary)]" />
        </span>
        <span className="investor-user-pill__name">{fullName || label}</span>
        <Icon
          name="expand_more"
          size={20}
          className={`investor-user-pill__chevron ${open ? "is-open" : ""}`}
        />
      </button>

      {open ? (
        <div className="investor-user-menu" role="menu">
          <div className="investor-user-menu__header">
            <p className="investor-user-menu__name">{fullName || label}</p>
            {phone ? <p className="investor-user-menu__meta">{phone}</p> : null}
            {user.email ? (
              <p className="investor-user-menu__meta">{user.email}</p>
            ) : null}
          </div>
          <button
            type="button"
            role="menuitem"
            className="investor-user-menu__item"
            onClick={() => void handleLogout()}
            disabled={signingOut}
          >
            <Icon name="logout" size={18} />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
