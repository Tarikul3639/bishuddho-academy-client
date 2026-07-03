"use client";

import {
    Award,
    Eye,
    Download,
    Clock3,
} from "lucide-react";

interface CertificateCardProps {
    certificate: {
        certificateId: string;
        certificateNo: string;
        issuedAt: string;
    } | null;

    onView: () => void;
    onDownload: () => void;
}

function CertificateCard({
    certificate,
    onView,
    onDownload,
}: CertificateCardProps) {
    return (
        <div className="rounded-lg border border-[#dbeafe] bg-[#f8fbff] p-5">
            <div className="mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />

                <p className="text-[12px] font-bold uppercase tracking-widest text-primary">
                    Certificate
                </p>
            </div>

            {certificate ? (
                <>
                    <div className="space-y-2 text-[13px]">
                        <div>
                            <p className="text-[11px] text-[#6b7280]">
                                Certificate No
                            </p>

                            <p className="font-semibold text-[#0f172a]">
                                {certificate.certificateNo}
                            </p>
                        </div>

                        <div>
                            <p className="text-[11px] text-[#6b7280]">
                                Issued On
                            </p>

                            <p className="font-medium text-[#374151]">
                                {new Date(
                                    certificate.issuedAt,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={onView}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-[#bfdbfe] bg-white px-3 py-2 text-[12px] font-semibold text-primary transition hover:bg-[#eff6ff]"
                        >
                            <Eye className="h-3.5 w-3.5" />
                            View
                        </button>

                        <button
                            onClick={onDownload}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-primary/90"
                        >
                            <Download className="h-3.5 w-3.5" />
                            Download
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2 rounded-sm border border-[#fde68a] bg-[#fff7ed] p-3">
                        <Clock3 className="h-4 w-4 text-[#d97706]" />

                        <div>
                            <p className="text-[13px] font-semibold text-[#92400e]">
                                Certificate not available
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#b45309]">
                                Your certificate will appear
                                here after it has been issued by
                                the academy.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CertificateCard;