"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
    label: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    helperText?: string;
}

export default function TagInput({
    label,
    value,
    onChange,
    placeholder = "Type and press Enter...",
    helperText,
}: TagInputProps) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const tag = input.trim();

        if (!tag) return;

        if (value.includes(tag)) {
            setInput("");
            return;
        }

        onChange([...value, tag]);
        setInput("");
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }

        if (
            e.key === "Backspace" &&
            !input &&
            value.length > 0
        ) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
                {label}
            </label>

            <div className="rounded-md border border-[#e5e7eb] bg-white p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                    {value.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                        >
                            {tag}

                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="cursor-pointer"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full border-none bg-transparent text-sm outline-none"
                />
            </div>

            {helperText && (
                <p className="text-xs text-gray-500">
                    {helperText}
                </p>
            )}
        </div>
    );
}