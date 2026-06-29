// app/admin/payments/components/PaymentsTable.tsx
"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { AdminPurchase } from "@/redux/features/purchases/admin-purchases.api";

const METHOD_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
    bkash: { label: "bKash", bg: "#FDF2F8", color: "#E2136E", border: "#FBCFE8" },
    nagad: { label: "Nagad", bg: "#FFF8F0", color: "#F7941D", border: "#FDE68A" },
    rocket: { label: "Rocket", bg: "#F5F3FF", color: "#8B5CF6", border: "#DDD6FE" },
    bank_transfer: { label: "Bank", bg: "#EFF6FF", color: "#1E40AF", border: "#BFDBFE" },
    cash: { label: "Cash", bg: "#F0FDF4", color: "#059669", border: "#BBF7D0" },
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: "Pending", bg: "#FEF3C7", color: "#D97706" },
    verified: { label: "Verified", bg: "#DCFCE7", color: "#16A34A" },
    rejected: { label: "Rejected", bg: "#FEE2E2", color: "#EF4444" },
};

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function TableRow({
    purchase, onVerify, onReject,
}: {
    purchase: AdminPurchase;
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const m = METHOD_CONFIG[purchase.method] || { label: purchase.method, bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
    const status = STATUS_CONFIG[purchase.paymentStatus] || { label: purchase.paymentStatus, bg: "#f3f4f6", color: "#6b7280" };

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Student */}
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

            {/* Course */}
            <td className="hidden px-4 py-3 lg:table-cell">
                <p className="truncate text-[12px] text-[#6b7280]">{purchase.courseTitle}</p>
            </td>

            {/* Method + TrxID */}
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

            {/* Amount */}
            <td className="hidden px-4 py-3 text-right sm:table-cell">
                <p className="text-[13px] font-bold text-[#0d1b3e]">&৳{purchase.amount.toLocaleString()}</p>
                <p className="text-[11px] text-[#9ca3af]">{new Date(purchase.paidAt).toLocaleDateString()}</p>
            </td>

            {/* Status */}
            <td className="px-4 py-3">
                <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ background: status.bg, color: status.color }}
                >
                    {status.label}
                </span>
            </td>

            {/* Actions */}
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

export default function PaymentsTable({
    data, isLoading, onVerify, onReject,
}: {
    data: AdminPurchase[];
    isLoading?: boolean;
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white py-16">
                <Loader2 className="h-6 w-6 animate-spin text-[#1a56db]" />
                <span className="ml-2 text-sm text-[#6b7280]">Loading payments...</span>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white py-16 text-center">
                <p className="text-[14px] font-semibold text-[#6b7280]">No payments found</p>
                <p className="mt-1 text-[12px] text-[#9ca3af]">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    {/* Head */}
                    <thead>
                        <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                            {[
                                { label: "Student",       cls: ""                          },
                                { label: "Course",        cls: "hidden lg:table-cell"      },
                                { label: "Method / TrxID",cls: "hidden md:table-cell"      },
                                { label: "Amount",        cls: "hidden text-right sm:table-cell" },
                                { label: "Status",        cls: ""                          },
                                { label: "Actions",       cls: ""                          },
                            ].map((h) => (
                                <th
                                    key={h.label}
                                    className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}
                                >
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                        {data.map((e) => (
                            <TableRow
                                key={e.id}
                                purchase={e}
                                onVerify={onVerify}
                                onReject={onReject}
                            />
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}
