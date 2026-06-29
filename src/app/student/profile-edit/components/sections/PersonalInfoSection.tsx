import { User, Mail, Phone } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Section } from "../Section";
import { SelectField } from "../SelectField";
import { FormState, FormErrors } from "@/types/profile-data";
import { GENDER_OPTIONS, BLOOD_GROUP_OPTIONS, RELIGION_OPTIONS } from "../constants";

interface Props {
    form: FormState;
    errors: FormErrors;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function PersonalInfoSection({ form, errors, onChange }: Props) {
    return (
        <Section
            icon={User}
            title="Personal Information"
            description="Your basic identity and contact details."
        >
            <InputField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                error={errors.name}
                icon={User}
                required
            />
            <InputField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="01XXXXXXXXX"
                error={errors.phone}
                hint="Use a valid Bangladeshi mobile number"
                icon={Phone}
                required
            />
            <InputField
                label="Alternative Phone"
                name="alternativePhone"
                value={form.alternativePhone}
                onChange={onChange}
                placeholder="01XXXXXXXXX"
                error={errors.alternativePhone}
                hint="Optional secondary number"
                icon={Phone}
            />
            <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={onChange}
            />
            <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                options={GENDER_OPTIONS}
                onChange={onChange}
            />
            <SelectField
                label="Blood Group"
                name="bloodGroup"
                value={form.bloodGroup}
                options={BLOOD_GROUP_OPTIONS}
                onChange={onChange}
            />
            <SelectField
                label="Religion"
                name="religion"
                value={form.religion}
                options={RELIGION_OPTIONS}
                onChange={onChange}
            />
            <InputField
                label="Nationality"
                name="nationality"
                value={form.nationality}
                onChange={onChange}
                placeholder="e.g. Bangladeshi"
            />
        </Section>
    );
}
