import { ChevronRight, ChevronLeft } from "lucide-react";
import { type Step, type PaymentMethod } from "./types";

export default function ModalFooter({
    step, selected, onNext, onSubmit, onBack,
}: {
    step:     Step;
    selected: PaymentMethod;
    onNext:   () => void;
    onSubmit: () => void;
    onBack:   () => void;
}) {
    if (step === "select") return (
        <div className="border-t border-[#e5e7eb] px-6 py-4">
            <button
                onClick={onNext}
                disabled={!selected}
                className={`flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-[15px] font-bold text-white transition-all cursor-pointer ${
                    selected
                        ? "bg-[#059669] hover:bg-[#047857]"
                        : "cursor-not-allowed bg-[#e5e7eb] text-[#9ca3af]"
                }`}
            >
                Continue
                {selected && <ChevronRight className="h-5 w-5" />}
            </button>
        </div>
    );

    if (step === "trxid") return (
        <div className="flex gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
                onClick={onBack}
                className="flex items-center justify-center gap-1.5 rounded-md border border-[#d1d5db] px-5 py-3 text-sm font-bold text-[#374151] transition-colors hover:bg-[#d3d5d7] cursor-pointer"
            >
                <ChevronLeft className="h-5 w-5" />
                Back
            </button>
            <button
                onClick={onSubmit}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#059669] py-3 text-sm font-bold text-white transition-colors hover:bg-[#047857] cursor-pointer"
            >
                Submit Booking
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );

    return null;
}
