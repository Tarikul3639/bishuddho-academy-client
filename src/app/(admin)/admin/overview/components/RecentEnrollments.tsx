// app/admin/dashboard/components/RecentEnrollments.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Status = "active" | "pending" | "completed";

interface Enrollment {
    id:       string;
    name:     string;
    course:   string;
    method:   "bkash" | "nagad" | "cash";
    date:     string;
    status:   Status;
}

const STATUS_CONFIG = {
    active:    { label: "Active",    bg: "#dcfce7", color: "#16a34a" },
    pending:   { label: "Pending",   bg: "#fff7ed", color: "#ea580c" },
    completed: { label: "Completed", bg: "#eef3ff", color: "#1a56db" },
};

const METHOD_CONFIG = {
    bkash: { label: "bKash", color: "#E2136E" },
    nagad: { label: "Nagad", color: "#F7941D" },
    cash:  { label: "Cash",  color: "#059669" },
};

// TODO: replace with real API data
const ENROLLMENTS: Enrollment[] = [
    { id: "1", name: "Rafiq Islam",    course: "Complete Web Development",    method: "bkash", date: "May 28, 2026", status: "active"    },
    { id: "2", name: "Sadia Akter",    course: "Graphic Design with Figma",   method: "nagad", date: "May 27, 2026", status: "pending"   },
    { id: "3", name: "Jahid Hasan",    course: "Digital Marketing & SEO",     method: "cash",  date: "May 26, 2026", status: "active"    },
    { id: "4", name: "Mitu Begum",     course: "Complete Web Development",    method: "bkash", date: "May 25, 2026", status: "pending"   },
    { id: "5", name: "Rubel Mia",      course: "Graphic Design with Figma",   method: "nagad", date: "May 24, 2026", status: "completed" },
];

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function RecentEnrollments() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#0d1b3e]">Recent Enrollments</h2>
                <Link href="/admin/users" className="text-[12px] font-semibold text-[#1a56db] hover:underline">
                    View All
                </Link>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2">
                {ENROLLMENTS.map((e) => {
                    const status = STATUS_CONFIG[e.status];
                    const method = METHOD_CONFIG[e.method];
                    return (
                        <motion.div
                            key={e.id}
                            variants={fadeUp}
                            className="flex items-center gap-3 rounded-xl border border-[#f3f4f6] bg-[#f9fafb] px-3 py-2.5 transition-colors hover:bg-[#f3f4f6]"
                        >
                            {/* Avatar */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a56db] to-[#60a5fa] text-[12px] font-bold text-white">
                                {getInitials(e.name)}
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-bold text-[#0d1b3e]">{e.name}</p>
                                <p className="truncate text-[11px] text-[#6b7280]">{e.course}</p>
                            </div>

                            {/* Method */}
                            <span
                                className="hidden shrink-0 text-[11px] font-bold sm:block"
                                style={{ color: method.color }}
                            >
                                {method.label}
                            </span>

                            {/* Date */}
                            <span className="hidden shrink-0 text-[11px] text-[#9ca3af] md:block">
                                {e.date}
                            </span>

                            {/* Status */}
                            <span
                                className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold"
                                style={{ background: status.bg, color: status.color }}
                            >
                                {status.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}