"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";

import type { FormState, FormErrors } from "@/types/profile-data";
import { validate } from "./components/helpers";
import { PersonalInfoSection } from "./components/sections/PersonalInfoSection";
import { IdentityDocsSection } from "./components/sections/IdentityDocsSection";
import { FamilyGuardianSection } from "./components/sections/FamilyGuardianSection";
import { EmergencyContactSection } from "./components/sections/EmergencyContactSection";
import { AddressSection } from "./components/sections/AddressSection";
import { ProfilePhotoSection } from "./components/sections/ProfilePhotoSection";

import { useUpdateProfileMutation, useGetProfileQuery } from "@/redux/features/profile/profile.api";

export default function EditProfilePage() {
    const router = useRouter();

    // API Hooks
    const { data, isLoading: isGettingProfile, isError } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    // State Management
    const [form, setForm] = useState<FormState | null>(null);
    const [changedFields, setChangedFields] = useState<Partial<FormState>>({});
    const [saved, setSaved] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    // ── Hydrate form from API ──
    useEffect(() => {
        if (data) {
            setForm({
                name: data.name ?? "",
                phone: data.phone ?? "",
                alternativePhone: data.alternativePhone ?? "",
                dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : "",
                gender: data.gender ?? "",
                bloodGroup: data.bloodGroup ?? "",
                religion: data.religion ?? "",
                nationality: data.nationality ?? "",
                nidNumber: data.nidNumber ?? "",
                birthRegistrationNumber: data.birthRegistrationNumber ?? "",
                passportNumber: data.passportNumber ?? "",
                fatherName: data.fatherName ?? "",
                motherName: data.motherName ?? "",
                guardianName: data.guardianName ?? "",
                guardianPhone: data.guardianPhone ?? "",
                guardianOccupation: data.guardianOccupation ?? "",
                emergencyContactName: data.emergencyContactName ?? "",
                emergencyContactNumber: data.emergencyContactNumber ?? "",
                relationship: data.relationship ?? "",
                presentAddress: data.presentAddress ?? "",
                permanentAddress: data.permanentAddress ?? "",
                avatarUrl: data.avatarUrl ?? "",
            });
        }
    }, [data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setSaved(false);
        setErrors((prev) => ({ ...prev, [name]: "" }));

        // Update main form state
        setForm((prev) => (prev ? { ...prev, [name]: value } : null));

        // Track only changed fields for partial update
        setChangedFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if there's actually anything to update
        if (Object.keys(changedFields).length === 0) {
            setSaved(true);
            return;
        }

        // Validate only the changed fields
        const newErrors = validate(changedFields as FormState);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Perform partial update
            await updateProfile(changedFields).unwrap();
            setSaved(true);
            setChangedFields({}); // Reset tracker on success
        } catch (err) {
            console.error("Profile update failed:", err);
            setSaved(false);
        }
    };

    if (isGettingProfile || !form) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
                <p className="text-sm font-medium text-red-500">Failed to load profile data.</p>
                <button
                    onClick={() => router.replace("/student/dashboard")}
                    className="text-xs text-slate-500 underline hover:text-primary"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-6"
        >
            <motion.div variants={fadeUp} className="space-y-3">
                <button
                    onClick={() => router.replace("/student/dashboard")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-primary cursor-pointer"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Dashboard</span>
                </button>

                <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                        Edit Profile
                    </h1>
                </div>
            </motion.div>

            <PersonalInfoSection form={form} errors={errors} onChange={handleChange} />
            <IdentityDocsSection form={form} onChange={handleChange} />
            <FamilyGuardianSection form={form} errors={errors} onChange={handleChange} />
            <EmergencyContactSection form={form} errors={errors} onChange={handleChange} />
            <AddressSection form={form} onChange={handleChange} />
            <ProfilePhotoSection form={form} onChange={handleChange} />

            <motion.div variants={fadeUp} className="flex items-center gap-3 pb-4">
                <button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                </button>

                {saved && (
                    <span className="text-sm font-medium text-green-600">
                        <Check className="mr-1.5 inline h-4 w-4" /> Profile Updated
                    </span>
                )}
            </motion.div>
        </motion.main>
    );
}