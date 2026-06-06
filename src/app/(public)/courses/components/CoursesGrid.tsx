"use client";

import { motion } from "framer-motion";

import CourseCard from "@/components/courses/CourseCard";
import { CourseCardSkeleton } from "@/components/courses/CourseCardSkeleton";

import { fadeUp, stagger } from "@/components/animations";
import { type PublicCourse as Course } from "@/types/public-course";

interface CoursesGridProps {
    courses?: Course[];
    isLoading?: boolean;
    error?: unknown;
    isCount?: boolean;
    skeletonCount?: number;
}

export default function CoursesGrid({
    courses = [],
    isLoading = false,
    error,
    isCount = true,
    skeletonCount = 8,
}: CoursesGridProps) {
    if (isLoading) {
        return (
            <motion.div
                className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {[...Array(skeletonCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                    >
                        <CourseCardSkeleton />
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                className="mt-20 text-center"
                variants={fadeUp}
            >
                <p className="text-lg font-semibold text-red-500">
                    Failed to load courses
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    Please try again later.
                </p>
            </motion.div>
        );
    }

    return (
        <>
            {isCount && (
                <motion.div
                    className="mb-4 text-sm text-[#6b7280]"
                    variants={fadeUp}
                >
                    {courses.length} course(s) found
                </motion.div>
            )}

            {courses.length > 0 ? (
                <motion.div
                    className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                >
                    {courses.map((course) => (
                        <motion.div
                            key={course.courseId}
                            layoutId={course.courseId}
                            variants={fadeUp}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    className="mt-20 text-center"
                    variants={fadeUp}
                >
                    <p className="text-lg font-semibold text-gray-700">
                        No courses found 😢
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Try changing your search keyword.
                    </p>
                </motion.div>
            )}
        </>
    );
}