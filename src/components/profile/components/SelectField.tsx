import { FormState } from "@/types/profile-data";

interface SelectFieldProps {
    label: string;
    name: keyof FormState;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    hint?: string;
}

export function SelectField({ label, name, value, options, onChange, required, hint }: SelectFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="h-10 w-full rounded-sm border border-border bg-white px-3 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
        </div>
    );
}
