"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAuthEntryPendingSnapshot } from "@/lib/pending-auth-return";
import { useAuthStore } from "@/hooks/use-auth-store";

export function useClientAuthReturnFlow(): boolean {
  const pathname = usePathname();
  const [authReturnFlow, setAuthReturnFlow] = useState(false);
  const hydrated = useAuthStore((s) => s.hydrated);
  const userId = useAuthStore((s) => s.user?.id);

  useLayoutEffect(() => {
    setAuthReturnFlow(getAuthEntryPendingSnapshot());
  }, [pathname, hydrated, userId]);

  return authReturnFlow;
}
