"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronDown, CalendarDays, Check } from "lucide-react";
import type { StudentCourseModule } from "@/types/student-course-details";

function ModuleAccordion({
    mod, defaultOpen, index
}: {
    mod: StudentCourseModule; defaultOpen: boolean; index: number;
}) {
    const [open, setOpen] = useState(defaultOpen);

    const isModuleDone = mod.classes.every((cls) => cls.completed === true);
    const isModuleActive = mod.classes.some((cls) => cls.completed === true) && !isModuleDone;

    return (
        <div className="overflow-hidden rounded-lg border border-[#eaebed] bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#f3f9ff] transition-all duration-200"
            >
                <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-[13px] font-bold"
                    style={{
                        background: isModuleDone ? "#dcfce7" : isModuleActive ? "#eef3ff" : "#dee0e3",
                        color: isModuleDone ? "#16a34a" : isModuleActive ? "#1a56db" : "#6a7280",
                    }}
                >
                    {isModuleDone ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1">
                    <p className="text-[14px] font-bold text-gray-800">{mod.title}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500 capitalize">
                        {index + 1} sessions
                    </p>
                </div>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
                >
                    <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
                </motion.div>
            </button>

            <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
                className="overflow-hidden"
            >
                <div className="border-t border-[#f3f4f6] px-5 pb-4 pt-3">
                    <div className="flex flex-col gap-2">
                        {mod.classes.map((cls, i) => {
                            const completed =
                                cls.completed;

                            return (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${completed
                                            ? "bg-[#f0fdf4]"
                                            : "bg-[#f9fafb]"
                                        }`}
                                >
                                    <div
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm"
                                        style={{
                                            background: completed
                                                ? "#dcfce7"
                                                : "#e5e7eb",
                                        }}
                                    >
                                        {completed ? (
                                            <CheckCircle className="h-3.5 w-3.5 text-[#16a34a]" />
                                        ) : (
                                            <CalendarDays className="h-3.5 w-3.5 text-gray-500" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <p
                                            className={`text-[13px] font-medium ${completed
                                                    ? "text-green-700"
                                                    : "text-gray-900"
                                                }`}
                                        >
                                            {cls.title}
                                        </p>

                                        <p className="text-[11px] text-gray-500">
                                            {cls.session}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ModuleAccordion;