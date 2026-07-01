"use client";

// app/(public)/teachers/components/TeachersPage.tsx

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users, Filter, X } from "lucide-react";
import { stagger, fadeUp } from "@/components/animations";
// import TeacherCard from "./TeacherCard";
// import TeacherCardSkeleton from "./TeacherCardSkeleton";
// import SpecialTeacherCard from "./SpecialTeacherCard";
import { useGetPublicTeachersQuery } from "@/redux/features/teachers/teachers.api";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
    "All Departments",
    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Data Science",
    "Cybersecurity",
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function TeachersHero() {
    return (
        <section className="overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 lg:px-8 lg:pt-14">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary sm:text-sm">
                        <Users className="h-3.5 w-3.5" />
                        Our Expert Team
                    </span>
                    <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl md:text-4xl">
                        Meet Our{" "}
                        <span className="text-primary">Dedicated Teachers</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                        Learn from experienced educators and industry professionals who are
                        committed to your success at Bishuddho Academy.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Filters ──────────────────────────────────────────────────────────────────

interface FiltersProps {
    search: string;
    onSearch: (v: string) => void;
    department: string;
    onDepartment: (v: string) => void;
    onReset: () => void;
    isFiltered: boolean;
}

function TeachersFilters({
    search,
    onSearch,
    department,
    onDepartment,
    onReset,
    isFiltered,
}: FiltersProps) {
    return (
        <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    id="teacher-search"
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search by name, designation, expertise..."
                    className="w-full rounded-sm border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
            </div>

            {/* Department */}
            <div className="relative min-w-52">
                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                    id="teacher-department-filter"
                    value={department}
                    onChange={(e) => onDepartment(e.target.value)}
                    className="w-full appearance-none rounded-sm border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-8 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 cursor-pointer"
                >
                    {DEPARTMENTS.map((d) => (
                        <option key={d} value={d === "All Departments" ? "" : d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>

            {isFiltered && (
                <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 rounded-sm border border-[#e5e7eb] px-3 py-2.5 text-sm text-gray-600 transition-colors hover:border-red-300 hover:text-red-600 cursor-pointer"
                >
                    <X className="h-3.5 w-3.5" />
                    Clear
                </button>
            )}
        </motion.div>
    );
}

// ─── Empty / Error States ──────────────────────────────────────────────────────

function EmptyState() {
    return (
        <motion.div
            variants={fadeUp}
            className="py-20 text-center"
        >
            <Users className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-base font-semibold text-gray-700">
                No teachers found
            </p>
            <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters.
            </p>
        </motion.div>
    );
}

function ErrorState() {
    return (
        <motion.div
            variants={fadeUp}
            className="py-20 text-center"
        >
            <p className="text-base font-semibold text-red-500">
                Failed to load teachers
            </p>
            <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TeachersPage() {
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");

    const { data, isLoading, error } = useGetPublicTeachersQuery({
        limit: 50,
    });

    const allTeachers = data?.teachers ?? [];

    const founders = useMemo(
        () => allTeachers.filter((t) => t.isFounder),
        [allTeachers]
    );
    const leadInstructors = useMemo(
        () => allTeachers.filter((t) => t.isLeadInstructor && !t.isFounder),
        [allTeachers]
    );
    const featured = useMemo(
        () =>
            allTeachers.filter(
                (t) => t.featured && !t.isFounder && !t.isLeadInstructor
            ),
        [allTeachers]
    );

    const regularTeachers = useMemo(() => {
        return allTeachers
            .filter((t) => !t.isFounder && !t.isLeadInstructor)
            .filter((t) => {
                const matchSearch =
                    !search ||
                    t.fullName.toLowerCase().includes(search.toLowerCase()) ||
                    t.designation.toLowerCase().includes(search.toLowerCase()) ||
                    (t.department ?? "")
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    t.expertise.some((e) =>
                        e.toLowerCase().includes(search.toLowerCase())
                    );

                const matchDepartment =
                    !department ||
                    (t.department ?? "")
                        .toLowerCase()
                        .includes(department.toLowerCase());

                return matchSearch && matchDepartment;
            });
    }, [allTeachers, search, department]);

    const isFiltered = !!search || !!department;
    const isSearching = !!search || !!department;

    const handleReset = () => {
        setSearch("");
        setDepartment("");
    };

    return (
        <motion.main
            className="min-h-screen bg-[#f9fafb] text-foreground"
            initial="hidden"
            animate="visible"
            variants={stagger}
        >
            <TeachersHero />

            <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
                {/* Founder section */}
                {!isSearching && founders.length > 0 && (
                    <motion.section variants={fadeUp} className="mb-12">
                        <h2 className="mb-6 text-lg font-bold text-[#0d1b3e]">
                            Founder
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {/* {founders.map((t) => (
                                <SpecialTeacherCard key={t.teacherId} teacher={t} type="founder" />
                            ))} */}
                        </div>
                    </motion.section>
                )}

                {/* Lead Instructor section */}
                {!isSearching && leadInstructors.length > 0 && (
                    <motion.section variants={fadeUp} className="mb-12">
                        <h2 className="mb-6 text-lg font-bold text-[#0d1b3e]">
                            Lead Instructor
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {/* {leadInstructors.map((t) => (
                                <SpecialTeacherCard
                                    key={t.teacherId}
                                    teacher={t}
                                    type="leadInstructor"
                                />
                            ))} */}
                        </div>
                    </motion.section>
                )}

                {/* Featured teachers */}
                {!isSearching && featured.length > 0 && (
                    <motion.section variants={fadeUp} className="mb-12">
                        <h2 className="mb-6 text-lg font-bold text-[#0d1b3e]">
                            Featured Teachers
                        </h2>
                        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                            {featured.map((t) => (
                                <motion.div key={t.teacherId} variants={fadeUp}>
                                    {/* <TeacherCard teacher={t} /> */}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Divider before all teachers */}
                {!isSearching && allTeachers.length > 0 && (
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 text-lg font-bold text-[#0d1b3e]"
                    >
                        All Teachers
                    </motion.h2>
                )}

                {/* Filters */}
                <TeachersFilters
                    search={search}
                    onSearch={setSearch}
                    department={department}
                    onDepartment={setDepartment}
                    onReset={handleReset}
                    isFiltered={isFiltered}
                />

                {/* Results */}
                {isLoading ? (
                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                        {/* {Array.from({ length: 8 }).map((_, i) => (
                            <TeacherCardSkeleton key={i} />
                        ))} */}
                    </div>
                ) : error ? (
                    <ErrorState />
                ) : regularTeachers.length === 0 ? (
                    <EmptyState />
                ) : (
                    <motion.div
                        variants={stagger}
                        className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]"
                    >
                        {regularTeachers.map((t) => (
                            <motion.div key={t.teacherId} variants={fadeUp}>
                                {/* <TeacherCard teacher={t} /> */}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!isLoading && !error && (
                    <motion.p
                        variants={fadeUp}
                        className="mt-6 text-center text-xs text-gray-400"
                    >
                        Showing {regularTeachers.length} teacher
                        {regularTeachers.length !== 1 ? "s" : ""}
                    </motion.p>
                )}
            </div>
        </motion.main>
    );
}
