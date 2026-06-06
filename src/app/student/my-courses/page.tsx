"use client";

import { fadeUp, stagger } from "@/components/animations";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { EnrolledCourseCard } from "@/components/courses/EnrolledCourseCard";

import { useGetMyCoursesQuery } from "@/redux/features/courses/courses.api";

export default function MyCoursesPage() {
    const router = useRouter();

    const {
        data: myCourses = [],
        isLoading,
        isError,
    } = useGetMyCoursesQuery();

    const activeCourses = myCourses.filter(
        (course) => course.status === "active",
    );

    const pendingCourses = myCourses.filter(
        (course) => course.status === "pending",
    );

    const completedCourses = myCourses.filter(
        (course) => course.status === "completed",
    );

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-6"
        >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="space-y-3"
            >
                <button
                    onClick={() =>
                        router.replace(
                            "/student/dashboard",
                        )
                    }
                    className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>
                        Back to Dashboard
                    </span>
                </button>

                <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                        My Courses
                    </h1>

                    <p className="text-sm font-medium text-slate-500">
                        View and manage your enrolled
                        courses, track progress, and
                        access learning materials.
                    </p>
                </div>
            </motion.div>

            {/* Loading */}
            {isLoading && (
                <div className="py-20 text-center text-slate-500">
                    Loading courses...
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="py-20 text-center text-red-500">
                    Failed to load courses.
                </div>
            )}

            {/* Empty */}
            {!isLoading &&
                !isError &&
                myCourses.length === 0 && (
                    <div className="py-20 text-center text-slate-500">
                        You haven't enrolled in any
                        course yet.
                    </div>
                )}

            {/* Active */}
            {activeCourses.length > 0 && (
                <section>
                    <h2 className="mb-4 text-lg font-bold text-slate-900">
                        Active Courses
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {activeCourses.map(
                            (course) => (
                                <EnrolledCourseCard
                                    key={
                                        course.courseId
                                    }
                                    course={
                                        course
                                    }
                                />
                            ),
                        )}
                    </div>
                </section>
            )}

            {/* Pending */}
            {pendingCourses.length > 0 && (
                <section>
                    <h2 className="mb-4 text-lg font-bold text-slate-900">
                        Pending Approval
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {pendingCourses.map(
                            (course) => (
                                <EnrolledCourseCard
                                    key={
                                        course.courseId
                                    }
                                    course={
                                        course
                                    }
                                />
                            ),
                        )}
                    </div>
                </section>
            )}

            {/* Completed */}
            {completedCourses.length > 0 && (
                <section>
                    <h2 className="mb-4 text-lg font-bold text-slate-900">
                        Completed Courses
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {completedCourses.map(
                            (course) => (
                                <EnrolledCourseCard
                                    key={
                                        course.courseId
                                    }
                                    course={
                                        course
                                    }
                                />
                            ),
                        )}
                    </div>
                </section>
            )}
        </motion.main>
    );
}