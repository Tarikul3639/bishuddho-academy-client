"use client";

import { motion, type Variants } from "framer-motion";

export const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const ContactHeader = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="mb-16 text-center"
        >
            {/* Top line */}
            <motion.div
                variants={item}
                className="flex items-center justify-center gap-4 mb-6"
            >
                <div className="h-px w-10 bg-primary/40" />
                <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
                    Let’s Connect
                </span>
                <div className="h-px w-10 bg-primary/40" />
            </motion.div>

            {/* Heading */}
            <motion.h1
                variants={item}
                className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight"
            >
                Start a Conversation
                <br />
                <span className="text-primary font-bold">With Our Team</span>
            </motion.h1>

            {/* Description */}
            <motion.p
                variants={item}
                className="mt-5 max-w-lg mx-auto text-gray-600 text-sm md:text-base leading-relaxed"
            >
                Whether you’re a student, instructor, or partner — we’re always open to meaningful conversations and collaborations.
            </motion.p>

            {/* Bottom accent */}
            <motion.div
                variants={item}
                className="mt-8 flex items-center justify-center gap-2"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="h-px w-24 bg-linear-to-r from-primary/40 to-transparent" />
            </motion.div>
        </motion.div>
    );
};