// app/admin/users/components/TableRow.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";
import { BookOpen, MoreVertical, KeyRound, Ban, CheckCircle } from "lucide-react";
import { AdminUser, UserStatus } from "@/types/admin-users";
import { STATUS_CONFIG } from "@/config/user.constants";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function TableRow({
    user, onResetPassword, onToggleBlock,
}: {
    user: AdminUser;
    onResetPassword: (userId: string, userName?: string) => void;
    onToggleBlock: (userId: string, status: UserStatus, userName?: string) => void;
}) {
    const status = STATUS_CONFIG[user.status];
    const isActive = user.status === UserStatus.ACTIVE;

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-[11px] font-bold text-white">
                        {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-[#0d1b3e]">{user.name}</p>
                        <p className="truncate text-[11px] text-[#6b7280]">{user.email}</p>
                        <span className="rounded-md bg-[#f3f4f6] py-0.5 font-mono text-[11px] font-semibold text-[#374151] w-fit">
                            {user.studentId}
                        </span>
                    </div>
                </div>
            </td>

            <td className="hidden px-4 py-3 sm:table-cell">
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] text-[#9ca3af]">Joined {user.joinedDate}</p>
                    <p className="text-[11px] text-[#9ca3af]">Last login {user.lastLogin}</p>
                    <span
                        className="mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold w-fit"
                        style={{ background: status.bg, color: status.color }}
                    >
                        {status.label}
                    </span>
                </div>
            </td>

            <td className="hidden px-4 py-3 md:table-cell">
                <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#1a56db]" />
                    <div>
                        <p className="text-[12px] font-bold text-[#0d1b3e]">
                            {user.coursesCount} course{user.coursesCount !== 1 ? "s" : ""}
                        </p>
                        <p className="text-[10px] text-[#9ca3af]">{user.lastPurchase}</p>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#0d1b3e]">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => onResetPassword(user.userId, user.name)} className="cursor-pointer gap-2 text-[13px]">
                            <KeyRound className="h-3.5 w-3.5 text-[#1a56db]" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={() => onToggleBlock(user.userId, user.status, user.name)} 
                            className={`cursor-pointer gap-2 text-[13px] ${isActive ? 'text-red-600 focus:text-red-600' : 'text-green-600 focus:text-green-600'}`}
                        >
                            {isActive ? <><Ban className="h-3.5 w-3.5" /> Block User</> : <><CheckCircle className="h-3.5 w-3.5" /> Unblock User</>}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>
        </motion.tr>
    );
}