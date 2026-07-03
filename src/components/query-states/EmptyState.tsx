"use client";

import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    className?: string;
    minHeight?: string;
    action?: React.ReactNode;
}

export default function EmptyState({
    title = "Nothing here yet",
    description = "There are no items to display.",
    className = "",
    minHeight = "min-h-[400px]",
    action,
}: EmptyStateProps) {
    return (
        <div
            className={`flex ${minHeight} flex-col items-center justify-center gap-4 ${className}`}
        >
            <Inbox className="h-12 w-12 text-gray-400" />

            <div className="space-y-1 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                </h2>

                <p className="max-w-sm text-sm text-gray-500">
                    {description}
                </p>
            </div>

            {action}
        </div>
    );
}