// app/admin/users/components/UsersTable.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { BookOpen } from "lucide-react";
// import { type AdminUser } from "@/redux/features/users/admin-users.api";
// import { STATUS_CONFIG } from "../../_data/users";
import { UserActionsDropdown } from "./UserActionsDropdown";

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}


export type UserStatus = "active" | "blocked";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  studentId: string;

  status: UserStatus;

  joinedDate: string;
  lastLogin: string;

  coursesCount: number;
  lastPurchase: string;
}

export const STATUS_CONFIG: Record<
  UserStatus,
  {
    label: string;
    color: string;
    bg: string;
  }
> = {
  active: {
    label: "Active",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  blocked: {
    label: "Blocked",
    color: "#ef4444",
    bg: "#fee2e2",
  },
};

// Temporary demo data.
// Remove this after connecting the backend.
export const USERS: AdminUser[] = [];

// ── Table Row ─────────────────────────────────────────────────────────────────

function TableRow({
    user, onResetPassword, onToggleBlock,
}: {
    user: AdminUser;
    onResetPassword: (id: string) => void;
    onToggleBlock: (id: string, status: string) => void;
}) {
    const status = STATUS_CONFIG[user.status];

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Student — avatar + name + email */}
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

            {/* ID / Joined / Last Login / Status — combined */}
            <td className="hidden px-4 py-3 sm:table-cell">
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] text-[#9ca3af]">
                        Joined {user.joinedDate}
                    </p>
                    <p className="text-[11px] text-[#9ca3af]">
                        Last login {user.lastLogin}
                    </p>
                    <span
                        className="mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold w-fit"
                        style={{ background: status.bg, color: status.color }}
                    >
                        {status.label}
                    </span>
                </div>
            </td>

            {/* Courses */}
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

            {/* Actions — shadcn dropdown */}
            <td className="px-4 py-3">
                <UserActionsDropdown
                    user={user}
                    onResetPassword={onResetPassword}
                    onToggleBlock={(id) => onToggleBlock(id, user.status)}
                />
            </td>
        </motion.tr>
    );
}

// ── Table ─────────────────────────────────────────────────────────────────────

export default function UsersTable({
    data, onResetPassword, onToggleBlock,
}: {
    data: AdminUser[];
    onResetPassword: (id: string) => void;
    onToggleBlock: (id: string, status: string) => void;
}) {
    if (data.length === 0) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white py-16 text-center">
                <p className="text-[14px] font-semibold text-[#6b7280]">No users found</p>
                <p className="mt-1 text-[12px] text-[#9ca3af]">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                            {[
                                { label: "Student", cls: "" },
                                { label: "Info", cls: "hidden sm:table-cell" },
                                { label: "Courses", cls: "hidden md:table-cell" },
                                { label: "Actions", cls: "" },
                            ].map((h) => (
                                <th
                                    key={h.label}
                                    className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}
                                >
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                        {data.map((u) => (
                            <TableRow
                                key={u.id}
                                user={u}
                                onResetPassword={onResetPassword}
                                onToggleBlock={onToggleBlock}
                            />
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}