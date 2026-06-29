"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { METHOD_CONFIG, ENROLLMENT_STATUS_CONFIG } from "@/constants/course.constants";
import type { EnrolledStudent } from "@/types/admin-course-details";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function TableRow({
    student,
    onVerify,
    onRejectClick,
    verifyingPaymentId,
    rejectingPaymentId,
}: {
    student: EnrolledStudent;
    onVerify: (id: string) => void;
    onRejectClick: (student: EnrolledStudent) => void;
    verifyingPaymentId: string | null;
    rejectingPaymentId: string | null;
}) {
    const m = METHOD_CONFIG[student.payment?.method ?? "cash"];
    const status = ENROLLMENT_STATUS_CONFIG[student.enrollment.status];
    const isVerifying = verifyingPaymentId === student.payment?.paymentId;
    const isRejecting = rejectingPaymentId === student.payment?.paymentId;

    return (
        <motion.tr variants={fadeUp} className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#0c1116] text-[11px] font-bold text-white">
                        {getInitials(student.user.name)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-[#0d1b3e]">{student.user.name}</p>
                        <p className="truncate text-[11px] text-[#6b7280]">{student.user.email}</p>
                    </div>
                </div>
            </td>
            <td className="hidden px-4 py-3 md:table-cell">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>{m.label}</span>
                    {student.payment?.trxId ? (
                        <span className="rounded-md bg-[#f3f4f6] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#374151]">{student.payment.trxId}</span>
                    ) : (
                        <span className="text-[11px] text-[#9ca3af]">—</span>
                    )}
                </div>
            </td>
            <td className="hidden px-4 py-3 sm:table-cell">
                <p className="text-[13px] font-bold text-[#0d1b3e]">৳{student.payment?.amount?.toLocaleString() ?? 0}</p>
                <p className="text-[11px] text-[#9ca3af]">{student.payment?.paidAt ? new Date(student.payment.paidAt).toLocaleDateString() : "—"}</p>
            </td>
            <td className="px-4 py-3">
                <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: status.bg, color: status.color }}>{status.label}</span>
            </td>
            <td className="px-4 py-3">
                {student.enrollment.status === "pending" ? (
                    <div className="flex items-center gap-1.5">
                        <button disabled={isVerifying || isRejecting || !student.payment} onClick={() => student.payment && onVerify(student.payment.paymentId)} className="flex items-center gap-1 rounded-sm bg-[#dcfce7] px-2.5 py-1.5 text-[11px] font-bold text-[#16a34a] transition hover:bg-[#bbf7d0] disabled:cursor-not-allowed disabled:opacity-60">
                            {isVerifying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
                            <span className="hidden sm:block">{isVerifying ? "Verifying..." : "Verify"}</span>
                        </button>
                        <button disabled={isVerifying || isRejecting || !student.payment} onClick={() => onRejectClick(student)} className="flex items-center gap-1 rounded-sm bg-[#fee2e2] px-2.5 py-1.5 text-[11px] font-bold text-[#ef4444] transition hover:bg-[#fecaca] disabled:cursor-not-allowed disabled:opacity-60">
                            {isRejecting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                            <span className="hidden sm:block">{isRejecting ? "Rejecting..." : "Reject"}</span>
                        </button>
                    </div>
                ) : <span className="text-[11px] text-[#d1d5db]">—</span>}
            </td>
        </motion.tr>
    );
}