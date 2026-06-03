import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { type PaymentMethod, METHODS, stepV } from "./types";
import MethodRow from "./MethodRow";

export default function SelectStep({
    price, selected, onSelect,
}: {
    price: number;
    selected: PaymentMethod;
    onSelect: (id: PaymentMethod) => void;
}) {
    return (
        <motion.div key="select" variants={stepV} initial="hidden" animate="visible" exit="exit" className="px-6 py-5">
            {/* Amount */}
            <div className="mb-5 flex items-center justify-between rounded-xl bg-[#f8faff] px-4 py-3">
                <span className="text-sm text-[#6b7280]">Total Amount</span>
                <span className="text-lg font-bold text-[#0d1b3e]">৳{price.toLocaleString()}</span>
            </div>

            <p className="mb-3 text-sm font-semibold text-[#374151]">Select Payment Method</p>

            <div className="space-y-2.5">
                {METHODS.map((m) => (
                    <MethodRow
                        key={m.id}
                        method={m}
                        selected={selected === m.id}
                        onSelect={() => onSelect(m.id)}
                    />
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#9ca3af]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#16a34a]" />
                Your booking is safe and verified by our team.
            </div>
        </motion.div>
    );
}
