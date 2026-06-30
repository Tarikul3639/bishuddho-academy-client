import { User, Phone, Users } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Section } from "../Section";
import { FormState, FormErrors } from "@/types/profile-data";

interface Props {
    form: FormState;
    errors: FormErrors;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function FamilyGuardianSection({ form, errors, onChange }: Props) {
    return (
        <Section
            icon={Users}
            title="Family & Guardian"
            description="Parent and guardian contact information."
        >
            <InputField
                label="Father's Name"
                name="fatherName"
                value={form.fatherName}
                onChange={onChange}
                placeholder="Father's full name"
                icon={User}
            />
            <InputField
                label="Mother's Name"
                name="motherName"
                value={form.motherName}
                onChange={onChange}
                placeholder="Mother's full name"
                icon={User}
            />
            <InputField
                label="Guardian's Name"
                name="guardianName"
                value={form.guardianName}
                onChange={onChange}
                placeholder="Guardian's full name"
                icon={User}
            />
            <InputField
                label="Guardian's Phone"
                name="guardianPhone"
                value={form.guardianPhone}
                onChange={onChange}
                placeholder="01XXXXXXXXX"
                error={errors.guardianPhone}
                icon={Phone}
            />
            <InputField
                label="Guardian's Occupation"
                name="guardianOccupation"
                value={form.guardianOccupation}
                onChange={onChange}
                placeholder="e.g. Business"
            />
        </Section>
    );
}
