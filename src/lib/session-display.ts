import type { AuthSessionUser } from "@/lib/auth/auth-service";

/** Format E.164 phone for display. */
export function formatSessionPhone(phone: string): string {
  const trimmed = String(phone ?? "").trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length >= 12) {
    const national = digits.slice(2);
    if (national.length === 10) {
      return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
    }
  }
  return trimmed.startsWith("+") ? trimmed : `+${digits}`;
}

/** Full name from session API (`fullName`, then `displayName`, then `username`). */
export function getSessionUserFullName(user: AuthSessionUser | null | undefined): string {
  if (!user) return "";
  const fullName = String(user.fullName ?? "").trim();
  if (fullName) return fullName;
  const displayName = String(user.displayName ?? "").trim();
  if (displayName) return displayName;
  const username = String(user.username ?? "").trim();
  if (username) return username;
  return "";
}

export function getSessionUserLabel(user: AuthSessionUser | null | undefined): string {
  const full = getSessionUserFullName(user);
  if (full) return full;
  if (!user) return "Investor";
  return formatSessionPhone(user.phone) || "Investor";
}

export function getSessionUserInitials(user: AuthSessionUser | null | undefined): string {
  const full = getSessionUserFullName(user);
  if (full) {
    const parts = full.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
    }
    return full.slice(0, 2).toUpperCase();
  }
  if (!user) return "IN";
  const digits = user.phone.replace(/\D/g, "");
  return digits.length >= 2 ? digits.slice(-2) : "IN";
}

export function getSessionWelcomeLine(user: AuthSessionUser | null | undefined): string {
  const full = getSessionUserFullName(user);
  if (!full) return "Welcome back";
  const first = full.split(/\s+/)[0] ?? full;
  return `Welcome back, ${first}`;
}
