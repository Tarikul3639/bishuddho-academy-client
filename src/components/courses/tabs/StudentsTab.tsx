"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stagger } from "@/components/animations";
import { Search, ChevronDown, RotateCcw } from "lucide-react";
import type { EnrolledStudent } from "@/types/admin-course-details";
import RejectModal from "./RejectModal";
import TableRow from "./TableRow";

export default function StudentsTab({
    students,
    onVerify,
    onReject,
    verifyingPaymentId,
    rejectingPaymentId,
}: {
    students: EnrolledStudent[];
    onVerify: (id: string) => void;
    onReject: (id: string, reason: string) => void;
    verifyingPaymentId: string | null;
    rejectingPaymentId: string | null;
}) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [rejectTarget, setRejectTarget] = useState<EnrolledStudent | null>(null);

    const filtered = students.filter((s) => {
        const matchSearch = !search || [s.user.name, s.user.email].some((f) => f.toLowerCase().includes(search.toLowerCase()));
        const matchStatus = !status || s.enrollment.status === status;
        return matchSearch && matchStatus;
    });

    const pending = students.filter((s) => s.enrollment.status === "pending").length;
    const active = students.filter((s) => s.enrollment.status === "active").length;
    const completed = students.filter((s) => s.enrollment.status === "completed").length;

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {rejectTarget && (
                    <RejectModal
                        student={rejectTarget}
                        isRejecting={rejectingPaymentId === rejectTarget.payment?.paymentId}
                        onConfirm={(reason) => { onReject(rejectTarget.payment!.paymentId, reason); setRejectTarget(null); }}
                        onClose={() => setRejectTarget(null)}
                    />
                )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-2">
                {[{ label: `${students.length} Total`, bg: "#f3f4f6", color: "#374151" }, { label: `${active} Active`, bg: "#dcfce7", color: "#16a34a" }, { label: `${pending} Pending`, bg: "#fff7ed", color: "#ea580c" }, { label: `${completed} Done`, bg: "#eef3ff", color: "#1a56db" }].map((b) => (
                    <span key={b.label} className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: b.bg, color: b.color }}>{b.label}</span>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student..." className="w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-8 pr-4 text-[13px] outline-none placeholder:text-[#9ca3af] focus:border-[#1a56db]" />
                </div>
                <div className="relative">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-3.5 pr-8 text-[13px] text-[#374151] outline-none focus:border-[#1a56db]">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
                </div>
                {(search || status) && (
                    <button onClick={() => { setSearch(""); setStatus(""); }} className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[12px] font-semibold text-[#6b7280] hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#ef4444]">
                        <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </button>
                )}
            </div>

            <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                                {[{ label: "Student", cls: "" }, { label: "Method / TrxID", cls: "hidden md:table-cell" }, { label: "Amount", cls: "hidden sm:table-cell" }, { label: "Status", cls: "" }, { label: "Actions", cls: "" }].map((h) => (
                                    <th key={h.label} className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}>{h.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                            {filtered.length > 0 ? filtered.map((s) => (
                                <TableRow key={s.enrollment.enrollmentId} student={s} onVerify={onVerify} onRejectClick={setRejectTarget} verifyingPaymentId={verifyingPaymentId} rejectingPaymentId={rejectingPaymentId} />
                            )) : (
                                <tr><td colSpan={5} className="py-12 text-center text-[13px] text-[#9ca3af]">No students found</td></tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}