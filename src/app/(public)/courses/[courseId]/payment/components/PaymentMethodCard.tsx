"use client";

import { Check, Copy, Smartphone, Building2, Banknote, Wallet } from "lucide-react";
import { type METHODS } from "@/components/payment/types";

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
            className={`group relative flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all duration-200 cursor-pointer ${
                selected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
            }`}
        >
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded transition-colors ${
                    selected
                        ? "text-white"
                        : "bg-muted text-muted-foreground group-hover:text-primary"
                }`}
                style={selected ? { backgroundColor: method.color } : {}}
            >
                {METHOD_ICONS[method.id] || <Wallet className="h-5 w-5" />}
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-semibold text-card-foreground">{method.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{method.description}</p>
            </div>

            <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30 bg-transparent"
                }`}
            >
                {selected && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
            </div>
        </button>
    );
}
