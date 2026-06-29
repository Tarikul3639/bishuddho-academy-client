"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import {
    Timer,
    CalendarDays,
    Clock,
    BookOpen,
    MapPin,
} from "lucide-react";

import { SeatProgress } from "./SeatProgress";
import type { PublicCourseDetails } from "@/types/public-course-details";

interface EnrollCardProps {
    course: PublicCourseDetails;
    thumbnailImg: StaticImageData | string;
}

export function EnrollCard({ course }: EnrollCardProps) {
    const router = useRouter();

    const {
        courseId,
        title,
        thumbnailUrl,
        price,
        originalPrice,
        discount,
        daysLeft,
        duration,
        lessons,
        location,
        startDate,
        bookedSeats,
        totalSeats,
        schedule,
        enrollmentStatus,
        payment,
    } = course;

    const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const thumbnail = thumbnailUrl.startsWith("http")
        ? thumbnailUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${thumbnailUrl}`;

    const paymentStatus = payment?.status;

    type CardState = "new" | "pending" | "verified" | "rejected";

    const state: CardState = (() => {
        if (!enrollmentStatus) return "new";

        switch (paymentStatus) {
            case "verified": return "verified";
            case "rejected": return "rejected";
            case "pending":  return "pending";
        }

        if (enrollmentStatus === "active" || enrollmentStatus === "completed") {
            return "verified";
        }

        return "new";
    })();

    const buttonClass = {
        new:      "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]",
        pending:  "bg-amber-500 text-white cursor-not-allowed",
        verified: "bg-green-600 text-white hover:bg-green-700",
        rejected: "bg-red-600 text-white hover:bg-red-700",
    }[state];

    const buttonText = {
        new:      "Book Your Seat",
        pending:  "Payment Under Review",
        verified: "Continue Learning",
        rejected: "Retry Payment",
    }[state];

    const handleButtonClick = () => {
        switch (state) {
            case "verified":
                router.push(`/student/my-courses/${courseId}`);
                break;
            case "pending":
                return;
            case "new":
            case "rejected":
                router.push(`/courses/${courseId}/payment`);
                break;
        }
    };

    return (
        /*
         * Mobile  → normal flow (no sticky), full width
         * lg+     → sticky sidebar card with fixed width
         *
         * The parent layout should use something like:
         *   <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-8">
         *     <main>…course content…</main>
         *     <aside><EnrollCard … /></aside>
         *   </div>
         *
         * On mobile the aside stacks below (or above) the main content.
         */
        <div className="w-full overflow-hidden rounded-lg border border-border bg-white shadow capitalize lg:sticky lg:top-24">

            {/* ── Thumbnail ── */}
            <div className="relative h-44 w-full sm:h-52">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-2xl">
                    Physical Class
                </span>
            </div>

            {/* ── Body ── */}
            <div className="p-4 sm:p-6">

                {/* Days-left badge */}
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-500">
                    <Timer className="h-4 w-4 shrink-0" />
                    <span>{daysLeft} days left at this price!</span>
                </div>

                {/* Price row */}
                <div className="mb-4 flex flex-wrap items-end gap-2 sm:gap-3">
                    <span className="text-2xl font-bold text-[#111827] sm:text-3xl">
                        ৳{price.toLocaleString()}
                    </span>

                    {originalPrice > price && (
                        <>
                            <span className="mb-0.5 text-sm text-[#9ca3af] line-through sm:text-base">
                                ৳{originalPrice.toLocaleString()}
                            </span>
                            <span className="mb-0.5 text-xs font-semibold text-green-600 sm:text-sm">
                                {discount}% OFF
                            </span>
                        </>
                    )}
                </div>

                {/* Meta grid — 2 cols on all sizes */}
                <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2 border-b border-border pb-4 text-xs text-[#6b7280] sm:text-sm">
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                        <span>Starts {formattedStartDate}</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 shrink-0 text-primary" />
                        <span>{duration}</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                        <span>{lessons} sessions</span>
                    </span>

                    <span className="flex items-center gap-1.5 overflow-hidden">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate">{location}</span>
                    </span>
                </div>

                {/* Schedule */}
                <span className="mb-4 flex items-center gap-1.5 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{schedule}</span>
                </span>

                {/* Seat progress */}
                <SeatProgress bookedSeats={bookedSeats} totalSeats={totalSeats} />

                {/* Status banners */}
                {state === "pending" && (
                    <div className="mt-4 rounded-md border border-yellow-300 bg-yellow-50 p-3">
                        <p className="text-xs font-semibold text-yellow-700">Payment Under Review</p>
                        <p className="mt-1 text-xs text-yellow-600">
                            Your payment is being reviewed by our team.
                        </p>
                    </div>
                )}

                {state === "verified" && (
                    <div className="mt-4 rounded-md border border-green-300 bg-green-50 p-3">
                        <p className="text-xs font-semibold text-green-700">Enrollment Confirmed</p>
                        <p className="mt-1 text-xs text-green-600">
                            Your payment has been verified successfully.
                        </p>
                    </div>
                )}

                {state === "rejected" && payment?.rejectionReason && (
                    <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3">
                        <p className="text-xs font-semibold text-red-700">Payment Rejected</p>
                        <p className="mt-1 text-xs text-red-600">{payment.rejectionReason}</p>
                    </div>
                )}

                {/* CTA button */}
                <button
                    onClick={handleButtonClick}
                    disabled={state === "pending"}
                    className={`mt-4 w-full rounded-sm py-3 text-sm font-bold transition-all sm:py-3.5 sm:text-base ${buttonClass}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}