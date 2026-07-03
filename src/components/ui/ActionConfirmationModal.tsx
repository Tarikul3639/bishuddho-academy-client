"use client";

import { useEffect, useState, cloneElement, isValidElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { NormalizeError } from "@/redux/api/apiError";

interface ActionConfirmationModalProps {
    open: boolean;
    title: string;
    description: React.ReactNode;
    icon: React.ReactNode;
    confirmText: string;
    cancelText?: string;
    loading?: boolean;
    error?: any;
    showReason?: boolean;
    reasonPlaceholder?: string;
    defaultReason?: string;
    confirmColor?: "red" | "green" | "blue";
    onConfirm: (reason?: string) => void;
    onClose: () => void;
}

const COLOR_CONFIG = {
    red: {
        iconBg: "bg-red-50",
        inputFocus: "focus:border-red-400",
        button: "bg-red-500 hover:bg-red-600",
    },
    green: {
        iconBg: "bg-green-50",
        inputFocus: "focus:border-green-400",
        button: "bg-green-600 hover:bg-green-700",
    },
    blue: {
        iconBg: "bg-blue-50",
        inputFocus: "focus:border-blue-400",
        button: "bg-primary hover:bg-primary/90",
    },
};

export default function ActionConfirmationModal({
    open,
    title,
    description,
    icon,
    confirmText,
    cancelText = "Cancel",
    loading = false,
    error,
    showReason = false,
    reasonPlaceholder = "Write reason...",
    defaultReason = "",
    confirmColor = "red",
    onConfirm,
    onClose,
}: ActionConfirmationModalProps) {
    const [reason, setReason] = useState(defaultReason);

    // Reset reason when modal opens
    useEffect(() => {
        if (open) {
            setReason(defaultReason);
        }
    }, [open, defaultReason]);

    if (!open) return null;

    const colors = COLOR_CONFIG[confirmColor];

    // Handle confirm action: only trigger if not loading
    const handleConfirm = () => {
        if (loading) return;
        onConfirm(showReason ? reason.trim() : undefined);
    };

    // Handle close action: prevent closing if loading is in progress
    const handleClose = () => {
        if (loading) return;
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop: Prevent closing by clicking outside if loading */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                    }}
                    className="relative w-full max-w-md rounded-lg border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
                >
                    <div className="p-6">
                        {/* Icon */}
                        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${colors.iconBg}`}>
                            {icon}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-[16px] font-semibold text-gray-900">{title}</h3>
                        <div className="mt-1 text-[13px] leading-relaxed text-gray-500">{description}</div>

                        {/* Reason Input: Disabled during loading */}
                        {showReason && (
                            <textarea
                                rows={3}
                                value={reason}
                                disabled={loading}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder={reasonPlaceholder}
                                className={`mt-4 w-full rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${colors.inputFocus}`}
                            />
                        )}

                        {/* Error Message: Animated appearance */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center gap-2 rounded-sm bg-red-50 p-3 text-[12px] text-red-700 border border-red-100"
                            >
                                <svg
                                    className="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <span className="font-medium">
                                    {NormalizeError(error).message}
                                </span>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={handleClose}
                                disabled={loading}
                                className="rounded-sm border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                            >
                                {cancelText}
                            </button>

                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                style={{ color: "white" }}
                                className={`flex items-center gap-2 rounded-sm px-4 py-2 text-[13px] font-semibold text-white transition disabled:opacity-60 cursor-pointer ${colors.button}`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {isValidElement(icon)
                                            ? cloneElement(
                                                icon as React.ReactElement<any>,
                                                {
                                                    className:
                                                        "h-4 w-4 !text-white",
                                                },
                                            )
                                            : icon}

                                        {confirmText}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}