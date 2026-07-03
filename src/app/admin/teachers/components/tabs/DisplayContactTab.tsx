"use client";

import ContactForm from "../sections/ContactForm";
import DisplaySettingsForm from "../sections/DisplaySettingsForm";
import SocialLinksForm from "../sections/SocialLinksForm";

interface DisplayContactTabProps {
    form: {
        email: string;
        phone: string;

        featured: boolean;
        isActive: boolean;
        displayOrder: number;

        socialLinks: {
            facebook?: string;
            linkedin?: string;
            github?: string;
            website?: string;
        };
    };

    errors?: {
        email?: string;
        phone?: string;
        featured?: string;
        isActive?: string;
        displayOrder?: string;

        socialLinks?: {
            facebook?: string;
            linkedin?: string;
            github?: string;
            website?: string;
        };
    };

    onContactChange: (
        field: "email" | "phone",
        value: string
    ) => void;

    onDisplayChange: (
        field: "featured" | "isActive" | "displayOrder",
        value: boolean | number
    ) => void;

    onSocialChange: (
        field: "facebook" | "linkedin" | "github" | "website",
        value: string
    ) => void;
}

export default function DisplayContactTab({
    form,
    errors,
    onContactChange,
    onDisplayChange,
    onSocialChange,
}: DisplayContactTabProps) {
    return (
        <div className="space-y-6">
            <ContactForm
                form={{
                    email: form.email,
                    phone: form.phone,
                }}
                errors={errors}
                onChange={onContactChange}
            />

            <DisplaySettingsForm
                form={{
                    featured: form.featured,
                    isActive: form.isActive,
                    displayOrder: form.displayOrder,
                }}
                errors={errors}
                onChange={onDisplayChange}
            />

            <SocialLinksForm
                socialLinks={form.socialLinks}
                onChange={onSocialChange}
            />
        </div>
    );
}