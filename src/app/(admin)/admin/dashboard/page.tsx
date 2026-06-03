// app/admin/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { stagger } from "@/components/animations";
import AdminSettingsBar   from "./components/AdminSettingsBar";

export default function AdminDashboardPage() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 p-4 sm:p-6"
        >

            {/* Settings Bar */}
            <AdminSettingsBar />
        </motion.div>
    );
}