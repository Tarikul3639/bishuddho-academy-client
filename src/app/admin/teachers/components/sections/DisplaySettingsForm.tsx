"use client";

import FormSection from "../shared/FormSection";
import FormCheckbox from "../shared/FormCheckbox";
import FormInput from "../shared/FormInput";

interface DisplaySettingsFormProps {
    form: {
        featured: boolean;
        isActive: boolean;
        displayOrder: number;
    };
    errors?: Partial<Record<keyof DisplaySettingsFormProps["form"], string>>;
    onChange: (
        field: "featured" | "isActive" | "displayOrder",
        value: boolean | number
    ) => void;
}

export default function DisplaySettingsForm({
    form,
    errors,
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

                <FormInput
                    label="Display Order"
                    type="number"
                    placeholder="1"
                    value={form.displayOrder}
                    error={errors?.displayOrder}
                    onChange={(e) =>
                        onChange("displayOrder", parseInt(e.target.value))
                    }
                />
            </div>
        </FormSection>
    );
}