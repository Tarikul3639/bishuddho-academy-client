"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, CalendarDays, MapPin, UserCheck } from "lucide-react";
import { fadeUp, stagger } from "@/components/animations";
import { Stars } from "@/components/ui/Stars";
import type { PublicCourseDetails } from "@/types/public-course-details";

export function CourseHeader({ course }: { course: PublicCourseDetails }) {
    const { title, tagline, description, averageRating, reviewCount, students, instructor, schedule, location, startDate } = course;

    const formattedDate = new Date(startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

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
                    {title}
                </h1>

                <p className="mb-3 text-[#6b7280]">{tagline}</p>

                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#6b7280]">
                    {description}
                </p>
            </motion.div>

            {/* Rating + students */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 text-sm capitalize">
                <span className="font-bold text-[#111827]">{averageRating.toFixed(1)}</span>
                <Stars rating={averageRating} />
                <span className="text-primary">({reviewCount} ratings)</span>

                <span className="flex items-center gap-1 text-[#6b7280]">
                    <Users className="h-4 w-4" />
                    {students} students
                </span>
            </motion.div>

            {/* Instructor */}
            <motion.p variants={fadeUp} className="mt-3 text-sm text-[#6b7280]">
                Instructor:{" "}
                <Link href="/about" className="font-medium text-primary hover:underline">
                    {instructor}
                </Link>
            </motion.p>

            {/* Meta info */}
            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {schedule}
                </span>

                <span className="flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {location}
                </span>

                <span className="flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <UserCheck className="h-3.5 w-3.5 text-primary" />
                    Starts {formattedDate}
                </span>
            </motion.div>
        </motion.div>
    );
}