"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";

import Logo from "@/components/ui/Logo";
import { ForgotEmailStep } from "./ForgotEmailStep";
import { ForgotCodeStep } from "./ForgotCodeStep";
import { ForgotResetStep } from "./ForgotResetStep";
import { ForgotDoneStep } from "./ForgotDoneStep";
import { StepMap } from "./StepMap";

type Step = "email" | "code" | "reset" | "done";

type ErrorState = {
    email: string;
    code: string;
    reset: string;
};

type LoadingState = {
    email: boolean;
    code: boolean;
    reset: boolean;
};

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [error, setError] = useState<ErrorState>({
        email: "",
        code: "",
        reset: "",
    });

    const [loading, setLoading] = useState<LoadingState>({
        email: false,
        code: false,
        reset: false,
    });

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setError((prev) => ({
                ...prev,
                email: "Email is required.",
            }));
            return;
        }

        setError((prev) => ({
            ...prev,
            email: "",
        }));

        setLoading((prev) => ({
            ...prev,
            email: true,
        }));

        try {
            await new Promise((r) => setTimeout(r, 1000));
            setStep("code");
        } finally {
            setLoading((prev) => ({
                ...prev,
                email: false,
            }));
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();

        const joined = code.join("");

        if (joined.length !== 6) {
            setError((prev) => ({
                ...prev,
                code: "Please enter the 6-digit code.",
            }));
            return;
        }

        setError((prev) => ({
            ...prev,
            code: "",
        }));

        setLoading((prev) => ({
            ...prev,
            code: true,
        }));

        try {
            await new Promise((r) => setTimeout(r, 1000));
            setStep("reset");
        } finally {
            setLoading((prev) => ({
                ...prev,
                code: false,
            }));
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password.trim() || !confirm.trim()) {
            setError((prev) => ({
                ...prev,
                reset: "Please fill in both password fields.",
            }));
            return;
        }

        if (password.length < 8) {
            setError((prev) => ({
                ...prev,
                reset: "Password must be at least 8 characters.",
            }));
            return;
        }

        if (password !== confirm) {
            setError((prev) => ({
                ...prev,
                reset: "Passwords do not match.",
            }));
            return;
        }

        setError((prev) => ({
            ...prev,
            reset: "",
        }));

        setLoading((prev) => ({
            ...prev,
            reset: true,
        }));

        try {
            await new Promise((r) => setTimeout(r, 1200));
            setStep("done");
        } finally {
            setLoading((prev) => ({
                ...prev,
                reset: false,
            }));
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 font-sans"
        >
            <motion.div
                variants={fadeUp}
                className="flex w-full max-w-lg flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
                <motion.div variants={fadeUp} className="mb-8">
                    <Logo />
                </motion.div>

                <StepMap step={step} />

                <motion.div
                    layoutId="auth-form"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                >
                    <AnimatePresence mode="wait">
                        {step === "email" && (
                            <motion.div
                                key="email"
                                layoutId="forgot-password"
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ForgotEmailStep
                                    email={email}
                                    setEmail={setEmail}
                                    loading={loading.email}
                                    error={error.email}
                                    onSend={handleEmailSubmit}
                                />
                            </motion.div>
                        )}

                        {step === "code" && (
                            <motion.div
                                key="code"
                                layoutId="forgot-password"
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ForgotCodeStep
                                    email={email}
                                    loading={loading.code}
                                    error={error.code}
                                    onSend={handleVerifyCode}
                                    onBackToEmail={() => setStep("email")}
                                    code={code}
                                    setCode={setCode}
                                />
                            </motion.div>
                        )}

                        {step === "reset" && (
                            <motion.div
                                key="reset"
                                layoutId="forgot-password"
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ForgotResetStep
                                    loading={loading.reset}
                                    error={error.reset}
                                    onSend={handleResetPassword}
                                    password={password}
                                    setPassword={setPassword}
                                    confirm={confirm}
                                    setConfirm={setConfirm}
                                />
                            </motion.div>
                        )}

                        {step === "done" && (
                            <motion.div
                                key="done"
                                layoutId="forgot-password"
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ForgotDoneStep />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}