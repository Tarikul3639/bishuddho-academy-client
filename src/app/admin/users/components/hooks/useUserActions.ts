// app/admin/users/hooks/useUserActions.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
    useToggleUserBlockMutation,
    useResetUserPasswordMutation,
} from "@/redux/features/users/admin-users.api";
import { UserStatus } from "@/types/admin-users";

export type ConfirmAction =
    | { type: "reset"; userId: string; userName?: string }
    | {
          type: "toggleBlock";
          userId: string;
          userName?: string;
          currentStatus: UserStatus;
      };

export function useUserActions() {
    const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

    const [toggleBlock, { isLoading: isToggling }] = useToggleUserBlockMutation();
    const [resetPassword, { isLoading: isResetting }] =
        useResetUserPasswordMutation();

    /* ── Open confirmation dialogs ─────────────────────────────────── */
    const handleResetPassword = (userId: string, userName?: string) => {
        setConfirmAction({ type: "reset", userId, userName });
    };

    const handleToggleBlock = (
        userId: string,
        currentStatus: UserStatus,
        userName?: string,
    ) => {
        setConfirmAction({ type: "toggleBlock", userId, currentStatus, userName });
    };

    /* ── Execute after confirmation ────────────────────────────────── */
    const executeResetPassword = (userId: string) => {
        resetPassword({ userId })
            .unwrap()
            .then(() => {
                toast.success("Password reset successfully. Please inform the user.");
                setConfirmAction(null);
            })
            .catch(() => {
                toast.error("Failed to reset password.");
            });
    };

    const executeToggleBlock = async (userId: string, currentStatus: UserStatus) => {
        try {
            const newStatus =
                currentStatus === UserStatus.ACTIVE
                    ? UserStatus.BLOCKED
                    : UserStatus.ACTIVE;
            await toggleBlock({ userId, status: newStatus }).unwrap();
            toast.success(
                `User ${newStatus === UserStatus.BLOCKED ? UserStatus.BLOCKED : UserStatus.ACTIVE} successfully.`,
            );
            setConfirmAction(null);
        } catch {
            toast.error("Failed to update user status.");
        }
    };

    const handleConfirm = () => {
        if (!confirmAction) return;
        if (confirmAction.type === "reset") {
            executeResetPassword(confirmAction.userId);
        } else {
            executeToggleBlock(confirmAction.userId, confirmAction.currentStatus);
        }
    };

    return {
        confirmAction,
        isToggling,
        isResetting,
        handleResetPassword,
        handleToggleBlock,
        handleConfirm,
        closeConfirm: () => setConfirmAction(null),
    };
}