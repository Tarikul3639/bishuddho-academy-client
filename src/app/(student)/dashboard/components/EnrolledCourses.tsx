"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import Link from "next/link";
import CourseCard          from "./CourseCard";
import ExploreCoursesCard  from "./ExploreCoursesCard";

// TODO: replace with API data
const COURSES = [
  {
    id:        "web-dev-batch",
    title:     "Complete Web Development — Physical Batch",
    type:      "physical" as const,
    progress:  0,
    schedule:  "Sat & Mon, 10:00 AM",
    thumbnail: "",
  },
  {
    id:        "graphic-design",
    title:     "Graphic Design Masterclass",
    type:      "recorded" as const,
    progress:  62,
    thumbnail: "",
  },
  {
    id:        "digital-marketing",
    title:     "Digital Marketing Complete Guide",
    type:      "recorded" as const,
    progress:  100,
    thumbnail: "",
  },
];

export default function EnrolledCourses() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="pb-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="mb-5 flex items-end justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Enrolled Courses</h2>
          <p className="mt-0.5 text-sm text-[#6b7280]">Continue your learning journey</p>
        </div>
        <Link
          href="/my-courses"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {COURSES.map((course, i) => (
          <motion.div key={course.id} variants={fadeUp} transition={{ delay: i * 0.08 }}>
            <CourseCard course={course} />
          </motion.div>
        ))}

        <motion.div variants={fadeUp} transition={{ delay: COURSES.length * 0.08 }}>
          <ExploreCoursesCard />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}