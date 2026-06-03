import { motion } from "framer-motion";
import { X } from "lucide-react";
import { stepV } from "./types";

export default function FailedStep({ onRetry }: { onRetry: () => void }) {
    return (
        <motion.div key="failed" variants={stepV} initial="hidden" animate="visible" exit="exit"
            className="flex flex-col items-center px-6 py-10 text-center"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2]">
                <X className="h-8 w-8 text-[#ef4444]" />
            </div>
            <p className="mt-4 text-lg font-bold text-[#0d1b3e]">Submission Failed</p>
            <p className="mt-1 text-sm text-[#6b7280]">Something went wrong. Please try again.</p>
            <button
                onClick={onRetry}
                className="mt-6 w-full rounded-xl bg-[#1a56db] py-3 text-sm font-bold text-white transition-colors hover:bg-[#1346c4]"
            >
                Try Again
            </button>
        </motion.div>
    );
}
