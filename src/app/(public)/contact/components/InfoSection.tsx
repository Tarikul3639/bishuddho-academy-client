"use client";

import { motion, type Variants } from "framer-motion";
import { WhatsApp, Gmail, Clock, Office } from "@/components/icons";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const INFO_ITEMS = [
    { icon: Office, title: "Head Office", value: "Taragang, Dhaka 1201" },
    { icon: Gmail, title: "Email", value: "hello@bishuddho.com" },
    { icon: WhatsApp, title: "Support", value: "+880 1XXX-XXXXXX" },
    { icon: Clock, title: "Hours", value: "Mon–Fri · 7AM–5PM" },
];

export function InfoSection() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative w-full py-12 lg:py-20"
        >
            {/* DESKTOP TIMELINE - Center vertical line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-20 max-w-6xl mx-auto px-4">
                {INFO_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const isLeft = index % 2 === 0;

                    return (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
                            className="relative"
                        >
                            {/* DESKTOP LAYOUT */}
                            <div className="hidden lg:grid grid-cols-3 gap-4 items-center">
                                {/* LEFT SIDE - Info card or empty */}
                                <div className={`bg-gray-50 ${isLeft ? "col-span-1" : "col-span-1 opacity-0 pointer-events-none"}`}>
                                    {isLeft && (
                                        <motion.div
                                            whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(59, 130, 246, 0.15)" }}
                                            className="rounded-lg border border-gray-200 p-5 transition-all duration-300"
                                        >
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                                {item.title}
                                            </p>
                                            <p className="text-base font-semibold text-gray-900 mt-2">
                                                {item.value}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>

                                {/* CENTER - Icon on line */}
                                <div className="col-span-1 flex justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="relative z-10"
                                    >
                                        <div className="h-14 w-14 bg-white rounded-full border-2 border-gray-50 flex items-center justify-center duration-300">
                                            <Icon className="h-7 w-7 text-primary" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* RIGHT SIDE - Info card or empty */}
                                <div className={`bg-gray-50 ${!isLeft ? "col-span-1" : "col-span-1 opacity-0 pointer-events-none"}`}>
                                    {!isLeft && (
                                        <motion.div
                                            whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(59, 130, 246, 0.15)" }}
                                            className="rounded-lg border border-gray-200 p-5 transition-all duration-300"
                                        >
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                                {item.title}
                                            </p>
                                            <p className="text-base font-semibold text-gray-900 mt-2">
                                                {item.value}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* MOBILE LAYOUT */}
                            <div className="lg:hidden">
                                <div className="flex flex-col items-center gap-4">
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="h-12 w-12 rounded-full bg-white border-2 border-gray-50 flex items-center justify-center duration-300"
                                    >
                                        <Icon className="h-6 w-6 text-primary" />
                                    </motion.div>

                                    {/* Info card */}
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        className="w-full max-w-xs rounded-lg border border-gray-100 bg-white p-5 shadow-sm text-center hover:border-primary/30 transition-all duration-300"
                                    >
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                            {item.title}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 mt-2">
                                            {item.value}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* DECORATIVE BOTTOM ELEMENT */}
            <div className="justify-center mt-12 hidden lg:block">
                <div className="h-3 w-3 rounded-full bg-primary/40 animate-pulse" />
            </div>
        </motion.div>
    );
}