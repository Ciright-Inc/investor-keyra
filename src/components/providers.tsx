"use client";

import { AuthEntryGate } from "@/components/auth/auth-entry-gate";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthEntryGate>{children}</AuthEntryGate>;
}
