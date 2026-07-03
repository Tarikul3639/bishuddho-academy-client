"use client";

import { useEffect, useState } from "react";

import type {
    CreateTeacherPayload,
    TeacherSocialLinks,
} from "@/types/teacher";

export interface TeacherFormErrors {
    fullName?: string;
    slug?: string;
    designation?: string;
}

const initialSocialLinks: TeacherSocialLinks = {
    facebook: "",
    linkedin: "",
    github: "",
    website: "",
};

const initialForm: CreateTeacherPayload = {
    fullName: "",
    slug: "",
    designation: "",
    shortBio: "",
    biography: "",
    email: "",
    phone: "",
    yearsOfExperience: 0,
    skills: [],
    socialLinks: initialSocialLinks,
    featured: false,
    isActive: true,
    displayOrder: 0,
};

const generateSlug = (value: string) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

export default function useTeacherForm(
    initialData?: Partial<CreateTeacherPayload> & {
        profileImage?: string;
    }
) {
    const [form, setForm] = useState<CreateTeacherPayload>({
        ...initialForm,
        ...initialData,
    });

    const [errors, setErrors] = useState<TeacherFormErrors>({});
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [activeTab, setActiveTab] = useState("basic");

    /* -------------------------------
       Initialize existing profile image
    -------------------------------- */
    useEffect(() => {
        if (!initialData?.profileImage) return;

        if (initialData.profileImage.startsWith("http")) {
            setProfilePreview(initialData.profileImage);
        } else {
            setProfilePreview(
                `${process.env.NEXT_PUBLIC_API_URL}${initialData.profileImage}`
            );
        }
    }, [initialData]);

    /* -------------------------------
       Update normal field
    -------------------------------- */
    const updateField = <K extends keyof CreateTeacherPayload>(
        key: K,
        value: CreateTeacherPayload[K]
    ) => {
        setForm((prev) => {
            const updated = {
                ...prev,
                [key]: value,
            };

            if (key === "fullName") {
                updated.slug = generateSlug(value as string);
            }

            return updated;
        });
    };

    /* -------------------------------
       Update social links
    -------------------------------- */
    const updateSocial = (key: keyof TeacherSocialLinks, value: string) => {
        setForm((prev) => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [key]: value,
            },
        }));
    };

    /* -------------------------------
       Profile upload
    -------------------------------- */
    const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setProfileImageFile(file);
        setProfilePreview(URL.createObjectURL(file));
    };

    /* -------------------------------
       Validation
    -------------------------------- */
    const validate = () => {
        const nextErrors: TeacherFormErrors = {};

        if (!form.fullName.trim()) {
            nextErrors.fullName = "Full name is required";
        }

        if (!form.slug.trim()) {
            nextErrors.slug = "Slug is required";
        }

        if (!form.designation.trim()) {
            nextErrors.designation = "Designation is required";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    /* -------------------------------
       FormData
    -------------------------------- */
    const buildFormData = () => {
        const fd = new FormData();

        if (profileImageFile) {
            fd.append("profileImageFile", profileImageFile);
        }

        fd.append("fullName", form.fullName);
        fd.append("slug", form.slug);
        fd.append("designation", form.designation);

        fd.append("shortBio", form.shortBio ?? "");
        fd.append("biography", form.biography ?? "");

        fd.append("email", form.email ?? "");
        fd.append("phone", form.phone ?? "");

        fd.append("yearsOfExperience", String(form.yearsOfExperience ?? 0));
        fd.append("featured", String(form.featured ?? false));
        fd.append("isActive", String(form.isActive ?? true));
        fd.append("displayOrder", String(form.displayOrder ?? 0));

        fd.append("skills", JSON.stringify(form.skills ?? []));

        fd.append(
            "socialLinks",
            JSON.stringify({
                facebook: form.socialLinks?.facebook ?? "",
                linkedin: form.socialLinks?.linkedin ?? "",
                github: form.socialLinks?.github ?? "",
                website: form.socialLinks?.website ?? "",
            }),
        );

        return fd;
    };

    return {
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
        setForm,
        setProfilePreview,
    };
}