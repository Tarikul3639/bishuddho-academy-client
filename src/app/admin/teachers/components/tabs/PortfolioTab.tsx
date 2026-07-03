"use client";

import ExperienceForm from "../sections/ExperienceForm";

interface PortfolioTabProps {
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

export default function PortfolioTab({
    form,
    errors,
    onYearsChange,
    onSkillsChange,
}: PortfolioTabProps) {
    return (
        <ExperienceForm
            form={form}
            errors={errors}
            onYearsChange={onYearsChange}
            onSkillsChange={onSkillsChange}
        />
    );
}