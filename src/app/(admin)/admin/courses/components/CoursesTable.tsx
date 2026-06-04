// app/admin/courses/components/CoursesTable.tsx
"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { MapPin, Calendar, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import { STATUS_CONFIG, type AdminCourse } from "../../_data/courses";

function TableRow({ course }: { course: AdminCourse }) {
    const status = STATUS_CONFIG[course.status];
    const seatPct = Math.round(((course.bookedSeats ?? 0) / (course.totalSeats ?? 1)) * 100);
    const seatsLeft = (course.totalSeats ?? 0) - (course.bookedSeats ?? 0);

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Title + instructor */}
            <td className="px-4 py-3">
                <p className="text-[13px] font-bold text-[#0d1b3e]">{course.title}</p>
                <p className="mt-0.5 text-[11px] text-[#6b7280]">{course.instructor}</p>
            </td>

            {/* Schedule + location */}
            <td className="hidden px-4 py-3 lg:table-cell">
                <div className="flex flex-col gap-1 text-[11px] text-[#6b7280]">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 shrink-0 text-[#9ca3af]" />
                        {course.schedule}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 shrink-0 text-[#9ca3af]" />
                        {course.location}
                    </span>
                </div>
            </td>

            {/* Seats */}
            <td className="hidden px-4 py-3 md:table-cell">
                <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                    <div className="min-w-20">
                        <div className="mb-1 flex justify-between text-[10px] text-[#9ca3af]">
                            <span>{seatsLeft} left</span>
                            <span>{seatPct}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${seatPct}%`,
                                    background:
                                        seatPct >= 90 ? "#ef4444" :
                                            seatPct >= 60 ? "#f59e0b" :
                                                "#1a56db",
                                }}
                            />
                        </div>
                        <p className="mt-0.5 text-[10px] text-[#9ca3af]">
                            {course.bookedSeats}/{course.totalSeats}
                        </p>
                    </div>
                </div>
            </td>

            {/* Revenue */}
            <td className="hidden px-4 py-3 sm:table-cell">
                <p className="text-[13px] font-bold text-[#0d1b3e]">
                    ৳{course.revenue.toLocaleString()}
                </p>
                <p className="text-[10px] text-[#9ca3af]">
                    {course.lessons} sessions
                </p>
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

            {/* Action */}
            <td className="px-4 py-3">
                <Link href={`/admin/courses/${course.courseId}`}>
                    <button className="flex items-center gap-1 rounded-lg bg-[#eef3ff] px-2.5 py-1.5 text-[11px] font-bold text-[#1a56db] transition-colors hover:bg-[#c7d7fd]">
                        View
                        <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                </Link>
            </td>
        </motion.tr>
    );
}

export default function CoursesTable({ data }: { data: AdminCourse[] }) {
    if (data.length === 0) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white py-16 text-center">
                <p className="text-[14px] font-semibold text-[#6b7280]">No courses found</p>
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
                                { label: "Course", cls: "" },
                                { label: "Schedule", cls: "hidden lg:table-cell" },
                                { label: "Seats", cls: "hidden md:table-cell" },
                                { label: "Revenue", cls: "hidden sm:table-cell" },
                                { label: "Status", cls: "" },
                                { label: "", cls: "" },
                            ].map((h, i) => (
                                <th
                                    key={i}
                                    className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}
                                >
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                        {data.map((c) => <TableRow key={c.courseId} course={c} />)}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}