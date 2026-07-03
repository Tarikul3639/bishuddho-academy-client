"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/components/animations";

export default function TeachersErrorState() {
    return (
        <motion.div
            variants={fadeUp}
            className="py-20 text-center"
        >
            <p className="text-base font-semibold text-red-500">
                Failed to load teachers
            </p>

            <p className="mt-1 text-sm text-gray-500">
                Please try again later.
            </p>
        </motion.div>
    );
}