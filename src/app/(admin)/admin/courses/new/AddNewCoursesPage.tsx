"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, CircleAlert, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import AboutTab from "@/components/courses/tabs/AboutTab";
import IncludedTab from "@/components/courses/tabs/IncludedTab";
import CurriculumTab from "@/components/courses/tabs/CurriculumTab";
import BatchInfoTab from "@/components/courses/tabs/BatchInfoTab";
import PricingTab from "@/components/courses/tabs/PricingTab";
import CourseHero from "@/components/courses/CourseHero";

import { useCreateCourseMutation } from "@/redux/features/courses/courses.api";
import { CourseCreate } from "@/types/course-create";
import { NormalizeError } from "@/redux/api/apiError";

// ── Tabs ─────────────────────────────
const TABS = [
    { id: "about", label: "About" },
    { id: "curriculum", label: "Curriculum" },
    { id: "batch", label: "Batch Info" },
    { id: "included", label: "Included" },
    { id: "pricing", label: "Pricing & Offer" },
] as const;

export default function AddNewCoursesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "about";
    const [saved, setSaved] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    // ── CREATE MODE INITIAL STATE ─────────────────────────────
    const [course, setCourse] = useState<CourseCreate>({
        courseId: "",

        title: "Update Course Title",
        instructor: "",
        schedule: "e.g., Mon-Wed-Fri, 6-8 PM",
        location: "e.g., Online / Dhaka / Chittagong",
        startDate: new Date(),

        duration: "",
        totalSeats: 0,

        thumbnailUrl: "",
        thumbnailFile: null,

        status: "upcoming",

        price: 0,
        originalPrice: 0,

        discountStarts: null,
        discountEnds: null,

        tagline: "Write a catchy tagline for the course",
        description:
            "Write a detailed description of the course, covering what students will learn, prerequisites, and any other important information.",

        includes: [],
        modules: [],
    });

    // ── Save (CREATE API later) ─────────────────────────────
    const [createCourse, { isError, isLoading, error }] =
        useCreateCourseMutation();

    const validateCourse = () => {
        if (!course.title) return "Title is required";
        if (!course.instructor) return "Instructor name is required";
        if (!course.schedule) return "Schedule is required";
        if (!course.location) return "Location is required";
        if (!course.duration) return "Duration is required";
        if (!course.totalSeats || course.totalSeats <= 0)
            return "Total seats must be greater than 0";
        if (!course.tagline) return "Tagline is required";
        if (!course.description) return "Description is required";

        return null;
    };

    const handleSave = async () => {

        setLocalError(null);
        const validationError = validateCourse();

        if (validationError) {
            setLocalError(validationError);
            return toast.error(validationError);
        }

        const formData = new FormData();

        if (course.thumbnailFile) {
            formData.append("thumbnailFile", course.thumbnailFile);
        }

        formData.append(
            "courseData",
            JSON.stringify({
                title: course.title,
                instructor: course.instructor,
                schedule: course.schedule,
                location: course.location,
                startDate: course.startDate,
                duration: course.duration,
                totalSeats: course.totalSeats,
                tagline: course.tagline,
                description: course.description,
                status: course.status,
                price: course.price,
                originalPrice: course.originalPrice,
                discountStarts: course.discountStarts,
                discountEnds: course.discountEnds,
                includes: course.includes,
                modules: course.modules,
            })
        );

        try {
            await createCourse(formData).unwrap();
            setSaved(true);
            toast.success("Course created successfully!");
            // setTimeout(() => {
            //     router.replace("/admin/courses");
            // }, 1500);
        } catch (err) {
            console.error("Create course error:", err);
            toast.error("Failed to create course.");
        } finally {
            setTimeout(() => {
                setSaved(false);
            }, 2000);
        }
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
                    className={`flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-bold text-white cursor-pointer ${saved ? "bg-[#16a34a]" : "bg-[#1a56db] hover:bg-[#1346c4]"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            {saved ? "Created!" : "Create Course"}
                        </>
                    )}
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

            {(error || localError) && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 p-4">
                    <CircleAlert strokeWidth={2.5} className="size-4.5 text-red-500" />
                    <p className="text-sm text-red-700">
                        {localError || NormalizeError(error).message}
                    </p>
                </div>
            )}

            {/* Layout */}
            <motion.div variants={fadeUp} className="space-y-4">
                {/* Tabs */}
                <div className="flex flex-wrap gap-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() =>
                                router.replace(`?tab=${tab.id}`, { scroll: false })
                            }
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
                        thumbnailUrl={course.thumbnailUrl}
                        thumbnailFile={course.thumbnailFile}
                        tagline={course.tagline}
                        description={course.description}
                        onChange={(field, value) =>
                            setCourse((prev) => ({ ...prev, [field]: value }))
                        }
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
                        onChange={(modules) => setCourse((p) => ({ ...p, modules }))}
                        onSessionChange={(session) => {
                            // TODO: PATCH /admin/enrollments/:id { currentSession: session }
                            console.log("Current session:", session);
                        }}
                    />
                )}

                {activeTab === "batch" && (
                    <BatchInfoTab
                        instructor={course.instructor}
                        status={course.status}
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
        </motion.div>
    );
}
