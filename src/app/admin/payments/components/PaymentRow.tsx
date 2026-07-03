// app/admin/payments/components/PaymentRow.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";
import { CheckCircle, Smartphone, XCircle } from "lucide-react";
import type { AdminPurchase } from "@/redux/features/purchases/admin-purchases.api";
import { METHOD_CONFIG, PAYMENT_STATUS_CONFIG } from "@/constants/course.constants";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function PaymentRow({
    purchase, onVerify, onReject,
}: {
    purchase: AdminPurchase;
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const m = METHOD_CONFIG[purchase.method as keyof typeof METHOD_CONFIG] || {
        label: purchase.method,
        bg: "#f3f4f6",
        color: "#6b7280",
        border: "#e5e7eb",
        icon: Smartphone,
    };
    
    const status =
        PAYMENT_STATUS_CONFIG[
        purchase.paymentStatus as keyof typeof PAYMENT_STATUS_CONFIG
        ] || {
            label: purchase.paymentStatus,
            bg: "#f3f4f6",
            color: "#6b7280",
        };

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#f59e0b] to-[#ef4444] text-[11px] font-bold text-white">
                        {getInitials(purchase.studentName)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-[#0d1b3e]">{purchase.studentName}</p>
                        <p className="truncate text-[11px] text-[#6b7280]">{purchase.studentEmail}</p>
                    </div>
                </div>
            </td>

            <td className="hidden px-4 py-3 lg:table-cell">
                <p className="truncate text-[12px] text-[#6b7280]">{purchase.courseTitle}</p>
            </td>

            <td className="hidden px-4 py-3 md:table-cell">
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                        style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}
                    >
                        {m.label}
                    </span>
                    {purchase.trxId ? (
                        <span className="rounded-md bg-[#f3f4f6] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#374151]">
                            {purchase.trxId}
                        </span>
                    ) : (
                        <span className="text-[11px] text-[#9ca3af]">&mdash;</span>
                    )}
                </div>
            </td>

            <td className="hidden px-4 py-3 text-right sm:table-cell">
                <p className="text-[13px] font-bold text-[#0d1b3e]">&৳{purchase.amount.toLocaleString()}</p>
                <p className="text-[11px] text-[#9ca3af]">{new Date(purchase.paidAt).toLocaleDateString()}</p>
            </td>

            <td className="px-4 py-3">
                <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ background: status.bg, color: status.color }}
                >
                    {status.label}
                </span>
            </td>

            <td className="px-4 py-3">
                {purchase.paymentStatus === "pending" ? (
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => onVerify(purchase.id)}
                            className="flex items-center gap-1 rounded-lg bg-[#dcfce7] px-2.5 py-1.5 text-[11px] font-bold text-[#16a34a] transition-colors hover:bg-[#bbf7d0]"
                        >
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:block">Verify</span>
                        </button>
                        <button
                            onClick={() => onReject(purchase.id)}
                            className="flex items-center gap-1 rounded-lg bg-[#fee2e2] px-2.5 py-1.5 text-[11px] font-bold text-[#ef4444] transition-colors hover:bg-[#fecaca]"
                        >
                            <XCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:block">Reject</span>
                        </button>
                    </div>
                ) : (
                    <span className="text-[11px] text-[#d1d5db]">&mdash;</span>
                )}
            </td>
        </motion.tr>
    );
}