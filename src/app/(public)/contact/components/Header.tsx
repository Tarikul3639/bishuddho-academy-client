"use client";

import { motion, type Variants } from "framer-motion";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

// ─── 1. Header Component ──────────────────────────────────────────────────────
export default function ContactHeader() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-14 text-center"
        >
            <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                <span className="relative mr-2 flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span>Contact</span>
            </span>
            <h1 className="text-3xl font-bold text-[#111827] md:text-4xl">
                Get in Touch
            </h1>
            <p className="mt-3 text-[#6b7280]">
                Have a question or want to enroll? We&apos;re here to help.
            </p>
        </motion.div>
    );
}