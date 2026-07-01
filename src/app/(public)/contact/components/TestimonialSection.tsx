"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, stagger } from "@/components/animations";
import Image from "next/image";

const TESTIMONIALS = [
    {
        id: 1,
        text: "Bishuddho Academy's courses were transformative. The instructors are knowledgeable and the learning experience is seamless.",
        author: "Ahmed Hassan",
        role: "Software Developer at TechCorp",
        image: "/images/testimonials/1.jpg",
    },
    {
        id: 2,
        text: "I completed the Python course and got a job within 2 months. The practical approach and real-world projects helped tremendously.",
        author: "Sarah Khan",
        role: "Data Analyst at DataPro",
        image: "/images/testimonials/2.jpg",
    },
    {
        id: 3,
        text: "The cloud computing course opened new opportunities for my career. Highly recommended for anyone looking to upskill.",
        author: "Md Rauf",
        role: "Cloud Engineer at CloudTech",
        image: "/images/testimonials/3.jpg",
    },
    {
        id: 4,
        text: "Best investment in my education. The cybersecurity fundamentals course made me job-ready in just 3 months.",
        author: "Fatima Islam",
        role: "Security Analyst at SafeGuard",
        image: "/images/testimonials/4.jpg",
    },
];

export function TestimonialSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="py-16"
        >
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-12 text-center">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                    TESTIMONIALS
                </p>

                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    Trusted by students across
                    <br />
                    <span className="text-primary">
                        Bangladesh & Beyond
                    </span>
                </h2>

                <p className="mx-auto max-w-2xl text-gray-600">
                    Join thousands of learners who have transformed their
                    careers with Bishuddho Academy
                </p>
            </motion.div>

            {/* Testimonials Grid */}
            <motion.div
                variants={stagger}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
                {TESTIMONIALS.map((testimonial) => (
                    <motion.div
                        key={testimonial.id}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                            {/* Stars */}
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: i * 0.3,
                                            duration: 0.5,
                                        }}
                                    >
                                        <Star
                                            size={16}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="mb-6 text-sm italic leading-relaxed text-gray-700">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100"
                                >
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        width={44}
                                        height={44}
                                        className="h-full w-full object-cover"
                                    />
                                </motion.div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {testimonial.author}
                                    </p>

                                    <p className="text-xs text-gray-600">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}