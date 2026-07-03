"use client";

import ImageUpload from "../sections/ImageUpload";
import BasicInformationForm from "../sections/BasicInformationForm";

interface BasicInfoTabProps {
    form: {
        fullName: string;
        slug: string;
        designation: string;
        shortBio: string;
        biography: string;
    };

    errors?: {
        fullName?: string;
        slug?: string;
        designation?: string;
        shortBio?: string;
        biography?: string;
    };

    profilePreview: string;

    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;

    onChange: (
        field: "fullName" | "slug" | "designation" | "shortBio" | "biography",
        value: string
    ) => void;
}

export default function BasicInfoTab({
    form,
    errors,
    profilePreview,
    onImageUpload,
    onChange,
}: BasicInfoTabProps) {
    return (
        <div className="space-y-6">
            <ImageUpload preview={profilePreview} onUpload={onImageUpload} />

            <BasicInformationForm form={form} errors={errors} onChange={onChange} />
        </div>
    );
}