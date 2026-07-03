"use client";

import { CircleAlert } from "lucide-react";

import ActionConfirmationModal from "@/components/ui/ActionConfirmationModal";

interface DeleteTeacherModalProps {
    open: boolean;
    loading: boolean;

    onClose: () => void;

    onConfirm: () => void;
}

export default function DeleteTeacherModal({
    open,
    loading,
    onClose,
    onConfirm,
}: DeleteTeacherModalProps) {
    return (
        <ActionConfirmationModal
            open={open}
            title="Delete Teacher"
            description="This teacher profile will be permanently deleted. This action cannot be undone."
            icon={
                <CircleAlert className="h-6 w-6 text-red-600" />
            }
            confirmText="Delete"
            cancelText="Cancel"
            confirmColor="red"
            loading={loading}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}