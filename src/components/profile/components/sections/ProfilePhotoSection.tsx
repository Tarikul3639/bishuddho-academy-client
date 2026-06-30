import { Camera } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Section } from "../Section";
import { FormState } from "@/types/profile-data";

interface Props {
    form: FormState;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProfilePhotoSection({ form, onChange }: Props) {
    return (
        <Section
            icon={Camera}
            title="Profile Photo"
            description="Link to your profile avatar image."
        >
            <div className="sm:col-span-2">
                <InputField
                    label="Avatar URL"
                    name="avatarUrl"
                    value={form.avatarUrl}
                    onChange={onChange}
                    placeholder="https://example.com/avatar.jpg"
                    icon={Camera}
                    hint="Paste a direct link to your profile photo"
                />
            </div>

            {form.avatarUrl && (
                <div className="sm:col-span-2 flex items-center gap-4 pt-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={form.avatarUrl}
                        alt="Avatar preview"
                        className="h-16 w-16 rounded-full border-2 border-border object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                    <p className="text-xs text-slate-400">Preview of your profile photo</p>
                </div>
            )}
        </Section>
    );
}
