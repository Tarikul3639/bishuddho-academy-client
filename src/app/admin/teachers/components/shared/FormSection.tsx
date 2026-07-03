"use client";

import { ReactNode } from "react";

interface FormSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export default function FormSection({
    title,
    description,
    children,
    className = "",
}: FormSectionProps) {
    return (
        <section
            className={`rounded-lg border border-[#e5e7eb] bg-white ${className}`}
        >
            <div className="border-b border-[#e5e7eb] px-6 py-4">
                <h2 className="text-base font-semibold text-slate-900">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                )}
            </div>

            <div className="space-y-5 p-6">
                {children}
            </div>
        </section>
    );
}