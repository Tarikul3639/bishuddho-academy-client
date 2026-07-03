"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    User,
    Phone,
    ArrowRight,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { InputField } from "@/components/ui/InputField";
import { useSignupMutation } from "@/redux/features/auth/auth.api";
import { NormalizeError } from "@/redux/api/apiError";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm() {
    const router = useRouter();
    const [signup, { isLoading, error: signupApiError, isError }] = useSignupMutation();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });

    const handleChange =
        (field: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                }));
            };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({
            ...prev,
            phone: e.target.value.replace(/\D/g, "").slice(0, 11),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirm: "",
        });

        if (form.phone.length !== 11) {
            setError((prev) => ({
                ...prev,
                phone: "Phone number must be 11 digits.",
            }));

            return;
        }

        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.password ||
            !form.confirm
        ) {
            setError({
                name: !form.name ? "Name is required" : "",
                email: !form.email ? "Email is required" : "",
                phone: !form.phone ? "Phone number is required" : "",
                password: !form.password ? "Password is required" : "",
                confirm: !form.confirm ? "Please confirm your password" : "",
            });
            return;
        }

        if (form.password !== form.confirm) {
            setError({
                ...error,
                confirm: "Passwords do not match."
            });
            return;
        }

        if (form.password.length < 8) {
            setError({
                ...error,
                password: "Password must be at least 8 characters."
            });
            return;
        }

        try {
            await signup({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                password: form.password,
            }).unwrap();

            toast.success(
                "Account created successfully.",
            );

            router.push("/login");
        } catch (err) {
            toast.error(
                NormalizeError(err).message,
            );
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Create account
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Start learning in minutes — it&apos;s free
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    value={form.name}
                    error={error.name}
                    onChange={handleChange("name")}
                    placeholder="Rafi Ahmed"
                    icon={User}
                />

                <InputField
                    label="Email address"
                    name="email"
                    type="email"
                    error={error.email}
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@email.com"
                    icon={Mail}
                />

                <InputField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    error={error.phone}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="01XXXXXXXXX"
                    icon={Phone}
                    hint="Used for bKash / Nagad payments"
                />

                <div>
                    <InputField
                        label="Password"
                        name="password"
                        type={"password"}
                        error={error.password}
                        value={form.password}
                        onChange={handleChange("password")}
                        placeholder="Min 8 characters"
                        icon={Lock}
                    />
                </div>

                <InputField
                    label="Confirm password"
                    name="confirm"
                    type={"password"}
                    error={error.confirm}
                    value={form.confirm}
                    onChange={handleChange("confirm")}
                    placeholder="Repeat password"
                    icon={Lock}
                    success={
                        form.confirm && form.password === form.confirm
                            ? "Passwords match"
                            : undefined
                    }
                />

                {/* Error Message */}
                {isError && (
                    <p className="mt-2 text-sm text-red-500">
                        {NormalizeError(signupApiError).message || "An error occurred. Please try again."}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-primary/80 active:scale-98 cursor-pointer"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Signing up...
                        </span>
                    ) : (
                        <>
                            Create account <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>

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

            <p className="mt-3 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}