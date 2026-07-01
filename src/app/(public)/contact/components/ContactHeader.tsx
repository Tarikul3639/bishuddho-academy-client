"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { stagger, fadeUp } from "@/components/animations";
import EmailCampaignIllustration from "@/components/illustrations/email-campaign.svg";

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function ContactContent() {
    return (
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="mb-6 flex items-center justify-center gap-4 lg:justify-start">
                <div className="h-px w-10 bg-primary/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                    Let&apos;s Connect
                </span>
                <div className="h-px w-10 bg-primary/40 lg:hidden" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl font-semibold leading-tight text-gray-900 md:text-5xl">
                Start a Conversation
                <br />
                <span className="font-bold text-primary">With Our Team</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-lg text-sm leading-relaxed text-gray-600 md:text-base">
                Whether you’re a student, instructor, or partner — we’re
                always open to meaningful conversations and collaborations.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
                <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                    Get in Touch
                </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-2 lg:justify-start">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <span className="h-px w-24 bg-linear-to-r from-primary/40 to-transparent" />
            </motion.div>
        </motion.div>
    );
}

function ContactIllustrationSection() {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex w-full justify-center"
        >
            <Image
                src={EmailCampaignIllustration}
                alt="Illustration of an email being sent, representing getting in touch"
                priority
                className="h-auto w-full max-w-md"
            />
        </motion.div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactHeader = () => {
    return (
        <section className="overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
                    {/* Content order follows hero logic */}
                    <div className="order-2 lg:order-1">
                        <ContactContent />
                    </div>

                    <div className="order-1 lg:order-2">
                        <ContactIllustrationSection />
                    </div>
                </div>
            </div>
        </section>
    );
}