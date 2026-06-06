// app/admin/dashboard/components/StatsRow.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { Users, DollarSign, BookOpen, AlertCircle } from "lucide-react";

// TODO: replace with real API data
const STATS = [
    {
        icon:   Users,
        label:  "Total Students",
        value:  "128",
        sub:    "+12 this month",
        bg:     "#eef3ff",
        border: "#c7d7fd",
        color:  "#1a56db",
        subColor: "#16a34a",
    },
    {
        icon:   DollarSign,
        label:  "Total Revenue",
        value:  "৳4,48,000",
        sub:    "+৳28,000 this month",
        bg:     "#f0fdf4",
        border: "#bbf7d0",
        color:  "#16a34a",
        subColor: "#16a34a",
    },
    {
        icon:   BookOpen,
        label:  "Active Courses",
        value:  "6",
        sub:    "2 starting soon",
        bg:     "#fffbeb",
        border: "#fde68a",
        color:  "#d97706",
        subColor: "#d97706",
    },
    {
        icon:   AlertCircle,
        label:  "Pending Payments",
        value:  "14",
        sub:    "Needs verification",
        bg:     "#fef2f2",
        border: "#fecaca",
        color:  "#ef4444",
        subColor: "#ef4444",
    },
] as const;

export default function StatsRow() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
            {STATS.map((s) => {
                const Icon = s.icon;
                return (
                    <motion.div
                        key={s.label}
                        variants={fadeUp}
                        className="rounded-2xl border p-5"
                        style={{ background: s.bg, borderColor: s.border }}
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: s.color }}>
                                {s.label}
                            </p>
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-xl"
                                style={{ background: `${s.color}18` }}
                            >
                                <Icon className="h-4 w-4" style={{ color: s.color }} />
                            </div>
                        </div>
                        <p className="mb-1 text-3xl font-extrabold text-[#0d1b3e]">{s.value}</p>
                        <p className="text-[12px] font-medium" style={{ color: s.subColor }}>{s.sub}</p>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}