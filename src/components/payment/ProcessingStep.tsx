import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { stepV } from "./types";

export default function ProcessingStep() {
    return (
        <motion.div key="processing" variants={stepV} initial="hidden" animate="visible" exit="exit"
            className="flex flex-col items-center px-6 py-12 text-center"
        >
            <Loader2 className="h-12 w-12 animate-spin text-[#1a56db]" />
            <p className="mt-4 font-bold text-[#0d1b3e]">Processing your booking…</p>
            <p className="mt-1 text-sm text-[#6b7280]">Please wait, do not close this window.</p>
        </motion.div>
    );
}
