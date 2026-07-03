"use client";

import type { CSSProperties } from "react";

function Box({
    className = "",
    style,
}: {
    className?: string;
    style?: CSSProperties;
}) {
    return (
        <div
            className={`animate-pulse rounded-sm bg-gray-200 ${className}`}
            style={style}
        />
    );
}

export function ProfileBannerSkeleton() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-primary/10">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gray-100 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-gray-100 blur-2xl" />

            {/* Original Wave */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 h-full w-full opacity-20"
            >
                <path
                    fill="#e5e7eb"
                    d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                />
                <path
                    fill="#e5e7eb"
                    d="M0,96L60,90.7C120,85,240,75,360,69.3C480,64,600,64,720,69.3C840,75,960,85,1080,85.3C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                />
            </svg>

            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-10">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:flex-row lg:items-center lg:text-left">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-gray-200 bg-white p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:h-24 sm:w-24 md:h-28 md:w-28">
                            <Box className="h-full w-full rounded-full" />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 space-y-4 w-full">

                        {/* Name + Badge */}
                        <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                            <Box className="h-8 w-52 rounded-md md:h-9 md:w-64" />
                            <Box className="h-6 w-20 rounded-lg" />
                        </div>

                        {/* Email */}
                        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                            <Box className="h-4 w-4 rounded-full shrink-0" />
                            <Box className="h-4 w-48 rounded sm:w-56" />
                        </div>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 lg:justify-start">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Box
                                    key={index}
                                    className="h-8 w-28 rounded-full sm:w-32"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}