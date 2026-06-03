"use client";

import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

interface Props {
    email: string;
    setEmail: (value: string) => void;
    loading: boolean;
    error: string;
    onSend: (e: React.FormEvent) => void;
}

export function ForgotEmailStep({
    email,
    setEmail,
    loading,
    error,
    onSend,
}: Props) {
    return (
        <div>
            <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Forgot password
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Enter your email to receive a verification code
                </p>
            </div>

            <form onSubmit={onSend} className="space-y-4">
                <InputField
                    label="Email address"
                    name="forgot-email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={Mail}
                    error={error}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full py-6 font-semibold shadow-sm transition-all cursor-pointer"
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
                <a href="/login" className="font-semibold text-primary hover:text-primary/80">
                    Sign in
                </a>
            </p>
        </div>
    );
}