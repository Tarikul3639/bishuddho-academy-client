"use client";

import { motion } from "framer-motion";
import { makeRef, SENDER_REF, type METHODS } from "./types";
import CopyField from "./CopyField";

interface MobileBankingInfoProps {
    method: (typeof METHODS)[number] & { number: string; accountType?: string };
    price: number;
}

export default function MobileBankingInfo({ method, price }: MobileBankingInfoProps) {
    const ref = makeRef(SENDER_REF);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
        >
            {/* Amount */}
            <div
                className="rounded-lg border p-3 text-center"
                style={{
                    borderColor: method.color + "35",
                    backgroundColor: method.color + "06",
                }}
            >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Amount to Send
                </p>
                <p
                    className="mt-0.5 text-xl font-bold leading-none"
                    style={{ color: method.color }}
                >
                    ৳{price.toLocaleString()}
                </p>
            </div>

            {/* Payment Number */}
            <div className="space-y-1.5">
                <p className="text-sm font-semibold text-card-foreground">
                    Send money to {method.name}
                </p>

                <CopyField
                    label={`${method.name} ${method.accountType ?? "Personal"} Number`}
                    value={method.number}
                />
            </div>

            {/* Reference */}
            <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3 space-y-2">
                <div>
                    <p className="text-[11px] font-medium text-muted-foreground">
                        Reference Code
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                        Use this when sending payment
                    </p>
                </div>

                <CopyField label="Ref ID" value={ref} />
            </div>
        </motion.div>
    );
}