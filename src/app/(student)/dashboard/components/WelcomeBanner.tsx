"use client";

import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
};

interface Props {
  name: string;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function WelcomeBanner({ name }: Props) {
  const first = name.split(" ")[0];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-white shadow-sm"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 right-20 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3 w-3" />
          Student Dashboard
        </div>
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {first}! 👋
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Ready to learn something new today?
        </p>
      </div>
    </motion.div>
  );
}