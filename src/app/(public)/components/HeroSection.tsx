"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Sketch from "@/assets/sketch.svg";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

export default function HeroSection() {
    return (
        <section className="relative px-4 pb-20 pt-20 sm:pt-36">

            {/* ── Decorative Blobs — no solid bg, just soft light ───────── */}

            {/* Center blob — main glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-5 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

            {/* Bottom-left corner */}
            <div className="pointer-events-none absolute -bottom-10 -left-20 z-5 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl" />

            {/* Bottom-right corner */}
            <div className="pointer-events-none absolute -bottom-10 -right-20 z-5 h-52 w-52 rounded-full bg-blue-200/20 blur-3xl" />

            <motion.div
                className="mx-auto max-w-7xl text-center z-10"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {/* Pill badge */}
                <motion.div
                    variants={fadeUp}
                    className="mb-6 inline-flex animate-bounce items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[13px] font-medium text-primary"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    Bangladesh&apos;s Trusted Learning Platform
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp}
                    className="relative mb-5 text-4xl font-bold leading-tight tracking-tight text-[#111827] md:text-5xl"
                >
                    Pure Knowledge,{" "}
                    <span className="text-primary">Right Path</span>
                    <Image
                        src={Sketch}
                        alt="Sketch"
                        className="absolute -bottom-8 right-5 opacity-70"
                    />
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={fadeUp}
                    className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-[#6b7280] md:text-lg"
                >
                    From recorded courses to in-person physical classes — learn the way
                    that suits you best. Gain real skills from Bangladesh&apos;s top
                    instructors.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-row items-center justify-center gap-4"
                >
                    <Link href="/courses">
                        <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/70 sm:text-base">
                            <span className="hidden sm:block">Browse</span>Courses
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-sm border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#374151] transition-colors duration-200 hover:border-primary/50 hover:text-primary sm:text-base">
                            Sign Up Free
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}