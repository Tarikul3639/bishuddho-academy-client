// pages/my-courses/MyCoursesPage.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

import { fadeUp, stagger } from "@/components/animations";
import { EnrolledCourseCard } from "@/components/courses/EnrolledCourseCard";
import { EnrolledCourseCardSkeleton } from "@/components/courses/EnrolledCourseCardSkeleton";
import { useGetMyCoursesQuery, useCancelEnrollmentMutation } from "@/redux/features/courses/courses.api";
import { toast } from "sonner";

export default function MyCoursesPage() {
    const router = useRouter();

    const {
        data: myCourses = [],
        isLoading,
        isError,
    } = useGetMyCoursesQuery();

    const [cancelEnrollment] = useCancelEnrollmentMutation();

    const onDelete = async ({
        courseId,
    }: {
        courseId: string;
    }) => {
        const promise = cancelEnrollment(courseId).unwrap();

        toast.promise(promise, {
            loading: "Cancelling enrollment...",
            success: "Enrollment cancelled successfully.",
            error: "Failed to cancel enrollment.",
        });

        await promise;
    };

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-6"
        >
            {/* ── Header ────────────────────────────────────────────────── */}
            <motion.div variants={fadeUp} className="space-y-3">
                <button
                    onClick={() => router.push("/student/dashboard")}
                    className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#6b7280] transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Dashboard
                </button>

                <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-[#0d1b3e] md:text-3xl">
                        My Courses
                    </h1>
                    <p className="text-sm font-medium text-[#6b7280]">
                        View and manage your enrolled courses, track progress, and access learning materials.
                    </p>
                </div>
            </motion.div>

            {/* ── Loading ────────────────────────────────────────────────── */}
            {isLoading && (
                <motion.div
                    variants={stagger}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {[...Array(6)].map((_, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <EnrolledCourseCardSkeleton />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* ── Error ──────────────────────────────────────────────────── */}
            {isError && (
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col items-center justify-center gap-3 py-20 text-center"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fee2e2]">
                        <svg className="h-7 w-7 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>
                    <p className="font-bold text-[#0d1b3e]">Failed to load courses</p>
                    <p className="text-sm text-[#6b7280]">Something went wrong. Please try again.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-sm bg-[#1a56db] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1346c4] cursor-pointer"
                    >
                        Try Again
                    </button>
                </motion.div>
            )}

            {/* ── Empty ──────────────────────────────────────────────────── */}
            {!isLoading && !isError && myCourses.length === 0 && (
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col items-center justify-center gap-3 py-20 text-center"
                >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3ff]">
                        <BookOpen className="h-7 w-7 text-[#1a56db]" />
                    </div>
                    <p className="font-bold text-[#0d1b3e]">No courses yet</p>
                    <p className="text-sm text-[#6b7280]">
                        You haven&apos;t enrolled in any courses yet.
                    </p>
                    <button
                        onClick={() => router.push("/courses")}
                        className="rounded-sm bg-[#1a56db] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1346c4] cursor-pointer"
                    >
                        Browse Courses
                    </button>
                </motion.div>
            )}

            {/* ── Courses grid ───────────────────────────────────────────── */}
            {!isLoading && !isError && myCourses.length > 0 && (
                <motion.div
                    variants={stagger}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {myCourses.map((course) => (
                        <EnrolledCourseCard key={course.courseId} course={course} onDelete={onDelete} />
                    ))}
                </motion.div>
            )}
        </motion.main>
    );
}