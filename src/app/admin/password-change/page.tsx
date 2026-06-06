"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, LockKeyhole, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { InputField } from "@/components/ui/InputField";
import PageHeader from "@/components/ui/PageHeader";

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
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [saved, setSaved] = useState(false);

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

        setLoading(true);
        // TODO:
        // await api.patch("/users/password", {
        //     current: form.current,
        //     next: form.next,
        // });
        await new Promise((resolve) => setTimeout(resolve, 800));
        setLoading(false);
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
            <PageHeader
                title="Change Password"
                description="Use at least 8 characters with a mix of letters and numbers."
                backLabel="Back to Dashboard"
                backPath="/admin/dashboard"
            />

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
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <ShieldCheck className="h-4 w-4" />
                            )}
                            Update Password
                        </button>
                        {saved && (
                            <span className="text-sm font-medium text-green-600">
                                ✓ Updated Successfully
                            </span>
                        )}
                    </div>
                </form>
            </motion.div>
        </motion.main>
    );
}