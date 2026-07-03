"use client";

import Link from "next/link";
import {
    Mail,
    ArrowRight,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

interface Props {
    email: string;

    setEmail: (
        value: string,
    ) => void;

    loading: boolean;

    error: string;

    onSend: (
        e: React.FormEvent,
    ) => void;
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
                    Forgot your password?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Enter the email address associated with your account.
                    We'll send you a secure password reset link.
                </p>
            </div>

            <form
                onSubmit={onSend}
                className="space-y-5"
            >
                <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value,
                        )
                    }
                    icon={Mail}
                    error={error}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full cursor-pointer py-6 text-sm font-semibold shadow-sm transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending Reset Link...
                        </>
                    ) : (
                        <>
                            Send Reset Link
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs leading-6 text-blue-700">
                    We'll send a password reset link to your
                    email. The link will expire after a short
                    period for your security.
                </p>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-primary transition hover:text-primary/80"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}