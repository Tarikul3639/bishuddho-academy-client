"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, BookOpen, AlertCircle } from "lucide-react";

import { fadeUp, stagger } from "@/components/animations";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboard.api";

const CARD_CONFIG = [
    {
        key: "totalStudents",
        icon: Users,
        label: "Total Students",
        bg: "#eef3ff",
        border: "#c7d7fd",
        color: "#1a56db",
        subColor: "#16a34a",
    },
    {
        key: "totalRevenue",
        icon: DollarSign,
        label: "Total Revenue",
        bg: "#f0fdf4",
        border: "#bbf7d0",
        color: "#16a34a",
        subColor: "#16a34a",
    },
    {
        key: "activeCourses",
        icon: BookOpen,
        label: "Active Courses",
        bg: "#fffbeb",
        border: "#fde68a",
        color: "#d97706",
        subColor: "#d97706",
    },
    {
        key: "pendingPayments",
        icon: AlertCircle,
        label: "Pending Payments",
        bg: "#fef2f2",
        border: "#fecaca",
        color: "#ef4444",
        subColor: "#ef4444",
    },
] as const;

export default function StatsRow() {
    const { data, isLoading, isError } = useGetDashboardStatsQuery();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse rounded-2xl border border-[#e5e7eb] bg-white p-4 sm:p-5"
                    >
                        <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="h-3 w-24 rounded-sm bg-slate-200 sm:w-28" />
                            <div className="h-8 w-8 shrink-0 rounded-xl bg-slate-200 sm:h-9 sm:w-9" />
                        </div>
                        <div className="mb-2 h-7 w-20 rounded-sm bg-slate-200 sm:h-8 sm:w-24" />
                        <div className="h-3 w-28 rounded-sm bg-slate-200 sm:w-32" />
                    </div>
                ))}
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-medium text-red-600">
                    Failed to load dashboard statistics.
                </p>
            </div>
        );
    }

    const { stats } = data;

    const cards = [
        {
            ...CARD_CONFIG[0],
            value: stats.totalStudents.toLocaleString(),
            sub: `+${stats.newStudentsThisMonth} this month`,
        },
        {
            ...CARD_CONFIG[1],
            value: `৳${stats.totalRevenue.toLocaleString()}`,
            sub: `+৳${stats.revenueThisMonth.toLocaleString()} this month`,
        },
        {
            ...CARD_CONFIG[2],
            value: stats.activeCourses.toString(),
            sub: `${stats.upcomingCourses} starting soon`,
        },
        {
            ...CARD_CONFIG[3],
            value: stats.pendingPayments.toString(),
            sub: "Needs verification",
        },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.label}
                        variants={fadeUp}
                        className="rounded-2xl border p-4 sm:p-5"
                        style={{
                            background: card.bg,
                            borderColor: card.border,
                        }}
                    >
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <p
                                className="flex-1 text-[10px] font-bold uppercase tracking-wide sm:text-[12px] sm:tracking-widest"
                                style={{
                                    color: card.color,
                                }}
                            >
                                {card.label}
                            </p>

                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9"
                                style={{
                                    background: `${card.color}18`,
                                }}
                            >
                                <Icon
                                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                                    style={{
                                        color: card.color,
                                    }}
                                />
                            </div>
                        </div>

                        <p className="mb-1 wrap-break-word text-2xl font-extrabold text-[#0d1b3e] sm:text-3xl">
                            {card.value}
                        </p>

                        <p
                            className="text-[11px] font-medium leading-5 sm:text-[12px]"
                            style={{
                                color: card.subColor,
                            }}
                        >
                            {card.sub}
                        </p>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}