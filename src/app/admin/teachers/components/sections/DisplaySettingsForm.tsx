"use client";

import FormSection from "../shared/FormSection";
import FormCheckbox from "../shared/FormCheckbox";

interface DisplaySettingsFormProps {
    form: {
        featured: boolean;
        isActive: boolean;
    };

    onChange: (
        field: "featured" | "isActive",
        value: boolean
    ) => void;
}

export default function DisplaySettingsForm({
    form,
    onChange,
}: DisplaySettingsFormProps) {
    return (
        <FormSection
            title="Display Settings"
            description="Control how this instructor appears on the website."
        >
            <div className="grid gap-4">
                <FormCheckbox
                    label="Featured Instructor"
                    description="Highlight this instructor on the website."
                    checked={form.featured}
                    onChange={(e) =>
                        onChange("featured", e.target.checked)
                    }
                />

                <FormCheckbox
                    label="Active"
                    description="Inactive instructors won't appear publicly."
                    checked={form.isActive}
                    onChange={(e) =>
                        onChange("isActive", e.target.checked)
                    }
                />
            </div>
        </FormSection>
    );
}