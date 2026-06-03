// app/admin/dashboard/components/AdminBanner.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { ShieldCheck, Users, LayoutDashboard, Camera, Settings } from "lucide-react";
import { useRef } from "react";

// TODO: replace with real admin data from Redux/session
const ADMIN = {
    name:      "Tarikul Islam",
    email:     "admin@bishuddho.com",
    adminId:   "ADMIN-001",
    role:      "Super Admin",
    joinedDate: "Jan 2026",
    totalStudents: 128,
    avatar:    "",
};

export default function AdminBanner() {
    const inputRef = useRef<HTMLInputElement>(null);

    const initials = ADMIN.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative overflow-hidden rounded-2xl border border-[#fde68a]/40"
        >
            {/* Blobs — amber/orange theme for admin */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#f59e0b]/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-[#ef4444]/6 blur-2xl" />

            {/* Wave SVG */}
            <div className="absolute bottom-0 left-0 w-full leading-0">
                <svg
                    viewBox="0 0 1440 100"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="block w-full h-full"
                    style={{ height: "120px" }}
                >
                    <path
                        fill="#f59e0b"
                        fillOpacity="0.6"
                        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
                    />
                    <path
                        fill="#f59e0b"
                        fillOpacity="0.6"
                        d="M0,55 C200,20 400,70 720,55 C1040,40 1240,65 1440,50 L1440,80 L0,80 Z"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 py-6 sm:p-6 md:p-10">
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
                >
                    {/* Avatar */}
                    <motion.div variants={fadeUp} className="relative shrink-0">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-[#fde68a] bg-white p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:h-28 md:w-28">
                            <div className="h-full w-full overflow-hidden rounded-full">
                                {ADMIN.avatar ? (
                                    <img src={ADMIN.avatar} alt={ADMIN.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#f59e0b] to-[#ef4444] text-2xl font-bold tracking-wider text-white">
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Camera button */}
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#fde68a] bg-white text-[#92400e] shadow-sm transition-all hover:border-[#f59e0b] hover:text-[#d97706] active:scale-90"
                            title="Update Photo"
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => console.log(e.target.files?.[0]?.name)}
                        />
                    </motion.div>

                    {/* Info */}
                    <motion.div variants={fadeUp} className="space-y-3">

                        {/* Name + role badge */}
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-xl font-extrabold tracking-tight text-[#0d1b3e] sm:text-2xl md:text-3xl">
                                {ADMIN.name}
                            </h1>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#fde68a] bg-[#fffbeb] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#92400e] sm:text-[11px]">
                                <ShieldCheck className="h-3.5 w-3.5 text-[#f59e0b]" />
                                {ADMIN.role}
                            </span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2 text-[#92400e]">
                            <Settings className="h-4 w-4 text-[#d97706]" />
                            <span className="text-sm font-medium">{ADMIN.email}</span>
                        </div>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                            {[
                                { icon: ShieldCheck,    label: ADMIN.adminId                          },
                                { icon: Users,          label: `${ADMIN.totalStudents} Total Students` },
                                { icon: LayoutDashboard, label: `Joined ${ADMIN.joinedDate}`           },
                            ].map((pill) => (
                                <span
                                    key={pill.label}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-[#fde68a]/60 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold text-[#374151] backdrop-blur-xl transition-colors hover:border-[#f59e0b] hover:bg-[#fffbeb] hover:text-[#92400e] sm:text-xs"
                                >
                                    <pill.icon className="h-3.5 w-3.5 text-[#f59e0b]" />
                                    {pill.label}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}