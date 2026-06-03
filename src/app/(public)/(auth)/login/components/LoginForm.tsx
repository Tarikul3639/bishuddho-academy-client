"use client";

import { useState } from "react";
import {
    Mail,
    Lock,
    ArrowRight,
    Loader,
} from "lucide-react";

import { InputField } from "@/components/ui/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        }

        if (password && password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 1. Loading state true
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div>
            <div className="mb-7">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Welcome back
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Sign in to continue learning
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <InputField
                    label="Email or phone"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((p) => ({ ...p, email: "" }));
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
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((p) => ({ ...p, password: "" }));
                        }}
                        placeholder="Your password"
                        error={errors.password}
                        icon={Lock}
                        required
                    />
                </div>

                {/* remember + forgot */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={remember}
                            onCheckedChange={(checked) =>
                                setRemember(!!checked)
                            }
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-600 cursor-pointer"
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

                {/* submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/80 active:scale-[0.99] cursor-pointer"
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
                    href="/register"
                    className="font-semibold text-primary hover:underline"
                >
                    Create one free
                </Link>
            </p>
        </div>
    );
}