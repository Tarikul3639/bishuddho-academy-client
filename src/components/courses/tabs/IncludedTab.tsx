"use client";

import { Plus, Trash2 } from "lucide-react";

interface Props {
    includes: string[];
    onChange: (items: string[]) => void;
}

export default function IncludedTab({
    includes,
    onChange,
}: Props) {
    const updateItem = (index: number, value: string) => {
        const updated = [...includes];
        updated[index] = value;
        onChange(updated);
    };

    const removeItem = (index: number) => {
        onChange(includes.filter((_, i) => i !== index));
    };

    const addItem = () => {
        onChange([...includes, ""]);
    };

    return (
        <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    What's Included
                </p>

                <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1 rounded-sm bg-[#eef3ff] px-2.5 py-1 text-[11px] font-semibold text-[#1a56db] cursor-pointer hover:bg-[#e0e7ff]"
                >
                    <Plus className="h-3 w-3" />
                    Add Item
                </button>
            </div>

            <div className="space-y-2">
                {includes.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >
                        <input
                            value={item}
                            onChange={(e) =>
                                updateItem(index, e.target.value)
                            }
                            placeholder="e.g. 10 hours on-demand video"
                            className="flex-1 rounded-sm border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#1a56db]"
                        />

                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="rounded-lg border border-[#fee2e2] p-2 text-[#ef4444] hover:bg-[#fecaca] cursor-pointer transition-colors duration-300"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}