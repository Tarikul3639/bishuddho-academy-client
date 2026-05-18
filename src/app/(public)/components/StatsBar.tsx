"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, GraduationCap } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stagger, fadeUp } from "@/components/animations";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users, value: 1200, suffix: "+", label: "Students Taught" },
  { icon: BookOpen, value: 45, suffix: "+", label: "Courses" },
  { icon: Award, value: 98, suffix: "%", label: "Satisfaction" },
  { icon: GraduationCap, value: 5, suffix: "+", label: "Years Experience" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatsBar() {
  return (
    <section className="relative px-4 py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">
              <AnimatedCounter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#6b7280]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
      {/* Bottom separator — gradient line matching primary color */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
