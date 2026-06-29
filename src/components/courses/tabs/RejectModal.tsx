"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, XCircle } from "lucide-react";
import type { EnrolledStudent } from "@/types/admin-course-details";

interface RejectModalProps {
    student: EnrolledStudent;
    isRejecting: boolean;
    onConfirm: (reason: string) => void;
    onClose: () => void;
}

export default function RejectModal({
    student,
    isRejecting,
    onConfirm,
    onClose,
}: RejectModalProps) {
    const [reason, setReason] = useState("");

    const handleConfirm = () => {
        onConfirm(reason.trim() || "Rejected by admin");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* soft backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="relative w-full max-w-md rounded-lg bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
                <div className="p-6">
                    {/* icon */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 mb-4">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>

                    <h3 className="text-[16px] font-semibold text-gray-900">
                        Reject Payment
                    </h3>

                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                        Reject payment for{" "}
                        <span className="font-medium text-gray-800">
                            {student.user.name}
                        </span>
                        . Add a short reason before confirming.
                    </p>

                    {/* input */}
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Write reason (optional)..."
                        rows={3}
                        className="mt-4 w-full rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-red-400 focus:bg-white transition"
                    />

                    {/* actions */}
                    <div className="mt-5 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            disabled={isRejecting}
                            className="px-4 py-2 text-[13px] font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleConfirm}
                            disabled={isRejecting}
                            className="px-4 py-2 text-[13px] font-semibold text-white bg-red-500 rounded-sm hover:bg-red-600 disabled:opacity-60 flex items-center gap-2"
                        >
                            {isRejecting ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <XCircle className="h-4 w-4" />
                                    Confirm Reject
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}