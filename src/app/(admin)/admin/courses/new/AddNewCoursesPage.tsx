"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, Save } from "lucide-react";

import { type AdminCourseDetail } from "../../_data/courseDetail";

import AboutTab from "@/components/courses/tabs/AboutTab";
import IncludedTab from "@/components/courses/tabs/IncludedTab";
import CurriculumTab from "@/components/courses/tabs/CurriculumTab";
import BatchInfoTab from "@/components/courses/tabs/BatchInfoTab";
import StudentsTab from "@/components/courses/tabs/StudentsTab";
import PricingTab from "@/components/courses/tabs/PricingTab";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CourseHero from "@/components/courses/CourseHero";

// ── Tabs ─────────────────────────────
const TABS = [
    { id: "about", label: "About" },
    { id: "curriculum", label: "Curriculum" },
    { id: "students", label: "Students" },
    { id: "batch", label: "Batch Info" },
    { id: "included", label: "Included" },
    { id: "pricing", label: "Pricing & Offer" },
] as const;

export default function AddNewCoursesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "about";
    const [saved, setSaved] = useState(false);


    // ── CREATE MODE INITIAL STATE ─────────────────────────────
    const [course, setCourse] = useState<AdminCourseDetail>({
        id: "",
        title: "Update Course Title",
        instructor: "Instructor Name",
        schedule: "e.g., Mon-Wed-Fri, 6-8 PM",
        location: "e.g., Online / Dhaka / Chittagong",
        startDate: new Date(),

        duration: "",
        lessons: 0,
        bookedSeats: 0,
        totalSeats: 0,
        banner: "",

        status: "upcoming",

        price: 0,
        originalPrice: 0,
        discount: 0,

        discountStarts: null,
        discountEnds: null,

        tagline: "Write a catchy tagline for the course",
        description: "Write a detailed description of the course, covering what students will learn, prerequisites, and any other important information.",

        includes: [],
        modules: [],
        students: [],

        revenue: 0,
    });

    // ── Save (CREATE API later) ─────────────────────────────
    const handleSave = () => {
        console.log("CREATE COURSE:", course);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-4 sm:p-6"
        >
            {/* Top Bar */}
            <motion.div
                variants={fadeUp}
                className="flex items-center justify-between"
            >
                <button
                    onClick={() => router.replace("/admin/courses")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#6b7280] hover:text-[#1a56db] cursor-pointer transition-colors"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Courses
                </button>

                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-bold text-white cursor-pointer ${saved
                        ? "bg-[#16a34a]"
                        : "bg-[#1a56db] hover:bg-[#1346c4]"
                        }`}
                >
                    <Save className="h-4 w-4" />
                    {saved ? "Created!" : "Create Course"}
                </button>
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

            {/* Layout */}
            <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
                {/* LEFT */}
                <motion.div variants={fadeUp} className="space-y-4">
                    {/* Tabs */}
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

                    {/* Tabs Content */}
                    {activeTab === "about" && (
                        <AboutTab
                            tagline={course.tagline}
                            description={course.description}
                            onChange={(field, value) =>
                                setCourse((prev) => ({ ...prev, [field]: value }))
                            }
                            onBannerChange={(file) => {
                                setCourse((prev) => ({
                                    ...prev,
                                    bannerFile: file,
                                }));
                            }}
                        />
                    )}

                    {activeTab === "curriculum" && (
                        <CurriculumTab
                            modules={course.modules}
                            onChange={(modules) =>
                                setCourse((p) => ({ ...p, modules }))
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
                            onVerify={() => { }}
                            onReject={() => { }}
                        />
                    )}

                    {activeTab === "batch" && (
                        <BatchInfoTab
                            bookedSeats={course.bookedSeats}
                            totalSeats={course.totalSeats}
                            schedule={course.schedule}
                            location={course.location}
                            duration={course.duration}
                            startDate={course.startDate}
                            lessons={course.lessons}
                            onChange={(field, value) =>
                                setCourse((prev) => ({ ...prev, [field]: value }))
                            }
                        />
                    )}

                    {activeTab === "included" && (
                        <IncludedTab
                            includes={course.includes}
                            onChange={(items) =>
                                setCourse((p) => ({
                                    ...p,
                                    includes: items,
                                }))
                            }
                        />
                    )}

                    {activeTab === "pricing" && (
                        <PricingTab
                            price={course.price}
                            originalPrice={course.originalPrice}
                            discount={course.discount}
                            discountStarts={course.discountStarts}
                            discountEnds={course.discountEnds}
                            onChange={(field, value) =>
                                setCourse((p) => ({
                                    ...p,
                                    [field]: value,
                                }))
                            }
                        />
                    )}
                </motion.div>

                {/* RIGHT */}
                <motion.div variants={fadeUp} className="hidden lg:block">
                    <div className="sticky top-6">
                        <CourseSidebar course={course} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}