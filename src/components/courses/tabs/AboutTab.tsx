// app/admin/courses/[courseId]/components/tabs/AboutTab.tsx
"use client";

import { FileImage, ImageUp, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutTab({
    thumbnailUrl,
    thumbnailFile,
    title,
    tagline,
    description,
    onChange,
    onThumbnailChange,
}: {
    thumbnailUrl?: string;
    thumbnailFile?: File | null;
    title: string;
    tagline: string;
    description: string;
    onChange: (field: string, value: string) => void;
    onThumbnailChange: (file: File | null) => void;
}) {
    const [preview, setPreview] = useState<string | null>(thumbnailUrl || null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!thumbnailUrl) {
            setPreview(null);
            return;
        }

        const imageUrl =
            thumbnailUrl.startsWith("http")
                ? thumbnailUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${thumbnailUrl}`;

        setPreview(imageUrl);
    }, [thumbnailUrl]);

    return (
        <div className="space-y-6">

            {/* Banner */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <label className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    Course Banner
                </label>

                <label
                    className={`group relative block cursor-pointer overflow-hidden rounded-xl border border-dashed transition-all duration-200 ${isDragging
                            ? "border-blue-500 bg-blue-50 scale-[1.01]"
                            : "border-[#d1d5db] bg-[#f9fafb] hover:border-[#9ca3af] hover:bg-white"
                        }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => {
                        setIsDragging(false);
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);

                        const file = e.dataTransfer.files?.[0];

                        if (file && file.type.startsWith("image/")) {
                            setPreview(URL.createObjectURL(file));
                            onThumbnailChange(file);
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

                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isDragging
                                    ? "bg-blue-600/70"
                                    : "bg-black/0 group-hover:bg-black/45"
                                    }`}
                            >
                                <div
                                    className={`flex items-center gap-2 rounded-sm px-3 py-1.5 transition-all ${isDragging
                                        ? "bg-white scale-110"
                                        : "bg-white opacity-0 group-hover:opacity-100"
                                        }`}
                                >
                                    {isDragging ? (
                                        <>
                                            <ImageUp className="h-4 w-4 text-blue-600" />
                                            <span className="text-xs font-semibold text-blue-600">
                                                Drop new image
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCcw className="h-4 w-4" />
                                            <span className="text-xs font-semibold">
                                                Change Banner
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-56 flex-col items-center justify-center gap-4 p-8">
                            <div
                                className={`flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-200 ${isDragging
                                    ? "border-blue-500 bg-blue-100 scale-110"
                                    : "border-[#e5e7eb] bg-white"
                                    }`}
                            >
                                {isDragging ? (
                                    <ImageUp className="h-8 w-8 text-blue-600" />
                                ) : (
                                    <FileImage className="h-8 w-8 text-gray-500" />
                                )}
                            </div>

                            <div className="text-center">
                                <p
                                    className={`text-sm font-semibold ${isDragging
                                        ? "text-blue-700"
                                        : "text-[#111827]"
                                        }`}
                                >
                                    {isDragging
                                        ? "Drop image here"
                                        : "Drag & drop your banner"}
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
                            onThumbnailChange(file);
                        }}
                    />
                </label>

                {preview && (
                    <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[#6b7280]">
                            <FileImage className="size-4" />
                            <span className="text-xs">{thumbnailFile?.name ||
                                thumbnailUrl?.split("/").pop() ||
                                "No file selected"}</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => {
                                setPreview(null);
                                onThumbnailChange(null);
                            }}
                        >
                            <X className="size-3" />
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    Course Title
                </label>

                <input
                    value={title}
                    onChange={(e) => onChange("title", e.target.value)}
                    className="w-full rounded-sm border border-[#e5e7eb] px-3 py-2 text-[14px] outline-none focus:border-[#1a56db]"
                    placeholder="Enter course title"
                />
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