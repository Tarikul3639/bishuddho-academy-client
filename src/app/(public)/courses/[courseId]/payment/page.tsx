"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    ArrowLeft,
    Check,
    Copy,
    Loader2,
    ShieldCheck,
    AlertCircle,
    Banknote,
    Smartphone,
    Building2,
    Wallet,
    BadgeCheck,
    ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { useGetPublicCourseDetailsQuery } from "@/redux/features/courses/courses.api";
import { useCreatePurchaseMutation } from "@/redux/features/purchases/purchases.api";
import { fadeUp, stagger } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TakaSign } from "@/components/icons/TakaSign";

import { type PaymentMethod, METHODS, makeRef, SENDER_REF } from "@/components/payment/types";

/* ═══════════════════════════════════════════════════════════════════════════
   Payment Method Card
   ═══════════════════════════════════════════════════════════════════════════ */
function MethodCard({
    method,
    selected,
    onSelect,
}: {
    method: (typeof METHODS)[number];
    selected: boolean;
    onSelect: () => void;
}) {
    const icons: Record<string, React.ReactNode> = {
        bkash: <Smartphone className="h-5 w-5" />,
        nagad: <Smartphone className="h-5 w-5" />,
        rocket: <Smartphone className="h-5 w-5" />,
        bank_transfer: <Building2 className="h-5 w-5" />,
        cash: <Banknote className="h-5 w-5" />,
    };

    return (
        <button
            onClick={onSelect}
            className={`group relative flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer ${
                selected
                    ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
            }`}
        >
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:text-primary"
                }`}
                style={selected ? { backgroundColor: method.color } : {}}
            >
                {icons[method.id] || <Wallet className="h-5 w-5" />}
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-semibold text-card-foreground">{method.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{method.description}</p>
            </div>

            <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30 bg-transparent"
                }`}
            >
                {selected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
            </div>
        </button>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Copyable Field
   ═══════════════════════════════════════════════════════════════════════════ */
function CopyField({ label, value, color }: { label: string; value: string; color?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3">
            <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>
                <p className="mt-0.5 truncate font-semibold text-card-foreground">{value}</p>
            </div>
            <button
                onClick={handleCopy}
                className={`ml-3 flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    copied
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                }`}
            >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Mobile Banking Instructions
   ═══════════════════════════════════════════════════════════════════════════ */
function MobileBankingInfo({
    method,
    price,
}: {
    method: (typeof METHODS)[number] & { number: string; accountType?: string };
    price: number;
}) {
    const ref = makeRef(SENDER_REF);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
        >
            {/* Amount to pay */}
            <div
                className="rounded-xl border-2 p-5 text-center"
                style={{ borderColor: method.color + "40", backgroundColor: method.color + "08" }}
            >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Amount to Send
                </p>
                <p className="mt-1 text-3xl font-bold" style={{ color: method.color }}>
                    ৳{price.toLocaleString()}
                </p>
            </div>

            {/* Payment number */}
            <div className="space-y-3">
                <p className="text-sm font-semibold text-card-foreground">
                    Send money to this {method.name} number:
                </p>
                <CopyField
                    label={`${method.name} ${method.accountType || "Personal"} Number`}
                    value={method.number}
                    color={method.color}
                />
            </div>

            {/* Reference */}
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                    Reference / Note (when sending)
                </p>
                <div className="mt-2">
                    <CopyField label="Reference Code" value={ref} />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                    Add this reference so we can identify your payment.
                </p>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Bank Transfer Info
   ═══════════════════════════════════════════════════════════════════════════ */
function BankInfo({
    method,
}: {
    method: (typeof METHODS)[number] & { bankDetails: { bankName: string; accountName: string; accountNumber: string; branch: string; routingNumber?: string } };
}) {
    const bank = method.bankDetails;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
        >
            <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-card-foreground">{bank.bankName}</p>
                        <p className="text-xs text-muted-foreground">{bank.branch}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <CopyField label="Account Name" value={bank.accountName} />
                    <CopyField label="Account Number" value={bank.accountNumber} />
                    <CopyField label="Branch" value={bank.branch} />
                    {bank.routingNumber && (
                        <CopyField label="Routing Number" value={bank.routingNumber} />
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Cash Info
   ═══════════════════════════════════════════════════════════════════════════ */
function CashInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-900/50 dark:bg-green-950/20"
        >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
                <Banknote className="h-7 w-7 text-white" />
            </div>
            <p className="font-semibold text-card-foreground">Pay at the Academy</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Visit Bishuddho Academy on your first day and complete your payment at the reception.
                Submit this request and we&apos;ll reserve your seat.
            </p>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main Payment Page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [selected, setSelected] = useState<PaymentMethod>(null);
    const [trxId, setTrxId] = useState("");
    const [trxError, setTrxError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data: course, isLoading, isError } = useGetPublicCourseDetailsQuery(courseId);
    const [createPurchase] = useCreatePurchaseMutation();

    const selectedMethod = METHODS.find((m) => m.id === selected);
    const requiresTrxId = selected !== null && selected !== "cash";

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

    /* ── Loading ─────────────────────────────────────────────────────── */
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background pt-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    /* ── Error ───────────────────────────────────────────────────────── */
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

    /* ── Already enrolled ────────────────────────────────────────────── */
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

    /* ── Success ─────────────────────────────────────────────────────── */
    if (success) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 pt-20 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                >
                    <Check className="h-10 w-10 text-green-600" />
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

    /* ── Main Content ────────────────────────────────────────────────── */
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
                        {/* Course Summary Banner */}
                        <motion.div variants={fadeUp}>
                            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                                    <Image
                                        src={
                                            course.thumbnailUrl?.startsWith("http")
                                                ? course.thumbnailUrl
                                                : `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnailUrl}`
                                        }
                                        alt={course.title}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-semibold text-card-foreground">
                                        {course.title}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {course.instructor}
                                    </p>
                                    <div className="mt-1 flex items-center gap-2">
                                        <div className="flex items-center gap-0.5">
                                            <TakaSign className="h-3.5 w-3.5 text-primary" />
                                            <span className="text-lg font-bold text-primary">
                                                {course.price.toLocaleString()}
                                            </span>
                                        </div>
                                        {course.originalPrice > course.price && (
                                            <span className="text-xs text-muted-foreground line-through">
                                                ৳{course.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

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
                                    <MethodCard
                                        key={m.id}
                                        method={m}
                                        selected={selected === m.id}
                                        onSelect={() => {
                                            setSelected(m.id);
                                            setTrxError("");
                                            setTrxId("");
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Step 2: Payment Details (appears after selection) */}
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
                                                    method={selectedMethod as (typeof METHODS)[number] & { number: string }}
                                                    price={course.price}
                                                />
                                            ) : "bankDetails" in selectedMethod ? (
                                                <BankInfo
                                                    method={selectedMethod as (typeof METHODS)[number] & { bankDetails: any }}
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
                        <div className="sticky top-24 space-y-4">
                            {/* Summary Card */}
                            <div className="rounded-xl border border-border bg-card">
                                <div className="border-b border-border p-5">
                                    <h3 className="font-semibold text-card-foreground">
                                        Order Summary
                                    </h3>
                                </div>

                                <div className="space-y-4 p-5">
                                    {/* Price breakdown */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Course Fee</span>
                                            <span className="text-card-foreground">
                                                ৳{course.originalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                        {course.discount > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-green-600">
                                                    Discount ({course.discount}%)
                                                </span>
                                                <span className="text-green-600">
                                                    -৳
                                                    {(
                                                        course.originalPrice - course.price
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="h-px bg-border" />
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-card-foreground">
                                                Total
                                            </span>
                                            <div className="flex items-center gap-0.5">
                                                <TakaSign className="h-4 w-4 text-primary" />
                                                <span className="text-xl font-bold text-primary">
                                                    {course.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Selected method */}
                                    {selectedMethod && (
                                        <>
                                            <div className="h-px bg-border" />
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Payment via
                                                </span>
                                                <span className="font-medium text-card-foreground">
                                                    {selectedMethod.name}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {/* Course meta */}
                                    <div className="h-px bg-border" />
                                    <div className="space-y-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            {course.bookedSeats}/{course.totalSeats} seats booked
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                            {course.daysLeft} days left at this price
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Help text */}
                            <div className="rounded-xl border border-border bg-muted/50 p-4">
                                <p className="text-xs font-medium text-card-foreground">
                                    Need help?
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    If you face any issues with payment, contact us at the academy
                                    or send a message via the contact page.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </div>
    );
}
