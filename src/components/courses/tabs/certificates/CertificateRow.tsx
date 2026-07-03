"use client";

import { motion } from "framer-motion";
import {
    Upload,
    Eye,
    Download,
    Award,
    Trash,
} from "lucide-react";

import { fadeUp } from "@/components/animations";

import type {
    CourseCertificateStudent,
} from "@/redux/features/certificates/certificate.types";

interface CertificateRowProps {
    student: CourseCertificateStudent;

    onUpload: () => void;

    onView: (
        certificateId: string,
        certificateNo: string
    ) => void;

    onDownload: (
        certificateId: string,
        certificateNo: string
    ) => void;

    onDelete: (
        certificateId: string,
    ) => void;
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function CertificateRow({
    student,
    onUpload,
    onView,
    onDownload,
    onDelete
}: CertificateRowProps) {
    const hasCertificate = !!student.certificate;

    const issuedDate = student.certificate
        ? new Date(student.certificate.issuedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : null;

    return (
        <>
            {/* ---------- MOBILE CARD (below md) ---------- */}
            <motion.tr
                variants={fadeUp}
                className="block w-full border-b border-[#f3f4f6] md:hidden"
            >
                <td className="block w-full px-4 py-3">
                    <div className="flex w-full items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#0d1b3e] text-[12px] font-bold text-white">
                            {getInitials(student.studentName)}
                        </div>

                        <div className="w-full min-w-0 flex-1">
                            <div className="flex w-full items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-bold text-[#0d1b3e]">
                                        {student.studentName}
                                    </p>
                                    <p className="truncate text-[11px] text-[#6b7280]">
                                        {student.studentEmail}
                                    </p>
                                </div>

                                {hasCertificate ? (
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#dcfce7] px-2 py-1 text-[9px] font-bold text-[#16a34a]">
                                        <Award className="h-3 w-3" />
                                        Uploaded
                                    </span>
                                ) : (
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff7ed] px-2 py-1 text-[9px] font-bold text-[#ea580c]">
                                        Pending
                                    </span>
                                )}
                            </div>

                            {hasCertificate && (
                                <div className="mt-1.5 flex w-full flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#6b7280]">
                                    <span className="font-mono font-semibold text-[#374151]">
                                        {student.certificate!.certificateNo}
                                    </span>
                                    <span>{issuedDate}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-3 flex w-full flex-wrap gap-2">
                                {!hasCertificate ? (
                                    <button
                                        onClick={onUpload}
                                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm bg-primary px-3 py-2 text-[11px] font-bold text-white transition active:bg-primary/90"
                                    >
                                        <Upload className="h-3.5 w-3.5" />
                                        Upload
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (student.certificate) {
                                                    onView(
                                                        student.certificate.certificateId,
                                                        student.certificate.certificateNo
                                                    );
                                                }
                                            }}
                                            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-[#dbeafe] bg-[#eef4ff] px-3 py-2 text-[11px] font-bold text-[#1a56db] transition active:bg-[#dbeafe]"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            View
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (student.certificate) {
                                                    onDownload(
                                                        student.certificate.certificateId,
                                                        student.certificate.certificateNo
                                                    );
                                                }
                                            }}
                                            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-[#e5e7eb] bg-white px-3 py-2 text-[11px] font-bold text-[#374151] transition active:bg-[#f9fafb]"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                            Download
                                        </button>

                                        <button
                                            onClick={onUpload}
                                            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700 transition active:bg-amber-100"
                                        >
                                            <Upload className="h-3.5 w-3.5" />
                                            Replace
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (student.certificate) {
                                                    onDelete(student.certificate.certificateId);
                                                }
                                            }}
                                            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-bold text-red-700 transition active:bg-red-100"
                                        >
                                            <Trash className="h-3.5 w-3.5" />
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </td>
            </motion.tr>

            {/* ---------- DESKTOP TABLE ROW (md and up) ---------- */}
            <motion.tr
                variants={fadeUp}
                className="hidden border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb] md:table-row"
            >
                {/* Student */}
                <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#0d1b3e] text-[12px] font-bold text-white">
                            {getInitials(student.studentName)}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-bold text-[#0d1b3e]">
                                {student.studentName}
                            </p>

                            <p className="truncate text-[11px] text-[#6b7280]">
                                {student.studentEmail}
                            </p>
                        </div>
                    </div>
                </td>

                {/* Certificate No */}
                <td className="px-4 py-3">
                    {student.certificate ? (
                        <span className="font-mono text-[12px] font-semibold text-[#374151]">
                            {student.certificate.certificateNo}
                        </span>
                    ) : (
                        <span className="text-[11px] text-[#9ca3af]">—</span>
                    )}
                </td>

                {/* Issued Date */}
                <td className="hidden px-4 py-3 lg:table-cell">
                    {student.certificate ? (
                        <span className="text-[12px] text-[#374151]">{issuedDate}</span>
                    ) : (
                        <span className="text-[11px] text-[#9ca3af]">—</span>
                    )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                    {hasCertificate ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-bold text-[#16a34a]">
                            <Award className="h-3 w-3" />
                            Uploaded
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7ed] px-2.5 py-1 text-[10px] font-bold text-[#ea580c]">
                            Pending
                        </span>
                    )}
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                        {!hasCertificate ? (
                            <button
                                onClick={onUpload}
                                className="flex cursor-pointer items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-primary/90"
                            >
                                <Upload className="h-3.5 w-3.5" />
                                Upload
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        if (student.certificate) {
                                            onView(
                                                student.certificate.certificateId,
                                                student.certificate.certificateNo
                                            );
                                        }
                                    }}
                                    className="flex cursor-pointer items-center gap-1 rounded-sm border border-[#dbeafe] bg-[#eef4ff] px-3 py-1.5 text-[11px] font-bold text-[#1a56db] transition hover:bg-[#dbeafe]"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    View
                                </button>

                                <button
                                    onClick={() => {
                                        if (student.certificate) {
                                            onDownload(
                                                student.certificate.certificateId,
                                                student.certificate.certificateNo
                                            );
                                        }
                                    }}
                                    className="flex cursor-pointer items-center gap-1 rounded-sm border border-[#e5e7eb] bg-white px-3 py-1.5 text-[11px] font-bold text-[#374151] transition hover:bg-[#f9fafb]"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                    Download
                                </button>

                                <button
                                    onClick={onUpload}
                                    className="flex cursor-pointer items-center gap-1 rounded-sm border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700 transition hover:bg-amber-100"
                                >
                                    <Upload className="h-3.5 w-3.5" />
                                    Replace
                                </button>

                                <button
                                    onClick={() => {
                                        if (student.certificate) {
                                            onDelete(student.certificate.certificateId);
                                        }
                                    }}
                                    className="flex cursor-pointer items-center gap-1 rounded-sm border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-700 transition hover:bg-red-100"
                                >
                                    <Trash className="h-3.5 w-3.5" />
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </td>
            </motion.tr>
        </>
    );
}