"use client";

import { motion } from "framer-motion";
import { makeRef, SENDER_REF, type METHODS } from "@/components/payment/types";
import CopyField from "./CopyField";

interface MobileBankingInfoProps {
    method: (typeof METHODS)[number] & { number: string; accountType?: string };
    price: number;
}

export default function MobileBankingInfo({ method, price }: MobileBankingInfoProps) {
    const ref = makeRef(SENDER_REF);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
        >
            {/* Amount to pay */}
            <div
                className="rounded-lg border-2 p-4 text-center"
                style={{ borderColor: method.color + "40", backgroundColor: method.color + "08" }}
            >
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Amount to Send
                </p>
                <p className="mt-1 text-2xl font-bold" style={{ color: method.color }}>
                    ৳{price.toLocaleString()}
                </p>
            </div>

            {/* Payment number */}
            <div className="space-y-3">
                <p className="text-sm font-semibold text-card-foreground">
                    Send money to this {method.name} number:
                </p>
                <CopyField
                    label={`${method.name} ${method.accountType || "Personal"} Number`}
                    value={method.number}
                />
            </div>

            {/* Reference */}
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                    Reference / Note (when sending)
                </p>
                <div className="mt-2">
                    <CopyField label="Reference Code" value={ref} />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                    Add this reference so we can identify your payment.
                </p>
            </div>
        </motion.div>
    );
}
