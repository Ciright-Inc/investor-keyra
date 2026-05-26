"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { KeyraLogo } from "@/components/ui/KeyraLogo";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen" data-surface="dashboard">
      <aside className="ds-sidebar hidden md:flex">
        <div className="border-b border-white/10 px-4 py-5">
          <KeyraLogo href="/dashboard" size={40} variant="on-dark" />
        </div>
        <nav className="flex-1 py-4">
          {DASHBOARD_NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`ds-sidebar-row ${active ? "is-active" : ""}`}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="ds-topbar">
          <KeyraLogo href="/dashboard" size={36} variant="on-light" />
          <span className="ds-caption-uppercase text-[var(--ds-success)]">
            Secure session
          </span>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
