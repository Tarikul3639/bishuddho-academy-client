"use client";

import { motion } from "framer-motion";

import { CourseHeader } from "./CourseHeader";
import { CourseModule } from "./CourseModule";
import { CourseDescription } from "./CourseDescription";
import { EnrollCard } from "./EnrollCard";
import { CourseDetailSkeleton } from "./CourseDetailSkeleton";

import { fadeUp, stagger } from "@/components/animations";
import thumbnailImg from "@/assets/thumbnails/one.jpg";

import { useGetPublicCourseDetailsQuery } from "@/redux/features/courses/courses.api";
import type { CourseModuleType } from "@/types/public-course-details";

export function CourseDetailPage({ courseId }: { courseId: string }) {
    const {
        data: course,
        isLoading,
        isError,
        isFetching,
    } = useGetPublicCourseDetailsQuery(courseId);

    // ── Loading ───────────────────────────────────────────────────────────────
    if (isLoading || isFetching) {
        return <CourseDetailSkeleton />;
    }

    // ── Error ─────────────────────────────────────────────────────────────────
    if (isError) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2]">
                    <svg className="h-8 w-8 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>
                <p className="text-lg font-bold text-[#0d1b3e]">Failed to load course</p>
                <p className="text-sm text-[#6b7280]">Something went wrong. Please try again later.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 rounded-sm bg-[#1a56db] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1346c4]"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // ── Not found ─────────────────────────────────────────────────────────────
    if (!course) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6]">
                    <svg className="h-8 w-8 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-lg font-bold text-[#0d1b3e]">Course not found</p>
                <p className="text-sm text-[#6b7280]">This course may have been removed or doesn&apos;t exist.</p>
            </div>
        );
    }

    // ── Success ───────────────────────────────────────────────────────────────
    return (
        <>
            <motion.main
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="min-h-screen bg-white py-20"
            >
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

                        {/* ── RIGHT — Enroll card ──────────────────────────── */}
                        <motion.div
                            variants={fadeUp}
                            className="order-1 flex justify-center lg:order-2 lg:justify-end"
                        >
                            <div className="w-full max-w-md">
                                <EnrollCard
                                    course={course}
                                    thumbnailImg={thumbnailImg}
                                />
                            </div>
                        </motion.div>

                        {/* ── LEFT — Content ───────────────────────────────── */}
                        <div className="order-2 lg:order-1">

                            {/* Header */}
                            <motion.div variants={fadeUp}>
                                <CourseHeader course={course} />
                            </motion.div>

                            {/* Curriculum */}
                            <motion.div variants={fadeUp} className="mb-10">
                                <h2 className="mb-5 text-xl font-bold text-[#111827]">
                                    Course Structure
                                </h2>
                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-3"
                                >
                                    {course.modules.map((module: CourseModuleType, i: number) => (
                                        <motion.div key={module.title} variants={fadeUp}>
                                            <CourseModule module={module} defaultOpen={i === 0} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={fadeUp}>
                                <CourseDescription
                                    tagline={course.tagline}
                                    description={course.description}
                                    includes={course.includes}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.main>
        </>
    );
}