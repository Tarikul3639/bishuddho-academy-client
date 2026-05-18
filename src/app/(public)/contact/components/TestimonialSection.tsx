"use client";

import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const TESTIMONIALS = [
    {
        id: 1,
        text: "Bishuddho Academy's courses were transformative. The instructors are knowledgeable and the learning experience is seamless.",
        author: "Ahmed Hassan",
        role: "Software Developer at TechCorp",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    },
    {
        id: 2,
        text: "I completed the Python course and got a job within 2 months. The practical approach and real-world projects helped tremendously.",
        author: "Sarah Khan",
        role: "Data Analyst at DataPro",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        id: 3,
        text: "The cloud computing course opened new opportunities for my career. Highly recommended for anyone looking to upskill.",
        author: "Md Rauf",
        role: "Cloud Engineer at CloudTech",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rauf",
    },
    {
        id: 4,
        text: "Best investment in my education. The cybersecurity fundamentals course made me job-ready in just 3 months.",
        author: "Fatima Islam",
        role: "Security Analyst at SafeGuard",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    },
];

export function TestimonialSection() {
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="py-16"
        >
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-12 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                    TESTIMONIALS
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Trusted by students across
                    <br />
                    <span className="text-primary">Bangladesh & Beyond</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Join thousands of learners who have transformed their careers with Bishuddho Academy
                </p>
            </motion.div>

            {/* Testimonials Grid */}
            <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {TESTIMONIALS.map((testimonial) => (
                    <motion.div key={testimonial.id} variants={fadeUp}>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">
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
