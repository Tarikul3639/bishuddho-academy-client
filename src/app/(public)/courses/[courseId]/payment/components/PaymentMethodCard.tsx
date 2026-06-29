"use client";

import { Check, Copy, Smartphone, Building2, Banknote, Wallet } from "lucide-react";
import { type METHODS } from "./types";

const METHOD_ICONS: Record<string, React.ReactNode> = {
    bkash: <Smartphone className="h-5 w-5" />,
    nagad: <Smartphone className="h-5 w-5" />,
    rocket: <Smartphone className="h-5 w-5" />,
    bank_transfer: <Building2 className="h-5 w-5" />,
    cash: <Banknote className="h-5 w-5" />,
};

interface PaymentMethodCardProps {
    method: (typeof METHODS)[number];
    selected: boolean;
    onSelect: () => void;
}

export default function PaymentMethodCard({ method, selected, onSelect }: PaymentMethodCardProps) {
    return (
        <button
            onClick={onSelect}
            className={`group relative flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                selected
                    ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
            }`}
        >
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded transition-colors ${
                    selected
                        ? "text-white"
                        : "bg-muted text-muted-foreground group-hover:text-primary"
                }`}
                style={selected ? { backgroundColor: method.color } : {}}
            >
                {icons[method.id] || <Wallet className="h-4 w-4" />}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-card-foreground">{method.name}</p>
                <p className="text-[11px] text-muted-foreground">{method.description}</p>
            </div>

            <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
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
