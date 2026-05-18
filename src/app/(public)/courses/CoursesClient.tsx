"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { stagger } from "@/components/animations";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import CoursesGrid from "./components/CoursesGrid";
import { Course } from "@/components/courses/CourseCard";

import one from "@/assets/thumbnails/one.jpg";
import two from "@/assets/thumbnails/tow.jpg";
import three from "@/assets/thumbnails/three.jpg";
import four from "@/assets/thumbnails/foure.jpg";

// ─── Sample Courses Data ─────────────────────────────────────────────────────

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
    // Redux setup এর পর: useState সরিয়ে useSelector/useDispatch দিয়ে replace করবে
    // TODO: Redux setup const search = useSelector((state: RootState) => state.courses.search);
    // TODO: const courses = useSelector((state: RootState) => state.courses.list);
    const [search, setSearch] = useState("");

    const filteredCourses = useMemo(
        () =>
            COURSES.filter(
                (course) =>
                    course.title.toLowerCase().includes(search.toLowerCase()) ||
                    course.instructor.toLowerCase().includes(search.toLowerCase()) ||
                    course.price.toLowerCase().includes(search.toLowerCase())
            ),
        [search]
    );

    return (
        <motion.section
            className="min-h-screen bg-[#f9fafb] px-4 pt-20 py-10"
            initial="hidden"
            animate="visible"
            variants={stagger}
        >
            <div className="mx-auto max-w-7xl">
                <Header />
                <SearchBox value={search} onChange={setSearch} />
                <CoursesGrid courses={filteredCourses} />
            </div>
        </motion.section>
    );
}