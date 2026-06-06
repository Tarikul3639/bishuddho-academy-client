"use client";
import { CreditCard, Banknote, Smartphone, Check } from "lucide-react";
import type { StudentCoursePaymentSummary } from "@/types/student-course-details";

function PaymentSummaryCard({
    payment,
}: {
    payment: StudentCoursePaymentSummary;
}) {
    const METHOD_CONFIG = {
        bkash: {
            label: "bKash",
            bg: "#FDF2F8",
            border: "#FBCFE8",
            color: "#E2136E",
            icon: Smartphone,
        },
        nagad: {
            label: "Nagad",
            bg: "#FFF8F0",
            border: "#FED7AA",
            color: "#F7941D",
            icon: Smartphone,
        },
        cash: {
            label: "Cash On",
            bg: "#F0FDF4",
            border: "#BBF7D0",
            color: "#059669",
            icon: Banknote,
        },
    };
    const m = METHOD_CONFIG[payment.method];
    const MethodIcon = m.icon;
    const formattedDate = new Date(payment.paidAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Dhaka",
    });

    return (
        <div
            className="rounded-lg border p-5"
            style={{ background: m.bg, borderColor: m.border }}
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <p
                    className="text-[12px] font-bold uppercase tracking-widest"
                    style={{ color: m.color }}
                >
                    Payment Summary
                </p>
                <span
                    className={`flex gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${payment.status === "verified"
                        ? "bg-[#dcfce7] text-[#16a34a]"
                        : "bg-[#fff7ed] text-[#ea580c]"
                        }`}
                >
                    {payment.status === "verified" ? <>
                        <Check strokeWidth={3} className="h-3.5 w-3.5" />
                        Verified
                    </> : <>
                        ⏳ Pending
                    </>}
                </span>
            </div>
            {/* Amount — big display */}
            <div className="mb-4 flex items-center gap-3">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: m.color }}
                >
                    <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-[11px] text-[#6b7280]">Amount Paid</p>
                    <p className="text-xl font-extrabold text-[#0d1b3e]">
                        ৳{payment.amount.toLocaleString()}
                    </p>
                </div>
            </div>
            {/* Divider */}
            <div className="mb-3 h-px bg-black/5" />
            {/* Rows */}
            <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6b7280]">Method</span>
                    <span
                        className="flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[12px] font-bold"
                        style={{ background: `${m.color}18`, color: m.color }}
                    >
                        <MethodIcon className="h-3 w-3" />
                        {m.label}
                    </span>
                </div>
                {payment.trxId && (
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[#6b7280]">Transaction ID</span>
                        <span className="rounded-sm bg-white/70 px-2.5 py-1 font-mono text-[12px] font-semibold text-[#374151]">
                            {payment.trxId}
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6b7280]">Date</span>
                    <span className="text-[12px] font-medium text-[#374151]">
                        {formattedDate}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PaymentSummaryCard;
