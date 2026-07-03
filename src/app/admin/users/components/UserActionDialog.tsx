// app/admin/users/components/UserActionDialog.tsx
"use client";

import { KeyRound, Ban, CheckCircle } from "lucide-react";

import ActionConfirmationModal from "@/components/ui/ActionConfirmationModal";
import { UserStatus } from "@/types/admin-users";
import { ConfirmAction } from "./hooks/useUserActions";

interface UserActionDialogProps {
    confirmAction: ConfirmAction | null;
    loading: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export default function UserActionDialog({
    confirmAction,
    loading,
    onConfirm,
    onClose,
}: UserActionDialogProps) {
    const isBlockAction =
        confirmAction?.type === "toggleBlock" &&
        confirmAction.currentStatus === UserStatus.ACTIVE;

    return (
        <ActionConfirmationModal
            open={!!confirmAction}
            title={
                confirmAction?.type === "reset"
                    ? "Reset Password"
                    : isBlockAction
                        ? "Block User"
                        : "Unblock User"
            }
            description={
                confirmAction?.type === "reset" ? (
                    <>
                        Are you sure you want to reset the password for{" "}
                        <span className="font-semibold text-gray-700">
                            {confirmAction.userName ?? "this user"}
                        </span>
                        ? A new password will be generated and the current one will stop
                        working.
                    </>
                ) : (
                    <>
                        Are you sure you want to {isBlockAction ? "block" : "unblock"}{" "}
                        <span className="font-semibold text-gray-700">
                            {confirmAction?.userName ?? "this user"}
                        </span>
                        ?{" "}
                        {isBlockAction
                            ? "They will no longer be able to access their account."
                            : "They will regain access to their account."}
                    </>
                )
            }
            icon={
                confirmAction?.type === "reset" ? (
                    <KeyRound className="h-5 w-5 text-blue-500" />
                ) : isBlockAction ? (
                    <Ban className="h-5 w-5 text-red-500" />
                ) : (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                )
            }
            confirmText={
                confirmAction?.type === "reset"
                    ? "Reset Password"
                    : isBlockAction
                        ? "Block User"
                        : "Unblock User"
            }
            confirmColor={
                confirmAction?.type === "reset"
                    ? "blue"
                    : isBlockAction
                        ? "red"
                        : "green"
            }
            loading={loading}
            onConfirm={onConfirm}
            onClose={onClose}
        />
    );
}