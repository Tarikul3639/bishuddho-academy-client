// app/admin/courses/[courseId]/components/AdminCourseDetailPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, RefreshCw, Save } from "lucide-react";

import { useFormDirty } from "@/hooks/useFormDirty";

import {
    COURSE_DETAIL,
    type AdminCourseDetail,
} from "../../_data/courseDetail";

import AboutTab from "@/components/courses/tabs/AboutTab";
import IncludedTab from "@/components/courses/tabs/IncludedTab";
import CurriculumTab from "@/components/courses/tabs/CurriculumTab";
import BatchInfoTab from "@/components/courses/tabs/BatchInfoTab";
import StudentsTab from "@/components/courses/tabs/StudentsTab";
import PricingTab from "@/components/courses/tabs/PricingTab";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CourseHero from "@/components/courses/CourseHero";

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS = [
    { id: "about", label: "About" },
    { id: "curriculum", label: "Curriculum" },
    { id: "students", label: "Students" },
    { id: "batch", label: "Batch Info" },
    { id: "included", label: "Included" },
    { id: "pricing", label: "Pricing & Offer" },
] as const;

export default function AdminCourseDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab =
        searchParams.get("tab") || "about";
    const [course, setCourse] = useState<AdminCourseDetail>(COURSE_DETAIL);
    const [saved, setSaved] = useState(false);
    const [initialCourse] = useState(COURSE_DETAIL);
    const { isDirty, dirtyFields, getChangedValues, resetBaseline } = useFormDirty(course, {
        ignore: ["courseId"]
    });

    const handleChange = (field: string, value: string) => {
        setCourse((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // TODO: PATCH /admin/courses/:id
        console.log("Save:", course);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleVerify = (id: string) =>
        setCourse((prev) => ({
            ...prev,
            students: prev.students.map((s) =>
                s.enrollId === id ? { ...s, status: "active" as const } : s,
            ),
        }));

    const handleReject = (id: string) =>
        setCourse((prev) => ({
            ...prev,
            students: prev.students.filter((s) => s.enrollId !== id),
        }));

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-4 sm:p-6"
        >
            {/* Top bar */}
            <motion.div
                variants={fadeUp}
                className="flex items-center justify-between"
            >
                <button
                    onClick={() => router.replace("/admin/courses")}
                    className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#6b7280] transition-colors hover:text-[#1a56db]"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Courses
                </button>
                {isDirty && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-bold text-white transition-all cursor-pointer ${saved ? "bg-[#16a34a]" : "bg-[#1a56db] hover:bg-[#1346c4]"}`}
                        >
                            <Save className="h-4 w-4" />
                            {saved ? "Saved!" : "Save Changes"}
                        </button>

                        {/* Reset baseline button */}
                        <button
                            onClick={() => {
                                setCourse(initialCourse);
                                resetBaseline(initialCourse);
                            }}
                            className="flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-bold text-white transition-all cursor-pointer bg-[#6b7280] hover:bg-[#5b626a]"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Reset Baseline
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Hero */}
            <CourseHero
                status={course.status}
                title={course.title}
                tagline={course.tagline}
                schedule={course.schedule}
                location={course.location}
                startDate={course.startDate}
            />

            {/* Body */}
            <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
                {/* LEFT — tabs */}
                <motion.div variants={fadeUp} className="space-y-4">
                    {/* Tab bar */}
                    <div className="flex flex-wrap gap-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => router.replace(`?tab=${tab.id}`, { scroll: false })}
                                className={`relative rounded-lg px-3.5 py-2 text-[12px] font-bold transition-colors cursor-pointer ${activeTab === tab.id
                                    ? "text-[#0d1b3e]"
                                    : "text-[#6b7280] hover:text-[#0d1b3e]"
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.span
                                        layoutId="active-tab"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                        className="absolute inset-0 rounded-lg bg-white shadow-sm"
                                    />
                                )}

                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    {activeTab === "about" && (
                        <AboutTab
                            thumbnailUrl={course.thumbnailUrl}
                            thumbnailFile={course.thumbnailFile}
                            tagline={course.tagline}
                            description={course.description}
                            onChange={handleChange}
                            onThumbnailChange={(file) => {
                                setCourse((prev) => ({
                                    ...prev,
                                    thumbnailFile: file,
                                    ...(file === null && {
                                        thumbnailUrl: "",
                                    }),
                                }));
                            }}
                        />
                    )}
                    {activeTab === "curriculum" && (
                        <CurriculumTab
                            modules={course.modules}
                            onChange={(modules) =>
                                setCourse((prev) => ({ ...prev, modules }))
                            }
                            onSessionChange={(session) => {
                                // TODO: PATCH /admin/enrollments/:id { currentSession: session }
                                console.log("Current session:", session);
                            }}
                        />
                    )}
                    {activeTab === "students" && (
                        <StudentsTab
                            students={course.students}
                            onVerify={handleVerify}
                            onReject={handleReject}
                        />
                    )}
                    {activeTab === "batch" && (
                        <BatchInfoTab
                            instructor={course.instructor}
                            status={course.status}
                            bookedSeats={course.bookedSeats}
                            totalSeats={course.totalSeats}
                            schedule={course.schedule}
                            location={course.location}
                            duration={course.duration}
                            startDate={course.startDate}
                            onChange={(field, value) =>
                                setCourse((prev) => ({ ...prev, [field]: value }))
                            }
                        />
                    )}
                    {activeTab === "included" && (
                        <IncludedTab
                            includes={course.includes}
                            onChange={(items) =>
                                setCourse((prev) => ({ ...prev, includes: items }))
                            }
                        />
                    )}
                    {activeTab === "pricing" && (
                        <PricingTab
                            price={course.price}
                            originalPrice={course.originalPrice}
                            discountStarts={course.discountStarts}
                            discountEnds={course.discountEnds}
                            onChange={(field, value) =>
                                setCourse((prev) => ({ ...prev, [field]: value }))
                            }
                        />
                    )}
                </motion.div>

                {/* RIGHT — sidebar */}
                <motion.div variants={fadeUp} className="hidden lg:block">
                    <div className="sticky top-6">
                        <CourseSidebar course={course} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}