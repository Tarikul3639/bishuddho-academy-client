"use client";

import FormInput from "../shared/FormInput";
import FormSection from "../shared/FormSection";

interface SocialLinks {
    facebook?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

interface SocialLinksFormProps {
    socialLinks: SocialLinks;

    onChange: (
        field: keyof SocialLinks,
        value: string
    ) => void;
}

export default function SocialLinksForm({
    socialLinks,
    onChange,
}: SocialLinksFormProps) {
    return (
        <FormSection
            title="Social Links"
            description="Optional public social media profiles."
        >
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                    label="Facebook"
                    placeholder="https://facebook.com/..."
                    value={socialLinks.facebook ?? ""}
                    onChange={(e) =>
                        onChange("facebook", e.target.value)
                    }
                />

                <FormInput
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/..."
                    value={socialLinks.linkedin ?? ""}
                    onChange={(e) =>
                        onChange("linkedin", e.target.value)
                    }
                />

                <FormInput
                    label="GitHub"
                    placeholder="https://github.com/..."
                    value={socialLinks.github ?? ""}
                    onChange={(e) =>
                        onChange("github", e.target.value)
                    }
                />

                <FormInput
                    label="Website"
                    placeholder="https://example.com"
                    value={socialLinks.website ?? ""}
                    onChange={(e) =>
                        onChange("website", e.target.value)
                    }
                />
            </div>
        </FormSection>
    );
}