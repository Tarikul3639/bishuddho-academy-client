// app/admin/courses/[courseId]/components/CourseSidebar.tsx
"use client";

import { Users, DollarSign, BookOpen, Clock, MapPin, Calendar } from "lucide-react";
import { CourseDetails } from "@/types/course-details";

export default function CourseSidebar({ course }: { course: CourseDetails }) {
    const seatPct = Math.round((course.bookedSeats ?? 0 / course.totalSeats) * 100);

    const formatDate = (
        value?: string | null,
    ) => {
        if (!value) return "-";

        return new Date(value)
            .toLocaleDateString();
    };

    return (
        <div className="space-y-4">
            {/* Stats */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">Stats</p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: Users, label: "Students", val: course.bookedSeats ?? 0, color: "#1a56db", bg: "#eef3ff" },
                        { icon: BookOpen, label: "Sessions", val: course.lessons, color: "#16a34a", bg: "#f0fdf4" },
                        { icon: Clock, label: "Duration", val: course.duration, color: "#d97706", bg: "#fffbeb" },
                        { icon: DollarSign, label: "Revenue", val: `৳${course.revenue.toLocaleString()}`, color: "#9333ea", bg: "#fdf4ff" },
                    ].map(({ icon: Icon, label, val, color, bg }) => (
                        <div key={label} className="rounded-xl p-3" style={{ background: bg }}>
                            <Icon className="mb-1.5 h-4 w-4" style={{ color }} />
                            <p className="text-[14px] font-bold text-[#0d1b3e]">{val}</p>
                            <p className="text-[11px] text-[#9ca3af]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seat meter */}
            <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb] p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#92400e]">Seats</p>
                <div className="mb-1 flex justify-between text-[12px] font-semibold text-[#b45309]">
                    <span>{course.totalSeats - (course.bookedSeats ?? 0)} left</span>
                    <span>{course.bookedSeats ?? 0}/{course.totalSeats}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#fde68a]/40">
                    <div className="h-full rounded-full transition-all"
                        style={{ width: `${seatPct}%`, background: seatPct >= 90 ? "#ef4444" : seatPct >= 60 ? "#f59e0b" : "#1a56db" }} />
                </div>
            </div>

            {/* Schedule */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">Schedule</p>
                <div className="flex flex-col gap-2 text-[12px] text-[#6b7280]">
                    {[
                        { icon: Calendar, val: course.schedule },
                        { icon: MapPin, val: course.location },
                        { icon: Clock, val: course.duration },
                        { icon: Calendar, val: course.startDate },
                    ].map(({ icon: Icon, val }, i) => (
                        <span key={i} className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                            {formatDate(val)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Instructor */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">Instructor</p>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-sm font-bold text-white">
                        {course.instructor[0]}
                    </div>
                    <div>
                        <p className="text-[14px] font-bold text-[#0d1b3e]">{course.instructor}</p>
                        <p className="text-[12px] text-[#6b7280]">Lead Instructor</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
