"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/hooks/use-auth-store";

/** Loads and refreshes auth session only under `/dashboard` routes. */
export function DashboardSessionProvider({ children }: { children: React.ReactNode }) {
  const initAuth = useAuthStore((state) => state.init);

  useEffect(() => {
    void initAuth();
  }, [initAuth]);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          void initAuth();
        }, 150);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearTimeout(debounceTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [initAuth]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const schedulePoll = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        interval = setInterval(() => {
          void initAuth();
        }, 15000);
      } else {
        clearInterval(interval);
      }
    };
    schedulePoll();
    document.addEventListener("visibilitychange", schedulePoll);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", schedulePoll);
    };
  }, [initAuth]);

  return <>{children}</>;
}
