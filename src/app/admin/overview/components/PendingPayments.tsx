// app/admin/dashboard/components/PendingPayments.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { CheckCircle, XCircle } from "lucide-react";

interface Payment {
    id:     string;
    name:   string;
    course: string;
    method: "bkash" | "nagad" | "cash";
    trxId?: string;
    amount: number;
    date:   string;
}

const METHOD_CONFIG = {
    bkash: { label: "bKash", bg: "#FDF2F8", color: "#E2136E", border: "#FBCFE8" },
    nagad: { label: "Nagad", bg: "#FFF8F0", color: "#F7941D", border: "#FDE68A" },
    cash:  { label: "Cash",  bg: "#F0FDF4", color: "#059669", border: "#BBF7D0" },
};

// TODO: replace with real API data
const PENDING: Payment[] = [
    { id: "1", name: "Sadia Akter",  course: "Graphic Design",        method: "nagad", trxId: "9K2L5M8NQ1", amount: 3500, date: "May 27" },
    { id: "2", name: "Mitu Begum",   course: "Web Development",       method: "bkash", trxId: "8N5A2K9XQ3", amount: 3500, date: "May 25" },
    { id: "3", name: "Arif Hossain", course: "Digital Marketing",     method: "cash",  trxId: undefined,    amount: 2500, date: "May 24" },
    { id: "4", name: "Nasrin Akter", course: "Graphic Design",        method: "bkash", trxId: "7B3C1D6EP4", amount: 3500, date: "May 23" },
];

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function PendingPayments() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl border border-[#fecaca] bg-[#fff5f5] p-5 shadow-sm"
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-[#0d1b3e]">Pending Payments</h2>
                <span className="rounded-full bg-[#fee2e2] px-2.5 py-1 text-[11px] font-bold text-[#ef4444]">
                    {PENDING.length} pending
                </span>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
                {PENDING.map((p) => {
                    const m = METHOD_CONFIG[p.method];
                    return (
                        <motion.div
                            key={p.id}
                            variants={fadeUp}
                            className="rounded-xl border border-[#e5e7eb] bg-white p-3.5"
                        >
                            <div className="mb-3 flex items-center gap-3">
                                {/* Avatar */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#f59e0b] to-[#ef4444] text-[12px] font-bold text-white">
                                    {getInitials(p.name)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[13px] font-bold text-[#0d1b3e]">{p.name}</p>
                                    <p className="truncate text-[11px] text-[#6b7280]">{p.course}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold text-[#0d1b3e]">৳{p.amount.toLocaleString()}</p>
                                    <p className="text-[11px] text-[#9ca3af]">{p.date}</p>
                                </div>
                            </div>

                            {/* Method + TrxID */}
                            <div className="mb-3 flex items-center gap-2">
                                <span
                                    className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
                                    style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}
                                >
                                    {m.label}
                                </span>
                                {p.trxId && (
                                    <span className="rounded-lg bg-[#f3f4f6] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#374151]">
                                        {p.trxId}
                                    </span>
                                )}
                                {!p.trxId && (
                                    <span className="text-[11px] text-[#9ca3af]">Cash — no TrxID</span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#dcfce7] py-2 text-[12px] font-bold text-[#16a34a] transition-colors hover:bg-[#bbf7d0]">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    Verify
                                </button>
                                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#fee2e2] py-2 text-[12px] font-bold text-[#ef4444] transition-colors hover:bg-[#fecaca]">
                                    <XCircle className="h-3.5 w-3.5" />
                                    Reject
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}