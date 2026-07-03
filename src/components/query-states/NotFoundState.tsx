"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";

interface NotFoundStateProps {
    title?: string;
    description?: string;
    href?: string;
    buttonText?: string;
    className?: string;
    minHeight?: string;
}

export default function NotFoundState({
    title = "Not Found",
    description = "The resource you're looking for doesn't exist or has been removed.",
    href = "/",
    buttonText = "Go Home",
    className = "",
    minHeight = "min-h-[400px]",
}: NotFoundStateProps) {
    return (
        <div
            className={`flex ${minHeight} flex-col items-center justify-center gap-4 ${className}`}
        >
            <SearchX className="h-12 w-12 text-gray-400" />

            <div className="space-y-1 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                </h2>

                <p className="max-w-sm text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <Link
                href={href}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
                {buttonText}
            </Link>
        </div>
    );
}