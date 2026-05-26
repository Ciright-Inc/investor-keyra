"use client";

import { motion } from "framer-motion";
import { NARRATIVE_THEMES } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";

export function NarrativeSection() {
  return (
    <section id="intelligence" className="py-10 md:py-14">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
        <p className="ds-caption-uppercase mb-2">Institutional Narrative</p>
        <h2 className="ds-display-lg">Infrastructure for verified presence</h2>
        <p className="ds-body-md mt-3 max-w-[60ch]">
          Keyra and Ciright are building the foundational trust layer—telecom-rooted,
          identity-native, and engineered for the agentic AI economy.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {NARRATIVE_THEMES.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard className="h-full" padding="sm">
                <Icon name={theme.icon} size={24} className="mb-3 text-[var(--ds-ink)]" />
                <h3 className="ds-title-md">{theme.title}</h3>
                <p className="ds-body-sm mt-2">{theme.body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
