"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    onLogin?: () => void;
}

export function ResetPasswordSuccess({ onLogin }: Props) {
    return (
        <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>

            {/* Title */}
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                Password Updated
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-gray-500">
                Your password has been changed successfully.
                <br />
                You can now sign in using your new password.
            </p>

            {/* Success Card */}
            <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-5 text-left">
                <h3 className="text-sm font-semibold text-green-800">What's next?</h3>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-green-700">
                    <li>• Return to the login page.</li>
                    <li>• Sign in using your new password.</li>
                    <li>• Keep your password secure and never share it.</li>
                </ul>
            </div>

            {/* Login Button */}
            <div className="mt-8">
                {onLogin ? (
                    <Button
                        onClick={onLogin}
                        className="w-full cursor-pointer py-6 font-semibold"
                    >
                        Go to Login
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Link href="/login">
                        <Button className="w-full cursor-pointer py-6 font-semibold">
                            Go to Login
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </div>

            {/* Footer */}
            <p className="mt-6 text-xs leading-6 text-gray-400">
                Your account is now protected with your new password.
            </p>
        </div>
    );
}