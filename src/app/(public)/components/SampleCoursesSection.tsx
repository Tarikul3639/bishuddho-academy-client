"use client";

import { motion, type Variants } from "framer-motion";
import { Star, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import one from "@/assets/thumbnails/one.jpg";
import two from "@/assets/thumbnails/tow.jpg";
import three from "@/assets/thumbnails/three.jpg";
import four from "@/assets/thumbnails/foure.jpg";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const SAMPLE_COURSES = [
    {
        title: "Introduction to JavaScript",
        instructor: "MD Tarikul Islam",
        thumbnail: one, // replace with real image path
        price: "TK 49.99",
        rating: 4,
        reviewCount: 4,
    },
    {
        title: "Advanced Python Programming",
        instructor: "MD Nayem Hossain",
        thumbnail: two,
        price: "TK 79.99",
        rating: 4,
        reviewCount: 5,
    },
    {
        title: "Cloud Computing Essentials",
        instructor: "MD Arifur Rahman",
        thumbnail: three,
        price: "TK 89.99",
        rating: 3,
        reviewCount: 5,
    },
    {
        title: "Cybersecurity Basics",
        instructor: "MD Tanvir Ahmed",
        thumbnail: four,
        price: "TK 59.49",
        rating: 4.5,
        reviewCount: 3,
    },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-amber-800">{rating}</span>
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                    />
                ))}
            </div>
            <span className="text-xs text-[#6b7280]">({count})</span>
        </div>
    );
}

function CourseCard({ course }: { course: (typeof SAMPLE_COURSES)[0] }) {
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

export default function SampleCoursesSection() {
    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Section header */}
                    <motion.h2
                        variants={fadeUp}
                        className="mb-3 text-center text-2xl font-bold text-[#111827] sm:text-3xl"
                    >
                        Learn from the best
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mb-12 max-w-2xl text-center text-base text-[#6b7280]"
                    >
                        Discover our top-rated courses across various categories. From
                        coding and design to business and wellness, our courses are crafted
                        to deliver results.
                    </motion.p>

                    {/* Course cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
                        {SAMPLE_COURSES.map((course) => (
                            <CourseCard key={course.title} course={course} />
                        ))}
                    </div>

                    {/* CTA button */}
                    <motion.div variants={fadeUp} className="mt-10 text-center">
                        <Link href="/courses">
                            <button className="relative group inline-flex items-center gap-2 rounded border border-[#c9cbcf] bg-white px-8 py-3.5 text-sm font-semibold text-[#656a70] overflow-hidden cursor-pointer transition-colors duration-300 hover:border-[#1a56db] scale-98">
                                {/* Background fill animation */}
                                <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>

                                {/* Text */}
                                <span className="relative flex gap-2 z-10 transition-colors duration-300 group-hover:text-gray-100">
                                    View All Courses
                                    <ArrowRight className="h-5 w-5" />
                                </span>
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
