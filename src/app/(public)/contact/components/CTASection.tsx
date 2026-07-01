"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function CTASection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="py-20"
        >
            <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-blue-600 to-primary px-8 py-16 text-center md:px-16 md:py-24"
            >
                {/* Animated Background */}
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -25, 0],
                        y: [0, 20, 0],
                        scale: [1.1, 1, 1.1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-white/10 blur-3xl"
                />

                <motion.div
                    variants={container}
                    className="relative z-10"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="mb-4 text-3xl font-bold text-white md:text-4xl"
                    >
                        Transform Your Career With
                        <br />
                        <span className="text-blue-200">
                            Bishuddho Academy
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mb-8 max-w-2xl text-lg text-blue-100"
                    >
                        Start your learning journey today and join thousands of
                        successful students
                    </motion.p>

                    <motion.button
                        variants={fadeUp}
                        whileHover={{
                            scale: 1.06,
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.96,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 20,
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-primary shadow-lg transition-colors hover:bg-blue-50"
                    >
                        Get Started

                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ArrowRight size={18} />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}