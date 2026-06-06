"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";

import { InputField } from "@/components/ui/InputField";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
    form: {
        email: string;
        password: string;
    };
    setForm: React.Dispatch<
        React.SetStateAction<{
            email: string;
            password: string;
        }>
    >;
    isLoading: boolean;
    errors: {
        email?: string;
        password?: string;
        global?: string;
    };
    setErrors: React.Dispatch<
        React.SetStateAction<{
            email?: string;
            password?: string;
            global?: string;
        }>
    >;
    onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
    form,
    setForm,
    isLoading,
    errors,
    setErrors,
    onSubmit,
}: LoginFormProps) {
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);

    return (
        <div>
            <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Welcome back
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Sign in to continue learning
                </p>
            </div>

            {/* Global API Error Display */}
            {errors.global && (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                    {errors.global}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Email */}
                <InputField
                    label="Email or phone"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                        setForm((p) => ({ ...p, email: e.target.value }));
                        if (errors.email || errors.global) {
                            setErrors((p) => ({ ...p, email: "", global: "" }));
                        }
                    }}
                    placeholder="you@email.com"
                    error={errors.email}
                    icon={Mail}
                    required
                />

                {/* Password */}
                <div>
                    <InputField
                        label="Password"
                        name="password"
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => {
                            setForm((p) => ({ ...p, password: e.target.value }));
                            if (errors.password || errors.global) {
                                setErrors((p) => ({ ...p, password: "", global: "" }));
                            }
                        }}
                        placeholder="Your password"
                        error={errors.password}
                        icon={Lock}
                        required
                    />
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={remember}
                            onCheckedChange={(checked) => setRemember(!!checked)}
                        />
                        <label
                            htmlFor="remember"
                            className="cursor-pointer text-sm text-gray-600"
                        >
                            Remember me
                        </label>
                    </div>

                    <Link
                        href="/forgot"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/80 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        <ArrowRight className="h-4 w-4" />
                    )}
                    <span>{isLoading ? "Signing in..." : "Sign in"}</span>
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-primary hover:underline"
                >
                    Create one free
                </Link>
            </p>
        </div>
    );
}