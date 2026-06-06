"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
    LayoutDashboard, GraduationCap, User,
    LogOut, Settings, ChevronDown,
} from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AuthUser } from "@/types/auth-user";

interface Props {
    user: AuthUser;
    onLogout: () => void;
}

// ─── Menu config ──────────────────────────────────────────────────────────────

const STUDENT_MENU = [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/student/my-courses", icon: GraduationCap },
];

const ADMIN_MENU = [
    { label: "Admin Panel", href: "/admin/dashboard", icon: Settings },
    { label: "Manage Users", href: "/admin/users", icon: User },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function UserDropdown({ user, onLogout }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useClickOutside<HTMLDivElement>({
        onClose: () => setOpen(false),
    });

    const isAdmin = user.role === "admin";
    const menuItems = isAdmin ? ADMIN_MENU : STUDENT_MENU;

    const initials =
        user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase();

    return (
        <div ref={ref} className="relative">

            {/* Trigger */}
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 rounded-full border border-border/40 bg-white/60 px-3 py-1.5 text-sm font-medium text-[#374151] transition-all hover:border-primary/30 hover:text-primary cursor-pointer"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {initials}
                </span>
                <span className="hidden max-w-24 truncate sm:block">{user.name}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.1 } }}
                        className="absolute right-0 mt-2 py-1 w-52 overflow-hidden rounded-xl border border-white/50 bg-white shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] backdrop-blur-xl ring-1 ring-inset ring-white/60"
                    >
                        {/* User info */}
                        <div className="border-b border-border/30 px-4 py-3">
                            <p className="truncate text-sm font-semibold text-[#111827]">{user.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                            <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${isAdmin ? "bg-orange-100 text-orange-600" : "bg-primary/10 text-primary"
                                }`}>
                                {isAdmin ? "Admin" : "Student"}
                            </span>
                        </div>

                        {/* Menu items */}
                        <div className="p-1.5">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-[#374151] transition-colors hover:bg-primary/5 hover:text-primary"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-border/30 p-1.5">
                            <button
                                onClick={() => { onLogout(); setOpen(false); }}
                                className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Log Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}