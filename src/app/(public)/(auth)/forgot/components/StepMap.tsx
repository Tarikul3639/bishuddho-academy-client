"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";

type Step = "email" | "code" | "reset" | "done";

export function StepMap({ step }: { step: Step }) {
    const steps = [
        { key: "email", label: "Email" },
        { key: "code", label: "Code" },
        { key: "reset", label: "New Password" },
        { key: "done", label: "Done" },
    ] as const;

    const currentIndex = steps.findIndex((s) => s.key === step);

    return (
        <motion.div variants={fadeUp} className="relative mb-8 w-full px-2">
            <div className="absolute left-6 right-6 top-4 h-0.5 -translate-y-1/2 bg-gray-200" />

            <div
                className="absolute left-6 top-4 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500 ease-in-out"
                style={{
                    width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                    maxWidth: "calc(100% - 3rem)",
                }}
            />

            <div className="relative flex justify-between">
                {steps.map((s, index) => {
                    const active = index <= currentIndex;
                    const current = index === currentIndex;

                    return (
                        <div key={s.key} className="flex flex-col items-center">
                            <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${active
                                        ? "border-primary bg-primary text-white shadow-md shadow-primary/20 ring-4 ring-primary/10"
                                        : "border-gray-200 bg-white text-gray-400"
                                    } ${current ? "scale-110 font-bold" : ""}`}
                            >
                                {index + 1}
                            </div>

                            <span
                                className={`mt-2 text-center text-xs font-medium tracking-tight transition-colors duration-300 ${active ? "font-semibold text-gray-900" : "text-gray-400"
                                    }`}
                            >
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}