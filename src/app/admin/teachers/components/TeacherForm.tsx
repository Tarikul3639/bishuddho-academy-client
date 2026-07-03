"use client";

import { Save } from "lucide-react";

import TabNavigation from "./shared/TabNavigation";
import BasicInfoTab from "./tabs/BasicInfoTab";
import DisplayContactTab from "./tabs/DisplayContactTab";
import PortfolioTab from "./tabs/PortfolioTab";
import useTeacherForm from "./hooks/useTeacherForm";

import type { CreateTeacherPayload } from "@/types/teacher";

interface TeacherFormProps {
    initialData?: Partial<CreateTeacherPayload>;
    onSubmit: (formData: FormData) => Promise<void>;
    loading?: boolean;
}

const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "contact", label: "Contact & Display" },
    { id: "portfolio", label: "Experience" },
];

export default function TeacherForm({
    initialData,
    onSubmit,
    loading = false,
}: TeacherFormProps) {
    const {
        form,
        errors,
        activeTab,
        setActiveTab,
        profilePreview,
        updateField,
        updateSocial,
        handleProfileUpload,
        validate,
        buildFormData,
    } = useTeacherForm(initialData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        await onSubmit(buildFormData());
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === "basic" && (
                <BasicInfoTab
                    form={{
                        fullName: form.fullName,
                        slug: form.slug,
                        designation: form.designation,
                        shortBio: form.shortBio ?? "",
                        biography: form.biography ?? "",
                    }}
                    errors={errors}
                    profilePreview={profilePreview}
                    onImageUpload={handleProfileUpload}
                    onChange={updateField}
                />
            )}

            {activeTab === "contact" && (
                <DisplayContactTab
                    form={{
                        email: form.email ?? "",
                        phone: form.phone ?? "",
                        featured: form.featured ?? false,
                        isActive: form.isActive ?? true,
                        socialLinks: {
                            facebook: form.socialLinks?.facebook ?? "",
                            linkedin: form.socialLinks?.linkedin ?? "",
                            github: form.socialLinks?.github ?? "",
                            website: form.socialLinks?.website ?? "",
                        },
                    }}
                    onContactChange={updateField}
                    onDisplayChange={updateField}
                    onSocialChange={updateSocial}
                />
            )}

            {activeTab === "portfolio" && (
                <PortfolioTab
                    form={{
                        yearsOfExperience: form.yearsOfExperience ?? 0,
                        skills: form.skills ?? [],
                    }}
                    onYearsChange={(value) => updateField("yearsOfExperience", value)}
                    onSkillsChange={(value) => updateField("skills", value)}
                />
            )}

            <div className="flex items-center justify-end border-t border-[#e5e7eb] pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                    <Save className="h-4 w-4" />
                    {loading
                        ? "Saving..."
                        : initialData
                            ? "Update Teacher"
                            : "Create Teacher"}
                </button>
            </div>
        </form>
    );
}