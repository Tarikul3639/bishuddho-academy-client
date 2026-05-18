"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

export default function AboutHero() {
  return (
    <section className="bg-[#f9fafb] px-4 pb-16 pt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          About Us
        </span>
        <h1 className="text-3xl font-bold text-[#111827] md:text-4xl">
          We Teach Computers,{" "}
          <span className="text-primary">the Right Way</span>
        </h1>
        <p className="mt-4 leading-relaxed text-[#6b7280]">
          Bishuddho Academy is a Dhaka-based training center dedicated to
          teaching practical computer skills to students of all backgrounds.
          From complete beginners to aspiring developers — everyone is welcome.
        </p>
      </motion.div>
    </section>
  );
}
