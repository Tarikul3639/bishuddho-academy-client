// app/admin/dashboard/components/CourseOverview.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { Users, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Course {
    id:          string;
    title:       string;
    schedule:    string;
    totalSeats:  number;
    bookedSeats: number;
    revenue:     number;
    status:      "active" | "upcoming" | "completed";
}

const STATUS_CONFIG = {
    active:    { label: "Active",    bg: "#dcfce7", color: "#16a34a" },
    upcoming:  { label: "Upcoming",  bg: "#eef3ff", color: "#1a56db" },
    completed: { label: "Completed", bg: "#f3f4f6", color: "#6b7280" },
};

// TODO: replace with real API data
const COURSES: Course[] = [
    { id: "web-dev-1",     title: "Complete Web Development",  schedule: "Sat & Mon, 10AM–12PM", totalSeats: 30, bookedSeats: 22, revenue: 77000, status: "active"    },
    { id: "graphic-1",    title: "Graphic Design with Figma",  schedule: "Fri & Sat, 2PM–4PM",   totalSeats: 25, bookedSeats: 18, revenue: 63000, status: "active"    },
    { id: "marketing-1",  title: "Digital Marketing & SEO",    schedule: "Sun & Tue, 6PM–8PM",   totalSeats: 20, bookedSeats: 20, revenue: 50000, status: "completed"  },
    { id: "web-dev-2",    title: "Complete Web Development",   schedule: "Wed & Thu, 4PM–6PM",   totalSeats: 30, bookedSeats:  5, revenue: 17500, status: "upcoming"   },
];

export default function CourseOverview() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
        >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#0d1b3e]">Course Overview</h2>
                <Link href="/admin/courses" className="text-[12px] font-semibold text-[#1a56db] hover:underline">
                    Manage All
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {COURSES.map((c) => {
                    const status  = STATUS_CONFIG[c.status];
                    const seatPct = Math.round((c.bookedSeats / c.totalSeats) * 100);
                    const seatsLeft = c.totalSeats - c.bookedSeats;

                    return (
                        <motion.div
                            key={c.id}
                            variants={fadeUp}
                            className="rounded-xl border border-[#f3f4f6] bg-[#f9fafb] px-4 py-3.5 transition-colors hover:bg-[#f3f4f6]"
                        >
                            <div className="mb-2.5 flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[14px] font-bold text-[#0d1b3e]">{c.title}</p>
                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#6b7280]">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />{c.schedule}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />{c.bookedSeats}/{c.totalSeats} seats
                                        </span>
                                    </div>
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-1.5">
                                    <span
                                        className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                                        style={{ background: status.bg, color: status.color }}
                                    >
                                        {status.label}
                                    </span>
                                    <p className="text-[13px] font-bold text-[#0d1b3e]">
                                        ৳{c.revenue.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Seat progress */}
                            <div>
                                <div className="mb-1 flex justify-between text-[10px] text-[#9ca3af]">
                                    <span>{seatsLeft} seats left</span>
                                    <span>{seatPct}% filled</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${seatPct}%`,
                                            background: seatPct >= 90 ? "#ef4444" : seatPct >= 60 ? "#f59e0b" : "#1a56db",
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}