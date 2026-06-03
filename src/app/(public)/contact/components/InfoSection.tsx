"use client";

import { motion, type Variants } from "framer-motion";
import { WhatsApp, Gmail, Clock, Office } from "@/components/icons";

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const INFO_ITEMS = [
    {
        icon: Office,
        title: "Head Office",
        value: "Taragang, Dhaka 1201",
        description: "Visit us at our main campus for in-person support.",
        color: "#1a56db",
        bg: "#eef3ff",
        border: "#c7d7fd",
    },
    {
        icon: Gmail,
        title: "Email Us",
        value: "hello@bishuddho.com",
        description: "We respond to all emails within 24 working hours.",
        color: "#dc2626",
        bg: "#fef2f2",
        border: "#fecaca",
    },
    {
        icon: WhatsApp,
        title: "WhatsApp Support",
        value: "+880 1XXX-XXXXXX",
        description: "Fastest way to reach us — we're usually online.",
        color: "#16a34a",
        bg: "#f0fdf4",
        border: "#bbf7d0",
    },
    {
        icon: Clock,
        title: "Working Hours",
        value: "Mon–Fri · 7AM–5PM",
        description: "We're closed on weekends and public holidays.",
        color: "#d97706",
        bg: "#fffbeb",
        border: "#fde68a",
    },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export function InfoSection() {
    return (
        <section className="relative w-full overflow-hidden py-14 lg:py-16">

            {/* Section header */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="mb-16 text-center"
            >
                <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#1a56db]">
                    Get In Touch
                </p>
                <h2 className="text-3xl font-bold text-[#0d1b3e] lg:text-4xl">
                    We&apos;d love to hear from you
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#6b7280]">
                    Reach us through any of the channels below — we&apos;re always ready to help.
                </p>
            </motion.div>

            {/* ── DESKTOP TIMELINE ────────────────────────────────────────────── */}
            <div className="relative hidden max-w-5xl mx-auto px-6 lg:block">

                {/* Center vertical line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-[#1a56db]/25 to-transparent" />

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="flex flex-col gap-16"
                >
                    {INFO_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        const isLeft = index % 2 === 0;

                        return (
                            <div key={item.title} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8">

                                {/* LEFT side */}
                                <div className="flex justify-end">
                                    {isLeft ? (
                                        <motion.div
                                            variants={fadeLeft}
                                            whileHover={{ y: -4 }}
                                            className="w-full max-w-85 rounded-xl border p-6 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                                            style={{
                                                background: item.bg,
                                                borderColor: item.border,
                                            }}
                                        >
                                            <p
                                                className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em]"
                                                style={{ color: item.color }}
                                            >
                                                {item.title}
                                            </p>
                                            <p className="text-lg font-bold text-[#0d1b3e]">
                                                {item.value}
                                            </p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-[#6b7280]">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        /* Connector line to center */
                                        <div
                                            className="h-px w-full max-w-85 self-center"
                                            style={{ background: `linear-gradient(to left, ${item.border}, transparent)` }}
                                        />
                                    )}
                                </div>

                                {/* CENTER — icon node */}
                                <motion.div
                                    variants={scaleIn}
                                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                                    style={{ borderColor: item.border }}
                                    whileHover={{ scale: 1.12 }}
                                >
                                    <span style={{ color: item.color }}>
                                        <Icon className="h-5 w-5" />
                                    </span>
                                </motion.div>

                                {/* RIGHT side */}
                                <div className="flex justify-start">
                                    {!isLeft ? (
                                        <motion.div
                                            variants={fadeRight}
                                            whileHover={{ y: -4 }}
                                            className="w-full max-w-85 rounded-sm border p-6 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                                            style={{
                                                background: item.bg,
                                                borderColor: item.border,
                                            }}
                                        >
                                            <p
                                                className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em]"
                                                style={{ color: item.color }}
                                            >
                                                {item.title}
                                            </p>
                                            <p className="text-lg font-bold text-[#0d1b3e]">
                                                {item.value}
                                            </p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-[#6b7280]">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        /* Connector line to center */
                                        <div
                                            className="h-px w-full max-w-85 self-center"
                                            style={{ background: `linear-gradient(to right, ${item.border}, transparent)` }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Timeline end dot */}
                <div className="relative mt-6 flex justify-center">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#1a56db]/40" />
                </div>
            </div>

            {/* ── MOBILE LAYOUT ────────────────────────────────────────────────── */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="relative mx-auto max-w-sm space-y-4 px-4 lg:hidden"
            >
                {/* Vertical line */}
                <div className="absolute left-9 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#1a56db]/20 to-transparent" />

                {INFO_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
                            className="relative flex gap-4"
                        >
                            {/* Icon node */}
                            <div
                                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-sm"
                                style={{ borderColor: item.border }}
                            >
                                <span style={{ color: item.color }}>
                                    <Icon className="h-4 w-4" />
                                </span>
                            </div>

                            {/* Card */}
                            <div
                                className="flex-1 rounded-sm border p-4"
                                style={{ background: item.bg, borderColor: item.border }}
                            >
                                <p
                                    className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                                    style={{ color: item.color }}
                                >
                                    {item.title}
                                </p>
                                <p className="text-sm font-bold text-[#0d1b3e]">{item.value}</p>
                                <p className="mt-1 text-[12px] leading-relaxed text-[#6b7280]">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}