"use client";

function Box({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-sm bg-gray-200 ${className}`}
        />
    );
}

export default function TeacherCardSkeleton() {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">

            {/* Image */}
            <div className="relative aspect-9/6 w-full overflow-hidden bg-gray-100">
                <Box className="h-full w-full rounded-none" />

                {/* Featured Badge */}
                <div className="absolute left-3 top-3">
                    <Box className="h-5 w-16 rounded-full" />
                </div>

                {/* Bottom Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-300" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">

                {/* Category */}
                <Box className="h-2.5 w-24" />

                {/* Name */}
                <Box className="mt-2 h-4 w-40" />

                {/* Designation */}
                <Box className="mt-2 h-3 w-28" />

                {/* Bio */}
                <div className="mt-3 space-y-2">
                    <Box className="h-3 w-full" />
                    <Box className="h-3 w-5/6" />
                </div>

                {/* Skills */}
                <div className="mt-4 flex gap-2">
                    <Box className="h-5 w-16 rounded-sm" />
                    <Box className="h-5 w-20 rounded-sm" />
                    <Box className="h-5 w-12 rounded-sm" />
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">

                    {/* Social Icons */}
                    <div className="flex items-center gap-2.5">
                        <Box className="h-3.5 w-3.5 rounded-full" />
                        <Box className="h-3.5 w-3.5 rounded-full" />
                        <Box className="h-3.5 w-3.5 rounded-full" />
                        <Box className="h-3.5 w-3.5 rounded-full" />
                    </div>

                    {/* Button */}
                    <Box className="h-8 w-24 rounded-sm" />

                </div>

            </div>

        </div>
    );
}