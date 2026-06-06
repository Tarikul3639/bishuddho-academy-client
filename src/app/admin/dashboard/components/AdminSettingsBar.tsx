// app/admin/dashboard/components/AdminSettingsBar.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { BookOpen, LayoutDashboard, Users, PlusCircle, Lock, Edit3, CreditCard, UserCog } from "lucide-react";
import Link from "next/link";

const OPTIONS = [
    {
        icon: LayoutDashboard,
        label: "Overview",
        href: "/admin/overview",
        bg: "bg-sky-100 text-sky-600 border-sky-100/50",
        hoverBg: "group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
    },
    {
        icon: BookOpen,
        label: "All Courses",
        href: "/admin/courses",
        bg: "bg-emerald-100 text-emerald-600 border-emerald-100/50",
        hoverBg: "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
    },
    {
        icon: PlusCircle,
        label: "New Course",
        href: "/admin/courses/new",
        bg: "bg-amber-100 text-amber-600 border-amber-100/50",
        hoverBg: "group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
    },
    {
        icon: UserCog,
        label: "Enrollments",
        href: "/admin/enrollments",
        bg: "bg-cyan-100 text-cyan-600 border-cyan-100/50",
        hoverBg: "group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600",
    },
    {
        icon: CreditCard,
        label: "Payments",
        href: "/admin/payments",
        bg: "bg-rose-100 text-rose-600 border-rose-100/50",
        hoverBg: "group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
    },
    {
        icon: Users,
        label: "User Management",
        href: "/admin/users",
        bg: "bg-violet-100 text-violet-600 border-violet-100/50",
        hoverBg: "group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600",
    },
    {
        icon: Lock,
        label: "Change Password",
        href: "/admin/password-change",
        bg: "bg-red-100 text-red-600 border-red-100/50",
        hoverBg: "group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600",
    },
    {
        icon: Edit3,
        label: "Edit Profile",
        href: "/admin/profile-edit",
        bg: "bg-orange-100 text-orange-600 border-orange-100/50",
        hoverBg: "group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
    },
] as const;

export default function AdminSettingsBar() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
            {OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                    <Link key={opt.label} href={opt.href}>
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -6, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${opt.bg} ${opt.hoverBg}`}>
                                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                            </div>
                            <span className="text-center text-xs font-bold tracking-wide text-[#6b7280] transition-colors duration-200 group-hover:text-[#0d1b3e]">
                                {opt.label}
                            </span>
                        </motion.div>
                    </Link>
                );
            })}
        </motion.div>
    );
}