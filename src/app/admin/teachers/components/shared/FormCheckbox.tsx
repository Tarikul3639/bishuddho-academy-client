"use client";

import type { InputHTMLAttributes } from "react";

interface FormCheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    description?: string;
}

export default function FormCheckbox({
    label,
    description,
    className = "",
    ...props
}: FormCheckboxProps) {
    return (
        <label
            className={`flex cursor-pointer items-start gap-3 rounded-md border border-[#e5e7eb] p-4 transition hover:border-primary/40 ${className}`}
        >
            <input
                type="checkbox"
                {...props}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary"
            />

            <div>
                <p className="text-sm font-medium text-slate-800">
                    {label}
                </p>

                {description && (
                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>
                )}
            </div>
        </label>
    );
}