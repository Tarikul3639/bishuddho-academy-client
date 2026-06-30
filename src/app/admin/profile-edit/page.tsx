"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, User, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { InputField } from "@/components/ui/InputField";
import PageHeader from "@/components/ui/PageHeader";
import { useAppSelector } from "@/redux/hooks";

interface FormState {
    name: string;
    email: string;
    phone: string;
}

export default function EditProfilePage() {
    // Injected initial data directly into state since it's a top-level page
    const user = useAppSelector((state) => state.auth.user);

    const [form, setForm] = useState<FormState>({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [errors, setErrors] = useState<Partial<FormState>>({});

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

        // Name Validation
        if (!form.name.trim()) {
            newErrors.name = "Full name is required.";
        }

        // Email Validation
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        // Phone Validation
        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^01\d{9}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid Bangladeshi phone number.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        // TODO:
        // await api.patch("/users/profile", form);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setLoading(false);
        setSaved(true);
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
                title="Edit Profile"
                description="Modify your public identity, account details, and active communication channels."
                backLabel="Back to Dashboard"
                backPath="/admin/dashboard"
            />

            {/* ─── ORIGINAL FORM CONTAINER (UNTOUCHED) ─── */}
            <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-border bg-white p-6"
            >
                <h2 className="mb-1 text-base font-bold text-[#111827]">
                    Personal Information
                </h2>
                <p className="mb-5 text-xs text-[#6b7280]">
                    Update your personal details and contact information.
                </p>

                <form onSubmit={handleSubmit} className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                    <InputField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        error={errors.name}
                        icon={User}
                        required
                    />

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        error={errors.email}
                        icon={Mail}
                        required
                    />

                    <InputField
                        label="Phone Number"
                        name="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        error={errors.phone}
                        hint="Use a valid Bangladeshi mobile number"
                        icon={Phone}
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
                                <Save className="h-4 w-4" />
                            )}
                            Save Changes
                        </button>

                        {saved && (
                            <span className="text-sm font-medium text-green-600">
                                ✓ Profile Updated
                            </span>
                        )}
                    </div>
                </form>
            </motion.div>
        </motion.main>
    );
}