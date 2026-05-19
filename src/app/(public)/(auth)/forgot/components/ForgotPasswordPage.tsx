"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    ShieldCheck,
    Lock,
    ArrowRight,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/components/animations";

type Step = "email" | "code" | "reset" | "done";

function StepMap({ step }: { step: "email" | "code" | "reset" | "done" }) {
    const steps = [
        { key: "email", label: "Email" },
        { key: "code", label: "Code" },
        { key: "reset", label: "New Password" },
        { key: "done", label: "Done" },
    ] as const;

    const currentIndex = steps.findIndex((s) => s.key === step);

    return (
        <motion.div variants={fadeUp} className="relative mb-8 w-full px-2">
            {/* Background Connecting Line */}
            <div className="absolute left-6 right-6 top-4 h-0.5 -translate-y-1/2 bg-gray-200" />

            {/* Active Progress Line with Animation */}
            <div
                className="absolute left-6 top-4 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500 ease-in-out"
                style={{
                    width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                    maxWidth: "calc(100% - 3rem)"
                }}
            />

            {/* Steps Containers */}
            <div className="relative flex justify-between">
                {steps.map((s, index) => {
                    const active = index <= currentIndex;
                    const current = index === currentIndex;

                    return (
                        <div key={s.key} className="flex flex-col items-center">
                            {/* Step Number Circle */}
                            <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${active
                                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20 ring-4 ring-primary/10"
                                    : "border-gray-200 bg-white text-gray-400"
                                    } ${current ? "scale-110 font-bold" : ""}`}
                            >
                                {index + 1}
                            </div>

                            {/* Step Label */}
                            <span
                                className={`mt-2 text-center text-xs font-medium tracking-tight transition-colors duration-300 ${active ? "text-gray-900 font-semibold" : "text-gray-400"
                                    }`}
                            >
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    useEffect(() => {
        if (step !== "code") return;
        if (secondsLeft === 0) return;
        const timer = setInterval(() => {
            setSecondsLeft((s) => Math.max(0, s - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [step, secondsLeft]);

    const showMessage = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            showMessage("error", "Please enter your email address.");
            return;
        }

        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 1000));
            showMessage("success", "Verification code sent to your email.");
            setStep("code");
            setSecondsLeft(30);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        const joined = code.join("");
        if (joined.length !== 6) {
            showMessage("error", "Please enter the 6-digit code.");
            return;
        }

        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 1000));
            showMessage("success", "Code verified successfully.");
            setStep("reset");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (secondsLeft > 0) return;

        setResendLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 1000));
            showMessage("success", "A new code has been sent.");
            setSecondsLeft(30);
        } finally {
            setResendLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirm) {
            showMessage("error", "Please fill in both password fields.");
            return;
        }

        if (password.length < 8) {
            showMessage("error", "Password must be at least 8 characters.");
            return;
        }

        if (password !== confirm) {
            showMessage("error", "Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 1200));
            setStep("done");
        } finally {
            setLoading(false);
        }
    };

    const updateCode = (index: number, value: string) => {
        const digit = value.replace(/\D/g, "").slice(0, 1);
        const next = [...code];
        next[index] = digit;
        setCode(next);

        if (digit && index < 5) {
            const el = document.getElementById(`code-${index + 1}`);
            el?.focus();
        }
    };

    const handleBackspace = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const el = document.getElementById(`code-${index - 1}`);
            el?.focus();
        }
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="flex min-h-screen items-center justify-center bg-gray-50 font-sans px-4 py-12">
            <motion.div variants={fadeUp} className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center">
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
                        {message && (
                            <motion.div
                                key={message.text}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className={`mb-5 rounded-md border px-4 py-3 text-sm ${message.type === "success"
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                            >
                                {message.text}
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                                <div className="mb-7">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Forgot password
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter your email to receive a verification code
                                    </p>
                                </div>

                                <form onSubmit={handleSendCode} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="forgot-email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>

                                        <div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-1.5 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
                                            <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-primary" />
                                            <Input
                                                id="forgot-email"
                                                type="email"
                                                placeholder="you@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 w-full py-6 font-semibold shadow-sm transition-all"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Sending code
                                            </>
                                        ) : (
                                            <>
                                                Send code <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <p className="mt-6 text-center text-sm text-gray-500">
                                    Remember your password?{" "}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-primary hover:text-primary/80"
                                    >
                                        Sign in
                                    </Link>
                                </p>
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
                                <div className="mb-7">
                                    <div className="mb-3 flex items-center gap-2 text-primary">
                                        <ShieldCheck className="h-5 w-5" />
                                        <span className="text-sm font-medium">
                                            Verification step
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Enter the code
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        We sent a 6-digit code to <span className="font-medium">{email}</span>
                                    </p>
                                </div>

                                <form onSubmit={handleVerifyCode} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Verification code
                                        </label>

                                        <div className="grid grid-cols-6 gap-2">
                                            {code.map((digit, i) => (
                                                <input
                                                    key={i}
                                                    id={`code-${i}`}
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => updateCode(i, e.target.value)}
                                                    onKeyDown={(e) => handleBackspace(i, e)}
                                                    className="h-12 rounded-md border border-gray-200 bg-gray-50 text-center text-lg font-semibold outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 w-full py-6 font-semibold shadow-sm"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Verifying
                                            </>
                                        ) : (
                                            <>
                                                Verify code <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-5 flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={() => setStep("email")}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Change email
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={secondsLeft > 0 || resendLoading}
                                        className="font-semibold text-primary hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {resendLoading
                                            ? "Resending..."
                                            : secondsLeft > 0
                                                ? `Resend in ${secondsLeft}s`
                                                : "Resend code"}
                                    </button>
                                </div>
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
                                <div className="mb-7">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Set a new password
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Create a strong password for your account
                                    </p>
                                </div>

                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="new-pass"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            New password
                                        </label>
                                        <div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-1.5 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
                                            <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-primary" />
                                            <Input
                                                id="new-pass"
                                                type="password"
                                                placeholder="Min 8 characters"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="confirm-pass"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Confirm password
                                        </label>
                                        <div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-1.5 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
                                            <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-primary" />
                                            <Input
                                                id="confirm-pass"
                                                type="password"
                                                placeholder="Repeat password"
                                                value={confirm}
                                                onChange={(e) => setConfirm(e.target.value)}
                                                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 w-full py-6 font-semibold shadow-sm"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Updating
                                            </>
                                        ) : (
                                            <>
                                                Reset password <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
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
                                className="relative w-full text-center"
                            >
                                {/* Globe effect (Glowing blur behind the icon) */}
                                <div className="absolute left-1/2 top-10 z-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

                                <div className="relative z-10">
                                    <CheckCircle2 className="mx-auto h-14 w-14 text-primary/80" />
                                    <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                                        Password reset complete
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Your password has been updated successfully.
                                    </p>

                                    <Link
                                        href="/login"
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/80"
                                    >
                                        Back to sign in <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}