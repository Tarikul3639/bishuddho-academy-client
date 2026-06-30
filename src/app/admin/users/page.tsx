"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    useGetAdminUsersQuery,
    useToggleUserBlockMutation,
    useResetUserPasswordMutation,
} from "@/redux/features/users/admin-users.api";

import FilterBar from "./components/FilterBar";
import SummaryBadges from "./components/SummaryBadges";
import UsersTable from "./components/UsersTable";

export default function UsersPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const { data, isLoading, isError } = useGetAdminUsersQuery({ search, status });
    const [toggleBlock, { isLoading: isToggling }] = useToggleUserBlockMutation();
    const [resetPassword, { isLoading: isResetting }] = useResetUserPasswordMutation();

    const users = data?.users ?? [];
    const total = data?.total ?? 0;

    const handleReset = () => { setSearch(""); setStatus(""); };

    const handleResetPassword = async (id: string) => {
        try {
            await resetPassword({ id }).unwrap();
            toast.success("Password reset successfully. Please inform the user.");
        } catch {
            toast.error("Failed to reset password.");
        }
    };

    const handleToggleBlock = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "active" ? "blocked" : "active";
            await toggleBlock({ id, status: newStatus }).unwrap();
            toast.success(`User ${newStatus === "blocked" ? "blocked" : "unblocked"} successfully.`);
        } catch {
            toast.error("Failed to update user status.");
        }
    };

    /* ── Loading ────────────────────────────────────────────────────── */
    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-[#1a56db]" />
                <span className="text-sm text-[#6b7280]">Loading users...</span>
            </div>
        );
    }

    /* ── Error ──────────────────────────────────────────────────────── */
    if (isError) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
                <p className="text-lg font-bold text-[#ef4444]">Failed to load users</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 rounded bg-[#1a56db] px-4 py-2 text-sm font-bold text-white hover:bg-[#1346c4]"
                >
                    Try Again
                </button>
            </div>
        );
    }

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
                <SummaryBadges data={users} />
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
                Showing {users.length} of {total} users
            </motion.p>

            {/* Table */}
            <motion.div variants={fadeUp}>
                <UsersTable
                    data={users}
                    onResetPassword={handleResetPassword}
                    onToggleBlock={handleToggleBlock}
                />
            </motion.div>
        </motion.div>
    );
}
