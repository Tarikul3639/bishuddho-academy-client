"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    email: string;
    onBackToEmail: () => void;
    loading: boolean;
    error: string;
    onSend: (e: React.FormEvent) => void;
    code: string[];
    setCode: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ForgotCodeStep({
    email,
    onBackToEmail,
    loading,
    error,
    onSend,
    code,
    setCode,
}: Props) {
    const [resendLoading, setResendLoading] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);

    useEffect(() => {
        if (secondsLeft === 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((s) => Math.max(0, s - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

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

    const handleResend = async () => {
        if (secondsLeft > 0) return;

        setResendLoading(true);

        try {
            await new Promise((r) => setTimeout(r, 1000));
            setSecondsLeft(30);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-7">
                <div className="mb-3 flex items-center gap-2 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-medium">Verification step</span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Enter the code
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    We sent a 6-digit code to <span className="font-medium">{email}</span>
                </p>
            </div>

            <form onSubmit={onSend} className="space-y-4">
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

                    {error && (
                        <p className="mt-5 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full py-6 font-semibold shadow-sm cursor-pointer"
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
                    onClick={onBackToEmail}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
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
        </div>
    );
}