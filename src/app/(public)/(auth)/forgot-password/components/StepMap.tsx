"use client";

import { Mail, CheckCircle2 } from "lucide-react";

interface StepMapProps {
    step: "email" | "done";
}

export function StepMap({
    step,
}: StepMapProps) {
    const isDone = step === "done";

    return (
        <div className="mb-6 flex w-full items-center justify-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                        step === "email"
                            ? "border-primary bg-primary text-white"
                            : "border-green-500 bg-green-500 text-white"
                    }`}
                >
                    <Mail className="h-5 w-5" />
                </div>

                <span className="mt-2 text-xs font-medium text-gray-600">
                    Email
                </span>
            </div>

            {/* Line */}
            <div
                className={`mx-4 h-0.5 w-20 transition ${
                    isDone
                        ? "bg-green-500"
                        : "bg-gray-200"
                }`}
            />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                        isDone
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white text-gray-400"
                    }`}
                >
                    <CheckCircle2 className="h-5 w-5" />
                </div>

                <span className="mt-2 text-xs font-medium text-gray-600">
                    Email Sent
                </span>
            </div>
        </div>
    );
}