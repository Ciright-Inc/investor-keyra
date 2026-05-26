"use client";

import { motion } from "framer-motion";

/** Stable SVG coords — avoids server/client float serialization mismatches on hydrate. */
function roundCoord(n: number): number {
  return Math.round(n * 1e4) / 1e4;
}

const NODES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: roundCoord(8 + (i % 6) * 16 + Math.sin(i) * 4),
  y: roundCoord(12 + Math.floor(i / 6) * 22 + Math.cos(i) * 3),
  delay: i * 0.15,
}));

export function IntelligenceBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-50"
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {NODES.map((a, i) =>
          NODES.slice(i + 1, i + 3).map((b) => (
            <motion.line
              key={`${a.id}-${b.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(220, 222, 224, 0.6)"
              strokeWidth="0.08"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                delay: a.delay * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 4,
              }}
            />
          )),
        )}
        {NODES.map((n) => (
          <motion.circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r="0.35"
            fill="rgba(153, 153, 153, 0.4)"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + n.delay * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--ds-hairline) 1px, transparent 1px),
            linear-gradient(90deg, var(--ds-hairline) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
