"use client";

import { motion } from "framer-motion";
import CourseCard, { Course } from "@/components/courses/CourseCard";
import { fadeUp, stagger } from "@/components/animations";

interface CoursesGridProps {
    courses: Course[];
}

export default function CoursesGrid({ courses }: CoursesGridProps) {
    return (
        <>
            {/* Results count */}
            <motion.div
                className="mb-4 text-sm text-[#6b7280]"
                variants={fadeUp}
            >
                {courses.length} course(s) found
            </motion.div>

            {/* Grid */}
            {courses.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                >
                    {courses.map((course) => (
                        <motion.div key={course.title} variants={fadeUp}>
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    className="mt-20 text-center text-gray-500"
                    variants={fadeUp}
                >
                    No courses found 😢
                </motion.div>
            )}
        </>
    );
}