"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CourseCard, { Course } from "@/components/courses/CourseCard";

import one from "@/assets/thumbnails/one.jpg";
import two from "@/assets/thumbnails/tow.jpg";
import three from "@/assets/thumbnails/three.jpg";
import four from "@/assets/thumbnails/foure.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0, 0, 0.2, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const SAMPLE_COURSES: Course[] = [
  {
    courseId: "js-intro",
    title: "Introduction to JavaScript",
    instructor: "MD Tarikul Islam",
    thumbnail: one,
    price: "TK 49.99",
    rating: 4,
    reviewCount: 4,
  },
  {
    courseId: "python-advanced",
    title: "Advanced Python Programming",
    instructor: "MD Nayem Hossain",
    thumbnail: two,
    price: "TK 79.99",
    rating: 4,
    reviewCount: 5,
  },
  {
    courseId: "cloud-computing",
    title: "Cloud Computing Essentials",
    instructor: "MD Arifur Rahman",
    thumbnail: three,
    price: "TK 89.99",
    rating: 3,
    reviewCount: 5,
  },
  {
    courseId: "cybersecurity",
    title: "Cybersecurity Basics",
    instructor: "MD Tanvir Ahmed",
    thumbnail: four,
    price: "TK 59.49",
    rating: 4.5,
    reviewCount: 3,
  },
];

export default function CoursesSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 px-4 md:my-16 md:grid-cols-3 md:px-0 lg:grid-cols-4">
            {SAMPLE_COURSES.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Link href="/courses">
              <button className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded border border-[#c9cbcf] bg-white px-8 py-3.5 text-sm font-semibold text-[#656a70] transition-colors duration-300 hover:border-[#1a56db]">
                <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>

                <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                  View All Courses <ArrowRight className="h-5 w-5" />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}