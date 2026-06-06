import Image from "next/image";
import Link from "next/link";
import TakaSign from "@/components/icons/TakaSign";
import StarRating from "./StarRating";
import { type PublicCourse } from "@/types/public-course";

const STATUS_CONFIG = {
    active: { label: "Active", bg: "#dcfce7", color: "#16a34a" },
    upcoming: { label: "Upcoming", bg: "#eef3ff", color: "#1a56db" },
    completed: { label: "Completed", bg: "#f3f4f6", color: "#6b7280" },
};

export default function CourseCard({ course }: { course: PublicCourse }) {
    const thumbnail = course.thumbnailUrl?.startsWith("http")
        ? course.thumbnailUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnailUrl}`;
    const hasDiscount = course.originalPrice > course.price;
    const discount = hasDiscount
        ? Math.round(
            ((course.originalPrice - course.price) / course.originalPrice) * 100,
        )
        : 0;
    const status = STATUS_CONFIG[course.status];

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)]">
            {/* ── Thumbnail ── */}
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#eff6ff]">
                <Image
                    src={thumbnail}
                    alt={course.title}
                    fill
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

                {/* Badges */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2">
                    <span
                        className="rounded-sm px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: status.bg, color: status.color }}
                    >
                        {status.label}
                    </span>
                    {hasDiscount && (
                        <span className="rounded-sm bg-[#dc2626] px-2 py-0.5 text-[10px] font-bold text-white">
                            {discount}% OFF
                        </span>
                    )}
                </div>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-1 flex-col p-4">
                {/* Title */}
                <h3 className="mb-1 line-clamp-2 text-[14px] font-bold leading-snug text-[#0d1b3e]">
                    {course.title}
                </h3>

                {/* Tagline */}
                <p className="mb-2.5 line-clamp-1 text-[12px] text-[#9ca3af]">
                    {course.tagline}
                </p>

                {/* Instructor */}
                <p className="mb-3 text-[12px] font-medium text-[#6b7280]">
                    {course.instructor}
                </p>

                {/* Rating */}
                <StarRating rating={course.averageRating} count={course.reviewCount} />

                {/* Divider */}
                <div className="my-3 h-px bg-[#f3f4f6]" />

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-end gap-1.5">
                        <div className="flex items-center gap-0.5 leading-none">
                            <TakaSign className="h-3.5 w-3.5 text-[#0d1b3e]" />
                            <p className="text-[18px] font-extrabold leading-none text-[#0d1b3e]">
                                {course.price.toLocaleString()}
                            </p>
                        </div>
                        {hasDiscount && (
                            <div className="mb-0.5 flex items-center leading-none line-through">
                                <TakaSign className="h-3 w-3 text-[#9ca3af]" />
                                <p className="text-[12px] leading-none text-[#9ca3af]">
                                    {course.originalPrice.toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    <Link href={`/courses/${course.courseId}`}>
                        <button className="rounded-sm bg-[#1a56db] px-3.5 py-2 text-[12px] font-bold text-white transition-all duration-200 hover:bg-[#1346c4] hover:shadow-[0_4px_12px_rgba(26,86,219,0.3)] cursor-pointer">
                            View Course
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
