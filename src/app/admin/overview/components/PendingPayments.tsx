"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { METHOD_CONFIG } from "@/constants/course.constants";

import { fadeUp, stagger } from "@/components/animations";

import { useGetPendingPaymentsQuery } from "@/redux/features/dashboard/dashboard.api";
import { useUpdatePurchaseStatusMutation } from "@/redux/features/purchases/admin-purchases.api";

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function PendingPayments() {
    const { data, isLoading, isError, refetch } = useGetPendingPaymentsQuery();

    const [updateStatus, { isLoading: updating }] = useUpdatePurchaseStatusMutation();

    const [processingId, setProcessingId] = useState<string | null>(null);

    const payments = data?.payments ?? [];

    const handleStatus = async (id: string, status: "verified" | "rejected") => {
        try {
            setProcessingId(id);

            await updateStatus({
                id,
                status,
            }).unwrap();

            toast.success(
                status === "verified"
                    ? "Payment verified successfully."
                    : "Payment rejected successfully."
            );

            refetch();
        } catch {
            toast.error("Failed to update payment status.");
        } finally {
            setProcessingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-[#fecaca] bg-[#fff5f5] p-5 shadow-sm">
                <div className="space-y-3 animate-pulse">
                    <div className="h-5 w-40 rounded-sm bg-gray-200" />

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-xl bg-white p-4">
                            <div className="mb-3 h-4 w-40 rounded-sm bg-gray-200" />
                            <div className="mb-2 h-3 w-28 rounded-sm bg-gray-200" />
                            <div className="h-8 rounded-sm bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-medium text-red-600">
                    Failed to load pending payments.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl border border-[#fecaca] bg-[#fff5f5] p-4 shadow-sm sm:p-5"
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[14px] font-bold text-[#0d1b3e] sm:text-[15px]">
                    Pending Payments
                </h2>

                <span className="shrink-0 rounded-full bg-[#fee2e2] px-2 py-1 text-[10px] font-bold text-[#ef4444] sm:px-2.5 sm:text-[11px]">
                    {payments.length} pending
                </span>
            </div>

            <div className="flex flex-col gap-3">
                {payments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#fecaca] bg-white py-10 text-center">
                        <p className="text-sm text-[#6b7280]">
                            No pending payments.
                        </p>
                    </div>
                ) : (
                    payments.map((payment) => {
                        const method = METHOD_CONFIG[payment.method];

                        return (
                            <motion.div
                                key={payment.paymentId}
                                variants={fadeUp}
                                className="rounded-xl border border-[#e5e7eb] bg-white p-3 sm:p-3.5"
                            >
                                {/* Top */}
                                <div className="mb-3 flex items-center gap-2 sm:gap-3">
                                    {/* Avatar */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#f59e0b] to-[#ef4444] text-[11px] font-bold text-white sm:h-9 sm:w-9 sm:text-[12px]">
                                        {getInitials(payment.studentName)}
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[12px] font-bold text-[#0d1b3e] sm:text-[13px]">
                                            {payment.studentName}
                                        </p>

                                        <p className="truncate text-[10px] text-[#6b7280] sm:text-[11px]">
                                            {payment.courseName}
                                        </p>
                                    </div>

                                    {/* Amount */}
                                    <div className="shrink-0 text-right">
                                        <p className="text-[12px] font-bold text-[#0d1b3e] sm:text-[13px]">
                                            ৳{payment.amount.toLocaleString()}
                                        </p>

                                        <p className="text-[10px] text-[#9ca3af] sm:text-[11px]">
                                            {new Date(payment.paidAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Method */}
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span
                                        className="rounded-lg px-2 py-1 text-[10px] font-bold sm:px-2.5 sm:text-[11px]"
                                        style={{
                                            background: method.bg,
                                            color: method.color,
                                            border: `1px solid ${method.border}`,
                                        }}
                                    >
                                        {method.label}
                                    </span>

                                    {payment.trxId ? (
                                        <span className="break-all rounded-lg bg-[#f3f4f6] px-2 py-1 font-mono text-[10px] font-semibold text-[#374151] sm:px-2.5 sm:text-[11px]">
                                            {payment.trxId}
                                        </span>
                                    ) : (
                                        <span className="text-[10px] text-[#9ca3af] sm:text-[11px]">
                                            Cash — no TrxID
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <button
                                        disabled={updating && processingId === payment.paymentId}
                                        onClick={() =>
                                            handleStatus(payment.paymentId, "verified")
                                        }
                                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#dcfce7] py-2 text-[11px] font-bold text-[#16a34a] transition-colors hover:bg-[#bbf7d0] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[12px]"
                                    >
                                        {processingId === payment.paymentId &&
                                            updating ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <CheckCircle className="h-3.5 w-3.5" />
                                        )}

                                        Verify
                                    </button>

                                    <button
                                        disabled={updating && processingId === payment.paymentId}
                                        onClick={() =>
                                            handleStatus(payment.paymentId, "rejected")
                                        }
                                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#fee2e2] py-2 text-[11px] font-bold text-[#ef4444] transition-colors hover:bg-[#fecaca] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[12px]"
                                    >
                                        {processingId === payment.paymentId &&
                                            updating ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <XCircle className="h-3.5 w-3.5" />
                                        )}

                                        Reject
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}