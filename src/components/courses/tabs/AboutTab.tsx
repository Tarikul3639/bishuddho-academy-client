// app/admin/courses/[courseId]/components/tabs/AboutTab.tsx
"use client";

import { FileImage, ImageUp, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutTab({
    banner,
    tagline,
    description,
    onChange,
    onBannerChange,
}: {
    banner?: string;
    tagline: string;
    description: string;
    onChange: (field: string, value: string) => void;
    onBannerChange: (file: File | null) => void;
}) {
    const [preview, setPreview] = useState<string | null>(banner || null);

    useEffect(() => {
        setPreview(banner || null);
    }, [banner]);

    return (
        <div className="space-y-6">

            {/* Banner */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <label className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    Course Banner
                </label>

                <label
                    className="group relative block cursor-pointer overflow-hidden rounded-xl border border-dashed border-[#d1d5db] bg-[#f9fafb] transition-all hover:border-[#9ca3af] hover:bg-white"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add("border-blue-400", "bg-blue-50");
                    }}
                    onDragLeave={(e) => {
                        e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith("image/")) {
                            setPreview(URL.createObjectURL(file));
                            onBannerChange(file);
                        }
                    }}
                >
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Course Banner"
                                className="h-50 w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/45">
                                <div className="flex items-center gap-1.5 rounded-md bg-white px-3.5 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                                    <RefreshCcw className="size-3.5" />
                                    <span className="text-xs font-semibold">Change Banner</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-50 flex-col items-center justify-center gap-2.5 p-8">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white">
                                <ImageUp className="size-5 text-gray-600" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-[#111827]">
                                    Drop image here, or{" "}
                                    <span className="text-blue-500 underline underline-offset-2">
                                        browse
                                    </span>
                                </p>
                                <p className="mt-1 text-xs text-[#9ca3af]">
                                    PNG, JPG, WebP — recommended 1600 × 900 px
                                </p>
                            </div>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setPreview(URL.createObjectURL(file));
                            onBannerChange(file);
                        }}
                    />
                </label>

                {preview && (
                    <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[#6b7280]">
                            <FileImage className="size-4" />
                            <span className="text-xs">banner-image.jpg</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => {
                                setPreview(null);
                                onBannerChange(null);
                            }}
                        >
                            <X className="size-3" />
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {/* Tagline */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    Tagline
                </label>

                <input
                    value={tagline}
                    onChange={(e) => onChange("tagline", e.target.value)}
                    className="w-full rounded-sm border border-[#e5e7eb] px-3 py-2 text-[14px] outline-none focus:border-[#1a56db]"
                    placeholder="Enter course tagline"
                />
            </div>

            {/* Description */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    About This Course
                </label>

                <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => onChange("description", e.target.value)}
                    className="w-full rounded-sm border border-[#e5e7eb] px-3 py-2 text-[14px] outline-none focus:border-[#1a56db]"
                    placeholder="Write course description..."
                />
            </div>

        </div>
    );
}