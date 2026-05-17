import { motion, type Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import StarRating from "./StarRating";


const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0, 0, 0.2, 1] },
    },
};

export type Course = {
    title: string;
    instructor: string;
    thumbnail: StaticImageData;
    price: string;
    rating: number;
    reviewCount: number;
};


export default function CourseCard({ course }: { course: Course }) {
    return (
        <motion.div
            variants={fadeUp}
            className="group overflow-hidden rounded-lg border border-[#e5e7eb] bg-white transition-shadow duration-300 hover:shadow-md"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#eff6ff]">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                />
            </div>

            {/* Card body */}
            <div className="p-3.5">
                <h3 className="mb-1 text-base font-bold leading-snug text-[#111827] line-clamp-2">
                    {course.title}
                </h3>

                <p className="mb-2 text-sm text-[#6b7280]">{course.instructor}</p>

                <StarRating rating={course.rating} count={course.reviewCount} />

                <div className="mt-2.5 flex items-center justify-between">
                    <p className="text-lg font-bold text-[#111827]">{course.price}</p>
                    <Link href="/courses">
                        <button className="flex items-center gap-0.5 text-sm font-medium text-primary hover:underline cursor-pointer">
                            View <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}