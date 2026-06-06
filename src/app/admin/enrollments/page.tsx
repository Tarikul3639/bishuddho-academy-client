// app/admin/enrollments/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ENROLLMENTS } from "../_data/enrollments";
import FilterBar        from "./components/FilterBar";
import SummaryBadges    from "./components/SummaryBadges";
import EnrollmentsTable from "./components/EnrollmentsTable";

export default function EnrollmentsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [method, setMethod] = useState("");
    const [course, setCourse] = useState("");

    const filtered = useMemo(() => {
        return ENROLLMENTS.filter((e) => {
            const matchSearch = !search || [e.name, e.email, e.course]
                .some((f) => f.toLowerCase().includes(search.toLowerCase()));
            const matchStatus = !status || e.status === status;
            const matchMethod = !method || e.method === method;
            const matchCourse = !course || e.course === course;
            return matchSearch && matchStatus && matchMethod && matchCourse;
        });
    }, [search, status, method, course]);

    const handleReset = () => {
        setSearch(""); setStatus(""); setMethod(""); setCourse("");
    };

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
                    <h1 className="text-2xl font-bold text-[#0d1b3e]">All Enrollments</h1>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                        {ENROLLMENTS.length} total enrollments
                    </p>
                </div>
                <SummaryBadges data={ENROLLMENTS} />
            </motion.div>

            {/* Filters */}
            <motion.div variants={fadeUp}>
                <FilterBar
                    search={search} status={status} method={method} course={course}
                    onSearch={setSearch} onStatus={setStatus}
                    onMethod={setMethod} onCourse={setCourse}
                    onReset={handleReset}
                />
            </motion.div>

            {/* Result count */}
            <motion.p variants={fadeUp} className="text-[12px] text-[#9ca3af]">
                Showing {filtered.length} of {ENROLLMENTS.length} enrollments
            </motion.p>

            {/* Table */}
            <motion.div variants={fadeUp}>
                <EnrollmentsTable data={filtered} />
            </motion.div>
        </motion.div>
    );
}