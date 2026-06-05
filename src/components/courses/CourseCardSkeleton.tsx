// components/CourseCardSkeleton.tsx
import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";

export const CourseCardSkeleton = () => {
    return (
        <motion.div
            variants={fadeUp}
            className="flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full shrink-0 bg-[#f3f4f6]">
                <div className="absolute inset-0 animate-pulse bg-[#f3f4f6]" />

                {/* Badges row */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2">
                    <div className="h-4 w-14 animate-pulse rounded-sm bg-[#e5e7eb]" />
                    <div className="h-4 w-12 animate-pulse rounded-sm bg-[#e5e7eb]" />
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4">

                {/* Title — 2 lines */}
                <div className="mb-1 space-y-1.5">
                    <div className="h-3.5 w-full animate-pulse rounded-sm bg-[#f3f4f6]" />
                    <div className="h-3.5 w-4/5 animate-pulse rounded-sm bg-[#f3f4f6]" />
                </div>

                {/* Tagline */}
                <div className="mb-2.5 h-3 w-3/5 animate-pulse rounded-sm bg-[#f3f4f6]" />

                {/* Instructor */}
                <div className="mb-3 h-3 w-2/5 animate-pulse rounded-sm bg-[#f3f4f6]" />

                {/* Star rating */}
                <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-3 w-3 animate-pulse rounded-sm bg-[#f3f4f6]" />
                    ))}
                    <div className="h-3 w-8 animate-pulse rounded-sm bg-[#f3f4f6]" />
                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-[#f3f4f6]" />

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-end gap-1.5">
                        <div className="h-5 w-16 animate-pulse rounded-sm bg-[#f3f4f6]" />
                        <div className="mb-0.5 h-3 w-12 animate-pulse rounded-sm bg-[#f3f4f6]" />
                    </div>
                    <div className="h-8 w-24 animate-pulse rounded-lg bg-[#f3f4f6]" />
                </div>
            </div>
        </motion.div>
    );
}

/* Example usage in CoursesGrid.tsx:

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
            <CourseCardSkeleton key={i} />
        ))}
    </div>
*/