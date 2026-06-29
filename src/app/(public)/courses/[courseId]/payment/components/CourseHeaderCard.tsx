"use client";

import Image from "next/image";
import { TakaSign } from "@/components/icons/TakaSign";

interface CourseHeaderCardProps {
    course: {
        title: string;
        instructor: string;
        price: number;
        originalPrice: number;
        discount: number;
        thumbnailUrl: string;
    };
}

export default function CourseHeaderCard({ course }: CourseHeaderCardProps) {
    const thumbnailSrc = course.thumbnailUrl?.startsWith("http")
        ? course.thumbnailUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnailUrl}`;

    return (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 sm:gap-4">
            {/* Thumbnail */}
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm bg-muted sm:h-18 sm:w-24">
                <Image
                    src={thumbnailSrc}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, 96px"
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-xs font-semibold text-card-foreground sm:truncate sm:text-sm">
                    {course.title}
                </h3>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {course.instructor}
                </p>

                {/* Price row */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <div className="flex items-center gap-0.5">
                        <TakaSign className="h-3 w-3 shrink-0 text-primary" />
                        <span className="text-sm font-bold text-primary sm:text-base">
                            {course.price.toLocaleString()}
                        </span>
                    </div>

                    {course.originalPrice > course.price && (
                        <span className="text-xs text-muted-foreground line-through">
                            ৳{course.originalPrice.toLocaleString()}
                        </span>
                    )}

                    {course.discount > 0 && (
                        <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            {course.discount}% OFF
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}