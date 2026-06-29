// app/admin/courses/[courseId]/components/AdminCourseDetailPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, CircleAlert, Loader2, RefreshCw, Save } from "lucide-react";

import { useFormDirty } from "@/hooks/useFormDirty";

import AboutTab from "@/components/courses/tabs/AboutTab";
import IncludedTab from "@/components/courses/tabs/IncludedTab";
import CurriculumTab from "@/components/courses/tabs/CurriculumTab";
import BatchInfoTab from "@/components/courses/tabs/BatchInfoTab";
import StudentsTab from "@/components/courses/tabs/StudentsTab";
import PricingTab from "@/components/courses/tabs/PricingTab";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CourseHero from "@/components/courses/CourseHero";

import type { CourseDetails } from "@/types/admin-course-details";
import {
    useGetAdminCourseQuery,
    useRejectPaymentMutation,
    useUpdateCourseMutation,
    useVerifyPaymentMutation,
} from "@/redux/features/courses/courses.api";
import { NormalizeError } from "@/redux/api/apiError";

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS = [
    { id: "about", label: "About" },
    { id: "curriculum", label: "Curriculum" },
    { id: "students", label: "Students" },
    { id: "batch", label: "Batch Info" },
    { id: "included", label: "Included" },
    { id: "pricing", label: "Pricing & Offer" },
] as const;

export default function AdminCourseDetailPage({
    courseId,
}: {
    courseId: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "about";

    const {
        data: courseData,
        isLoading,
        isError,
        error,
    } = useGetAdminCourseQuery(courseId);

    const [updateCourse, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
        useUpdateCourseMutation();

    const [verifyPayment] = useVerifyPaymentMutation();
    const [rejectPayment] = useRejectPaymentMutation();

    const [verifyingPaymentId, setVerifyingPaymentId] = useState<string | null>(null);
    const [rejectingPaymentId, setRejectingPaymentId] = useState<string | null>(null);

    const [course, setCourse] = useState<CourseDetails | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (courseData) setCourse(courseData);
    }, [courseData]);

    const { isDirty, getChangedValues, resetBaseline } = useFormDirty(course, {
        ignore: ["courseId"],
    });

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <span className="text-sm text-gray-500">Loading course details...</span>
            </div>
        );
    }

    if (!courseData || !course) {
        return (
            <div className="flex h-96 items-center justify-center">
                <span className="text-sm text-gray-500">Course not found.</span>
            </div>
        );
    }

    const handleChange = (field: string, value: string) => {
        setCourse((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const handleSave = async () => {
        const toastId = toast.loading("Saving changes...");
        try {
            const changedValues = getChangedValues();
            const formData = new FormData();

            if (course.thumbnailFile) {
                formData.append("thumbnailFile", course.thumbnailFile);
            }
            formData.append("courseData", JSON.stringify(changedValues));

            await updateCourse({ courseId, formData }).unwrap();

            resetBaseline(course);
            setSaved(true);
            toast.success("Changes saved successfully.", { id: toastId });
        } catch (err) {
            const message = NormalizeError(err).message || "Failed to save changes.";
            toast.error(message, { id: toastId });
        }
    };

    const handleVerify = async (paymentId: string) => {
        setVerifyingPaymentId(paymentId);
        const toastId = toast.loading("Verifying payment...");
        try {
            await verifyPayment({ courseId, paymentId }).unwrap();
            toast.success("Payment verified successfully.", { id: toastId });
        } catch (err) {
            const message = NormalizeError(err).message || "Failed to verify payment.";
            toast.error(message, { id: toastId });
        } finally {
            setVerifyingPaymentId(null);
        }
    };

    const handleReject = async (paymentId: string, reason: string) => {
        setRejectingPaymentId(paymentId);
        const toastId = toast.loading("Rejecting payment...");
        try {
            await rejectPayment({ courseId, paymentId, reason }).unwrap();
            toast.success("Payment rejected.", { id: toastId });
        } catch (err) {
            const message = NormalizeError(err).message || "Failed to reject payment.";
            toast.error(message, { id: toastId });
        } finally {
            setRejectingPaymentId(null);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-4 sm:p-6"
        >
            {/* Top bar */}
            <motion.div variants={fadeUp} className="flex items-center justify-between">
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
                            className={`flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-bold text-white transition-all cursor-pointer ${saved ? "bg-[#16a34a]" : "bg-[#1a56db] hover:bg-[#1346c4]"
                                }`}
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    {saved ? "Saved!" : "Save Changes"}
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => {
                                if (!courseData) return;
                                setCourse(courseData);
                                resetBaseline(courseData);
                            }}
                            className="flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-bold text-white transition-all cursor-pointer bg-[#6b7280] hover:bg-[#5b626a]"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Reset Baseline
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Course load / update error banner */}
            {(isError || isUpdateError) && (
                <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-1.5 rounded-md bg-red-50 p-4"
                >
                    <CircleAlert strokeWidth={2.5} className="h-5 w-5 text-red-600" />
                    <p className="text-sm font-medium text-red-800">
                        {NormalizeError(updateError || error).message ||
                            "Failed to load course details. Please try again later."}
                    </p>
                </motion.div>
            )}

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
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                            title={course.title}
                            tagline={course.tagline}
                            description={course.description}
                            onChange={handleChange}
                            onThumbnailChange={(file) => {
                                setCourse({
                                    ...course,
                                    thumbnailFile: file,
                                    ...(file === null && { thumbnailUrl: "" }),
                                });
                            }}
                        />
                    )}
                    {activeTab === "curriculum" && (
                        <CurriculumTab
                            modules={course.modules}
                            onChange={(modules) => setCourse({ ...course, modules })}
                        />
                    )}
                    {activeTab === "students" && (
                        <StudentsTab
                            students={course.students}
                            onVerify={handleVerify}
                            onReject={handleReject}
                            verifyingPaymentId={verifyingPaymentId}
                            rejectingPaymentId={rejectingPaymentId}
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
                                setCourse({ ...course, [field]: value })
                            }
                        />
                    )}
                    {activeTab === "included" && (
                        <IncludedTab
                            includes={course.includes}
                            onChange={(items) => setCourse({ ...course, includes: items })}
                        />
                    )}
                    {activeTab === "pricing" && (
                        <PricingTab
                            price={course.price}
                            originalPrice={course.originalPrice}
                            discountStarts={course.discountStarts}
                            discountEnds={course.discountEnds}
                            onChange={(field, value) =>
                                setCourse({ ...course, [field]: value })
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