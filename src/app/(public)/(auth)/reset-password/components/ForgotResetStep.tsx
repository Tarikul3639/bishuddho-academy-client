"use client";

import { Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";
import { PasswordRequirements } from "./PasswordRequirements";

interface Props {
    loading: boolean;
    error: string;
    onSend: (e: React.FormEvent) => void;
    password: string;
    setPassword: (value: string) => void;
    confirm: string;
    setConfirm: (value: string) => void;
}

export function ForgotResetStep({
    loading,
    error,
    onSend,
    password,
    setPassword,
    confirm,
    setConfirm,
}: Props) {
    return (
        <div>
            <div className="mb-7">
                <div className="mb-3 flex items-center gap-2 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-medium">Secure Password Reset</span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Create a new password
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Your new password should be strong and different from your previous
                    password.
                </p>
            </div>

            <form onSubmit={onSend} className="space-y-5">
                <InputField
                    label="New Password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={Lock}
                />

                <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    icon={Lock}
                    error={error}
                />

                <PasswordRequirements />

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full cursor-pointer py-6 font-semibold shadow-sm transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating Password...
                        </>
                    ) : (
                        <>
                            Reset Password
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}