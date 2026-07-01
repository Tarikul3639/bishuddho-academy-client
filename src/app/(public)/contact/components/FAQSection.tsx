"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const FAQS = [
    {
        id: 1,
        question: "How do I enroll in a course?",
        answer:
            "Simply visit our courses page, select the course you're interested in, and click 'Enroll'. Complete the payment process and you'll get instant access to the course materials and lectures.",
    },
    {
        id: 2,
        question: "What types of courses do you offer?",
        answer:
            "We offer programming courses including JavaScript, Python, Cloud Computing, Cybersecurity, Web Development, Data Science, and many more. All courses are designed by industry experts.",
    },
    {
        id: 3,
        question: "Can I get a certificate after completing a course?",
        answer:
            "Yes! Upon completing a course and passing the final assessment, you'll receive a recognized certificate from Bishuddho Academy that you can add to your resume.",
    },
    {
        id: 4,
        question: "Is there a money-back guarantee?",
        answer:
            "We offer a 7-day money-back guarantee if you're not satisfied with the course. No questions asked. Your satisfaction is our priority.",
    },
    {
        id: 5,
        question: "How long does it take to complete a course?",
        answer:
            "Course duration varies from 4 to 12 weeks depending on the complexity. You can learn at your own pace with lifetime access to course materials.",
    },
];

const TABS = ["General", "Product", "Pricing"];

export function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(1);
    const [activeTab, setActiveTab] = useState("General");

    const toggleFAQ = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="py-16"
        >
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-12 text-center">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    FAQs
                </p>

                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                    Frequently Asked Questions
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Find answers to the most common questions about our courses,
                    enrollment process, certificates, and learning experience.
                </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
                variants={fadeUp}
                className="mb-10 flex flex-wrap justify-center gap-3"
            >
                {TABS.map((tab) => (
                    <motion.button
                        key={tab}
                        whileHover={{
                            y: -2,
                            scale: 1.04,
                        }}
                        whileTap={{
                            scale: 0.96,
                        }}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full border px-6 py-2 text-sm font-semibold transition-all duration-300 ${activeTab === tab
                                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                            }`}
                    >
                        {tab}
                    </motion.button>
                ))}
            </motion.div>

            {/* FAQ List */}
            <motion.div variants={stagger} className="mx-auto max-w-3xl space-y-4">
                {FAQS.map((faq) => (
                    <motion.div
                        key={faq.id}
                        variants={fadeUp}
                        whileHover={{
                            y: -2,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                        }}
                        className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                    >
                        <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="flex w-full items-center justify-between p-5 text-left"
                        >
                            <h3 className="pr-6 text-base font-semibold text-gray-900">
                                {faq.question}
                            </h3>

                            <motion.div
                                animate={{
                                    rotate: openId === faq.id ? 180 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 22,
                                }}
                            >
                                <ChevronDown size={20} className="text-gray-500" />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {openId === faq.id && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                >
                                    <motion.div
                                        initial={{ y: -10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -10 }}
                                        transition={{
                                            duration: 0.25,
                                        }}
                                        className="border-t border-gray-100 bg-gray-50 px-5 pb-5 pt-4"
                                    >
                                        <p className="leading-7 text-gray-600">{faq.answer}</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
