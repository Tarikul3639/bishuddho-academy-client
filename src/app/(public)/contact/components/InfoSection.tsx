"use client";

import { motion, type Variants } from "framer-motion";
import { WhatsApp, Gmail, Clock, Office } from "@/components/icons";

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const rowReveal: Variants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
    },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const INFO_ITEMS = [
    {
        icon: Office,
        tag: "Visit",
        title: "Head Office",
        value: "Taragang, Dhaka 1201",
        description: "Visit us at our main campus for in-person support.",
    },
    {
        icon: Gmail,
        tag: "Email",
        title: "Email Us",
        value: "hello@bishuddho.com",
        description: "We respond to all emails within 24 working hours.",
    },
    {
        icon: WhatsApp,
        tag: "Chat",
        title: "WhatsApp Support",
        value: "+880 1XXX-XXXXXX",
        description: "Fastest way to reach us — we're usually online.",
    },
    {
        icon: Clock,
        tag: "Hours",
        title: "Working Hours",
        value: "Mon–Fri · 7AM–5PM",
        description: "We're closed on weekends and public holidays.",
    },
] as const;

// ── Signature divider (abstracted interlace line) ──────────────────────────────

function InterlaceDivider() {
    return (
        <svg
            viewBox="0 0 240 24"
            className="h-6 w-40 shrink-0 text-primary lg:w-56"
            fill="none"
            aria-hidden="true"
        >
            <motion.path
                d="M0 12 C 20 2, 40 22, 60 12 S 100 2, 120 12 S 160 22, 180 12 S 220 2, 240 12"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                variants={drawLine}
            />
        </svg>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function InfoSection() {
    return (
        <section id="contact-form" className="relative w-full overflow-hidden py-16">
            <div className="mx-auto">

                {/* Header — asymmetric, ledger-title style */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                            Directory · Get In Touch
                        </p>
                        <h2 className="font-serif text-3xl font-bold text-foreground lg:text-[2.75rem] lg:leading-[1.1]">
                            Reach the academy
                        </h2>
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <InterlaceDivider />
                    </motion.div>
                </motion.div>

                {/* Ledger list */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="border-t border-border"
                >
                    {INFO_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                variants={rowReveal}
                                className="group relative border-b border-border px-1 py-6 transition-colors duration-300 sm:px-2"
                            >
                                {/* Left accent bar on hover */}
                                <span
                                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100"
                                    aria-hidden="true"
                                />

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                                    {/* Icon */}
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border text-primary transition-colors duration-300 group-hover:border-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    {/* Tag */}
                                    <p className="w-16 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                        {item.tag}
                                    </p>

                                    {/* Value */}
                                    <p className="font-serif text-lg font-bold text-foreground sm:w-64 sm:shrink-0">
                                        {item.value}
                                    </p>

                                    {/* Description */}
                                    <p className="text-[13px] leading-relaxed text-muted-foreground sm:ml-auto sm:max-w-xs sm:text-right">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}