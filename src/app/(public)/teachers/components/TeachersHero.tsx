"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function TeachersHero() {
    return (
        <section className="overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 lg:px-8 lg:pt-14">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary sm:text-sm">
                        <Users className="h-3.5 w-3.5" />
                        Our Expert Team
                    </span>

                    <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl md:text-4xl">
                        Meet Our{" "}
                        <span className="text-primary">
                            Dedicated Teachers
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                        Learn from experienced instructors and industry
                        professionals who are committed to helping you build
                        real-world skills at Bishuddho Academy.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}