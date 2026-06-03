// app/admin/courses/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { COURSES }     from "../_data/courses";
import FilterBar       from "./components/FilterBar";
import SummaryBadges   from "./components/SummaryBadges";
import CoursesTable    from "./components/CoursesTable";

export default function AdminCoursesPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const filtered = useMemo(() => {
        return COURSES.filter((c) => {
            const matchSearch = !search ||
                [c.title, c.instructor].some((f) =>
                    f.toLowerCase().includes(search.toLowerCase())
                );
            const matchStatus = !status || c.status === status;
            return matchSearch && matchStatus;
        });
    }, [search, status]);

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

            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0d1b3e]">All Courses</h1>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                        {COURSES.length} total courses
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <SummaryBadges data={COURSES} />
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
                Showing {filtered.length} of {COURSES.length} courses
            </motion.p>

            {/* Table */}
            <motion.div variants={fadeUp}>
                <CoursesTable data={filtered} />
            </motion.div>
        </motion.div>
    );
}