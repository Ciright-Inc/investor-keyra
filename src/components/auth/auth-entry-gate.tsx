"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearPendingAuthReturn,
  isAuthReturnDestinationPath,
  readAuthReturnFromUrl,
} from "@/lib/pending-auth-return";

export function AuthEntryGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!readAuthReturnFromUrl() && !isAuthReturnDestinationPath(pathname)) {
      clearPendingAuthReturn();
    }
  }, [pathname]);

  return <>{children}</>;
}
