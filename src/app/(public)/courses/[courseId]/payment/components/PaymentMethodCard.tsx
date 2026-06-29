"use client";

import { Check, Smartphone, Building2, Banknote, Wallet } from "lucide-react";
import { type METHODS } from "./types";

const METHOD_ICONS: Record<string, React.ReactNode> = {
    bkash: <Smartphone className="h-4 w-4" />,
    nagad: <Smartphone className="h-4 w-4" />,
    rocket: <Smartphone className="h-4 w-4" />,
    bank_transfer: <Building2 className="h-4 w-4" />,
    cash: <Banknote className="h-4 w-4" />,
};

interface PaymentMethodCardProps {
    method: (typeof METHODS)[number];
    selected: boolean;
    onSelect: () => void;
}

export default function PaymentMethodCard({
    method,
    selected,
    onSelect,
}: PaymentMethodCardProps) {
    return (
        <button
            onClick={onSelect}
            className={`group relative flex w-full items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-all duration-200 ${
                selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:bg-muted/40"
            }`}
        >
            {/* Icon */}
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-all ${
                    selected
                        ? "text-white shadow-sm"
                        : "bg-muted text-muted-foreground group-hover:text-primary"
                }`}
                style={selected ? { backgroundColor: method.color } : {}}
            >
                {METHOD_ICONS[method.id] || <Wallet className="h-4 w-4" />}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-card-foreground">
                    {method.name}
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                    {method.description}
                </p>
            </div>

            {/* Check */}
            <div
                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    selected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30 bg-transparent"
                }`}
            >
                {selected && <Check className="h-3 w-3 text-white" />}
            </div>
        </button>
    );
}