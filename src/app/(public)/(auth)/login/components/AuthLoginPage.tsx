"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LoginForm } from "./LoginForm";
import Logo from "@/components/ui/Logo";
import { fadeUp, stagger } from "@/components/animations";

export default function AuthLoginPage() {
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex min-h-screen items-center justify-center bg-gray-50 font-sans px-4 py-12"
        >
            <motion.div variants={fadeUp} className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center">
                <div  className="mb-10">
                    <Logo />
                </div>

                <div className="w-full max-w-md">
                    {/* Tabs */}
                    <div className="relative mb-8 flex rounded-xl bg-gray-100 p-1">
                        <motion.div
                            layoutId="auth-tab-indicator"
                            className="absolute inset-y-1 left-1 w-1/2 rounded-lg bg-white shadow-sm"
                            transition={{ type: "spring", stiffness: 420, damping: 35 }}
                        />

                        <Link
                            href="/login"
                            className="relative z-10 flex-1 py-2.5 text-center text-sm font-semibold text-gray-900"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/register"
                            className="relative z-10 flex-1 py-2.5 text-center text-sm font-semibold text-gray-500"
                        >
                            Register
                        </Link>
                    </div>

                    <motion.div
                        layoutId="auth-form"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <LoginForm />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
