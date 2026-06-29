import { FormState } from "@/types/profile-data";

interface TextareaFieldProps {
    label: string;
    name: keyof FormState;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

export function TextareaField({ label, name, value, placeholder, onChange, required }: TextareaFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                rows={3}
                className="w-full rounded-sm border border-border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
            />
        </div>
    );
}
