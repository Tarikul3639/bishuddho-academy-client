"use client";

import { motion, type Variants } from "framer-motion";
import { Target, Heart, Users } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

const MISSION_ITEMS = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To make quality computer education accessible to everyone in Bangladesh through structured, practical, and affordable courses.",
  },
  {
    icon: Heart,
    title: "Our Vision",
    desc: "A Bangladesh where every student has the digital skills needed to thrive in the modern world.",
  },
  {
    icon: Users,
    title: "Our Community",
    desc: "Over 1,200 students have learned with us so far. We believe in learning together and growing together.",
  },
];

export default function AboutMission() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-10 text-center text-2xl font-bold text-[#111827]"
          >
            What Drives Us
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {MISSION_ITEMS.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-[#111827]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#6b7280]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
