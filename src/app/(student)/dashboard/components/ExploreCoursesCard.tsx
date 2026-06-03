"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

export default function ExploreCoursesCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-[#f9fafb] p-6 text-center transition-colors hover:border-primary/40 hover:bg-[#eff6ff]/50"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Search className="h-6 w-6 text-primary" />
      </div>

      <div>
        <p className="font-bold text-[#111827]">Explore More</p>
        <p className="mt-1 text-xs text-[#6b7280]">
          Discover new courses and expand your skills
        </p>
      </div>

      <Link href="/courses">
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1e40af]">
          Browse Courses <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </Link>
    </motion.div>
  );
}