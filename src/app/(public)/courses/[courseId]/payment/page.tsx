"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Check,
    Copy,
    Loader2,
    ShieldCheck,
    CreditCard,
    Banknote,
    Building2,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { useGetPublicCourseDetailsQuery } from "@/redux/features/courses/courses.api";
import { useCreatePurchaseMutation } from "@/redux/features/purchases/purchases.api";
import { useAppSelector } from "@/redux/hooks";
import { fadeUp, stagger } from "@/components/animations";

import { type PaymentMethod, METHODS, stepV, makeRef, SENDER_REF } from "@/components/payment/types";

// ─── Payment Method Card ────────────────────────────────────────────────────
function PaymentMethodCard({
    method,
    selected,
    onSelect,
}: {
    method: (typeof METHODS)[number];
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            className={`flex w-full items-center gap-4 rounded-sm border-2 px-4 py-3.5 text-left transition-all duration-150 cursor-pointer ${
                selected
                    ? "border-[#1a56db] bg-[#eef3ff]"
                    : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
            }`}
        >
            <div className="shrink-0">{method.icon}</div>
            <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#0d1b3e]">{method.name}</p>
                <p className="mt-0.5 text-xs text-[#6b7280]">{method.description}</p>
            </div>
            <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selected ? "border-[#1a56db] bg-[#1a56db]" : "border-[#d1d5db]"
                }`}
            >
                {selected && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
        </button>
    );
}

// ─── Mobile Banking Details ─────────────────────────────────────────────────
function MobileBankingDetails({
    method,
    price,
}: {
    method: (typeof METHODS)[number] & { number: string };
    price: number;
}) {
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const ref = makeRef(SENDER_REF);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    return (
        <motion.div key="mobile-details" variants={stepV} initial="hidden" animate="visible" exit="exit" className="space-y-4">
            <div className="rounded-lg border p-4" style={{ background: method.bg, borderColor: method.border }}>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: method.color }}>
                    Send Money To
                </p>
                <p className="mb-3 text-[13px] text-[#374151]">
                    Send <span className="font-bold text-[#0d1b3e]">৳{price.toLocaleString()}</span> to:
                </p>

                {/* Number copy */}
                <div className="mb-3 flex items-center justify-between rounded-sm bg-white px-3.5 py-2.5">
                    <div>
                        <p className="text-[11px] text-[#9ca3af]">{method.name} Number</p>
                        <p className="text-base font-bold text-[#0d1b3e]">{method.number}</p>
                        {"accountType" in method && method.accountType && (
                            <p className="text-[10px] text-[#9ca3af]">({method.accountType})</p>
                        )}
                    </div>
                    <button
                        onClick={() => handleCopy(method.number)}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer"
                        style={{
                            background: copiedText === method.number ? "#dcfce7" : method.bg,
                            color: copiedText === method.number ? "#16a34a" : method.color,
                        }}
                    >
                        {copiedText === method.number ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedText === method.number ? "Copied!" : "Copy"}
                    </button>
                </div>

                {/* Reference note */}
                <div className="rounded-sm border border-dashed px-3.5 py-2.5" style={{ borderColor: method.border }}>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: method.color }}>
                        Reference / Note
                    </p>
                    <p className="mb-2 text-[12px] text-[#6b7280]">
                        Add this as reference so we can identify your payment:
                    </p>
                    <div className="flex items-center justify-between rounded-sm bg-white px-3 py-2">
                        <span className="font-mono text-[13px] font-bold text-[#0d1b3e]">{ref}</span>
                        <button
                            onClick={() => handleCopy(ref)}
                            className="flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer"
                            style={{ color: copiedText === ref ? "#16a34a" : method.color }}
                        >
                            {copiedText === ref ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copiedText === ref ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Bank Transfer Details ───────────────────────────────────────────────────
function BankTransferDetails({
    method,
    price,
}: {
    method: (typeof METHODS)[number] & { bankDetails: { bankName: string; accountName: string; accountNumber: string; branch: string; routingNumber: string } };
    price: number;
}) {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const bank = method.bankDetails;

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const fields = [
        { label: "Bank Name", value: bank.bankName },
        { label: "Account Name", value: bank.accountName },
        { label: "Account Number", value: bank.accountNumber },
        { label: "Branch", value: bank.branch },
        ...(bank.routingNumber ? [{ label: "Routing Number", value: bank.routingNumber }] : []),
    ];

    return (
        <motion.div key="bank-details" variants={stepV} initial="hidden" animate="visible" exit="exit" className="space-y-4">
            <div className="rounded-lg border p-4" style={{ background: method.bg, borderColor: method.border }}>
                <p className="mb-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: method.color }}>
                    Bank Transfer Details
                </p>
                <p className="mb-3 text-[13px] text-[#374151]">
                    Transfer <span className="font-bold text-[#0d1b3e]">৳{price.toLocaleString()}</span> to the account below:
                </p>

                <div className="space-y-2">
                    {fields.map((field) => (
                        <div key={field.label} className="flex items-center justify-between rounded-sm bg-white px-3.5 py-2.5">
                            <div>
                                <p className="text-[11px] text-[#9ca3af]">{field.label}</p>
                                <p className="text-sm font-bold text-[#0d1b3e]">{field.value}</p>
                            </div>
                            <button
                                onClick={() => handleCopy(field.value, field.label)}
                                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer"
                                style={{
                                    background: copiedField === field.label ? "#dcfce7" : method.bg,
                                    color: copiedField === field.label ? "#16a34a" : method.color,
                                }}
                            >
                                {copiedField === field.label ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                {copiedField === field.label ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Cash Details ────────────────────────────────────────────────────────────
function CashDetails() {
    return (
        <motion.div key="cash-details" variants={stepV} initial="hidden" animate="visible" exit="exit">
            <div className="rounded-lg border p-5 text-center" style={{ background: "#F0FDF4", borderColor: "#BBF7D0" }}>
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#059669]">
                    <Banknote className="h-7 w-7 text-white" />
                </div>
                <p className="text-sm font-bold text-[#0d1b3e]">Pay in Person</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6b7280]">
                    Visit the academy on your first day and complete your payment at the reception.
                    No transaction ID needed — just submit the request and we&apos;ll confirm your seat.
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main Payment Page ──────────────────────────────────────────────────────
export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const user = useAppSelector((state) => state.auth.user);

    const [selected, setSelected] = useState<PaymentMethod>(null);
    const [step, setStep] = useState<"select" | "details" | "processing" | "success">("select");
    const [trxId, setTrxId] = useState("");
    const [trxError, setTrxError] = useState("");

    const { data: course, isLoading, isError } = useGetPublicCourseDetailsQuery(courseId);
    const [createPurchase, { isLoading: isSubmitting }] = useCreatePurchaseMutation();

    const selectedMethod = METHODS.find((m) => m.id === selected);
    const requiresTrxId = selected !== null && selected !== "cash";

    const handleContinue = () => {
        if (!selected) return;
        setStep("details");
    };

    const handleSubmit = useCallback(async () => {
        if (!selected) return;

        // Validate trxId
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
        setStep("processing");

        try {
            await createPurchase({
                courseId,
                method: selected,
                ...(selected !== "cash" ? { trxId: trxId.trim() } : {}),
            }).unwrap();

            setStep("success");
            toast.success("Purchase request submitted!");
        } catch (err: any) {
            setStep("details");
            const message = err?.data?.message || "Something went wrong. Please try again.";
            setTrxError(message);
            toast.error(message);
        }
    }, [selected, trxId, requiresTrxId, courseId, createPurchase]);

    // ── Loading ─────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f9fafb] pt-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#1a56db]" />
            </div>
        );
    }

    // ── Error ───────────────────────────────────────────────────────────────
    if (isError || !course) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 pt-20 text-center">
                <AlertCircle className="h-12 w-12 text-[#ef4444]" />
                <p className="text-lg font-bold text-[#0d1b3e]">Failed to load course</p>
                <button
                    onClick={() => router.push("/courses")}
                    className="mt-2 rounded-sm bg-[#1a56db] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1346c4]"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    // ── Already enrolled ────────────────────────────────────────────────────
    if (course.isEnrolled) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 pt-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7]">
                    <Check className="h-8 w-8 text-[#16a34a]" />
                </div>
                <p className="text-lg font-bold text-[#0d1b3e]">Already Enrolled!</p>
                <p className="text-sm text-[#6b7280]">You have already purchased this course.</p>
                <button
                    onClick={() => router.push("/student/my-courses")}
                    className="mt-2 rounded-sm bg-[#1a56db] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1346c4]"
                >
                    Go to My Courses
                </button>
            </div>
        );
    }

    // ── Success ─────────────────────────────────────────────────────────────
    if (step === "success") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 pt-20 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dcfce7]"
                >
                    <Check className="h-10 w-10 text-[#16a34a]" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-xl font-bold text-[#0d1b3e]">Booking Submitted!</p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6b7280]">
                        Your booking is under review. We&apos;ll confirm your seat within 24 hours.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            onClick={() => router.push("/student/my-courses")}
                            className="rounded-sm bg-[#1a56db] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1346c4] cursor-pointer"
                        >
                            Go to My Courses
                        </button>
                        <button
                            onClick={() => router.push("/courses")}
                            className="rounded-sm border border-[#d1d5db] px-6 py-2.5 text-sm font-bold text-[#374151] hover:bg-[#f3f4f6] cursor-pointer"
                        >
                            Browse More Courses
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] pb-12 pt-20">
            <motion.main
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="mx-auto max-w-5xl px-4"
            >
                {/* Back button */}
                <motion.button
                    variants={fadeUp}
                    onClick={() => router.push(`/courses/${courseId}`)}
                    className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#6b7280] transition-colors hover:text-[#1a56db]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Course
                </motion.button>

                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    {/* ── LEFT — Payment Flow ──────────────────────────────── */}
                    <motion.div variants={fadeUp} className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#0d1b3e]">Complete Your Booking</h1>
                            <p className="mt-1 text-sm text-[#6b7280]">Choose a payment method to secure your seat</p>
                        </div>

                        {/* Step 1: Select Method */}
                        {step === "select" && (
                            <motion.div key="select" variants={stepV} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                                {/* Amount summary */}
                                <div className="flex items-center justify-between rounded-xl bg-[#f8faff] px-4 py-3">
                                    <span className="text-sm text-[#6b7280]">Total Amount</span>
                                    <span className="text-lg font-bold text-[#0d1b3e]">৳{course.price.toLocaleString()}</span>
                                </div>

                                <p className="text-sm font-semibold text-[#374151]">Select Payment Method</p>

                                <div className="space-y-2.5">
                                    {METHODS.map((m) => (
                                        <PaymentMethodCard
                                            key={m.id}
                                            method={m}
                                            selected={selected === m.id}
                                            onSelect={() => setSelected(m.id)}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[#16a34a]" />
                                    Your booking is safe and verified by our team.
                                </div>

                                <button
                                    onClick={handleContinue}
                                    disabled={!selected}
                                    className={`flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-[15px] font-bold text-white transition-all cursor-pointer ${
                                        selected
                                            ? "bg-[#1a56db] hover:bg-[#1346c4]"
                                            : "cursor-not-allowed bg-[#e5e7eb] text-[#9ca3af]"
                                    }`}
                                >
                                    Continue
                                    {selected && <CreditCard className="h-5 w-5" />}
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2: Payment Details */}
                        {step === "details" && selectedMethod && (
                            <motion.div key="details" variants={stepV} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                                <AnimatePresence mode="wait">
                                    {("number" in selectedMethod && selectedMethod.number) ? (
                                        <MobileBankingDetails
                                            method={selectedMethod as (typeof METHODS)[number] & { number: string }}
                                            price={course.price}
                                        />
                                    ) : "bankDetails" in selectedMethod ? (
                                        <BankTransferDetails
                                            method={selectedMethod as (typeof METHODS)[number] & { bankDetails: any }}
                                            price={course.price}
                                        />
                                    ) : (
                                        <CashDetails />
                                    )}
                                </AnimatePresence>

                                {/* Transaction ID input (not for cash) */}
                                {requiresTrxId && (
                                    <div>
                                        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#6b7280]">
                                            {selected === "bank_transfer" ? "Enter Reference / Transaction ID" : "Enter Transaction ID"}
                                        </p>
                                        <p className="mb-3 text-[13px] text-[#6b7280]">
                                            After sending money, paste the Transaction ID you received.
                                        </p>
                                        <input
                                            type="text"
                                            value={trxId}
                                            onChange={(e) => { setTrxId(e.target.value); setTrxError(""); }}
                                            placeholder="e.g. 8N5A2K9XQ3"
                                            className={`w-full rounded-sm border-2 px-4 py-3 text-[14px] font-semibold text-[#0d1b3e] outline-none transition-colors placeholder:font-normal placeholder:text-[#9ca3af] ${
                                                trxError
                                                    ? "border-[#ef4444] bg-[#fef2f2]"
                                                    : "border-[#e5e7eb] bg-[#f9fafb] focus:border-[#1a56db] focus:bg-white"
                                            }`}
                                        />
                                        {trxError && <p className="mt-1.5 text-[12px] font-medium text-[#ef4444]">{trxError}</p>}
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => { setStep("select"); setTrxId(""); setTrxError(""); }}
                                        className="flex items-center justify-center gap-1.5 rounded-md border border-[#d1d5db] px-5 py-3 text-sm font-bold text-[#374151] transition-colors hover:bg-[#f3f4f6] cursor-pointer"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#059669] py-3 text-sm font-bold text-white transition-colors hover:bg-[#047857] disabled:opacity-60 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Check className="h-4 w-4" />
                                        )}
                                        {selected === "cash" ? "Submit Booking" : "Submit Payment"}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Processing */}
                        {step === "processing" && (
                            <motion.div
                                key="processing"
                                variants={stepV}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col items-center py-16 text-center"
                            >
                                <Loader2 className="h-12 w-12 animate-spin text-[#1a56db]" />
                                <p className="mt-4 font-bold text-[#0d1b3e]">Processing your booking…</p>
                                <p className="mt-1 text-sm text-[#6b7280]">Please wait, do not close this page.</p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* ── RIGHT — Sticky Summary ─────────────────────────────── */}
                    <motion.div variants={fadeUp} className="order-1 lg:order-2">
                        <div className="sticky top-24 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
                            {/* Course thumbnail */}
                            <div className="relative h-40 w-full bg-[#eff6ff]">
                                <img
                                    src={course.thumbnailUrl?.startsWith("http") ? course.thumbnailUrl : `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnailUrl}`}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="p-5">
                                <h3 className="text-sm font-bold text-[#0d1b3e] line-clamp-2">{course.title}</h3>
                                <p className="mt-1 text-xs text-[#6b7280]">{course.instructor}</p>

                                <div className="my-3 h-px bg-[#f3f4f6]" />

                                {/* Price breakdown */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-[#6b7280]">
                                        <span>Course Fee</span>
                                        <span>৳{course.originalPrice.toLocaleString()}</span>
                                    </div>
                                    {course.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({course.discount}%)</span>
                                            <span>-৳{(course.originalPrice - course.price).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="h-px bg-[#f3f4f6]" />
                                    <div className="flex justify-between text-base font-bold text-[#0d1b3e]">
                                        <span>Total</span>
                                        <span>৳{course.price.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Selected method indicator */}
                                {selectedMethod && step !== "select" && (
                                    <>
                                        <div className="my-3 h-px bg-[#f3f4f6]" />
                                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                                            <Building2 className="h-3.5 w-3.5" />
                                            Payment via: <span className="font-semibold text-[#0d1b3e]">{selectedMethod.name}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </div>
    );
}
