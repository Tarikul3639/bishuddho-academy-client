// app/admin/users/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { USERS } from "../_data/users";
import FilterBar from "./components/FilterBar";
import SummaryBadges from "./components/SummaryBadges";
import UsersTable from "./components/UsersTable";

export default function UsersPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const filtered = useMemo(() => {
        return USERS.filter((u) => {
            const matchSearch = !search || [u.name, u.email, u.studentId]
                .some((f) => f.toLowerCase().includes(search.toLowerCase()));
            const matchStatus = !status || u.status === status;
            return matchSearch && matchStatus;
        });
    }, [search, status]);

    const handleReset = () => { setSearch(""); setStatus(""); };

    const handleResetPassword = (id: string) => {
        // TODO: POST /admin/users/:id/reset-password
        console.log("Reset password for:", id);
    };

    const handleToggleBlock = (id: string) => {
        // TODO: PATCH /admin/users/:id/toggle-block
        console.log("Toggle block for:", id);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-5 p-4 sm:p-6"
        >
            {/* Back */}
            <motion.button
                variants={fadeUp}
                onClick={() => router.replace("/admin/dashboard")}
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#6b7280] transition-colors hover:text-[#1a56db]"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
            </motion.button>

            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0d1b3e]">User Management</h1>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                        Manage student accounts, reset passwords and control access
                    </p>
                </div>
                <SummaryBadges data={USERS} />
            </motion.div>

            {/* Filters */}
            <motion.div variants={fadeUp}>
                <FilterBar
                    search={search} status={status}
                    onSearch={setSearch} onStatus={setStatus}
                    onReset={handleReset}
                />
            </motion.div>

            {/* Result count */}
            <motion.p variants={fadeUp} className="text-[12px] text-[#9ca3af]">
                Showing {filtered.length} of {USERS.length} users
            </motion.p>

            {/* Table */}
            <motion.div variants={fadeUp}>
                <UsersTable
                    data={filtered}
                    onResetPassword={handleResetPassword}
                    onToggleBlock={handleToggleBlock}
                />
            </motion.div>
        </motion.div>
    );
}