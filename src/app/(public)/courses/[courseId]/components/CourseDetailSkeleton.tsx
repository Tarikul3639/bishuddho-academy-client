// components/courses/CourseDetailSkeleton.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";

// ── Pulse box helper ──────────────────────────────────────────────────────────

function Box({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    // Default skeleton color set to gray-200
    return <div className={`animate-pulse rounded-sm bg-gray-200 ${className}`} style={style} />;
}

// ── EnrollCard skeleton ───────────────────────────────────────────────────────

function EnrollCardSkeleton() {
    return (
        <div className="sticky top-24 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Thumbnail */}
            <div className="relative h-48 w-full animate-pulse bg-gray-200">
                {/* badge */}
                <div className="absolute left-3 top-3 h-6 w-24 animate-pulse rounded-full bg-gray-300" />
            </div>

            <div className="p-6">
                {/* Days left */}
                <Box className="mb-3 h-4 w-40 bg-gray-300" />

                {/* Price row */}
                <div className="mb-4 flex items-end gap-3">
                    <Box className="h-8 w-24 bg-gray-300" />
                    <Box className="mb-0.5 h-4 w-16" />
                    <Box className="mb-0.5 h-4 w-12" />
                </div>

                {/* Meta grid */}
                <div className="mb-4 grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
                    {[...Array(4)].map((_, i) => (
                        <Box key={i} className="h-5 w-full" />
                    ))}
                </div>

                {/* Schedule pill */}
                <Box className="mb-4 h-9 w-full rounded-lg" />

                {/* Seat progress */}
                <div className="mb-4">
                    <div className="mb-1.5 flex justify-between">
                        <Box className="h-3 w-20" />
                        <Box className="h-3 w-16" />
                    </div>
                    <Box className="h-2 w-full rounded-full bg-gray-300" />
                </div>

                {/* CTA button */}
                <Box className="h-12 w-full rounded-sm bg-gray-300" />
            </div>
        </div>
    );
}

// ── CourseHeader skeleton ─────────────────────────────────────────────────────

function CourseHeaderSkeleton() {
    return (
        <div className="mb-8 border-b border-gray-200 pb-8">
            {/* Badge */}
            <Box className="mb-3 h-6 w-24 rounded-full bg-gray-300" />

            {/* Title */}
            <Box className="mb-2 h-8 w-3/4 bg-gray-300" />
            <Box className="mb-2 h-8 w-1/2 bg-gray-300" />

            {/* Tagline */}
            <Box className="mb-3 h-4 w-2/3" />

            {/* Description */}
            <Box className="mb-1.5 h-3.5 w-full" />
            <Box className="mb-4 h-3.5 w-5/6" />

            {/* Rating row */}
            <div className="mb-3 flex flex-wrap items-center gap-3">
                <Box className="h-4 w-8 bg-gray-300" />
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Box key={i} className="h-3.5 w-3.5 bg-gray-300" />)}
                </div>
                <Box className="h-4 w-20" />
                <Box className="h-4 w-24" />
            </div>

            {/* Instructor */}
            <Box className="mt-3 h-4 w-40" />

            {/* Meta pills */}
            <div className="mt-4 flex flex-wrap gap-3">
                {[...Array(3)].map((_, i) => (
                    <Box key={i} className="h-9 w-36 rounded-lg" />
                ))}
            </div>
        </div>
    );
}

// ── CourseModule skeleton ─────────────────────────────────────────────────────

function CourseModuleSkeleton({ open = false }: { open?: boolean }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Header */}
            <div className="flex w-full items-center justify-between bg-gray-50 px-5 py-4">
                <div className="flex items-center gap-3">
                    <Box className="h-4 w-4 bg-gray-300" />
                    <Box className="h-4 w-40 bg-gray-300" />
                </div>
                <Box className="h-3.5 w-16" />
            </div>

            {/* Body — only for first module (defaultOpen) */}
            {open && (
                <div className="divide-y divide-gray-200 border-t border-gray-200">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between px-5 py-3">
                            <div className="flex items-center gap-3">
                                <Box className="h-3.5 w-3.5 bg-gray-300" />
                                <Box className="h-3.5 w-48" />
                            </div>
                            <Box className="h-5 w-20 rounded-full" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── CourseDescription skeleton ────────────────────────────────────────────────

function CourseDescriptionSkeleton() {
    return (
        <div>
            {/* Heading */}
            <Box className="mb-5 h-6 w-40 bg-gray-300" />

            {/* Tagline */}
            <Box className="mb-3 h-5 w-56" />

            {/* Description lines */}
            <div className="mb-4 space-y-2">
                <Box className="h-4 w-full" />
                <Box className="h-4 w-11/12" />
                <Box className="h-4 w-4/5" />
            </div>

            {/* Second paragraph */}
            <div className="mb-5 space-y-2">
                <Box className="h-4 w-full" />
                <Box className="h-4 w-3/4" />
            </div>

            {/* What's included */}
            <Box className="mb-3 h-5 w-32 bg-gray-300" />
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Box className="h-4 w-4 shrink-0 rounded-full bg-gray-300" />
                        <Box className="h-4" style={{ width: `${60 + i * 6}%` }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Main Skeleton ─────────────────────────────────────────────────────────────

export function CourseDetailSkeleton() {
    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="min-h-screen bg-white pb-24 pt-24"
        >
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

                    {/* RIGHT — EnrollCard */}
                    <motion.div
                        variants={fadeUp}
                        className="order-1 flex justify-center lg:order-2 lg:justify-end"
                    >
                        <div className="w-full max-w-md">
                            <EnrollCardSkeleton />
                        </div>
                    </motion.div>

                    {/* LEFT */}
                    <div className="order-2 lg:order-1">

                        {/* Header */}
                        <motion.div variants={fadeUp}>
                            <CourseHeaderSkeleton />
                        </motion.div>

                        {/* Modules */}
                        <motion.div variants={fadeUp} className="mb-10">
                            <Box className="mb-5 h-6 w-36 bg-gray-300" />
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {[...Array(4)].map((_, i) => (
                                    <motion.div key={i} variants={fadeUp}>
                                        <CourseModuleSkeleton open={i === 0} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Description */}
                        <motion.div variants={fadeUp}>
                            <CourseDescriptionSkeleton />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}