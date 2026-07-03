"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CircleAlert, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { fadeUp, stagger } from "@/components/animations";

import FilterBar from "./components/FilterBar";
import SummaryBadges from "./components/SummaryBadges";
import TeacherPageHeader from "./components/TeacherPageHeader";
import TeachersTable from "./components/TeachersTable";
import TeachersPageSkeleton from "./components/TeachersPageSkeleton";

import { NormalizeError } from "@/redux/api/apiError";
import { useGetAdminTeachersQuery } from "@/redux/features/teachers/teachers.api";

export default function AdminTeachersPage() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetAdminTeachersQuery({
        limit: 100,
    });

    const teachers = data?.teachers ?? [];

    const filtered = useMemo(() => {
        return teachers.filter((teacher) => {
            const searchMatch =
                !search ||
                teacher.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                teacher.designation
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const statusMatch =
                !status ||
                (status === "active"
                    ? teacher.isActive
                    : !teacher.isActive);

            return searchMatch && statusMatch;
        });
    }, [teachers, search, status]);


    if (isLoading) {
        return <TeachersPageSkeleton />;
    }

    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-5 p-6"
        >
            <motion.button
                variants={fadeUp}
                onClick={() =>
                    router.replace("/admin/dashboard")
                }
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary cursor-pointer transition"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </motion.button>

            {isError && (
                <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-2 rounded-lg bg-red-50 p-4"
                >
                    <CircleAlert className="h-5 w-5 text-red-600" />

                    <p className="text-sm text-red-700">
                        {NormalizeError(error).message}
                    </p>
                </motion.div>
            )}

            {!isLoading && (
                <>
                    <TeacherPageHeader
                        total={teachers.length}
                    />

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <SummaryBadges data={teachers} />

                        <Link
                            href="/admin/teachers/new"
                            className="w-full lg:w-auto"
                        >
                            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-primary/90 lg:w-auto cursor-pointer">
                                <PlusCircle className="h-4 w-4 shrink-0" />
                                Add Teacher
                            </button>
                        </Link>
                    </div>

                    <FilterBar
                        search={search}
                        status={status}
                        onSearch={setSearch}
                        onStatus={setStatus}
                        onReset={() => {
                            setSearch("");
                            setStatus("");
                        }}
                    />

                    <p className="text-xs text-gray-500">
                        Showing {filtered.length} of{" "}
                        {teachers.length} teachers
                    </p>

                    <TeachersTable
                        data={filtered}
                        allTeachers={teachers}
                    />
                </>
            )}
        </motion.div>
    );
}