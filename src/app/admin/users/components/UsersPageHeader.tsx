// app/admin/users/components/UsersPageHeader.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";
import { ArrowLeft } from "lucide-react";

import SummaryBadges from "./SummaryBadges";
import { AdminUser } from "@/types/admin-users";

interface UsersPageHeaderProps {
    users: AdminUser[];
    onBack: () => void;
}

export default function UsersPageHeader({ users, onBack }: UsersPageHeaderProps) {
    return (
        <>
            {/* Back */}
            <motion.button
                variants={fadeUp}
                onClick={onBack}
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#6b7280] transition-colors hover:text-[#1a56db]"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
            </motion.button>

            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-start justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold text-[#0d1b3e]">User Management</h1>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                        Manage student accounts, reset passwords and control access
                    </p>
                </div>
                <SummaryBadges data={users} />
            </motion.div>
        </>
    );
}