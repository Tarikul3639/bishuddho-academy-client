"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyFieldProps {
    label: string;
    value: string;
}

export default function CopyField({ label, value }: CopyFieldProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex items-center justify-between rounded-sm border border-border bg-muted/40 px-3 py-2 transition-colors">
            {/* Left */}
            <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-card-foreground leading-tight">
                    {value}
                </p>
            </div>

            {/* Button */}
            <button
                onClick={handleCopy}
                className={`ml-3 flex shrink-0 items-center gap-1 rounded-sm border px-2 py-1 text-[11px] font-medium transition-all ${
                    copied
                        ? "border-green-200 bg-green-100 text-green-700 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-400"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                }`}
            >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Done" : "Copy"}
            </button>
        </div>
    );
}