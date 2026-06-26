import { CreditCard, BadgeCheck } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Section } from "../Section";
import { FormState } from "@/types/profile-data";

interface Props {
    form: FormState;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function IdentityDocsSection({ form, onChange }: Props) {
    return (
        <Section
            icon={BadgeCheck}
            title="Identity Documents"
            description="Government-issued identification numbers."
        >
            <InputField
                label="NID Number"
                name="nidNumber"
                value={form.nidNumber}
                onChange={onChange}
                placeholder="National ID number"
                icon={CreditCard}
            />
            <InputField
                label="Birth Registration Number"
                name="birthRegistrationNumber"
                value={form.birthRegistrationNumber}
                onChange={onChange}
                placeholder="Birth registration number"
                icon={CreditCard}
            />
            <InputField
                label="Passport Number"
                name="passportNumber"
                value={form.passportNumber}
                onChange={onChange}
                placeholder="Passport number (if any)"
                icon={CreditCard}
            />
        </Section>
    );
}
