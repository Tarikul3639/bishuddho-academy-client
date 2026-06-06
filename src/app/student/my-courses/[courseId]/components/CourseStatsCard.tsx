"use client";
import { Layers, BookOpen, Clock, Users } from "lucide-react";

function CourseStatsCard({
    modules, lessons, duration, students,
}: {
    modules: number; lessons: number; duration: string; students: number;
}) {
    const items = [
        { icon: Layers,   label: "Modules",  val: modules,  bg: "#eef3ff", color: "#1a56db" },
        { icon: BookOpen, label: "Sessions", val: lessons,  bg: "#f0fdf4", color: "#16a34a" },
        { icon: Clock,    label: "Duration", val: duration, bg: "#fffbeb", color: "#d97706" },
        { icon: Users,    label: "Students", val: students, bg: "#fdf4ff", color: "#9333ea" },
    ];

    return (
        <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-widest text-[#9ca3af]">
                Course Stats
            </p>
            <div className="grid grid-cols-2 gap-3">
                {items.map(({ icon: Icon, label, val, bg, color }) => (
                    <div
                        key={label}
                        className="rounded-lg p-3"
                        style={{ background: bg }}
                    >
                        <Icon className="mb-1.5 h-4 w-4" style={{ color }} />
                        <p className="text-base font-bold text-[#0d1b3e]">{val}</p>
                        <p className="text-[11px] text-[#9ca3af]">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseStatsCard;