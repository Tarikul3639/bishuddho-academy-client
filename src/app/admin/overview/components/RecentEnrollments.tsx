"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
    fadeUp,
    stagger,
} from "@/components/animations";

import {
    ENROLLMENT_STATUS_CONFIG,
    METHOD_CONFIG,
} from "@/constants/course.constants";

import {
    useGetRecentEnrollmentsQuery,
} from "@/redux/features/dashboard/dashboard.api";

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function RecentEnrollments() {
    const {
        data,
        isLoading,
        isError,
    } = useGetRecentEnrollmentsQuery();

    const enrollments = data?.enrollments ?? [];

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm sm:p-5">
                <div className="animate-pulse space-y-3">
                    <div className="h-5 w-44 rounded-sm bg-slate-200" />

                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-xl border border-[#f3f4f6] p-3 sm:p-3.5"
                        >
                            <div className="h-8 w-8 rounded-full bg-slate-200 sm:h-9 sm:w-9" />

                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-40 rounded-sm bg-slate-200" />
                                <div className="h-2.5 w-28 rounded-sm bg-slate-200" />
                            </div>

                            <div className="h-6 w-16 rounded-full bg-slate-200" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm text-red-600">
                    Failed to load recent enrollments.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm sm:p-5"
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-bold text-[#0d1b3e]">
                    Recent Enrollments
                </h2>

                <Link
                    href="/admin/users"
                    className="shrink-0 text-[11px] font-semibold text-[#1a56db] hover:underline sm:text-[12px]"
                >
                    View All
                </Link>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2">
                {enrollments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#e5e7eb] py-8 text-center">
                        <p className="text-sm text-[#6b7280]">
                            No recent enrollments found.
                        </p>
                    </div>
                ) : (
                    enrollments.map((enrollment) => {
                        const status =
                            ENROLLMENT_STATUS_CONFIG[
                            enrollment.status
                            ];

                        const method =
                            METHOD_CONFIG[
                            enrollment.method as keyof typeof METHOD_CONFIG
                            ];

                        return (
                            <motion.div
                                key={enrollment.enrollmentId}
                                variants={fadeUp}
                                className="flex items-center gap-2 rounded-xl border border-[#f3f4f6] bg-[#f9fafb] px-3 py-2.5 transition-colors hover:bg-[#f3f4f6] sm:gap-3"
                            >                                {/* Avatar */}
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-[11px] font-bold text-white sm:h-9 sm:w-9 sm:text-[12px]">
                                    {getInitials(enrollment.studentName)}
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[12px] font-bold text-[#0d1b3e] sm:text-[13px]">
                                        {enrollment.studentName}
                                    </p>

                                    <p className="truncate text-[10px] text-[#6b7280] sm:text-[11px]">
                                        {enrollment.courseName}
                                    </p>
                                </div>

                                {/* Method */}
                                <span
                                    className="hidden shrink-0 text-[10px] font-bold sm:block lg:text-[11px]"
                                    style={{
                                        color:
                                            method?.color ??
                                            "#6b7280",
                                    }}
                                >
                                    {method?.label ??
                                        enrollment.method}
                                </span>

                                {/* Date */}
                                <span className="hidden shrink-0 whitespace-nowrap text-[10px] text-[#9ca3af] lg:block">
                                    {new Date(
                                        enrollment.date,
                                    ).toLocaleDateString()}
                                </span>

                                {/* Status */}
                                <span
                                    className="shrink-0 rounded-full px-2 py-1 text-[9px] font-bold sm:px-2.5 sm:text-[10px]"
                                    style={{
                                        background:
                                            status.bg,
                                        color:
                                            status.color,
                                    }}
                                >
                                    {status.label}
                                </span>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}