// app/admin/enrollments/components/EnrollmentsTable.tsx
"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { METHOD_CONFIG, STATUS_CONFIG, type Enrollment } from "../../_data/enrollments";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function TableRow({ enrollment }: { enrollment: Enrollment }) {
    const status = STATUS_CONFIG[enrollment.status];
    const method = METHOD_CONFIG[enrollment.method];

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Student */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-[11px] font-bold text-white">
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

            {/* Method */}
            <td className="hidden px-4 py-3 md:table-cell">
                <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: method.bg, color: method.color, border: `1px solid ${method.border}` }}
                >
                    {method.label}
                </span>
            </td>

            {/* Date */}
            <td className="hidden px-4 py-3 text-[12px] text-[#9ca3af] sm:table-cell">
                {enrollment.date}
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
        </motion.tr>
    );
}

export default function EnrollmentsTable({ data }: { data: Enrollment[] }) {
    if (data.length === 0) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white py-16 text-center">
                <p className="text-[14px] font-semibold text-[#6b7280]">No enrollments found</p>
                <p className="mt-1 text-[12px] text-[#9ca3af]">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                            {[
                                { label: "Student", cls: ""                     },
                                { label: "Course",  cls: "hidden lg:table-cell" },
                                { label: "Method",  cls: "hidden md:table-cell" },
                                { label: "Date",    cls: "hidden sm:table-cell" },
                                { label: "Status",  cls: ""                     },
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
                    <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                        {data.map((e) => <TableRow key={e.id} enrollment={e} />)}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}