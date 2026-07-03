"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
    label?: string;
    className?: string;
    minHeight?: string;
}

export default function LoadingState({
    label = "Loading...",
    className = "",
    minHeight = "min-h-[400px]",
}: LoadingStateProps) {
    return (
        <div
            className={`flex ${minHeight} items-center justify-center gap-3 ${className}`}
        >
            <Loader2 className="h-6 w-6 animate-spin text-primary" />

            <span className="text-sm text-muted-foreground">
                {label}
            </span>
        </div>
    );
}