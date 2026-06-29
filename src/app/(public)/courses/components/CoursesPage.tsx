"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { stagger } from "@/components/animations";

import Header from "./Header";
import SearchBox from "./SearchBox";
import CoursesGrid from "./CoursesGrid";

import { useGetPublicCoursesQuery } from "@/redux/features/courses/courses.api";
import { useAppSelector } from "@/redux/hooks";

export default function CoursesClient() {
    const user = useAppSelector((state) => state.auth.user);

    const {
        data,
        isLoading,
        error,
    } = useGetPublicCoursesQuery({
        page: 1,
        limit: 10,
        userId: user?.userId,
    });

    const courses = data?.courses ?? [];

    const [search, setSearch] = useState("");

    const filteredCourses = useMemo(() => {
        return courses.filter(
            (course) =>
                course.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                course.instructor
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                course.tagline
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
    }, [courses, search]);

    return (
        <motion.section
            className="min-h-screen bg-[#f9fafb] px-4 py-10 pt-20"
            initial="hidden"
            animate="visible"
            variants={stagger}
        >
            <div className="mx-auto max-w-7xl">
                <Header />

                <SearchBox
                    value={search}
                    onChange={setSearch}
                />

                <CoursesGrid
                    courses={filteredCourses}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </motion.section>
    );
}