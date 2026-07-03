"use client";

import FormInput from "../shared/FormInput";
import FormSection from "../shared/FormSection";

interface ContactFormProps {
    form: {
        email: string;
        phone: string;
    };
    errors?: {
        email?: string;
        phone?: string;
    };
    onChange: (
        field: "email" | "phone",
        value: string
    ) => void;
}

export default function ContactForm({
    form,
    errors = {},
    onChange,
}: ContactFormProps) {
    return (
        <FormSection
            title="Contact Information"
            description="Public contact information of the instructor."
        >
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="teacher@example.com"
                    value={form.email}
                    error={errors.email}
                    onChange={(e) =>
                        onChange("email", e.target.value)
                    }
                />

                <FormInput
                    label="Phone Number"
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    value={form.phone}
                    error={errors.phone}
                    onChange={(e) =>
                        onChange("phone", e.target.value)
                    }
                />
            </div>
        </FormSection>
    );
}