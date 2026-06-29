"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, LockKeyhole, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { InputField } from "@/components/ui/InputField";
import { handleApiError } from "@/redux/api/handle-api-error";

import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";

interface FormState {
    current: string;
    next: string;
    confirm: string;
}

const INITIAL: FormState = {
    current: "",
    next: "",
    confirm: "",
};

export default function PasswordPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [saved, setSaved] = useState(false);

    const [changePassword, { isLoading, error }] = useChangePasswordMutation();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSaved(false);
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<FormState> = {};

        if (!form.current.trim()) {
            newErrors.current = "Current password is required.";
        }
        if (!form.next.trim()) {
            newErrors.next = "New password is required.";
        } else if (form.next.length < 8) {
            newErrors.next = "Password must be at least 8 characters.";
        }
        if (!form.confirm.trim()) {
            newErrors.confirm = "Please confirm your password.";
        } else if (form.next !== form.confirm) {
            newErrors.confirm = "Passwords do not match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        await changePassword({
            current: form.current,
            next: form.next,
        }).unwrap();

        setSaved(true);
        setForm(INITIAL);
    };

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-6"
        >
            {/* ─── PAGE HEADER & BACK NAV ─── */}
            <motion.div variants={fadeUp} className="space-y-3">
                <button
                    onClick={() => router.replace("/admin/dashboard")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-primary cursor-pointer"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Dashboard</span>
                </button>

                <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                        Password & Security
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage your account security details and update your authentication keys.
                    </p>
                </div>
            </motion.div>

            {/* ─── ORIGINAL FORM CONTAINER (UNTOUCHED) ─── */}
            <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-border bg-white p-6"
            >
                <h2 className="mb-1 text-base font-bold text-[#111827]">
                    Change Password
                </h2>
                <p className="mb-5 text-xs text-[#6b7280]">
                    Use at least 8 characters with a mix of letters and numbers.
                </p>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                        <AlertCircle className="inline-block h-4.5 w-4.5 mr-1" />
                        {handleApiError(error, ["current", "next", "confirm"]).global || "An error occurred while changing the password."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                    <InputField
                        label="Current Password"
                        name="current"
                        type="password"
                        value={form.current}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        error={errors.current}
                        icon={LockKeyhole}
                        required
                    />
                    <InputField
                        label="New Password"
                        name="next"
                        type="password"
                        value={form.next}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        hint="Minimum 8 characters required"
                        error={errors.next}
                        icon={LockKeyhole}
                        required
                    />
                    <InputField
                        label="Confirm New Password"
                        name="confirm"
                        type="password"
                        value={form.confirm}
                        onChange={handleChange}
                        placeholder="Re-enter new password"
                        error={errors.confirm}
                        success={
                            form.confirm &&
                                form.next === form.confirm &&
                                !errors.confirm
                                ? "Passwords matched"
                                : ""
                        }
                        icon={LockKeyhole}
                        required
                    />
                    <div className="flex items-center gap-3 pt-1 sm:col-span-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <ShieldCheck className="h-4 w-4" />
                            )}
                            Update Password
                        </button>
                        {saved && (
                            <span className="text-sm font-medium text-green-600">
                                <Check className="inline-block h-4 w-4 mr-1" />
                                Updated Successfully
                            </span>
                        )}
                    </div>
                </form>
            </motion.div>
        </motion.main>
    );
}