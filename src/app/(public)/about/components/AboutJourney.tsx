"use client";

import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { useRef } from "react";
import { Rocket, Users2, GraduationCap, Trophy } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
  },
};

// Placeholder data — replace with the academy's real milestones
const MILESTONES = [
  {
    year: "2021",
    icon: Rocket,
    title: "Bishuddho Academy Founded",
    description:
      "Started with a single classroom in Dhaka and a simple idea: teach computer skills the right way.",
  },
  {
    year: "2022",
    icon: Users2,
    title: "First 500 Students",
    description:
      "Word spread beyond Dhaka. We opened enrollment to students from across Bangladesh through online classes.",
  },
  {
    year: "2023",
    icon: GraduationCap,
    title: "Course Catalog Expanded",
    description:
      "Grew from a handful of workshops to 45+ structured courses spanning programming, web development, and digital skills.",
  },
  {
    year: "2024",
    icon: Trophy,
    title: "1,200+ Graduates",
    description:
      "Crossed 1,200 students trained, many now working as developers and IT professionals across the country.",
  },
] as const;

export default function AboutJourney() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      aria-labelledby="journey-heading"
      className="px-4 py-10"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              Our Journey
            </span>
            <h2
              id="journey-heading"
              className="mt-3.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
            >
              How We Got Here
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              A few of the milestones that shaped Bishuddho Academy into what it is today.
            </p>
          </motion.div>

          {/* Timeline rail */}
          <div ref={railRef} className="relative pl-9.5 md:pl-13.5">
            {/* Static track */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-6" />
            {/* Filled progress line, tied to scroll */}
            <motion.div
              className="absolute left-4 top-2 w-px origin-top bg-primary md:left-6"
              style={{ scaleY: progress, height: "calc(100% - 1rem)" }}
            />

            <div className="flex flex-col gap-10">
              {MILESTONES.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.year} variants={fadeUp} className="relative">
                    {/* Node */}
                    <div className="absolute -left-8.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background md:-left-10.5">
                      <Icon className="h-3 w-3 text-primary" />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {item.year}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}