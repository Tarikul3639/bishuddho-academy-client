"use client";

import { FacebookIcon } from "@/components/icons";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Contact Items ────────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
    {
        icon: MapPin,
        label: "Location",
        value: "Kafrul, Dhaka, Bangladesh",
        href: "https://maps.google.com",
        iconClass: "text-primary",
        bgClass: "bg-primary/5",
        external: true,
    },
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "+880 1XXX-XXXXXX",
        href: "https://wa.me/8801XXXXXXXXX",
        iconClass: "text-green-500",
        bgClass: "bg-green-50",
        external: true,
    },
    {
        icon: Mail,
        label: "Email",
        value: "info@bishuddho.com",
        href: "mailto:info@bishuddho.com",
        iconClass: "text-primary",
        bgClass: "bg-primary/5",
        external: false,
    },
    {
        icon: FacebookIcon,
        label: "Facebook",
        value: "Bishuddho Academy",
        href: "https://facebook.com",
        iconClass: "text-[#1877f2]",
        bgClass: "bg-blue-50",
        external: true,
    },
];

// ─── 3. Right Section Component ───────────────────────────────────────────────
export default function ContactRightSection() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-4"
        >
            {CONTACT_ITEMS.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                    ? {
                        href: item.href,
                        ...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {}),
                    }
                    : {};

                return (
                    <motion.div key={item.label} variants={fadeUp}>
                        <Wrapper
                            {...wrapperProps}
                            className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
                        >
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bgClass}`}>
                                {item.icon ? (
                                    <item.icon className={`h-5 w-5 ${item.iconClass}`} />
                                ) : (
                                    <FacebookIcon className={`h-5 w-5 ${item.iconClass}`} />
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                                    {item.label}
                                </p>
                                <p className="mt-0.5 truncate text-sm font-semibold text-[#111827] transition-colors group-hover:text-primary">
                                    {item.value}
                                </p>
                            </div>
                        </Wrapper>
                    </motion.div>
                );
            })}

            <motion.div variants={fadeUp}>
                <div className="rounded-2xl border border-border bg-primary px-5 py-5">
                    <p className="mb-3 text-sm font-semibold text-white">Business Hours</p>
                    <div className="space-y-1.5 text-sm text-primary-foreground/80">
                        {[
                            { day: "Saturday – Thursday", time: "9:00 AM – 6:00 PM" },
                            { day: "Friday", time: "Closed" },
                        ].map((row) => (
                            <div key={row.day} className="flex items-center justify-between">
                                <span className="text-white/70">{row.day}</span>
                                <span className={`font-medium ${row.time === "Closed" ? "text-red-300" : "text-white"}`}>
                                    {row.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}