"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShieldCheck, AlertCircle, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

import { useGetPublicCourseDetailsQuery } from "@/redux/features/courses/courses.api";
import { useCreatePurchaseMutation } from "@/redux/features/purchases/purchases.api";
import { fadeUp, stagger } from "@/components/animations";
import { Button } from "@/components/ui/button";

import PaymentSummary from "./components/PaymentSummary";
import CourseHeaderCard from "./components/CourseHeaderCard";
import PaymentSteps from "./components/PaymentSteps";

import type { PaymentMethod } from "./components/types";

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    /* ── State ──────────────────────────────────────────────────────── */
    const [selected, setSelected] = useState<PaymentMethod>(null);
    const [trxId, setTrxId] = useState("");
    const [trxError, setTrxError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data: course, isLoading, isError } = useGetPublicCourseDetailsQuery(courseId);
    const [createPurchase] = useCreatePurchaseMutation();

    const requiresTrxId = selected !== null && selected !== "cash";

    /* ── Handlers ───────────────────────────────────────────────────── */
    const handleSubmit = useCallback(async () => {
        if (!selected) return;

        if (requiresTrxId) {
            if (!trxId.trim()) {
                setTrxError("Please enter your Transaction ID.");
                return;
            }
            if (trxId.trim().length < 6) {
                setTrxError("Transaction ID seems too short.");
                return;
            }
        }

        setTrxError("");
        setIsSubmitting(true);

        try {
            await createPurchase({
                courseId,
                method: selected,
                ...(selected !== "cash" ? { trxId: trxId.trim() } : {}),
            }).unwrap();

            setSuccess(true);
            toast.success("Purchase request submitted!");
        } catch (err: any) {
            const message = err?.data?.message || "Something went wrong. Please try again.";
            setTrxError(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }, [selected, trxId, requiresTrxId, courseId, createPurchase]);

    const handleSelectMethod = (methodId: PaymentMethod) => {
        setSelected(methodId);
        setTrxError("");
        setTrxId("");
    };

    /* ── Loading ────────────────────────────────────────────────────── */
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background pt-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    /* ── Error ──────────────────────────────────────────────────────── */
    if (isError || !course) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 pt-20 text-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-lg font-bold text-card-foreground">Failed to load course</p>
                <Button variant="default" onClick={() => router.push("/courses")}>
                    Back to Courses
                </Button>
            </div>
        );
    }

    /* ── Already enrolled ───────────────────────────────────────────── */
    if (course.isEnrolled) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 pt-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <BadgeCheck className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-bold text-card-foreground">Already Enrolled!</p>
                <p className="text-sm text-muted-foreground">You have already purchased this course.</p>
                <Button onClick={() => router.push("/student/my-courses")}>
                    Go to My Courses
                </Button>
            </div>
        );
    }

    /* ── Success ────────────────────────────────────────────────────── */
    if (success) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 pt-20 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                >
                    <ShieldCheck className="h-10 w-10 text-green-600" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                >
                    <p className="text-xl font-bold text-card-foreground">Booking Submitted!</p>
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Your booking is under review. We&apos;ll confirm your seat within 24 hours.
                    </p>
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
                        <Button onClick={() => router.push("/student/my-courses")}>
                            Go to My Courses
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/courses")}>
                            Browse More Courses
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ── Main Content (composition only) ───────────────────────────── */
    return (
        <div className="min-h-screen bg-background pb-12 pt-20">
            <motion.main
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="mx-auto max-w-6xl px-4"
            >
                {/* Back */}
                <motion.div variants={fadeUp}>
                    <button
                        onClick={() => router.push(`/courses/${courseId}`)}
                        className="mb-5 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Course
                    </button>
                </motion.div>

                {/* Page Header */}
                <motion.div variants={fadeUp} className="mb-6">
                    <h1 className="text-xl font-bold text-foreground md:text-2xl">
                        Complete Your Booking
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Choose a payment method to secure your seat.
                    </p>
                </motion.div>

                {/* ═══ Course Header Card ═══ */}
                <motion.div variants={fadeUp} className="mb-6">
                    <CourseHeaderCard course={course} />
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    {/* ── LEFT — Payment Flow ──────────────────────────── */}
                    <PaymentSteps
                        selected={selected}
                        course={course}
                        trxId={trxId}
                        trxError={trxError}
                        isSubmitting={isSubmitting}
                        requiresTrxId={requiresTrxId}
                        onSelectMethod={handleSelectMethod}
                        setTrxId={setTrxId}
                        setTrxError={setTrxError}
                        handleSubmit={handleSubmit}
                    />

                    {/* ── RIGHT — Order Summary Sidebar ────────────────── */}
                    <motion.div variants={fadeUp} className="order-1 lg:order-2">
                        <div className="sticky top-24">
                            <PaymentSummary
                                price={course.price}
                                originalPrice={course.originalPrice}
                                discount={course.discount}
                                bookedSeats={course.bookedSeats}
                                totalSeats={course.totalSeats}
                                daysLeft={course.daysLeft}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </div>
    );
}
