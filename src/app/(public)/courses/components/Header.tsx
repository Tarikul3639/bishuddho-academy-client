import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";

// ─── 1. Header Component ──────────────────────────────────────────────────────
export default function CoursesHeader() {
    return (
        <motion.div className="mb-8 text-center" variants={fadeUp}>
            <h1 className="text-3xl font-bold text-[#111827]">
                Explore Courses
            </h1>
            <p className="mt-2 text-[#6b7280]">
                Find the right course and start learning today
            </p>
        </motion.div>
    );
}