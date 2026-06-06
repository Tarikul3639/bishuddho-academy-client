"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { ChevronDown, ChevronUp, CalendarDays } from "lucide-react";
import type { CourseModuleType, CourseClassType } from "@/types/public-course-details";

interface CourseModuleProps {
    module: CourseModuleType;
    defaultOpen?: boolean;
}

export function CourseModule({ module, defaultOpen = false }: CourseModuleProps) {
    const [open, setOpen] = useState(defaultOpen);

    const Icon = open ? ChevronUp : ChevronDown;

    return (
        <motion.div variants={fadeUp} className="overflow-hidden rounded-xl border border-border">
            {/* Header */}
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex w-full items-center justify-between bg-[#f9fafb] px-5 py-4 text-left transition-colors hover:bg-[#f3f4f6]"
            >
                <div className="flex items-center gap-3">
                    <Icon
                        className={`h-4 w-4 shrink-0 ${open ? "text-primary" : "text-[#6b7280]"
                            }`}
                    />
                    <span className="font-semibold text-[#111827]">
                        {module.title}
                    </span>
                </div>

                <span className="shrink-0 text-sm text-[#6b7280]">
                    {module.classes.length} sessions
                </span>
            </button>

            {/* Body */}
            {open && (
                <div className="divide-y divide-border border-t border-border">
                    {module.classes.map((cls: CourseClassType) => (
                        <div
                            key={cls.title}
                            className="flex items-center justify-between px-5 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                                <span className="text-sm text-[#374151]">
                                    {cls.title}
                                </span>
                            </div>

                            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                                {cls.session}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}