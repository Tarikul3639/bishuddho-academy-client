"use client";

import Image, { StaticImageData } from "next/image";
import { Timer, CalendarDays, Clock, BookOpen, MapPin } from "lucide-react";
import { SeatProgress } from "./SeatProgress";

interface CourseData {
    title: string;
    price: number;
    originalPrice: number;
    discount: number;
    daysLeft: number;
    duration: string;
    lessons: number;
    totalSeats: number;
    bookedSeats: number;
    schedule: string;
    startDate: string;
    includes: string[];
}

interface EnrollCardProps {
    course: CourseData;
    thumbnailImg: StaticImageData | string;
    onEnroll?: () => void;
}

export function EnrollCard({ course, thumbnailImg, onEnroll }: EnrollCardProps) {
    return (
        <div className="sticky top-24 overflow-hidden rounded-lg border border-border bg-white shadow capitalize">
            <div className="relative h-48 w-full">
                <Image src={thumbnailImg} priority alt={course.title} fill className="object-cover" sizes="400px" />
                <span className="absolute left-3 top-3 rounded-full bg-primary/60 backdrop-blur-2xl px-3 py-1 text-xs font-semibold text-white">
                    Physical Class
                </span>
            </div>

            <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-500">
                    <Timer className="h-4 w-4" />
                    {course.daysLeft} days left at this price!
                </div>

                <div className="mb-4 flex items-end gap-3">
                    <span className="text-3xl font-bold text-[#111827]">৳{course.price.toLocaleString()}</span>
                    <span className="mb-0.5 text-base text-[#9ca3af] line-through">৳{course.originalPrice.toLocaleString()}</span>
                    <span className="mb-0.5 text-sm font-semibold text-green-600">{course.discount}% off</span>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 border-b border-border pb-4 text-sm text-[#6b7280] capitalize">
                    <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />Starts {course.startDate}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{course.duration}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-primary" />{course.lessons} sessions</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />Kafrul, Dhaka</span>
                </div>

                <span className="flex items-center gap-1.5 mb-4 rounded-lg border border-border bg-[#f9fafb] px-3 py-2 text-xs font-medium text-[#374151]">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {course.schedule}
                </span>

                <SeatProgress bookedSeats={course.bookedSeats} totalSeats={course.totalSeats} />

                <button 
                    className="w-full rounded-sm bg-primary py-3.5 text-base font-bold text-white transition-colors hover:bg-primary/90 cursor-pointer active:scale-98"
                    onClick={onEnroll}
                >
                    Book Your Seat
                </button>
            </div>
        </div>
    );
}