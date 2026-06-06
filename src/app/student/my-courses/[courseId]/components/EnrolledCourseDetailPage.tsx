"use client";

import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import {
    MapPin, Clock, Calendar, Users, Star, Award,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";

import Sidebar from "./Sidebar";
import ModuleAccordion from "./ModuleAccordion";
import type { EnrolledCourseDetail } from "./courseTypes";
import { getClassStatus } from "./curriculumUtils";

const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 20 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1], delay: d },
    }),
};

const stagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08 } },
};

export function EnrolledCourseDetailPage({ course }: { course: EnrolledCourseDetail }) {
    const router = useRouter();

    const progPct = Math.round((course.currentSession / course.lessons) * 100);

    const activeModuleId = course.modules.find((mod) =>
        mod.classes.some((cls) => getClassStatus(cls.session, course.currentSession) === "active")
    )?.id ?? 1;

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-4 sm:p-6"
        >
            {/* Back nav */}
            <motion.button
                variants={fadeUp}
                onClick={() => router.replace("/my-courses")}
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#6b7280] transition-colors hover:text-[#1a56db]"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to My Courses
            </motion.button>
            {/* Hero */}
            <motion.div
                variants={fadeUp}
                className="rounded-2xl bg-linear-to-br from-[#0d1b3e] to-[#1a3a6e] px-5 py-10 sm:px-8 sm:py-12"
            >
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 text-[11px] font-bold text-[#16a34a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                    Enrolled — Active
                </span>

                <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
                    <div>
                        <h1 className="mb-3 text-2xl font-bold leading-snug text-white lg:text-3xl">
                            {course.title}
                        </h1>
                        <p className="mb-5 text-[15px] leading-relaxed text-white/60">
                            {course.tagline}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-white/70">
                            <span className="flex items-center gap-1.5 font-semibold text-[#fbbf24]">
                                <Star className="h-4 w-4 fill-[#fbbf24]" />
                                {course.rating}
                                <span className="font-normal text-white/50">({course.ratingCount} reviews)</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5" />{course.students} students
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Award className="h-3.5 w-3.5" />{course.instructor}
                            </span>
                        </div>
                    </div>
                    {/* Class info card */}
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/40">
                            Class Info
                        </p>
                        <div className="flex flex-col gap-2.5 text-[13px] text-white/70">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 shrink-0 text-white/40" />
                                {course.schedule}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 shrink-0 text-white/40" />
                                {course.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5 shrink-0 text-white/40" />
                                {course.duration} &bull; {course.lessons} sessions
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 shrink-0 text-white/40" />
                                Started {course.startDate}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Body */}
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* LEFT — main content */}
                <motion.div variants={stagger} className="space-y-8">
                    {/* About */}
                    <motion.section variants={fadeUp}>
                        <h2 className="mb-4 text-lg font-bold text-[#0d1b3e]">About This Course</h2>
                        <p className="text-[15px] leading-relaxed text-[#4b5678]">
                            {course.description}
                        </p>
                    </motion.section>
                    {/* What's included */}
                    <motion.section variants={stagger}>
                        <h2 className="mb-4 text-lg font-bold text-[#0d1b3e]">What&apos;s Included</h2>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                            {course.includes.map((item) => (
                                <motion.div
                                    key={item}
                                    variants={fadeUp}
                                    className="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[13px] font-medium text-[#374151]"
                                >
                                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" />
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                    {/* Curriculum */}
                    <motion.section variants={fadeUp}>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#0d1b3e]">Curriculum</h2>
                            <span className="text-[12px] text-[#9ca3af] capitalize">
                                {course.modules.length} modules &bull; {course.lessons} sessions
                            </span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {course.modules.map((mod) => (
                                <ModuleAccordion
                                    key={mod.id}
                                    mod={mod}
                                    currentSession={course.currentSession}
                                    defaultOpen={mod.id === activeModuleId}
                                />
                            ))}
                        </div>
                    </motion.section>
                    {/* Sidebar — mobile only */}
                    <motion.div variants={fadeUp} className="lg:hidden">
                        <Sidebar course={course} progPct={progPct} />
                    </motion.div>
                </motion.div>
                {/* RIGHT — desktop sidebar */}
                <motion.div variants={fadeUp} className="hidden lg:block">
                    <div className="sticky top-6">
                        <Sidebar course={course} progPct={progPct} />
                    </div>
                </motion.div>
            </div>
        </motion.main>
    );
}

export default EnrolledCourseDetailPage;