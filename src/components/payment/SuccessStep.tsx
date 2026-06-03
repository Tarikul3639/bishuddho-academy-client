import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { stepV } from "./types";

export default function SuccessStep({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    return (
        <motion.div key="success" variants={stepV} initial="hidden" animate="visible" exit="exit"
            className="flex flex-col items-center px-6 py-10 text-center"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7]">
                <svg className="h-8 w-8 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <p className="mt-4 text-lg font-bold text-[#0d1b3e]">Booking Submitted!</p>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-[#6b7280]">
                Your booking is under review. We&apos;ll confirm your seat within 24 hours via SMS or email.
            </p>
            <button
                onClick={() => {
                    onClose();
                    router.push("/my-courses");
                }}
                className="mt-6 w-full rounded-sm bg-[#1a56db] py-3 text-sm font-bold text-white transition-colors hover:bg-[#1346c4] cursor-pointer"
            >
                Go to My Courses
            </button>
        </motion.div>
    );
}
