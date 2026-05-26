import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  variant?: "default" | "dark";
};

const paddingMap = {
  sm: "!p-5",
  md: "!p-6",
  lg: "!p-8",
};

export function GlassCard({
  children,
  className = "",
  padding = "md",
  variant = "default",
}: GlassCardProps) {
  const base =
    variant === "dark" ? "ds-feature-card-dark" : "ds-feature-card";
  return (
    <div className={`${base} ${paddingMap[padding]} ${className}`}>
      {children}
    </div>
  );
}
