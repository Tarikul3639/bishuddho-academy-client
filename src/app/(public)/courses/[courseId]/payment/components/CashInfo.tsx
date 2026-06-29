"use client";

import { motion } from "framer-motion";
import { Banknote } from "lucide-react";

export default function CashInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-900/50 dark:bg-green-950/20"
        >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                <Banknote className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-semibold text-card-foreground">Pay at the Academy</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Visit Bishuddho Academy on your first day and complete your payment at the reception.
                Submit this request and we&apos;ll reserve your seat.
            </p>
        </motion.div>
    );
}
