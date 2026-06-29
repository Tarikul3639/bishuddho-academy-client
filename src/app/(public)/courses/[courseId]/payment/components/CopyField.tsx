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
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between rounded border border-border bg-muted/50 px-3 py-2">
            <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-card-foreground">{value}</p>
            </div>
            <button
                onClick={handleCopy}
                className={`ml-3 flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                    copied
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                }`}
            >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
            </button>
        </div>
    );
}
