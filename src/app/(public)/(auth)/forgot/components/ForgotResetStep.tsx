"use client";

import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

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
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Set a new password
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Create a strong password for your account
                </p>
            </div>

            <form onSubmit={onSend} className="space-y-4">
                <InputField
                    label="New password"
                    name="new-pass"
                    type="password"
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={Lock}
                    error={error}
                />

                <InputField
                    label="Confirm password"
                    name="confirm-pass"
                    type="password"
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    icon={Lock}
                    error={error}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full py-6 font-semibold shadow-sm cursor-pointer transition-all"
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
        </div>
    );
}