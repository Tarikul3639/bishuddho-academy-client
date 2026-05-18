"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import contactImg from "@/assets/logo.jpg";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

// ─── 2. Left Section Component ────────────────────────────────────────────────
export default function ContactLeftSection() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-border shadow-sm md:h-full md:min-h-105">
                <Image
                    src={contactImg}
                    alt="Bishuddho Academy"
                    fill
                    className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/30 bg-white/80 px-5 py-4 backdrop-blur-md">
                    <p className="text-sm font-bold text-[#111827]">Bishuddho Academy</p>
                    <p className="mt-0.5 text-xs text-[#6b7280]">
                        Bangladesh&apos;s trusted learning platform
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs font-medium text-green-600">
                            Open — Mon to Sat, 9am–6pm
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}