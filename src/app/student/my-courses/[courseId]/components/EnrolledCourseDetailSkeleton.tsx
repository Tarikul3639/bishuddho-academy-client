// components/my-courses/EnrolledCourseDetailSkeleton.tsx

function Box({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div 
            className={`animate-pulse rounded-sm bg-gray-200 ${className}`} 
            style={style} 
        />
    );
}

// ── Sidebar skeleton ──────────────────────────────────────────────────────────

function SidebarSkeleton() {
    return (
        <div className="space-y-4">
            {/* PaymentSummaryCard */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <Box className="h-3 w-28" />
                    <Box className="h-5 w-16 rounded-full bg-gray-300" />
                </div>
                <div className="mb-3 flex items-center gap-3">
                    <Box className="h-10 w-10 shrink-0 rounded-lg" />
                    <div className="flex-1">
                        <Box className="mb-2 h-3 w-20" />
                        <Box className="h-4 w-24" />
                    </div>
                </div>
                <Box className="mb-4 h-px w-full bg-gray-100" />
                <div className="flex flex-col gap-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <Box className="h-3 w-16" />
                            <Box className="h-3 w-20" />
                        </div>
                    ))}
                </div>
            </div>

            {/* ProgressCard */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
                <Box className="mb-2 h-3 w-24" />
                <div className="my-4 flex items-end justify-between">
                    <Box className="h-8 w-14" />
                    <Box className="mb-1 h-3 w-24" />
                </div>
                <Box className="h-2 w-full rounded-full" />
            </div>

            {/* CourseStatsCard */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
                <Box className="mb-4 h-3 w-24" />
                <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="rounded-lg bg-gray-50 p-3">
                            <Box className="mb-2 h-4 w-4 bg-gray-300" />
                            <Box className="mb-1.5 h-5 w-10" />
                            <Box className="h-3 w-14" />
                        </div>
                    ))}
                </div>
            </div>

            {/* BatchInfoCard */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
                <Box className="mb-4 h-3 w-20" />
                <div className="flex flex-col gap-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Box className="h-3.5 w-3.5 shrink-0" />
                            <Box className="h-3 w-36" />
                        </div>
                    ))}
                </div>
                <Box className="mt-4 h-1.5 w-full rounded-full" />
            </div>

            {/* InstructorCard */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
                <Box className="mb-4 h-3 w-20" />
                <div className="flex items-center gap-3">
                    <Box className="h-11 w-11 shrink-0 rounded-full" />
                    <div>
                        <Box className="mb-2 h-4 w-28" />
                        <Box className="h-3 w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main skeleton ─────────────────────────────────────────────────────────────

export function EnrolledCourseDetailSkeleton() {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Back button */}
            <Box className="h-4 w-32" />

            {/* Hero */}
            <div className="rounded-2xl bg-gray-100 px-5 py-10 sm:px-8 sm:py-12">
                {/* Status badge */}
                <Box className="mb-5 h-6 w-32 rounded-full bg-gray-300" />

                <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
                    {/* Left Info */}
                    <div>
                        <Box className="mb-4 h-8 w-3/4 bg-gray-300" />
                        <Box className="mb-3 h-8 w-1/2 bg-gray-300" />
                        <Box className="mb-6 h-4 w-2/3 bg-gray-300" />
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <Box className="h-4 w-20 bg-gray-300" />
                            <Box className="h-4 w-24 bg-gray-300" />
                            <Box className="h-4 w-28 bg-gray-300" />
                        </div>
                    </div>

                    {/* Class info card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <Box className="mb-4 h-3 w-20" />
                        <div className="flex flex-col gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Box className="h-3.5 w-3.5 shrink-0" />
                                    <Box className="h-3" style={{ width: `${50 + i * 8}%` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* LEFT Content */}
                <div className="space-y-8">
                    {/* About */}
                    <section>
                        <Box className="mb-4 h-6 w-40" />
                        <div className="space-y-2.5">
                            <Box className="h-4 w-full" />
                            <Box className="h-4 w-11/12" />
                            <Box className="h-4 w-4/5" />
                        </div>
                    </section>

                    {/* What's included */}
                    <section>
                        <Box className="mb-4 h-6 w-36" />
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
                                    <Box className="h-4 w-4 shrink-0 rounded-full" />
                                    <Box className="h-3.5 flex-1" style={{ width: `${55 + i * 7}%` }} />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Curriculum */}
                    <section>
                        <div className="mb-5 flex items-center justify-between">
                            <Box className="h-6 w-28" />
                            <Box className="h-3 w-32" />
                        </div>
                        <div className="flex flex-col gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                                    {/* Module header */}
                                    <div className="flex items-center gap-4 px-5 py-4">
                                        <Box className="h-8 w-8 shrink-0 rounded-lg" />
                                        <div className="flex-1">
                                            <Box className="mb-2 h-4 w-40" />
                                            <Box className="h-3 w-28" />
                                        </div>
                                        <Box className="h-4 w-4 shrink-0" />
                                    </div>

                                    {/* First module expanded skeleton */}
                                    {i === 0 && (
                                        <div className="border-t border-gray-100 px-5 pb-4 pt-3">
                                            <div className="flex flex-col gap-2.5">
                                                {[...Array(3)].map((_, j) => (
                                                    <div key={j} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5">
                                                        <Box className="h-7 w-7 shrink-0 rounded-lg" />
                                                        <div className="flex-1">
                                                            <Box className="mb-1.5 h-3.5 w-40" />
                                                            <Box className="h-3 w-20" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mobile sidebar */}
                    <div className="lg:hidden">
                        <SidebarSkeleton />
                    </div>
                </div>

                {/* RIGHT — Desktop sidebar */}
                <div className="hidden lg:block">
                    <div className="sticky top-6">
                        <SidebarSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
}