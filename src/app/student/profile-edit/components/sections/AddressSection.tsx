import { MapPin } from "lucide-react";
import { Section } from "../Section";
import { TextareaField } from "../TextareaField";
import { FormState } from "@/types/profile-data";

interface Props {
    form: FormState;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function AddressSection({ form, onChange }: Props) {
    return (
        <Section
            icon={MapPin}
            title="Address"
            description="Your current and permanent residential addresses."
        >
            <div className="sm:col-span-2">
                <TextareaField
                    label="Present Address"
                    name="presentAddress"
                    value={form.presentAddress}
                    placeholder="House, Road, Area, City"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-2">
                <TextareaField
                    label="Permanent Address"
                    name="permanentAddress"
                    value={form.permanentAddress}
                    placeholder="House, Road, Area, City"
                    onChange={onChange}
                />
            </div>
        </Section>
    );
}
