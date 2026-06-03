// app/admin/courses/[courseId]/components/StudentsTable.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { CheckCircle, XCircle, Search, RotateCcw, ChevronDown } from "lucide-react";
import {
    METHOD_CONFIG, STUDENT_STATUS_CONFIG,
    type EnrolledStudent,
} from "../../app/(admin)/admin/_data/courseDetail";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function TableRow({
    student, onVerify, onReject,
}: {
    student: EnrolledStudent;
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const m = METHOD_CONFIG[student.method];
    const status = STUDENT_STATUS_CONFIG[student.status];

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Student */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-[11px] font-bold text-white">
                        {getInitials(student.name)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-[#0d1b3e]">{student.name}</p>
                        <p className="truncate text-[11px] text-[#6b7280]">{student.email}</p>
                    </div>
                </div>
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
                    {student.trxId ? (
                        <span className="rounded-md bg-[#f3f4f6] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#374151]">
                            {student.trxId}
                        </span>
                    ) : (
                        <span className="text-[11px] text-[#9ca3af]">—</span>
                    )}
                </div>
            </td>

            {/* Amount + date */}
            <td className="hidden px-4 py-3 sm:table-cell">
                <p className="text-[13px] font-bold text-[#0d1b3e]">৳{student.amount.toLocaleString()}</p>
                <p className="text-[11px] text-[#9ca3af]">{student.date}</p>
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
                {student.status === "pending" ? (
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => onVerify(student.id)}
                            className="flex items-center gap-1 rounded-lg bg-[#dcfce7] px-2.5 py-1.5 text-[11px] font-bold text-[#16a34a] transition-colors hover:bg-[#bbf7d0]"
                        >
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:block">Verify</span>
                        </button>
                        <button
                            onClick={() => onReject(student.id)}
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

export default function StudentsTable({
    students, onVerify, onReject,
}: {
    students: EnrolledStudent[];
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const filtered = students.filter((s) => {
        const matchSearch = !search || [s.name, s.email]
            .some((f) => f.toLowerCase().includes(search.toLowerCase()));
        const matchStatus = !status || s.status === status;
        return matchSearch && matchStatus;
    });

    const pending = students.filter((s) => s.status === "pending").length;
    const active = students.filter((s) => s.status === "active").length;
    const completed = students.filter((s) => s.status === "completed").length;
    const hasFilter = search || status;

    return (
        <div className="space-y-4">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[15px] font-bold text-[#0d1b3e]">
                    Enrolled Students
                    <span className="ml-2 text-[12px] font-normal text-[#9ca3af]">
                        {students.length} total
                    </span>
                </h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: `${active} Active`, bg: "#dcfce7", color: "#16a34a" },
                        { label: `${pending} Pending`, bg: "#fff7ed", color: "#ea580c" },
                        { label: `${completed} Done`, bg: "#eef3ff", color: "#1a56db" },
                    ].map((b) => (
                        <span key={b.label} className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                            style={{ background: b.bg, color: b.color }}>{b.label}</span>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search student..."
                        className="w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-8 pr-4 text-[13px] outline-none placeholder:text-[#9ca3af] focus:border-[#1a56db]"
                    />
                </div>
                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-3.5 pr-8 text-[13px] text-[#374151] outline-none focus:border-[#1a56db]"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
                </div>
                {hasFilter && (
                    <button
                        onClick={() => { setSearch(""); setStatus(""); }}
                        className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[12px] font-semibold text-[#6b7280] hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#ef4444]"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                                {[
                                    { label: "Student", cls: "" },
                                    { label: "Method / TrxID", cls: "hidden md:table-cell" },
                                    { label: "Amount", cls: "hidden sm:table-cell" },
                                    { label: "Status", cls: "" },
                                    { label: "Actions", cls: "" },
                                ].map((h) => (
                                    <th key={h.label}
                                        className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}
                                    >
                                        {h.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                            {filtered.length > 0 ? (
                                filtered.map((s) => (
                                    <TableRow
                                        key={s.id}
                                        student={s}
                                        onVerify={onVerify}
                                        onReject={onReject}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-[13px] text-[#9ca3af]">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}