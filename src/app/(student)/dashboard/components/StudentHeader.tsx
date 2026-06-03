// components/dashboard/StudentHeader.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Courses", href: "#", active: false },
    { label: "Exams", href: "#", active: false },
];

export default function StudentHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.header
            variants={fadeUp}
            className="sticky top-0 bg-surface z-50 shadow-sm border-b border-outline-variant"
        >
            <div className="flex justify-between items-center h-16 max-w-container-max px-margin-mobile md:px-margin-desktop w-full mx-auto">
                {/* Logo Section */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-headline-md font-bold text-primary cursor-pointer"
                >
                    Scholarly
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`font-medium transition-all duration-200 relative group ${
                                item.active
                                    ? "text-primary font-bold"
                                    : "text-on-surface-variant hover:text-primary"
                            }`}
                        >
                            {item.label}
                            {item.active && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions Section */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-surface-container rounded-lg transition-colors active:scale-95 relative group"
                    >
                        <Bell size={20} className="text-primary" />
                        {/* Notification Badge */}
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full"
                        />
                        {/* Tooltip */}
                        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-on-surface text-surface text-label-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Notifications
                        </span>
                    </motion.button>

                    {/* Settings */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-surface-container rounded-lg transition-colors active:scale-95 relative group"
                    >
                        <Settings size={20} className="text-primary" />
                        {/* Tooltip */}
                        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-on-surface text-surface text-label-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Settings
                        </span>
                    </motion.button>

                    {/* Profile Avatar */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                    >
                        <img
                            alt="User profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6ChtxK0I15LYtvBGMdiNves-sains-lULsg6TrRq-SDe7gwDshDlFUvHdXYp0Ay68quDHuskM6X8gCdo9lj3yHNeKOp1n3g2-gnWschMBXzm0_6KR8XqLh4HPxcMVj9t1InptbjMAdN1BywHoqckMs4RdXObm2D7eDorCmtuO0X6tv-RCTYWtnATd6_ZRn7o3zTFb0rK4HiMNQNuP4KY5oEJVaAmsRyBaK6SMU3LpVR4NwCt15qieMASG7i182UVjvdyRxAhaFw"
                            className="w-full h-full object-cover"
                        />
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-surface-container rounded-lg transition-colors"
                    >
                        <svg
                            className="w-6 h-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    mobileMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    height: mobileMenuOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden border-t border-outline-variant"
            >
                <div className="flex flex-col gap-2 px-margin-mobile py-4 bg-surface-container-low">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`px-4 py-3 rounded-lg transition-all ${
                                item.active
                                    ? "bg-primary text-white font-bold"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </motion.nav>
        </motion.header>
    );
}