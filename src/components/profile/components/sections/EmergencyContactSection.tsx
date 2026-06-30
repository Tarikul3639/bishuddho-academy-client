import { User, Phone, ShieldAlert } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Section } from "../Section";
import { SelectField } from "../SelectField";
import { FormState, FormErrors } from "@/types/profile-data";
import { RELATIONSHIP_OPTIONS } from "../constants";

interface Props {
    form: FormState;
    errors: FormErrors;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function EmergencyContactSection({ form, errors, onChange }: Props) {
    return (
        <Section
            icon={ShieldAlert}
            title="Emergency Contact"
            description="Who to reach in case of an emergency."
        >
            <InputField
                label="Contact Name"
                name="emergencyContactName"
                value={form.emergencyContactName}
                onChange={onChange}
                placeholder="Full name"
                icon={User}
            />
            <InputField
                label="Contact Number"
                name="emergencyContactNumber"
                value={form.emergencyContactNumber}
                onChange={onChange}
                placeholder="01XXXXXXXXX"
                error={errors.emergencyContactNumber}
                icon={Phone}
            />
            <SelectField
                label="Relationship"
                name="relationship"
                value={form.relationship}
                options={RELATIONSHIP_OPTIONS}
                onChange={onChange}
            />
        </Section>
    );
}
