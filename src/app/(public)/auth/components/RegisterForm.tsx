"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Toast from "./Toast";

function PasswordStrength({ password }: { password: string }) {
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
    const labels = ["", "Weak", "Fair", "Good", "Strong"];

    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="h-1 flex-1 rounded-full"
                        animate={{
                            backgroundColor: i <= score ? colors[score] : "#e5e7eb",
                        }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
            {password && (
                <p className="text-xs" style={{ color: colors[score] }}>
                    {labels[score]}
                </p>
            )}
        </div>
    );
}

interface InputGroupProps {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hint?: string;
    rightEl?: React.ReactNode;
}

function InputGroupField({
    label,
    id,
    type = "text",
    placeholder,
    icon: Icon,
    value,
    onChange,
    hint,
    rightEl,
}: InputGroupProps) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-0.5 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Icon className="h-4 w-4 text-gray-400 group-focus-within:text-primary" />

                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="border-0 shadow-none bg-transparent focus-visible:ring-0 flex-1"
                />

                {rightEl && <div className="flex items-center">{rightEl}</div>}
            </div>

            {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
    );
}

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const set =
        (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, [field]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !form.firstName ||
            !form.email ||
            !form.phone ||
            !form.password ||
            !form.confirm
        ) {
            setToast({
                message: "Please fill in all required fields.",
                type: "error",
            });
            setTimeout(() => setToast(null), 3000);
            return;
        }
        if (form.password !== form.confirm) {
            setToast({ message: "Passwords do not match.", type: "error" });
            setTimeout(() => setToast(null), 3000);
            return;
        }
        if (form.password.length < 8) {
            setToast({
                message: "Password must be at least 8 characters.",
                type: "error",
            });
            setTimeout(() => setToast(null), 3000);
            return;
        }
        setToast({ message: "Account created! Please sign in.", type: "success" });
        setTimeout(() => {
            setToast(null);
            onSwitch();
        }, 2500);
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Create account
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Start learning in minutes — it's free
                </p>
            </div>

            <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* First and Last Name */}
                <div className="grid grid-cols-2 gap-3">
                    <InputGroupField
                        label="First name"
                        id="reg-fname"
                        placeholder="Rafi"
                        icon={User}
                        value={form.firstName}
                        onChange={set("firstName")}
                    />
                    <InputGroupField
                        label="Last name"
                        id="reg-lname"
                        placeholder="Ahmed"
                        icon={User}
                        value={form.lastName}
                        onChange={set("lastName")}
                    />
                </div>

                {/* Email */}
                <InputGroupField
                    label="Email address"
                    id="reg-email"
                    type="email"
                    placeholder="you@email.com"
                    icon={Mail}
                    value={form.email}
                    onChange={set("email")}
                />

                {/* Phone */}
                <InputGroupField
                    label="Phone number"
                    id="reg-phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    icon={Phone}
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 11),
                        })
                    }
                    hint="Used for bKash / Nagad payments"
                />

                {/* Password */}
                <div className="space-y-1.5">
                    <InputGroupField
                        label="Password"
                        id="reg-pass"
                        type={showPass ? "text" : "password"}
                        placeholder="Min 8 characters"
                        icon={Lock}
                        value={form.password}
                        onChange={set("password")}
                        rightEl={
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
                        }
                    />
                    {form.password && <PasswordStrength password={form.password} />}
                </div>

                {/* Confirm Password */}
                <InputGroupField
                    label="Confirm password"
                    id="reg-confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    icon={Lock}
                    value={form.confirm}
                    onChange={set("confirm")}
                    rightEl={
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Toggle password visibility"
                        >
                            {showConfirm ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    }
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-primary/80 cursor-pointer active:scale-95"
                >
                    Create account <ArrowRight className="h-4 w-4" />
                </button>
            </form>

            {/* Terms */}
            <p className="mt-4 text-center text-xs text-gray-400">
                By registering, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                    Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                </a>
                .
            </p>

            {/* Switch to Login */}
            <p className="mt-3 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                    onClick={onSwitch}
                    className="font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                    Sign in
                </button>
            </p>
        </div>
    );
}
