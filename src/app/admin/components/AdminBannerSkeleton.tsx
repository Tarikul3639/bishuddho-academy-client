"use client";

function Box({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-sm bg-slate-200 ${className}`}
        />
    );
}

export default function AdminBannerSkeleton() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-[#fde68a]/40">

            {/* Blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-slate-100 blur-2xl" />

            {/* Original Wave */}
            <div className="absolute bottom-0 left-0 w-full leading-0">
                <svg
                    viewBox="0 0 1440 100"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="block h-17.5 w-full sm:h-22.5 lg:h-30 opacity-20"
                >
                    <path
                        fill="#e5e7eb"
                        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
                    />
                    <path
                        fill="#e5e7eb"
                        d="M0,55 C200,20 400,70 720,55 C1040,40 1240,65 1440,50 L1440,80 L0,80 Z"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 py-10 sm:px-6 md:p-10">
                <div className="flex animate-pulse flex-col items-center gap-6 text-center sm:gap-7 lg:flex-row lg:items-center lg:text-left">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="h-20 w-20 rounded-full border-[3px] border-slate-200 bg-white p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:h-24 sm:w-24 md:h-28 md:w-28">
                            <Box className="h-full w-full rounded-full" />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 space-y-4 w-full">

                        {/* Name + Badge */}
                        <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                            <Box className="h-8 w-52 rounded-md md:h-9 md:w-64" />
                            <Box className="h-6 w-24 rounded-full" />
                        </div>

                        {/* Email */}
                        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                            <Box className="h-4 w-4 rounded-full" />
                            <Box className="h-4 w-52 rounded sm:w-64" />
                        </div>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 lg:justify-start">
                            <Box className="h-8 w-28 rounded-full sm:w-32" />
                            <Box className="h-8 w-32 rounded-full sm:w-40" />
                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
}