"use client";

import { motion } from "framer-motion";
import { CourseHeader } from "./CourseHeader";
import { CourseModule } from "./CourseModule";
import { CourseDescription } from "./CourseDescription";
import { EnrollCard } from "./EnrollCard";

import { fadeUp, stagger } from "@/components/animations";
import thumbnailImg from "@/assets/thumbnails/one.jpg";
import { useState } from "react";
import PaymentModal from "@/components/payment/PaymentModal";

interface ModuleType {
    id: number;
    title: string;
    sessions: number;
    duration: string;
    classes: {
        title: string;
        session: string;
    }[];
}

interface Props {
    course: {
        title: string;
        tagline: string;
        modules: ModuleType[];
        description: string;
        rating: number;
        ratingCount: number;
        students: number;
        instructor: string;
        schedule: string;
        location: string;
        startDate: string;
        type: string;
        price: number;
        originalPrice: number;
        discount: number;
        daysLeft: number;
        duration: string;
        lessons: number;
        totalSeats: number;
        bookedSeats: number;
        includes: string[];
    };
}

export function CourseDetailPage({ course }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="min-h-screen bg-white pb-24 pt-24"
        >
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
                    {/* RIGHT */}
                    <motion.div
                        variants={fadeUp}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="w-full max-w-md">
                            <EnrollCard
                                course={course}
                                thumbnailImg={thumbnailImg}
                                onEnroll={() => setModalOpen(true)}
                            />
                        </div>
                    </motion.div>

                    {/* LEFT */}
                    <div className="order-2 lg:order-1">
                        <motion.div variants={fadeUp}>
                            <CourseHeader course={course} />
                        </motion.div>

                        <motion.div variants={fadeUp} className="mb-10">
                            <h2 className="mb-5 text-xl font-bold text-[#111827]">
                                Course Structure
                            </h2>

                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {course.modules.map((module: ModuleType, i: number) => (
                                    <motion.div key={module.id} variants={fadeUp}>
                                        <CourseModule module={module} defaultOpen={i === 0} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <CourseDescription course={course} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                course={{ title: course.title, price: course.price }}
            />
        </motion.main>
    );
}
