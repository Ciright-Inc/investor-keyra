"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_STATEMENTS } from "@/lib/constants";
import { IntelligenceBackground } from "./IntelligenceBackground";

export function Hero() {
  const statement = HERO_STATEMENTS[0];

  return (
    <section className="relative overflow-hidden bg-[var(--ds-canvas)] pt-16">
      <IntelligenceBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,48px)] py-10 md:py-14">
        <motion.p
          className="ds-caption-uppercase mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Institutional Investor Platform
        </motion.p>
        <motion.h1
          className="ds-display-mega max-w-[18ch]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {statement}
        </motion.h1>
        <motion.p
          className="ds-body-md mt-4 max-w-[60ch]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Sovereign-grade identity and telecom infrastructure for the AI era.
          Verified human presence at global scale—built for institutional capital.
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link href="#intelligence" className="ds-btn-secondary">
            Explore Intelligence
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
