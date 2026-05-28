"use client";

import { create } from "zustand";
import { getSession, logout, type AuthSessionUser } from "@/lib/auth/auth-service";

/** Set during sign-out so dashboard auth guard does not send users to get-started. */
export const POST_LOGOUT_STORAGE_KEY = "keyra_investors_post_logout";

type AuthState = {
  user: AuthSessionUser | null;
  hydrated: boolean;
  init: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  init: async () => {
    try {
      const nextUser = await getSession();
      set((state) => {
        // undefined means "could not verify" (timeout/network) — keep current user
        if (typeof nextUser === "undefined") return { ...state, hydrated: true };

        const same = state.user?.id === nextUser?.id && state.user?.phone === nextUser?.phone;
        if (same && state.hydrated) return state;
        return { user: nextUser, hydrated: true };
      });
    } catch {
      set((state) => {
        if (state.user !== null) return state;
        return { user: null, hydrated: true };
      });
    }
  },
  signOut: async () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(POST_LOGOUT_STORAGE_KEY, "1");
    }
    await logout();
    set({ user: null, hydrated: true });
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  },
}));
