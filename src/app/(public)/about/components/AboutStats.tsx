"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, type Variants, useInView } from "framer-motion";
import { Users, BookOpen, Award, GraduationCap } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users, value: 1200, suffix: "+", label: "Students Taught" },
  { icon: BookOpen, value: 45, suffix: "+", label: "Courses" },
  { icon: Award, value: 98, suffix: "%", label: "Satisfaction" },
  { icon: GraduationCap, value: 5, suffix: "+", label: "Years Experience" },
];

// ─── Animations ───────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

// ─── Counter ──────────────────────────────────────────────────────────────────

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(0, to, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setCount(v),
    });

    return () => controls.stop();
  }, [isInView, to]);

  const formatted =
    to % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return <span ref={ref}>{formatted + suffix}</span>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutStats() {
  return (
    <section className="border-y border-border px-4 py-12">
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
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#6b7280]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
