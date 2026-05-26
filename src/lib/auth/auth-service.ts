import { AUTH_BACKEND_URL } from "@/lib/auth-backend-url";

export type AuthSessionUser = {
  id: number;
  phone: string;
  fullName?: string | null;
  displayName?: string | null;
  username?: string | null;
  email?: string | null;
  profileComplete?: boolean;
};

export async function getSession(): Promise<AuthSessionUser | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1200);
  try {
    const res = await fetch(`${AUTH_BACKEND_URL}/auth/session`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      authenticated: boolean;
      user: AuthSessionUser | null;
    };
    return json.authenticated ? json.user : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function logout(): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1200);
  try {
    await fetch(`${AUTH_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      signal: controller.signal,
    });
  } catch {
    // ignore when backend is unreachable in local dev
  } finally {
    clearTimeout(timeout);
  }
}
