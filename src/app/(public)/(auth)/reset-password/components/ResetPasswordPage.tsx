"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import Logo from "@/components/ui/Logo";
import { fadeUp, stagger } from "@/components/animations";

import { ForgotResetStep } from "./ForgotResetStep";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";

import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";

type Step = "reset" | "success";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [step, setStep] = useState<Step>("reset");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setError("This password reset link is invalid or has expired.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        if (!confirm.trim()) {
            setError("Please confirm your password.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setError("");

        try {
            const result = await resetPassword({
                token,
                password,
                confirmPassword: confirm,
            }).unwrap();

            toast.success(result.message);
            setStep("success");
        } catch (error: any) {
            setError(error?.data?.message ?? "Failed to reset password.");
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"
        >
            <motion.div
                variants={fadeUp}
                className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
                <div className="mb-8 flex justify-center">
                    <Logo />
                </div>

                <AnimatePresence mode="wait">
                    {step === "reset" && (
                        <motion.div
                            key="reset"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                        >
                            <ForgotResetStep
                                loading={isLoading}
                                error={error}
                                onSend={handleSubmit}
                                password={password}
                                setPassword={setPassword}
                                confirm={confirm}
                                setConfirm={setConfirm}
                            />
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                        >
                            <ResetPasswordSuccess onLogin={() => router.replace("/login")} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}