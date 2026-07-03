"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

import { fadeUp } from "@/components/animations";

interface Props {
    skills: string[];
}

export default function TeacherSkills({
    skills,
}: Props) {
    if (!skills?.length) return null;

    return (
        <motion.section
            variants={fadeUp}
            className="rounded-xl border border-slate-200 bg-white p-6 md:p-8"
        >
            <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-[#0d1b3e]">
                <Code2 className="h-5 w-5 text-primary" />
                Skills & Expertise
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-md border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.section>
    );
}