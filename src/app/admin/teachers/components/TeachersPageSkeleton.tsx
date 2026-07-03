"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { ArrowLeft } from "lucide-react";

export default function TeachersPageSkeleton() {
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-5 p-6"
        >
            {/* Back Button */}
            <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2"
            >
                <ArrowLeft className="h-4 w-4 text-gray-400" />
                <div className="h-3 w-32 animate-pulse rounded bg-slate-300" />
            </motion.div>

            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-start justify-between gap-6"
            >
                <div className="space-y-3">
                    <div className="h-8 w-64 animate-pulse rounded bg-slate-300" />
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="flex items-center gap-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-8 w-24 animate-pulse rounded-full bg-slate-200"
                        />
                    ))}

                    <div className="h-10 w-36 animate-pulse rounded-md bg-slate-300" />
                </div>
            </motion.div>

            {/* Filter */}
            <motion.div
                variants={fadeUp}
                className="rounded-lg border border-slate-300 bg-white p-4"
            >
                <div className="grid gap-3 md:grid-cols-4">
                    <div className="h-10 animate-pulse rounded-md bg-slate-200 md:col-span-2" />
                    <div className="h-10 animate-pulse rounded-md bg-slate-200" />
                    <div className="h-10 animate-pulse rounded-md bg-slate-200" />
                </div>
            </motion.div>

            {/* Result Count */}
            <motion.div variants={fadeUp}>
                <div className="h-3 w-44 animate-pulse rounded bg-slate-200" />
            </motion.div>

            {/* Table */}
            <motion.div
                variants={fadeUp}
                className="overflow-hidden rounded-lg border border-slate-300 bg-white"
            >
                {/* Header */}
                <div className="grid grid-cols-4 border-b border-slate-300 bg-slate-100 px-6 py-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-3 w-20 animate-pulse rounded bg-slate-300"
                        />
                    ))}
                </div>

                {/* Rows */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-4 items-center border-b border-slate-300 px-6 py-4 last:border-b-0"
                    >
                        {/* Teacher */}
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 animate-pulse rounded-full bg-slate-300" />

                            <div className="space-y-2">
                                <div className="h-3 w-32 animate-pulse rounded bg-slate-300" />
                                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex gap-2">
                            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                        </div>

                        {/* Order */}
                        <div className="flex justify-center gap-2">
                            <div className="h-8 w-8 animate-pulse rounded bg-slate-200" />
                            <div className="h-8 w-8 animate-pulse rounded bg-slate-200" />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            <div className="h-8 w-8 animate-pulse rounded bg-slate-200" />
                            <div className="h-8 w-8 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}