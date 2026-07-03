// app/admin/users/components/UsersTable.tsx
"use client";

import { motion } from "framer-motion";
import { stagger } from "@/components/animations";
import { AdminUser, UserStatus } from "@/types/admin-users";
import { TableRow } from "./TableRow";

export default function UsersTable({
    data, onResetPassword, onToggleBlock,
}: {
    data: AdminUser[];
    onResetPassword: (userId: string, userName?: string) => void;
    onToggleBlock: (userId: string, status: UserStatus, userName?: string) => void;
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
                                <th key={h.label} className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af] ${h.cls}`}>
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <motion.tbody initial="hidden" animate="visible" variants={stagger}>
                        {data.map((u) => (
                            <TableRow
                                key={u.userId}
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