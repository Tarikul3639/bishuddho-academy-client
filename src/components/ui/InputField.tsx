"use client";

import { useState } from "react";
import {
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    LucideIcon,
} from "lucide-react";

interface InputFieldProps {
    label?: string;
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number" | "tel";
    textarea?: boolean;
    rows?: number;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    success?: string;
    hint?: string;
    className?: string;
    icon?: LucideIcon;
}

export function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    textarea = false,
    rows = 4,
    disabled = false,
    required = false,
    error,
    success,
    hint,
    className = "",
    icon: Icon,
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const baseClass =
        "w-full rounded-md border py-3 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50";

    const stateClass = error
        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        : success
            ? "border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
            : "border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20";

    return (
        <div className={className}>
            {label && (
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <div className="relative group flex items-center">
                {/* Left Icon */}
                {Icon && (
                    <Icon
                        className={`absolute left-3 z-10 h-4 w-4 transition-colors ${error
                                ? "text-red-500"
                                : success
                                    ? "text-primary"
                                    : "text-gray-400 group-focus-within:text-primary"
                            }`}
                    />
                )}

                {textarea ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                        className={`${baseClass} resize-none px-4 ${stateClass} ${Icon ? "pl-10" : ""
                            }`}
                    />
                ) : (
                    <input
                        name={name}
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`${baseClass} ${stateClass} ${Icon ? "pl-10" : "px-4"
                            } ${isPassword ? "pr-10" : ""}`}
                    />
                )}

                {/* Right Action Icons Container */}
                <div className="absolute right-3 flex items-center gap-1.5">
                    {/* Password Toggle */}
                    {isPassword && !textarea && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    )}

                    {/* Error Icon */}
                    {error && <AlertCircle className="h-4 w-4 text-red-500" />}

                    {/* Success Icon */}
                    {success && !error && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                </div>
            </div>

            {/* Bottom Feedbacks */}
            {hint && !error && !success && (
                <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
            )}

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
            )}

            {success && !error && (
                <p className="mt-1.5 text-xs font-medium text-primary">{success}</p>
            )}
        </div>
    );
}