"use client";

import Image from "next/image";

interface ImageUploadProps {
    preview: string;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    helperText?: string;
}

export default function ImageUpload({
    preview,
    onUpload,
    label = "Profile Image",
    helperText = "Square image recommended (500×500px, max 5MB)",
}: ImageUploadProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {label}
            </label>

            <div className="flex items-center gap-5">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Profile Preview"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-[11px] text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        className="w-full cursor-pointer text-xs text-gray-500
                        file:mr-3
                        file:rounded-sm
                        file:border-0
                        file:bg-slate-100
                        file:px-3
                        file:py-2
                        file:text-[11px]
                        file:font-semibold
                        file:text-slate-700
                        hover:file:bg-slate-200"
                    />

                    <p className="mt-2 text-[10px] text-gray-400">
                        {helperText}
                    </p>
                </div>
            </div>
        </div>
    );
}