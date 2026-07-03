"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { Lock, Edit3, BookOpen } from "lucide-react";
import Link from "next/link";

const OPTIONS = [
    {
        icon: BookOpen,
        label: "My Courses",
        href: "/student/my-courses",
        bg: "bg-emerald-100 text-emerald-600 border-emerald-100/50",
        hoverBg: "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600"
    },
    {
        icon: Lock,
        label: "Change Password",
        href: "/student/password-change",
        bg: "bg-purple-100 text-purple-600 border-purple-100/50",
        hoverBg: "group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600"
    },
    {
        icon: Edit3,
        label: "Edit Profile",
        href: "/student/profile-edit",
        bg: "bg-orange-100 text-orange-600 border-orange-100/50",
        hoverBg: "group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600"
    }
];

export default function SettingsBar() {
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