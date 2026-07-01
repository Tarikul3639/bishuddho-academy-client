"use client";

import { motion, type Variants } from "framer-motion";
import {
  GraduationCap,
  Award,
  Clock,
  Users,
} from "lucide-react";

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

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    desc: "Learn directly from industry professionals with real-world experience",
  },
  {
    icon: Award,
    title: "Certificate",
    desc: "Receive a recognized certificate upon completing each course",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Join an active community of thousands of fellow learners",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white px-4 lg:px-8 py-10 sm:py-18" id="features">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-3 text-center text-3xl font-bold text-[#111827]"
          >
            Why Bishuddho Academy?
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-12 text-center text-[#6b7280]">
            Everything you need to learn and grow
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="rounded-2xl border border-[#e5e7eb] p-6 text-center transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-[#111827]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#6b7280]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
