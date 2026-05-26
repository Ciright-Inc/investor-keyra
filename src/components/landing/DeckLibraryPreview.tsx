"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";

const PREVIEW_DECKS = [
  { title: "Infrastructure Overview", type: "HTML Deck", duration: "18 min" },
  { title: "Telecom & Identity Thesis", type: "Presentation", duration: "24 min" },
  { title: "AI Trust Layer — Executive Brief", type: "PDF", duration: "12 min" },
  { title: "Developer Ecosystem & API Scale", type: "Video", duration: "15 min" },
];

export function DeckLibraryPreview() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ds-caption-uppercase mb-2">From info.keyra.ie</p>
            <h2 className="ds-display-lg">Deck & intelligence library</h2>
            <p className="ds-body-md mt-2 max-w-[48ch]">
              Institutional materials with secure viewing, engagement analytics, and
              permission-based access after onboarding.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEW_DECKS.map((deck, i) => (
            <motion.div
              key={deck.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <GlassCard className="group cursor-default" padding="sm">
                <div className="mb-3 flex h-20 items-center justify-center rounded-lg border border-[var(--ds-hairline-strong)] bg-[var(--ds-surface-strong)]">
                  <Icon name="slideshow" size={32} className="text-[var(--ds-muted)]" />
                </div>
                <span className="ds-badge-pill">{deck.type}</span>
                <h3 className="ds-title-md mt-2">{deck.title}</h3>
                <p className="ds-body-sm mt-2 flex items-center gap-1">
                  <Icon name="schedule" size={16} />
                  {deck.duration}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
