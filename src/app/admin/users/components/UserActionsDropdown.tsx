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
import { MoreHorizontal, KeyRound, Ban, CheckCircle2 } from "lucide-react";
import { type AdminUser } from "@/redux/features/users/admin-users.api";

type PendingAction = "reset" | "block" | null;

export function UserActionsDropdown({
    user,
    onResetPassword,
    onToggleBlock,
}: {
    user: AdminUser;
    onResetPassword: (id: string) => void;
    onToggleBlock: (id: string, status: string) => void;
}) {
    const [pending, setPending] = useState<PendingAction>(null);
    const isBlocked = user.status === "blocked";

    function handleConfirm() {
        if (pending === "reset") onResetPassword(user.id);
        if (pending === "block") onToggleBlock(user.id, user.status);
        setPending(null);
    }

    const dialogConfig = {
        reset: {
            title: "Reset Password?",
            description: `A reset link will be sent to ${user.email}.`,
            actionLabel: "Send Link",
            actionClass: "bg-[#1a56db] hover:bg-[#1e40af] text-white cursor-pointer",
        },
        block: {
            title: isBlocked ? "Unblock User?" : "Block User?",
            description: isBlocked
                ? `${user.name} will regain full access immediately.`
                : `${user.name} will lose access immediately.`,
            actionLabel: isBlocked ? "Unblock" : "Block",
            actionClass: isBlocked
                ? "bg-[#16a34a] hover:bg-[#15803d] text-white cursor-pointer"
                : "bg-[#ef4444] hover:bg-[#dc2626] text-white",
        },
    } satisfies Record<NonNullable<PendingAction>, {
        title: string; description: string; actionLabel: string; actionClass: string;
    }>;

    const active = pending ? dialogConfig[pending] : null;

    return (
        <>
            {/* ── Dropdown ── */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#0d1b3e] cursor-pointer"
                        aria-label="User actions"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Reset password */}
                    <DropdownMenuItem
                        onClick={() => setPending("reset")}
                        className="cursor-pointer gap-2 text-[12px] font-semibold text-[#1a56db] focus:bg-[#eef3ff] focus:text-[#1a56db]"
                    >
                        <KeyRound className="h-3.5 w-3.5" />
                        Reset Password
                    </DropdownMenuItem>

                    {/* Block / Unblock */}
                    <DropdownMenuItem
                        onClick={() => setPending("block")}
                        className={`cursor-pointer gap-2 text-[12px] font-semibold focus:bg-opacity-10 ${isBlocked
                                ? "text-[#16a34a] focus:bg-[#dcfce7] focus:text-[#16a34a]"
                                : "text-[#ef4444] focus:bg-[#fee2e2] focus:text-[#ef4444]"
                            }`}
                    >
                        {isBlocked
                            ? <CheckCircle2 className="h-3.5 w-3.5" />
                            : <Ban className="h-3.5 w-3.5" />
                        }
                        {isBlocked ? "Unblock User" : "Block User"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* ── Confirm Dialog ── */}
            <AlertDialog open={!!pending} onOpenChange={(o) => { if (!o) setPending(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[15px] font-bold text-[#0d1b3e]">
                            {active?.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[13px] text-[#6b7280]">
                            {active?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-[12px] cursor-pointer">Cancel</AlertDialogCancel>
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