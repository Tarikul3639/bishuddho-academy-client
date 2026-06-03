"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ForgotDoneStep() {
    return (
        <div className="relative w-full text-center">
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
        </div>
    );
}