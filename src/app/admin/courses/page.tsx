// app/admin/courses/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, CircleAlert, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import FilterBar from "./components/FilterBar";
import SummaryBadges from "./components/SummaryBadges";
import CoursesTable from "./components/CoursesTable";

import { useGetAdminCoursesQuery } from "@/redux/features/courses/courses.api";
import { NormalizeError } from "@/redux/api/apiError";

export default function AdminCoursesPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const { data: courses, isLoading, error, isError } = useGetAdminCoursesQuery();

    const filtered = useMemo(() => {
        return (courses ?? []).filter((c) => {
            const matchSearch =
                !search ||
                [c.title, c.instructor].some((f) =>
                    f.toLowerCase().includes(search.toLowerCase())
                );

            const matchStatus =
                !status || c.status === status;

            return matchSearch && matchStatus;
        });
    }, [courses, search, status]);

    const handleReset = () => { setSearch(""); setStatus(""); };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-5 p-4 sm:p-6"
        >
            {/* Back */}
            <motion.button
                variants={fadeUp}
                onClick={() => router.replace("/admin/dashboard")}
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#6b7280] transition-colors hover:text-[#1a56db]"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
            </motion.button>

            {isError && (
                <motion.div variants={fadeUp} className="flex items-center gap-1.5 rounded-md bg-red-50 p-4">
                    <CircleAlert strokeWidth={2.5} className="h-5 w-5 text-red-600" />
                    <p className="text-sm font-medium text-red-800">
                        {NormalizeError(error).message || "Failed to load courses. Please try again later."}
                    </p>
                </motion.div>
            )}

            {isLoading ? (
                <motion.div variants={fadeUp} className="animate-pulse rounded-lg bg-[#e5e7eb] p-6">
                    <div className="h-4 w-1/3 rounded bg-[#d1d5db]" />
                    <div className="mt-2 h-3 w-1/4 rounded bg-[#d1d5db]" />
                </motion.div>
            ) : (
                <>
                    {/* Header */}
                    <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#0d1b3e]">All Courses</h1>
                            <p className="mt-1 text-[13px] text-[#6b7280]">
                                {courses?.length} total courses
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <SummaryBadges data={courses ?? []} />
                            <Link href="/admin/courses/new">
                                <button className="flex items-center gap-1.5 rounded-sm bg-[#1a56db] px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#1346c4] cursor-pointer">
                                    <PlusCircle className="h-4 w-4" />
                                    New Course
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div variants={fadeUp}>
                        <FilterBar
                            search={search} status={status}
                            onSearch={setSearch} onStatus={setStatus}
                            onReset={handleReset}
                        />
                    </motion.div>

                    {/* Result count */}
                    <motion.p variants={fadeUp} className="text-[12px] text-[#9ca3af]">
                        Showing {filtered.length} of {courses?.length} courses
                    </motion.p>

                    {/* Table */}
                    <motion.div variants={fadeUp}>
                        <CoursesTable data={filtered} />
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}