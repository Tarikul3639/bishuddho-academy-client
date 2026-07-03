// app/admin/payments/components/PaymentsTable.tsx
"use client";

import { motion } from "framer-motion";
import { stagger } from "@/components/animations";
import { Loader2 } from "lucide-react";
import type { AdminPurchase } from "@/redux/features/purchases/admin-purchases.api";
import { PaymentRow } from "./PaymentRow";

export default function PaymentsTable({
    data, isLoading, onVerify, onReject,
}: {
    data: AdminPurchase[];
    isLoading?: boolean;
    onVerify: (id: string) => void;
    onReject: (id: string) => void;
}) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white py-16">
                <Loader2 className="h-6 w-6 animate-spin text-[#1a56db]" />
                <span className="ml-2 text-sm text-[#6b7280]">Loading payments...</span>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white py-16 text-center">
                <p className="text-[14px] font-semibold text-[#6b7280]">No payments found</p>
                <p className="mt-1 text-[12px] text-[#9ca3af]">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                            {[
                                { label: "Student", cls: "" },
                                { label: "Course", cls: "hidden lg:table-cell" },
                                { label: "Method / TrxID", cls: "hidden md:table-cell" },
                                { label: "Amount", cls: "hidden text-right sm:table-cell" },
                                { label: "Status", cls: "" },
                                { label: "Actions", cls: "" },
                            ].map((h) => (
                                <th
                                    key={h.label}
                                    className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}
                                >
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                        {data.map((e) => (
                            <PaymentRow
                                key={e.id}
                                purchase={e}
                                onVerify={onVerify}
                                onReject={onReject}
                            />
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}