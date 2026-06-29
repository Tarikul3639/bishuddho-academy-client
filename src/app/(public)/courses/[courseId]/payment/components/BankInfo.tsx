"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { type METHODS } from "@/components/payment/types";
import CopyField from "./CopyField";

interface BankInfoProps {
    method: (typeof METHODS)[number] & {
        bankDetails: {
            bankName: string;
            accountName: string;
            accountNumber: string;
            branch: string;
            routingNumber?: string;
        };
    };
}

export default function BankInfo({ method }: BankInfoProps) {
    const bank = method.bankDetails;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
        >
            <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-card-foreground">{bank.bankName}</p>
                        <p className="text-[11px] text-muted-foreground">{bank.branch}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <CopyField label="Account Name" value={bank.accountName} />
                    <CopyField label="Account Number" value={bank.accountNumber} />
                    <CopyField label="Branch" value={bank.branch} />
                    {bank.routingNumber && (
                        <CopyField label="Routing Number" value={bank.routingNumber} />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
