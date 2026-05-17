"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Users, BookOpen, Clock } from "lucide-react";

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

// ─── Perks — each one gets its own box ───────────────────────────────────────

const PERKS = [
  {
    icon: Users,
    title: "In-Person Sessions",
    description: "Learn face-to-face with experienced instructors in a real classroom environment.",
  },
  {
    icon: BookOpen,
    title: "Hands-On Learning",
    description: "Practice what you learn with guided exercises and real-world projects.",
  },
  {
    icon: Clock,
    title: "Limited Seats",
    description: "Small batch sizes ensure every student gets personal attention and support.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PhysicalClassSection() {
  return (
    <section className="px-4 py-10 sm:py-18">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* ── Header ──────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-col items-center text-center"
          >
            {/* Badge */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ecfdf5] px-4 py-1.5 text-sm font-semibold text-[#059669]">
              <MapPin className="h-4 w-4" />
              Offline
            </span>

            <h2 className="mb-3 text-3xl font-bold text-[#111827]">
              Physical Classes
            </h2>
            <p className="max-w-2xl text-[#6b7280]">
              Learn in a real classroom setting. Get face-to-face instruction
              from experienced teachers and gain hands-on experience.
            </p>
          </motion.div>

          {/* ── Perk Boxes ──────────────────────────────────────────────── */}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {PERKS.map((perk) => (
              <motion.div
                key={perk.title}
                variants={fadeUp}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecfdf5]">
                  <perk.icon className="h-5 w-5 text-[#059669]" />
                </div>
                <h3 className="mb-2 font-bold text-[#111827]">{perk.title}</h3>
                <p className="text-sm leading-relaxed text-[#6b7280]">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}