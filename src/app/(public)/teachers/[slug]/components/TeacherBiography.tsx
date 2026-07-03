"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import { fadeUp } from "@/components/animations";

interface Props {
    biography?: string;
}

export default function TeacherBiography({
    biography,
}: Props) {
    if (!biography) return null;

    return (
        <motion.section
            variants={fadeUp}
            className="rounded-xl border border-slate-200 bg-white p-6 md:p-8"
        >
            <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-[#0d1b3e]">
                <BookOpen className="h-5 w-5 text-primary" />
                Biography
            </h2>

            <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {biography}
            </div>
        </motion.section>
    );
}