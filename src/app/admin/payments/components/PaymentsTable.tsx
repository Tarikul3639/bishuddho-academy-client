// app/admin/payments/components/PaymentsTable.tsx
"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { CheckCircle, XCircle } from "lucide-react";
import { METHOD_CONFIG, STATUS_CONFIG, type Enrollment } from "../../_data/enrollments";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function TableRow({
    enrollment, onVerify, onReject,
}: {
    enrollment: Enrollment;
    onVerify:   (id: string) => void;
    onReject:   (id: string) => void;
}) {
    const m      = METHOD_CONFIG[enrollment.method];
    const status = STATUS_CONFIG[enrollment.status];

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Student */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#f59e0b] to-[#ef4444] text-[11px] font-bold text-white">
                        {getInitials(enrollment.name)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-[#0d1b3e]">{enrollment.name}</p>
                        <p className="truncate text-[11px] text-[#6b7280]">{enrollment.email}</p>
                    </div>
                </div>
            </td>

            {/* Course */}
            <td className="hidden px-4 py-3 lg:table-cell">
                <p className="truncate text-[12px] text-[#6b7280]">{enrollment.course}</p>
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
                    {enrollment.trxId ? (
                        <span className="rounded-md bg-[#f3f4f6] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#374151]">
                            {enrollment.trxId}
                        </span>
                    ) : (
                        <span className="text-[11px] text-[#9ca3af]">—</span>
                    )}
                </div>
            </td>

            {/* Amount */}
            <td className="hidden px-4 py-3 text-right sm:table-cell">
                <p className="text-[13px] font-bold text-[#0d1b3e]">৳{enrollment.amount.toLocaleString()}</p>
                <p className="text-[11px] text-[#9ca3af]">{enrollment.date}</p>
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
                {enrollment.status === "pending" ? (
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => onVerify(enrollment.id)}
                            className="flex items-center gap-1 rounded-lg bg-[#dcfce7] px-2.5 py-1.5 text-[11px] font-bold text-[#16a34a] transition-colors hover:bg-[#bbf7d0]"
                        >
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:block">Verify</span>
                        </button>
                        <button
                            onClick={() => onReject(enrollment.id)}
                            className="flex items-center gap-1 rounded-lg bg-[#fee2e2] px-2.5 py-1.5 text-[11px] font-bold text-[#ef4444] transition-colors hover:bg-[#fecaca]"
                        >
                            <XCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:block">Reject</span>
                        </button>
                    </div>
                ) : (
                    <span className="text-[11px] text-[#d1d5db]">—</span>
                )}
            </td>
        </motion.tr>
    );
}

export default function PaymentsTable({
    data, onVerify, onReject,
}: {
    data:     Enrollment[];
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
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
                                enrollment={e}
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