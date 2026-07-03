"use client";

import { TriangleAlert } from "lucide-react";

interface ErrorStateProps {
    message?: string;
    buttonText?: string;
    className?: string;
    minHeight?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    message = "Something went wrong.",
    buttonText = "Try Again",
    className = "",
    minHeight = "min-h-[400px]",
    onRetry,
}: ErrorStateProps) {
    return (
        <div
            className={`flex ${minHeight} flex-col items-center justify-center gap-4 ${className}`}
        >
            <TriangleAlert className="h-12 w-12 text-red-500" />

            <div className="space-y-1 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    Oops!
                </h2>

                <p className="text-sm text-gray-500">
                    {message}
                </p>
            </div>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
}