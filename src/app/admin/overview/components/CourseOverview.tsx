"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

import { fadeUp, stagger } from "@/components/animations";

import { useGetDashboardCoursesQuery } from "@/redux/features/dashboard/dashboard.api";

const STATUS_CONFIG = {
    active: {
        label: "Active",
        bg: "#dcfce7",
        color: "#16a34a",
    },
    upcoming: {
        label: "Upcoming",
        bg: "#eef3ff",
        color: "#1a56db",
    },
    completed: {
        label: "Completed",
        bg: "#f3f4f6",
        color: "#6b7280",
    },
} as const;

export default function CourseOverview() {
    const {
        data,
        isLoading,
        isError,
    } = useGetDashboardCoursesQuery();

    const courses = data?.courses ?? [];

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                <div className="animate-pulse space-y-3">
                    <div className="h-5 w-40 rounded-sm bg-gray-200" />

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-[#f3f4f6] p-4"
                        >
                            <div className="mb-3 h-4 w-44 rounded-sm bg-gray-200" />

                            <div className="mb-2 h-3 w-32 rounded-sm bg-gray-200" />

                            <div className="h-2 rounded-full bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-medium text-red-600">
                    Failed to load course overview.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
        >
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#0d1b3e]">
                    Course Overview
                </h2>

                <Link
                    href="/admin/courses"
                    className="text-[12px] font-semibold text-[#1a56db] hover:underline"
                >
                    Manage All
                </Link>
            </div>

            <div className="flex flex-col gap-3">                {courses.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#d1d5db] py-10 text-center">
                        <p className="text-sm text-[#6b7280]">
                            No courses found.
                        </p>
                    </div>
                ) : (
                    courses.map((course) => {
                        const status =
                            STATUS_CONFIG[
                                course.status
                            ];

                        const seatPct =
                            course.totalSeats > 0
                                ? Math.round(
                                      (course.bookedSeats /
                                          course.totalSeats) *
                                          100,
                                  )
                                : 0;

                        const seatsLeft =
                            course.totalSeats -
                            course.bookedSeats;

                        return (
                            <motion.div
                                key={course.courseId}
                                variants={fadeUp}
                                className="rounded-xl border border-[#f3f4f6] bg-[#f9fafb] px-4 py-3.5 transition-colors hover:bg-[#f3f4f6]"
                            >
                                <div className="mb-2.5 flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[14px] font-bold text-[#0d1b3e]">
                                            {course.title}
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#6b7280]">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {course.schedule}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {course.bookedSeats}/
                                                {course.totalSeats}
                                                {" "}
                                                seats
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                                        <span
                                            className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                                            style={{
                                                background:
                                                    status.bg,
                                                color:
                                                    status.color,
                                            }}
                                        >
                                            {status.label}
                                        </span>

                                        <p className="text-[13px] font-bold text-[#0d1b3e]">
                                            ৳
                                            {course.revenue.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-1 flex justify-between text-[10px] text-[#9ca3af]">
                                        <span>
                                            {seatsLeft} seats
                                            left
                                        </span>

                                        <span>
                                            {seatPct}% filled
                                        </span>
                                    </div>

                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${seatPct}%`,
                                                background:
                                                    seatPct >=
                                                    90
                                                        ? "#ef4444"
                                                        : seatPct >=
                                                            60
                                                          ? "#f59e0b"
                                                          : "#1a56db",
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}