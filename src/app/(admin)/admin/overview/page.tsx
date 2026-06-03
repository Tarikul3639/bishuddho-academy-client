// app/admin/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { stagger } from "@/components/animations";
import StatsRow from "./components/StatsRow";
import RecentEnrollments from "./components/RecentEnrollments";
import PendingPayments from "./components/PendingPayments";
import CourseOverview from "./components/CourseOverview";
import PageHeader from "@/components/ui/PageHeader";

export default function AdminDashboardPage() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-4 sm:p-6"
        >

            <PageHeader
                title="Overview"
                description="Get a quick snapshot of your academy's performance, including student enrollment, course activity, and pending tasks all in one place."
                backLabel="Back to Dashboard"
                backPath="/admin/dashboard"
            />

            {/* Stats */}
            <StatsRow />

            {/* Enrollments + Pending — 2 col on lg */}
            <div className="grid gap-6 lg:grid-cols-2">
                <RecentEnrollments />
                <PendingPayments />
            </div>

            {/* Course Overview — full width */}
            <CourseOverview />
        </motion.div>
    );
}