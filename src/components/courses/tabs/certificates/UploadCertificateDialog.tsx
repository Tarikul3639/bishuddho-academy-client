// app/admin/courses/[courseId]/components/UploadCertificateDialog.tsx (Part 1)

"use client";

import { useEffect, useState } from "react";
import {
    Upload,
    Loader2,
    X,
    FileText,
} from "lucide-react";

import type {
    CourseCertificateStudent,
} from "@/redux/features/certificates/certificate.types";

import {
    useUploadCertificateMutation,
} from "@/redux/features/certificates/certificates.api";

interface UploadCertificateDialogProps {
    open: boolean;
    onClose: () => void;
    student: CourseCertificateStudent;
}

export default function UploadCertificateDialog({
    open,
    onClose,
    student,
}: UploadCertificateDialogProps) {
    const [
        certificateNo,
        setCertificateNo,
    ] = useState("");

    const [
        pdf,
        setPdf,
    ] = useState<File | null>(
        null,
    );

    const [
        error,
        setError,
    ] = useState("");

    const [
        uploadCertificate,
        {
            isLoading,
        },
    ] =
        useUploadCertificateMutation();

    useEffect(() => {
        if (!open) {
            setCertificateNo("");
            setPdf(null);
            setError("");
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        if (
            file.type !==
            "application/pdf"
        ) {
            setError(
                "Only PDF files are allowed.",
            );
            return;
        }

        if (
            file.size >
            10 *
            1024 *
            1024
        ) {
            setError(
                "Maximum file size is 10 MB.",
            );
            return;
        }

        setError("");
        setPdf(file);
    };

    const handleSubmit =
        async () => {
            if (
                !certificateNo.trim()
            ) {
                setError(
                    "Certificate number is required.",
                );

                return;
            }

            if (!pdf) {
                setError(
                    "Please select a PDF certificate.",
                );

                return;
            }

            try {
                await uploadCertificate({
                    enrollmentId: student.enrollmentId,
                    certificateNo,
                    pdf,
                }).unwrap();

                onClose();
            } catch (err: any) {
                setError(
                    err?.data
                        ?.message ??
                    "Upload failed.",
                );
            }
        };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">

                    <div>
                        <h2 className="text-lg font-bold text-[#0d1b3e]">
                            Upload Certificate
                        </h2>

                        <p className="mt-1 text-sm text-[#6b7280]">
                            {
                                student.studentName
                            }
                        </p>
                    </div>

                    <button
                        onClick={
                            onClose
                        }
                        className="rounded-sm p-2 transition hover:bg-[#f3f4f6]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    {/* Part 2 continues... */}                    {/* Certificate Number */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#374151]">
                            Certificate Number
                        </label>

                        <input
                            type="text"
                            value={certificateNo}
                            onChange={(e) =>
                                setCertificateNo(
                                    e.target.value,
                                )
                            }
                            placeholder="e.g. BA-2026-0001"
                            className="w-full rounded-sm border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                        />
                    </div>

                    {/* PDF Upload */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#374151]">
                            Certificate PDF
                        </label>

                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border-2 border-dashed border-[#d1d5db] px-4 py-8 transition hover:border-primary hover:bg-[#f9fafb]">
                            <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={
                                    handleFileChange
                                }
                            />

                            {pdf ? (
                                <>
                                    <FileText className="h-5 w-5 text-red-500" />

                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#0d1b3e]">
                                            {pdf.name}
                                        </p>

                                        <p className="mt-1 text-xs text-[#9ca3af]">
                                            {(
                                                pdf.size /
                                                1024 /
                                                1024
                                            ).toFixed(
                                                2,
                                            )}{" "}
                                            MB
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Upload className="h-5 w-5 text-primary" />

                                    <span className="text-sm font-medium text-[#6b7280]">
                                        Click to
                                        choose PDF
                                    </span>
                                </>
                            )}
                        </label>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="cursor-pointer rounded-sm border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#374151] transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex cursor-pointer items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" />
                                Upload Certificate
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}