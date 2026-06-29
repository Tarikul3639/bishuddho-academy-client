// components/profile/ProfileBannerSkeleton.tsx

function Box({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div 
            className={`animate-pulse rounded-sm bg-gray-200 ${className}`} 
            style={style} 
        />
    );
}

export function ProfileBannerSkeleton() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {/* ── Decorative blobs (Gray monochrome for loading) ── */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gray-100 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-gray-50 blur-2xl" />

            {/* ── Wave SVG Placeholder (Gray) ── */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 120"
                className="absolute bottom-0 left-0 h-full w-full opacity-20"
                preserveAspectRatio="none"
            >
                <path
                    fill="#e5e7eb"
                    d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                />
            </svg>

            {/* ── Main content ── */}
            <div className="relative z-10 p-4 sm:p-6 md:p-10">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-5">
                    
                    {/* Avatar Skeleton */}
                    <div className="relative shrink-0">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-gray-200 bg-white p-0.5 shadow-sm md:h-28 md:w-28">
                            <Box className="h-full w-full rounded-full" />
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="space-y-4 w-full">
                        {/* Name + badge */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Box className="h-8 w-48 md:h-9 md:w-64 rounded-md" />
                            <Box className="h-6 w-20 rounded-lg" />
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2 pt-1">
                            <Box className="h-4 w-4 rounded-full shrink-0" />
                            <Box className="h-4 w-40" />
                        </div>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            {[...Array(3)].map((_, index) => (
                                <Box 
                                    key={index} 
                                    className="h-8 w-28 sm:w-32 rounded-full border border-gray-100" 
                                />
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}