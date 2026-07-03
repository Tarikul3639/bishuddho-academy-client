"use client";

import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";

interface BasicInformationFormProps {
    form: {
        fullName: string;
        slug: string;
        designation: string;
        shortBio: string;
        biography: string;
    };
    errors?: Partial<Record<keyof BasicInformationFormProps["form"], string>>;
    onChange: (
        field: keyof BasicInformationFormProps["form"],
        value: string
    ) => void;
}

export default function BasicInformationForm({
    form,
    errors = {},
    onChange,
}: BasicInformationFormProps) {
    return (
        <FormSection
            title="Basic Information"
            description="Provide the teacher's primary profile information."
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormInput
                    label="Full Name"
                    required
                    value={form.fullName}
                    error={errors.fullName}
                    placeholder="John Doe"
                    onChange={(e) =>
                        onChange("fullName", e.target.value)
                    }
                />

                <FormInput
                    label="Slug"
                    required
                    value={form.slug}
                    error={errors.slug}
                    placeholder="john-doe"
                    onChange={(e) =>
                        onChange("slug", e.target.value)
                    }
                />
            </div>

            <FormInput
                label="Designation"
                required
                value={form.designation}
                error={errors.designation}
                placeholder="Senior Instructor"
                onChange={(e) =>
                    onChange("designation", e.target.value)
                }
            />

            <FormTextarea
                label="Short Bio"
                rows={3}
                value={form.shortBio}
                error={errors.shortBio}
                placeholder="A short introduction about the teacher..."
                onChange={(e) =>
                    onChange("shortBio", e.target.value)
                }
            />

            <FormTextarea
                label="Biography"
                rows={8}
                value={form.biography}
                error={errors.biography}
                placeholder="Write the complete biography..."
                onChange={(e) =>
                    onChange("biography", e.target.value)
                }
            />
        </FormSection>
    );
}