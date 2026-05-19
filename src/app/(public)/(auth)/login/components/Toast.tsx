import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Toast({ message, type }: { message: string; type: "success" | "error" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium mb-5 ${type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
                }`}
        >
            {type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            {message}
        </motion.div>
    );
}