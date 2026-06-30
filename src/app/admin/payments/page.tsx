// app/admin/payments/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useGetAdminPurchasesQuery, useUpdatePurchaseStatusMutation } from "@/redux/features/purchases/admin-purchases.api";
import FilterBar from "./components/FilterBar";
import SummaryBadges from "./components/SummaryBadges";
import PaymentsTable from "./components/PaymentsTable";

import ActionConfirmationModal from "@/components/ui/ActionConfirmationModal";

export default function PaymentsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [method, setMethod] = useState("");
    const [course, setCourse] = useState("");

    const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
    const [isRejecting, setIsRejecting] = useState(false);

    const { data: payments = [], isLoading } = useGetAdminPurchasesQuery({ status, method });
    const [updateStatus] = useUpdatePurchaseStatusMutation();

    const filtered = useMemo(() => {
        return payments.filter((e) => {
            const matchSearch = !search || [e.studentName, e.studentEmail, e.courseTitle]
                .some((f) => f.toLowerCase().includes(search.toLowerCase()));
            const matchCourse = !course || e.courseTitle === course;
            return matchSearch && matchCourse;
        });
    }, [payments, search, course]);

    const handleReset = () => {
        setSearch(""); setStatus(""); setMethod(""); setCourse("");
    };

    const handleVerify = async (id: string) => {
        try {
            await updateStatus({ id, status: "verified" }).unwrap();
            toast.success("Payment verified successfully");
        } catch {
            toast.error("Failed to verify payment");
        }
    };

    const handleReject = async (reason?: string) => {
        if (!rejectTargetId) return;

        try {
            setIsRejecting(true);

            await updateStatus({
                id: rejectTargetId,
                status: "rejected",
                rejectionReason: reason || "No reason provided",
            }).unwrap();

            toast.success("Payment rejected");

            setRejectTargetId(null);
        } catch {
            toast.error("Failed to reject payment");
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <>
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
                        <h1 className="text-2xl font-bold text-[#0d1b3e]">All Payments</h1>
                        <p className="mt-1 text-[13px] text-[#6b7280]">
                            Manage and verify student payments
                        </p>
                    </div>
                    <SummaryBadges data={payments} />
                </motion.div>

                {/* Filters */}
                <motion.div variants={fadeUp}>
                    <FilterBar
                        search={search} status={status} method={method} course={course}
                        onSearch={setSearch} onStatus={setStatus}
                        onMethod={setMethod} onCourse={setCourse}
                        onReset={handleReset}
                    />
                </motion.div>

                {/* Result count */}
                <motion.p variants={fadeUp} className="text-[12px] text-[#9ca3af]">
                    Showing {filtered.length} of {payments.length} payments
                </motion.p>

                {/* Table */}
                <motion.div variants={fadeUp}>
                    <PaymentsTable
                        data={filtered}
                        isLoading={isLoading}
                        onVerify={handleVerify}
                        onReject={(id) => setRejectTargetId(id)}
                    />
                </motion.div>
            </motion.div>

            {/* Reject Confirmation Modal */}
            <ActionConfirmationModal
                open={!!rejectTargetId}
                title="Reject Payment"
                description="Please provide a reason before rejecting this payment."
                icon={<AlertTriangle />}
                confirmText="Confirm Reject"
                confirmColor="red"
                loading={isRejecting}
                showReason
                reasonPlaceholder="Write reason (optional)..."
                defaultReason="Rejected by admin"
                onConfirm={handleReject}
                onClose={() => setRejectTargetId(null)}
            />
        </>
    );
}
