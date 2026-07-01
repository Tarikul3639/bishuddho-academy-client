"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, BookOpen, Award, GraduationCap } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stagger, fadeUp } from "@/components/animations";

import HeroIllustration from "@/components/illustrations/computer-training.svg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users, value: 1200, suffix: "+", label: "Students Taught" },
  { icon: BookOpen, value: 45, suffix: "+", label: "Courses" },
  { icon: Award, value: 98, suffix: "%", label: "Satisfaction" },
  { icon: GraduationCap, value: 5, suffix: "+", label: "Years Experience" },
];

// ─── Sub-sections ───────────────────────────────────────────────────────────────

function HeroContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary sm:text-sm">
                Computer Training Institute
            </span>

            <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl md:text-4xl">
                Build Your Digital Skills
                <span className="block text-primary">
                    With Practical Computer Training
                </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base line-clamp-3">
                Learn essential computer skills through practical,
                instructor-led training. Master Microsoft Office,
                Internet, Email, Typing, File Management, and other
                everyday digital skills in a friendly learning
                environment.
            </p>

            <div className="mt-8 flex gap-3 sm:flex-row">
                <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                    Explore Courses
                </Link>

                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-sm border border-gray-300 px-6 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 transition hover:border-primary hover:text-primary"
                >
                    Contact Us
                </Link>
            </div>
        </motion.div>
    );
}

function HeroIllustrationSection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
        >
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-56 w-56 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72" />
            </div>

            <Image
                src={HeroIllustration}
                alt="Computer training illustration"
                priority
                className="h-auto w-full max-w-70 sm:max-w-sm md:max-w-md"
            />
        </motion.div>
    );
}

function StatsCard() {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
            className="relative z-10 rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-10"
        >
            <div className="grid grid-cols-2 divide-y divide-gray-100 sm:divide-y-0 sm:divide-x md:grid-cols-4">
                {STATS.map((s, i) => (
                    <motion.div
                        key={s.label}
                        variants={fadeUp}
                        className={`flex flex-col items-center gap-2 px-2 py-4 text-center sm:py-0 ${
                            i % 2 === 0 ? "" : ""
                        }`}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <s.icon className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            <AnimatedCounter to={s.value} suffix={s.suffix} />
                        </p>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
                            {s.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
    return (
        <section className="overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-4 pt-10 lg:px-8 lg:pt-16">
                <div className="grid items-center gap-8 pb-16 lg:grid-cols-2 lg:gap-10 lg:pb-24">
                    <div className="order-2 lg:order-1">
                        <HeroContent />
                    </div>

                    <div className="order-1 lg:order-2">
                        <HeroIllustrationSection />
                    </div>
                </div>
            </div>

            {/* Floating stats card — overlaps the hero's bottom edge */}
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="-mt-3 lg:-mt-20">
                    <StatsCard />
                </div>
            </div>

            {/* Spacer so content after this section doesn't sit flush against the card */}
            <div className="h-10 lg:h-14" />
        </section>
    );
}