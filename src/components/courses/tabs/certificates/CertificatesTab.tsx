"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Trash2 } from "lucide-react";

import { fadeUp, stagger } from "@/components/animations";

import CertificateRow from "./CertificateRow";
import UploadCertificateDialog from "./UploadCertificateDialog";

import { useDeleteCertificateMutation, useDownloadCertificateMutation, useGetCourseCertificatesQuery, useViewCertificateMutation } from "@/redux/features/certificates/certificates.api";
import type { CourseCertificateStudent } from "@/redux/features/certificates/certificate.types";

import ActionConfirmationModal from "@/components/ui/ActionConfirmationModal";
import { toast } from "sonner";

interface CertificatesTabProps {
    courseId: string;
}

export default function CertificatesTab({ courseId }: CertificatesTabProps) {
    const { data, isLoading, isError } = useGetCourseCertificatesQuery(courseId);

    const [viewCertificate] =
        useViewCertificateMutation();

    const [downloadCertificate] =
        useDownloadCertificateMutation();

    const [deleteCertificate, { isLoading: isDeleting, error: deleteError }] =
        useDeleteCertificateMutation();

    const [
        selectedStudent,
        setSelectedStudent,
    ] = useState<CourseCertificateStudent | null>(
        null,
    );

    const [
        selectedCertificateId,
        setSelectedCertificateId,
    ] = useState<string | null>(null);

    const students =
        data?.students ?? [];

    const uploadedCount = useMemo(
        () =>
            students.filter(
                (item) => item.certificate !== null,
            ).length,
        [students],
    );

    const pendingCount = students.length - uploadedCount;

    const handleView = async (
        certificateId: string,
    ) => {
        try {
            const blob = await viewCertificate(
                certificateId,
            ).unwrap();

            const url = URL.createObjectURL(blob);

            const newWindow = window.open(
                url,
                "_blank",
                "noopener,noreferrer",
            );

            if (!newWindow) {
                URL.revokeObjectURL(url);
                toast.error("Popup blocked.");
                return;
            }

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 5000);
        } catch {
            toast.error(
                "Failed to open certificate.",
            );
        }
    };

    const handleDownload = async (
        certificateId: string,
        certificateNo: string
    ) => {
        try {
            const blob =
                await downloadCertificate(
                    certificateId,
                ).unwrap();

            const url =
                URL.createObjectURL(blob);

            const a =
                document.createElement("a");

            a.href = url;

            a.download =
                `certificate-${certificateNo}.pdf`;

            document.body.appendChild(a);

            a.click();

            a.remove();

            URL.revokeObjectURL(url);
        } catch {
            toast.error(
                "Failed to download certificate.",
            );
        }
    };
    const openDeleteModal = (
        certificateId: string,
    ) => {
        setSelectedCertificateId(
            certificateId,
        );
    };

    const handleDelete = async () => {
        if (!selectedCertificateId) {
            return;
        }

        try {
            const result =
                await deleteCertificate(
                    selectedCertificateId,
                ).unwrap();

            toast.success(result.message);

            setSelectedCertificateId(
                null,
            );
        } catch {
            toast.error(
                "Failed to delete certificate.",
            );
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-6">
                <div className="space-y-3 animate-pulse">
                    <div className="h-6 w-56 rounded-sm bg-slate-200" />
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-16 rounded-lg bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <p className="text-sm font-medium text-red-600">Failed to load certificates.</p>
            </div>
        );
    }

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-5"
            >
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col gap-4 rounded-lg border border-[#e5e7eb] bg-white p-5 md:flex-row md:items-center md:justify-between"
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-bold text-[#0d1b3e]">Certificates</h2>
                        </div>
                        <p className="mt-1 text-sm text-[#6b7280]">
                            Upload or manage certificates for enrolled students.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <div className="rounded-sm bg-[#f0fdf4] px-4 py-2">
                            <p className="text-xs text-[#16a34a]">Uploaded</p>
                            <p className="text-lg font-bold text-[#16a34a]">{uploadedCount}</p>
                        </div>
                        <div className="rounded-sm bg-[#fff7ed] px-4 py-2">
                            <p className="text-xs text-[#ea580c]">Pending</p>
                            <p className="text-lg font-bold text-[#ea580c]">{pendingCount}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    variants={fadeUp}
                    className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white"
                >
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead className="hidden border-b border-[#e5e7eb] bg-[#f9fafb] md:table-header-group">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                                        Student
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                                        Certificate No
                                    </th>
                                    <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280] lg:table-cell">
                                        Issued
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="block w-full md:table-row-group">
                                {students.length === 0 ? (
                                    <tr className="block w-full md:table-row">
                                        <td colSpan={5} className="block w-full px-6 py-12 text-center">
                                            <Award className="mx-auto mb-3 h-10 w-10 text-[#d1d5db]" />
                                            <p className="text-sm font-semibold text-[#374151]">
                                                No completed students found
                                            </p>
                                            <p className="mt-1 text-xs text-[#9ca3af]">
                                                Certificates can be uploaded after students complete this course.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <CertificateRow
                                            key={student.enrollmentId}
                                            student={student}
                                            onUpload={() =>
                                                setSelectedStudent(student)
                                            }
                                            onView={handleView}
                                            onDownload={handleDownload}
                                            onDelete={openDeleteModal}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>

            {selectedStudent && (
                <UploadCertificateDialog
                    open={Boolean(selectedStudent)}
                    onClose={() =>
                        setSelectedStudent(null)
                    }
                    student={selectedStudent}
                />
            )}

            <ActionConfirmationModal
                open={
                    !!selectedCertificateId
                }
                title="Delete Certificate"
                description={
                    <>
                        Are you sure you want to
                        delete this certificate?
                        <br />
                        This action cannot be
                        undone.
                    </>
                }
                icon={
                    <Trash2 className="h-5 w-5 text-red-500" />
                }
                confirmText="Delete"
                confirmColor="red"
                loading={isDeleting}
                error={deleteError}
                onClose={() =>
                    setSelectedCertificateId(
                        null,
                    )
                }
                onConfirm={handleDelete}
            />
        </>
    );
}