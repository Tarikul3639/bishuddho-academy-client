"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Toast from "./Toast";
import Link from "next/link";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setToast({ message: "Please fill in all fields.", type: "error" });
            setTimeout(() => setToast(null), 3000);
            return;
        }
        setToast({
            message: "Logged in successfully! Redirecting...",
            type: "success",
        });
        setTimeout(() => setToast(null), 3000);
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

            <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="login-email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email or phone
                    </label>

                    <div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-1.5 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-primary" />

                        <Input
                            id="login-email"
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-0 shadow-none bg-transparent focus-visible:ring-0 flex-1"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                    <label
                        htmlFor="login-pass"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
                        <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-primary" />

                        <Input
                            id="login-pass"
                            type={showPass ? "text" : "password"}
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-0 shadow-none bg-transparent focus-visible:ring-0 flex-1 py-5.5"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Toggle password visibility"
                        >
                            {showPass ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                    {/* Remember Me */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={remember}
                            className="border-gray-300"
                            onCheckedChange={(checked) => setRemember(!!checked)}
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-600 cursor-pointer select-none"
                        >
                            Remember me
                        </label>
                    </div>

                    {/* Forgot Password */}
                    <Link
                        href="/forgot"
                        type="button"
                        className="text-sm p-0 h-auto font-medium text-primary hover:text-primary/80 cursor-pointer hover:underline transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-primary/80 cursor-pointer active:scale-99"
                >
                    Sign in <ArrowRight className="h-4 w-4" />
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                    Create one free
                </Link>
            </p>
        </div>
    );
}
