// components/EnrolledCourseCard.tsx

import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Clock,
    Calendar,
    AlertCircle,
    ChevronRight,
    Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp } from "@/components/animations";
import {
    ENROLLMENT_STATUS_CONFIG,
    PAYMENT_STATUS_CONFIG,
} from "@/constants/course.constants";

import type { StudentMyCourse } from "@/types/student-my-course";
import { EnrollmentStatus } from "@/types/enrollment-status";
import { PaymentStatus } from "@/types/payment-status";

interface EnrolledCourseCardProps {
    course: StudentMyCourse;
    onDelete: ({ courseId }: { courseId: string }) => void;
}

export const EnrolledCourseCard = ({
    course,
    onDelete,
}: EnrolledCourseCardProps) => {
    const thumbnail = `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnailUrl}`;

    const enrollmentStatus = ENROLLMENT_STATUS_CONFIG[course.status];
    const status =
        course.paymentStatus === PaymentStatus.REJECTED
            ? PAYMENT_STATUS_CONFIG.rejected
            : enrollmentStatus;

    const pct =
        course.totalSessions > 0
            ? Math.round((course.currentSession / course.totalSessions) * 100)
            : 0;

    return (
        <motion.div
            variants={fadeUp}
            className="group overflow-hidden rounded-lg border border-[#e5e7eb] bg-white"
        >
            {/* Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden bg-[#f0f5ff]">
                {course.thumbnailUrl ? (
                    <Image
                        src={thumbnail}
                        alt={course.title}
                        fill
                        unoptimized
                        loading="eager"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <MapPin className="h-10 w-10 text-[#1a56db]/20" />
                    </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />

                <span
                    className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ background: status.bg, color: status.color }}
                >
                    {status.label}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col p-4">
                <h3 className="mb-1 line-clamp-2 text-[14px] font-bold leading-snug text-[#0d1b3e]">
                    {course.title}
                </h3>

                <p className="mb-3 text-[12px] font-medium text-[#6b7280]">
                    {course.instructor}
                </p>

                {/* Meta Info */}
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

                {/* Progress Bar */}
                {course.status === EnrollmentStatus.ACTIVE && (
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

                {/* Action Area */}
                <div className="mt-auto">
                    {course.paymentStatus === PaymentStatus.REJECTED ? (
                        <div className="rounded-lg border border-[#fecaca] bg-[#fee2e2] p-3">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                                <div className="flex-1">
                                    <p className="text-[12px] font-semibold text-[#dc2626]">
                                        Payment Rejected
                                    </p>
                                    {course.rejectionReason && (
                                        <p className="mt-1 text-[11px] leading-relaxed text-[#991b1b]">
                                            {course.rejectionReason}
                                        </p>
                                    )}
                                    <p className="mt-2 text-[10px] leading-relaxed text-[#7f1d1d]">
                                        If you don't want to continue, you can cancel your enrollment.
                                    </p>
                                    <button
                                        onClick={() => onDelete({ courseId: course.courseId })}
                                        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-[#ef4444] bg-white py-2 text-[12px] font-semibold text-[#dc2626] transition-all duration-200 hover:bg-[#fff5f5]"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Cancel Enrollment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : course.status === EnrollmentStatus.PENDING ? (
                        <div className="flex items-center gap-2 rounded-lg bg-[#fff7ed] px-3 py-2.5 text-[12px] font-semibold text-[#ea580c]">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            Payment under review
                        </div>
                    ) : (
                        <Link href={`/student/my-courses/${course.courseId}`}>
                            <button className="group/btn flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-sm bg-primary py-2.5 text-[13px] font-bold text-white transition-all duration-200 hover:bg-primary/95 hover:shadow-[0_4px_16px_rgba(26,86,219,0.3)]">
                                View Details
                                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};