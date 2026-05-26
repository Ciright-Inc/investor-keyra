import Image from "next/image";
import Link from "next/link";

/** Native asset ratio (keyra-logo.png). */
const LOGO_ASPECT = 509 / 175;

/** Logo height in px for horizontal wordmark layout. */
export const KEYRA_LOGO_HEIGHTS = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

type KeyraLogoSize = number | keyof typeof KEYRA_LOGO_HEIGHTS;

type KeyraLogoProps = {
  href?: string;
  /** Height of the horizontal logo (width follows aspect ratio). */
  size?: KeyraLogoSize;
  variant?: "on-light" | "on-dark";
  className?: string;
};

function resolveLogoHeight(size: KeyraLogoSize): number {
  if (typeof size === "number") return size;
  return KEYRA_LOGO_HEIGHTS[size];
}

export function KeyraLogo({
  href = "/",
  size = "md",
  variant = "on-light",
  className = "",
}: KeyraLogoProps) {
  const heightPx = resolveLogoHeight(size);
  const widthPx = Math.round(heightPx * LOGO_ASPECT);

  const image = (
    <span
      className={`relative block shrink-0 max-w-[min(220px,48vw)] ${className}`.trim()}
      style={{ height: heightPx, aspectRatio: "509 / 175" }}
    >
      <Image
        src="/keyra-logo.png"
        alt="Keyra"
        fill
        sizes={`${widthPx}px`}
        className={`object-contain object-left ${
          variant === "on-light" ? "invert" : ""
        }`}
        priority
      />
    </span>
  );

  if (!href) {
    return <span className="inline-flex shrink-0 items-center">{image}</span>;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center"
      aria-label="Keyra home"
    >
      {image}
    </Link>
  );
}
