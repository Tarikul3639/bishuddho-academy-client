"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

import { fadeUp } from "@/components/animations";

export default function TeachersEmptyState() {
    return (
        <motion.div
            variants={fadeUp}
            className="py-20 text-center"
        >
            <Users className="mx-auto h-12 w-12 text-gray-300" />

            <p className="mt-4 text-base font-semibold text-gray-700">
                No teachers found
            </p>

            <p className="mt-1 text-sm text-gray-500">
                Try another search keyword.
            </p>
        </motion.div>
    );
}