"use client";

import FormNumberInput from "../shared/FormNumberInput";
import FormSection from "../shared/FormSection";
import TagInput from "./TagInput";

interface ExperienceFormProps {
    form: {
        yearsOfExperience: number;
        skills: string[];
    };

    errors?: {
        yearsOfExperience?: string;
    };

    onYearsChange: (value: number) => void;

    onSkillsChange: (skills: string[]) => void;
}

export default function ExperienceForm({
    form,
    errors = {},
    onYearsChange,
    onSkillsChange,
}: ExperienceFormProps) {
    return (
        <FormSection
            title="Professional Information"
            description="Teacher's experience and professional skills."
        >
            <FormNumberInput
                label="Years of Experience"
                min={0}
                value={form.yearsOfExperience}
                error={errors.yearsOfExperience}
                onChange={(e) =>
                    onYearsChange(Number(e.target.value))
                }
            />

            <TagInput
                label="Skills"
                value={form.skills}
                onChange={onSkillsChange}
                placeholder="Type a skill and press Enter"
                helperText="Example: JavaScript, React, Node.js, Networking"
            />
        </FormSection>
    );
}