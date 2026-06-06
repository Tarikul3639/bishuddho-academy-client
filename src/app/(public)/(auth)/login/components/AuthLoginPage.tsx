"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import Logo from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";

import {
    fadeUp,
    stagger,
} from "@/components/animations";

import {
    useLoginMutation,
} from "@/redux/features/auth/auth.api";

import {
    setUser,
} from "@/redux/features/auth/authSlice";

import {
    useAppDispatch,
} from "@/redux/hooks";

import {
    handleApiError,
} from "@/redux/api/handle-api-error";

export default function AuthLoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [
        login,
        { isLoading },
    ] = useLoginMutation();

    const [form, setForm] =
        useState({
            email: "",
            password: "",
        });

    const [errors, setErrors] =
        useState<{
            email?: string;
            password?: string;
            global?: string;
        }>({});

    const handleLoginSubmit = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();

        setErrors({});

        /* ─────────────────────────────
           Local Validation
        ───────────────────────────── */

        const localErrors: typeof errors =
            {};

        if (!form.email.trim()) {
            localErrors.email =
                "Email is required.";
        }

        if (!form.password.trim()) {
            localErrors.password =
                "Password is required.";
        }

        if (
            form.password &&
            form.password.length < 8
        ) {
            localErrors.password =
                "Password must be at least 8 characters.";
        }

        if (
            Object.keys(localErrors)
                .length > 0
        ) {
            setErrors(localErrors);
            return;
        }

        /* ─────────────────────────────
           Login Request
        ───────────────────────────── */

        try {
            const response =
                await login(
                    form,
                ).unwrap();

            /*
             Backend already sets
             HttpOnly Cookie
            */

            dispatch(
                setUser(
                    response.user,
                ),
            );

            if (
                response.user.role ===
                "admin"
            ) {
                router.push(
                    "/admin",
                );
            } else if (
                response.user.role ===
                "student"
            ) {
                router.push(
                    "/student/dashboard",
                );
            }
            else {
                router.push(
                    "/",
                );
            }
        } catch (err) {
            const apiErrors =
                handleApiError(err, [
                    "email",
                    "password",
                ]);

            setErrors(apiErrors);
        }
    };

    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 font-sans"
        >
            <motion.div
                variants={fadeUp}
                className="flex w-full max-w-lg flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
                <div className="mb-10">
                    <Logo />
                </div>

                <div className="w-full max-w-md">
                    {/* Tabs */}

                    <div className="relative mb-8 flex rounded-xl bg-gray-100 p-1">
                        <motion.div
                            layoutId="auth-tab-indicator"
                            className="absolute inset-y-1 left-1 w-1/2 rounded-lg bg-white shadow-sm"
                            transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 35,
                            }}
                        />

                        <Link
                            href="/login"
                            className="relative z-10 flex-1 py-2.5 text-center text-sm font-semibold text-gray-900"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/signup"
                            className="relative z-10 flex-1 py-2.5 text-center text-sm font-semibold text-gray-500"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Form */}

                    <motion.div
                        layoutId="auth-form"
                        initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                            ],
                        }}
                    >
                        <LoginForm
                            form={form}
                            setForm={setForm}
                            isLoading={
                                isLoading
                            }
                            errors={errors}
                            setErrors={
                                setErrors
                            }
                            onSubmit={
                                handleLoginSubmit
                            }
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}