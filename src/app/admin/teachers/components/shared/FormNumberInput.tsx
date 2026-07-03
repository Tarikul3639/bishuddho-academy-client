"use client";

import type { InputHTMLAttributes } from "react";

interface FormNumberInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    error?: string;
    required?: boolean;
}

export default function FormNumberInput({
    label,
    error,
    required,
    className = "",
    ...props
}: FormNumberInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <input
                type="number"
                {...props}
                className={`w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
            />

            {error && (
                <p className="text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}