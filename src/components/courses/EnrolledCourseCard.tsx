// components/EnrolledCourseCard.tsx
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { MapPin, Clock, Calendar, AlertCircle, ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";

type EnrollStatus = "active" | "pending" | "completed";

export interface EnrolledCourse {
    id: string;
    title: string;
    instructor: string;
    thumbnail: StaticImageData | string;
    status: EnrollStatus;
    schedule: string;
    location: string;
    duration: string;
    currentSession: number;
    totalSessions: number;
}

const STATUS_CONFIG = {
    active: { label: "Active", bg: "#dcfce7", color: "#16a34a" },
    pending: { label: "Pending", bg: "#fff7ed", color: "#ea580c" },
    completed: { label: "Completed", bg: "#eef3ff", color: "#1a56db" },
};

export const EnrolledCourseCard = ({ course }: { course: EnrolledCourse }) => {
    const status = STATUS_CONFIG[course.status];
    const pct = Math.round((course.currentSession / course.totalSessions) * 100);

    return (
        <motion.div variants={fadeUp} className="group overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">

            {/* Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden bg-[#f0f5ff]">
                {typeof course.thumbnail === "string" ? (
                    <div className="flex h-full items-center justify-center">
                        <MapPin className="h-10 w-10 text-[#1a56db]/20" />
                    </div>
                ) : (
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />

                {/* Status badge */}
                <span
                    className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ background: status.bg, color: status.color }}
                >
                    {status.label}
                </span>
            </div>

            {/* Body */}
            <div className="p-4">

                {/* Title + instructor */}
                <h3 className="mb-1 line-clamp-2 text-[14px] font-bold leading-snug text-[#0d1b3e]">
                    {course.title}
                </h3>
                <p className="mb-3 text-[12px] font-medium text-[#6b7280]">
                    {course.instructor}
                </p>

                {/* Meta */}
                <div className="mb-3 flex flex-col gap-1.5 text-[12px] text-[#6b7280]">
                    <span className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                        {course.schedule}
                    </span>
                    <span className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                        {course.location}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                        {course.duration}
                    </span>
                </div>

                {/* Session progress — active only */}
                {course.status === "active" && (
                    <div className="mb-4">
                        <div className="mb-1.5 flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-[#374151]">
                                Session {course.currentSession} / {course.totalSessions}
                            </span>
                            <span className="text-[#9ca3af]">{pct}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-[#1a56db] to-[#60a5fa] transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* CTA */}
                {course.status === "pending" ? (
                    <div className="flex items-center gap-2 rounded-lg bg-[#fff7ed] px-3 py-2.5 text-[12px] font-semibold text-[#ea580c]">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Payment under review
                    </div>
                ) : (
                    <Link href={`/my-courses/${course.id}`}>
                        <button className="group/btn flex w-full items-center justify-center gap-1.5 rounded-sm bg-primary py-2.5 text-[13px] font-bold text-white transition-all duration-200 hover:bg-primary/95 hover:shadow-[0_4px_16px_rgba(26,86,219,0.3)] cursor-pointer">
                            View Details
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
}