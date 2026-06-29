"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  ShieldCheck,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";

import { useGetPublicCourseDetailsQuery } from "@/redux/features/courses/courses.api";
import { useCreatePurchaseMutation } from "@/redux/features/purchases/purchases.api";
import { fadeUp, stagger } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type PaymentMethod, METHODS } from "@/components/payment/types";

import PaymentMethodCard from "./components/PaymentMethodCard";
import MobileBankingInfo from "./components/MobileBankingInfo";
import BankInfo from "./components/BankInfo";
import CashInfo from "./components/CashInfo";
import PaymentSummary from "./components/PaymentSummary";

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

  const {
    data: course,
    isLoading,
    isError,
  } = useGetPublicCourseDetailsQuery(courseId);
  const [createPurchase] = useCreatePurchaseMutation();

  const selectedMethod = METHODS.find((m) => m.id === selected);
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
      const message =
        err?.data?.message || "Something went wrong. Please try again.";
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
        <p className="text-lg font-bold text-card-foreground">
          Failed to load course
        </p>
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
        <p className="text-lg font-bold text-card-foreground">
          Already Enrolled!
        </p>
        <p className="text-sm text-muted-foreground">
          You have already purchased this course.
        </p>
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
          <p className="text-xl font-bold text-card-foreground">
            Booking Submitted!
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Your booking is under review. We&apos;ll confirm your seat within 24
            hours.
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
    <div className="min-h-screen bg-background pb-16 pt-20">
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
            className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </button>
        </motion.div>

        {/* Page Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Complete Your Booking
          </h1>
          <p className="mt-2 text-muted-foreground">
            Choose a payment method to secure your seat in this course.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* ── LEFT — Payment Flow ──────────────────────────── */}
          <div className="space-y-8">
            {/* Step 1: Select Payment Method */}
            <motion.div variants={fadeUp}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <h2 className="font-semibold text-card-foreground">
                  Choose Payment Method
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {METHODS.map((m) => (
                  <PaymentMethodCard
                    key={m.id}
                    method={m}
                    selected={selected === m.id}
                    onSelect={() => handleSelectMethod(m.id)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Step 2: Payment Details */}
            <AnimatePresence mode="wait">
              {selectedMethod && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6">
                    {/* Section header */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        2
                      </span>
                      <h2 className="font-semibold text-card-foreground">
                        Payment Details
                      </h2>
                    </div>

                    {/* Dynamic payment info */}
                    <AnimatePresence mode="wait">
                      {"number" in selectedMethod && selectedMethod.number ? (
                        <MobileBankingInfo
                          method={
                            selectedMethod as (typeof METHODS)[number] & {
                              number: string;
                            }
                          }
                          price={course.price}
                        />
                      ) : "bankDetails" in selectedMethod ? (
                        <BankInfo
                          method={
                            selectedMethod as (typeof METHODS)[number] & {
                              bankDetails: any;
                            }
                          }
                        />
                      ) : (
                        <CashInfo />
                      )}
                    </AnimatePresence>

                    {/* Transaction ID input */}
                    {requiresTrxId && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-card-foreground">
                          {selected === "bank_transfer"
                            ? "Enter Transaction / Reference Number"
                            : "Enter Transaction ID"}
                        </p>
                        <p className="mb-3 text-xs text-muted-foreground">
                          After sending money, paste the Transaction ID you
                          received via SMS.
                        </p>
                        <Input
                          type="text"
                          value={trxId}
                          onChange={(e) => {
                            setTrxId(e.target.value);
                            setTrxError("");
                          }}
                          placeholder="e.g. 8N5A2K9XQ3"
                          className={`h-11 text-sm ${
                            trxError
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                        />
                        {trxError && (
                          <p className="mt-2 text-xs font-medium text-destructive">
                            {trxError}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full gap-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                      {selected === "cash"
                        ? "Submit Booking Request"
                        : isSubmitting
                          ? "Processing..."
                          : "Confirm & Submit Payment"}
                    </Button>

                    {/* Security note */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                      Your payment is secure and manually verified by our team.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT — Order Summary Sidebar ────────────────── */}
          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <div className="sticky top-24">
              <PaymentSummary
                title={course.title}
                instructor={course.instructor}
                thumbnailUrl={course.thumbnailUrl}
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
