"use client";

import { motion } from "framer-motion";
import { INVESTOR_METRICS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";

export function MetricsPanel() {
  return (
    <section className="border-y border-[var(--ds-hairline-strong)] py-10 md:py-14">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
        <p className="ds-caption-uppercase mb-2">Market Intelligence</p>
        <h2 className="ds-display-lg">Investor metrics</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTOR_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard padding="sm">
                <p className="ds-caption-uppercase">{m.label}</p>
                <p className="ds-metric mt-2">{m.value}</p>
                <p className="ds-body-sm mt-1">{m.sub}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
