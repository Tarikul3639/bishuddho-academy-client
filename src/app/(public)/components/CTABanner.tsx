"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CTABanner() {
  return (
    <section className="bg-white px-4 py-10 sm:py-18">
      <motion.div
        className="mx-auto max-w-7xl text-center"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-3xl font-bold text-[#111827] md:text-4xl"
        >
          Learn anything, anytime, anywhere
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mb-10 text-base leading-relaxed text-[#6b7280]"
        >
          Start your learning journey today. Access expert-led courses and
          physical classes designed to help you grow at your own pace.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-4 flex-row"
        >
          <Link href="/register">
            <button className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/70 cursor-pointer">
              Get started
            </button>
          </Link>

          <Link href="/courses">
            <button className="inline-flex items-center gap-2 text-sm font-medium text-[#111827] transition-colors hover:text-primary cursor-pointer">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}