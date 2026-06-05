"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useGetPublicCoursesQuery } from "@/redux/features/courses/courses.api";

import CoursesGrid from "../courses/components/CoursesGrid";
import { fadeUp, stagger } from "@/components/animations";

export default function CoursesSection() {
  const {
    data,
    isLoading,
    error,
  } = useGetPublicCoursesQuery({
    page: 1,
    limit: 5,
  });

  const courses = data?.courses ?? [];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
        >
          {/* Header */}
          <motion.h2
            variants={fadeUp}
            className="mb-3 text-center text-2xl font-bold text-[#111827] sm:text-3xl"
          >
            Learn from the best
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mb-12 max-w-2xl text-center text-[#6b7280]"
          >
            Discover our top-rated courses across various categories.
          </motion.p>

          {/* Courses */}
          <CoursesGrid
            courses={courses}
            isLoading={isLoading}
            skeletonCount={5}
            error={error}
            isCount={false}
          />

          {/* CTA */}

          <motion.div
            variants={fadeUp}
            className="mt-10 text-center"
          >
            <Link href="/courses">
              <button className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded border border-[#c9cbcf] bg-white px-8 py-3.5 text-sm font-semibold text-[#656a70] transition-colors duration-300 hover:border-[#1a56db]">
                <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />

                <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                  View All Courses
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}