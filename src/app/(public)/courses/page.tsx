"use client";

import { useMemo, useState } from "react";
import CourseCard, { Course } from "@/components/courses/CourseCard";
import { Search } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import one from "@/assets/thumbnails/one.jpg";
import two from "@/assets/thumbnails/tow.jpg";
import three from "@/assets/thumbnails/three.jpg";
import four from "@/assets/thumbnails/foure.jpg";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const COURSES: Course[] = [
    {
        title: "Introduction to JavaScript",
        instructor: "MD Tarikul Islam",
        thumbnail: one,
        price: "TK 49.99",
        rating: 4,
        reviewCount: 4,
    },
    {
        title: "Advanced Python Programming",
        instructor: "MD Nayem Hossain",
        thumbnail: two,
        price: "TK 79.99",
        rating: 4,
        reviewCount: 5,
    },
    {
        title: "Cloud Computing Essentials",
        instructor: "MD Arifur Rahman",
        thumbnail: three,
        price: "TK 89.99",
        rating: 3,
        reviewCount: 5,
    },
    {
        title: "Cybersecurity Basics",
        instructor: "MD Tanvir Ahmed",
        thumbnail: four,
        price: "TK 59.49",
        rating: 4.5,
        reviewCount: 3,
    },
];

export default function CoursesClient() {
    const [search, setSearch] = useState("");

    const filteredCourses = useMemo(() => {
        return COURSES.filter((course) =>
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.toLowerCase().includes(search.toLowerCase()) ||
            course.price.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <motion.section
            className="min-h-screen bg-[#f9fafb] px-4 pt-20 py-10"
            initial="hidden"
            animate="visible"
            variants={stagger}
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    className="mb-8 text-center"
                    variants={fadeUp}
                >
                    <h1 className="text-3xl font-bold text-[#111827]">
                        Explore Courses
                    </h1>
                    <p className="mt-2 text-[#6b7280]">
                        Find the right course and start learning today
                    </p>
                </motion.div>

                {/* Search Box */}
                <motion.div
                    className="mb-10 flex justify-center w-full px-4"
                    variants={fadeUp}
                >
                    <div className="relative group flex w-full max-w-2xl items-center overflow-hidden rounded-sm border border-gray-300 bg-white p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <div className="pl-3 text-gray-400 group-focus-within:text-primary">
                            <Search size={20} strokeWidth={1.5} />
                        </div>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search for courses"
                            className="w-full bg-transparent px-3 py-2 text-base text-gray-700 outline-none placeholder:text-gray-400 placeholder:font-light"
                        />

                        <button className="rounded bg-primary px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95 cursor-pointer">
                            Search
                        </button>
                    </div>
                </motion.div>

                {/* Results count */}
                <motion.div
                    className="mb-4 text-sm text-[#6b7280]"
                    variants={fadeUp}
                >
                    {filteredCourses.length} course(s) found
                </motion.div>

                {/* Grid */}
                {filteredCourses.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredCourses.map((course) => (
                            <motion.div key={course.title} variants={fadeUp}>
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="mt-20 text-center text-gray-500"
                        variants={fadeUp}
                    >
                        No courses found 😢
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}