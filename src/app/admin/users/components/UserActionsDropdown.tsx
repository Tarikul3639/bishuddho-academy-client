// app/admin/users/components/UserActionsDropdown.tsx
"use client";

import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    MoreHorizontal,
    KeyRound,
    Ban,
    CheckCircle2,
} from "lucide-react";

import {
    AdminUser,
    UserStatus,
    PendingAction,
} from "@/types/admin-users";

import { USER_ACTION_DIALOG_CONFIG } from "@/config/user.constants";

export function UserActionsDropdown({
    user,
    onResetPassword,
    onToggleBlock,
}: {
    user: AdminUser;
    onResetPassword: (userId: string) => void;
    onToggleBlock: (
        userId: string,
        status: UserStatus,
    ) => void;
}) {
    const [pending, setPending] =
        useState<PendingAction | null>(null);

    const isBlocked =
        user.status === "blocked";

    function handleConfirm() {
        switch (pending) {
            case "resetPassword":
                onResetPassword(user.userId);
                break;

            case "blockUser":
            case "unblockUser":
                onToggleBlock(
                    user.userId,
                    user.status,
                );
                break;
        }

        setPending(null);
    }

    const active =
        pending ? USER_ACTION_DIALOG_CONFIG[pending] : null;

    return (
        <>
            {/* Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        aria-label="User actions"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#0d1b3e]"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-44"
                >
                    <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                        Actions
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* Reset Password */}
                    <DropdownMenuItem
                        onClick={() =>
                            setPending(
                                "resetPassword",
                            )
                        }
                        className="cursor-pointer gap-2 text-[12px] font-semibold text-[#1a56db] focus:bg-[#eef3ff] focus:text-[#1a56db]"
                    >
                        <KeyRound className="h-3.5 w-3.5" />
                        Reset Password
                    </DropdownMenuItem>

                    {/* Block / Unblock */}
                    <DropdownMenuItem
                        onClick={() =>
                            setPending(
                                isBlocked
                                    ? "unblockUser"
                                    : "blockUser",
                            )
                        }
                        className={`cursor-pointer gap-2 text-[12px] font-semibold ${isBlocked
                                ? "text-[#16a34a] focus:bg-[#dcfce7] focus:text-[#16a34a]"
                                : "text-[#ef4444] focus:bg-[#fee2e2] focus:text-[#ef4444]"
                            }`}
                    >
                        {isBlocked ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                            <Ban className="h-3.5 w-3.5" />
                        )}

                        {isBlocked
                            ? "Unblock User"
                            : "Block User"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Confirmation Dialog */}
            <AlertDialog
                open={!!pending}
                onOpenChange={(open) => {
                    if (!open) {
                        setPending(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[15px] font-bold text-[#0d1b3e]">
                            {active?.title}
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-[13px] text-[#6b7280]">
                            {active?.description({ name: user.name, email: user.email })}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer text-[12px]">
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleConfirm}
                            className={`text-[12px] font-bold ${active?.actionClass}`}
                        >
                            {active?.actionLabel}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}