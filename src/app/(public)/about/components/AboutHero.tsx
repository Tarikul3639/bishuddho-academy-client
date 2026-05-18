"use client";

import { motion, type Variants } from "framer-motion";
import { BookOpen, Users, Award, MapPin } from "lucide-react";
import { fadeUp, stagger } from "@/components/animations";

// ─── Floating badges ──────────────────────────────────────────────────────────

const BADGES = [
  { icon: Users, text: "1,200+ Students", delay: 0 },
  { icon: BookOpen, text: "45+ Courses", delay: 0.1 },
  { icon: Award, text: "Certified Training", delay: 0.2 },
  { icon: MapPin, text: "Gazipur, Dhaka", delay: 0.3 },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14">

      {/* ── Background blobs ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto max-w-3xl text-center"
      >
        {/* Badge */}
        <motion.span
          variants={fadeUp}
          className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
        >
          About Us
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl font-bold text-[#111827] md:text-4xl"
        >
          We Teach Computers,{" "}
          <span className="text-primary">the Right Way</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mt-4 leading-relaxed text-[#6b7280]"
        >
          Bishuddho Academy is a Dhaka-based training center dedicated to
          teaching practical computer skills to students of all backgrounds.
          From complete beginners to aspiring developers — everyone is welcome.
        </motion.p>

        {/* ── Floating info badges ─────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {BADGES.map((badge) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + badge.delay, duration: 0.4, ease: [0, 0, 0.2, 1] }}
              className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm"
            >
              <badge.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-[#374151]">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}