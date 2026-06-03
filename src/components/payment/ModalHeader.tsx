import { X } from "lucide-react";
import { type Step } from "./types";

export default function ModalHeader({
    step, courseTitle, onClose,
}: {
    step: Step; courseTitle: string; onClose: () => void;
}) {
    const titles: Partial<Record<Step, string>> = {
        select:  "Complete Your Booking",
        trxid:   "Enter Transaction ID",
    };
    return (
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
                <h2 className="font-bold text-[#0d1b3e]">
                    {titles[step] ?? "Complete Your Booking"}
                </h2>
                <p className="mt-0.5 line-clamp-1 text-xs text-[#6b7280]">{courseTitle}</p>
            </div>
            {step !== "processing" && (
                <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#0d1b3e]"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}
