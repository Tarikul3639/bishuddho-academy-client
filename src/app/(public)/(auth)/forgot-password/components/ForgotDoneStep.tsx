"use client";

import Link from "next/link";
import { MailCheck, RefreshCw, ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";

interface Props {
    email: string;
    onBack: () => void;
}

export function ForgotDoneStep({ email, onBack }: Props) {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleResend = async () => {
        try {
            await forgotPassword({ email }).unwrap();
            toast.success("Password reset link sent successfully.");
        } catch {
            toast.error("Failed to send password reset link. Please try again.");
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MailCheck className="h-6 w-6 text-primary" />
                </div>
            </div>

            <div className="mt-4 text-center">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                    Check your email
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    We've sent a password reset link to
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-primary">
                    {email}
                </p>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                    Open the email, click the reset link, create a new password,
                    then return to the login page.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading}
                    className="w-full cursor-pointer py-6 sm:col-span-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="h-4 w-4" />
                            Resend Email
                        </>
                    )}
                </Button>

                <button
                    type="button"
                    onClick={onBack}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Change Email
                </button>

                <Link href="/login" className="block">
                    <button
                        type="button"
                        className="w-full cursor-pointer rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-black"
                    >
                        Back to Login
                    </button>
                </Link>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Didn't receive the email? Check your spam folder or resend the
                email.
            </p>
        </>
    );
}