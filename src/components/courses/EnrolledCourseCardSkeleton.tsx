// components/courses/EnrolledCourseCardSkeleton.tsx

function Box({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`} />;
}

export function EnrolledCourseCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            
            {/* Thumbnail */}
            <div className="relative h-40 w-full animate-pulse bg-gray-200">
                {/* Status badge */}
                <div className="absolute right-3 top-3 h-5 w-16 rounded-full bg-gray-300" />
            </div>

            {/* Body */}
            <div className="p-4">
                {/* Title */}
                <div className="mb-3 space-y-2">
                    <Box className="h-4 w-full" />
                    <Box className="h-4 w-4/5" />
                </div>

                {/* Instructor */}
                <Box className="mb-4 h-3 w-1/3" />

                {/* Meta details */}
                <div className="mb-4 flex flex-col gap-2.5">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Box className="h-4 w-4 shrink-0" />
                            <Box className="h-3 w-2/3" />
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="mb-5">
                    <div className="mb-2 flex justify-between">
                        <Box className="h-3 w-24" />
                        <Box className="h-3 w-8" />
                    </div>
                    <Box className="h-2 w-full rounded-full" />
                </div>

                {/* CTA button */}
                <Box className="h-10 w-full rounded-md" />
            </div>
        </div>
    );
}