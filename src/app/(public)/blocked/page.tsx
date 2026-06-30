"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, LogOut, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { clearUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function BlockedAccountPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch {
            // Ignore errors — clear local state anyway
        }
        dispatch(clearUser());
        router.replace("/login");
    };

    // Prevent going back to protected pages
    useEffect(() => {
        const handlePopState = () => {
            router.replace("/blocked");
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [router]);

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex min-h-screen items-center justify-center bg-background p-6"
        >
            <motion.div
                variants={fadeUp}
                className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-lg"
            >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    <ShieldAlert className="h-8 w-8 text-destructive" />
                </div>

                {/* Title */}
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-card-foreground">
                    Account Suspended
                </h1>

                {/* Description */}
                <p className="mb-6 text-sm font-medium text-muted-foreground">
                    Your account has been suspended by an administrator.
                    You no longer have access to the platform features.
                </p>

                {/* Contact Info */}
                <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>Please contact the administrator to resolve this issue.</span>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground transition-all hover:bg-destructive/80 cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </motion.div>
        </motion.main>
    );
}
