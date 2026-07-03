"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { useRouter } from "next/navigation";

import { useGetAdminUsersQuery } from "@/redux/features/users/admin-users.api";
import { UserStatus } from "@/types/admin-users";

import FilterBar from "./components/FilterBar";
import UsersTable from "./components/table/UsersTable";
import UsersPageHeader from "./components/UsersPageHeader";
import UserActionDialog from "./components/UserActionDialog";
import { LoadingState, ErrorState } from "@/components/query-states";
import { useUserActions } from "./components/hooks/useUserActions";

export default function UsersPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<UserStatus>(UserStatus.ALL);

    const { data, isLoading, isError } = useGetAdminUsersQuery({
        search,
        status,
    });

    const {
        confirmAction,
        isToggling,
        isResetting,
        handleResetPassword,
        handleToggleBlock,
        handleConfirm,
        closeConfirm,
    } = useUserActions();

    const users = data?.users ?? [];
    const total = data?.total ?? 0;

    const handleReset = () => {
        setSearch("");
        setStatus(UserStatus.ALL);
    };

    if (isLoading) return <LoadingState />;
    if (isError) {
        return <ErrorState onRetry={() => window.location.reload()} />;
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-5 p-4 sm:p-6"
        >
            <UsersPageHeader
                users={users}
                onBack={() => router.replace("/admin/dashboard")}
            />

            {/* Filters */}
            <motion.div variants={fadeUp}>
                <FilterBar
                    search={search}
                    status={status}
                    onSearch={setSearch}
                    onStatus={setStatus}
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

            {/* Confirmation Dialog */}
            <UserActionDialog
                confirmAction={confirmAction}
                loading={confirmAction?.type === "reset" ? isResetting : isToggling}
                onConfirm={handleConfirm}
                onClose={closeConfirm}
            />
        </motion.div>
    );
}