"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, CalendarDays, MapPin, UserCheck } from "lucide-react";
import { fadeUp, stagger } from "@/components/animations";
import { Stars } from "@/components/ui/Stars";

interface CourseHeaderProps {
    course: {
        title: string;
        tagline: string;
        description: string;
        rating: number;
        ratingCount: number;
        students: number;
        instructor: string;
        schedule: string;
        location: string;
        startDate: string;
    };
}

export function CourseHeader({ course }: CourseHeaderProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mb-8 border-b border-border pb-8"
        >
            {/* Header badge + title + tagline + description */}
            <motion.div variants={fadeUp}>
                <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Physical Class
                </span>

                <h1 className="mb-2 text-2xl font-bold text-[#111827] md:text-3xl">
                    {course.title}
                </h1>

                <p className="mb-3 text-[#6b7280]">{course.tagline}</p>

                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#6b7280]">
                    {course.description}
                </p>
            </motion.div>

            {/* Rating + students */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 text-sm capitalize">
                <span className="font-bold text-[#111827]">{course.rating}</span>
                <Stars rating={course.rating} />
                <span className="text-primary">({course.ratingCount} ratings)</span>

                <span className="flex items-center gap-1 text-[#6b7280]">
                    <Users className="h-4 w-4" />
                    {course.students} students
                </span>
            </motion.div>

            {/* Instructor */}
            <motion.p variants={fadeUp} className="mt-3 text-sm text-[#6b7280]">
                Instructor:{" "}
                <Link href="/about" className="font-medium text-primary hover:underline">
                    {course.instructor}
                </Link>
            </motion.p>

            {/* Meta info */}
            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {course.schedule}
                </span>

                <span className="flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {course.location}
                </span>

                <span className="flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <UserCheck className="h-3.5 w-3.5 text-primary" />
                    Starts {course.startDate}
                </span>
            </motion.div>
        </motion.div>
    );
}