"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const FAQS = [
    {
        id: 1,
        question: "How do I enroll in a course?",
        answer: "Simply visit our courses page, select the course you're interested in, and click 'Enroll'. Complete the payment process and you'll get instant access to the course materials and lectures.",
    },
    {
        id: 2,
        question: "What types of courses do you offer?",
        answer: "We offer programming courses including JavaScript, Python, Cloud Computing, Cybersecurity, Web Development, Data Science, and many more. All courses are designed by industry experts.",
    },
    {
        id: 3,
        question: "Can I get a certificate after completing a course?",
        answer: "Yes! Upon completing a course and passing the final assessment, you'll receive a recognized certificate from Bishuddho Academy that you can add to your resume.",
    },
    {
        id: 4,
        question: "Is there a money-back guarantee?",
        answer: "We offer a 7-day money-back guarantee if you're not satisfied with the course. No questions asked. Your satisfaction is our priority.",
    },
    {
        id: 5,
        question: "How long does it take to complete a course?",
        answer: "Course duration varies from 4 to 12 weeks depending on the complexity. You can learn at your own pace with lifetime access to course materials.",
    },
];

export function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="py-16"
        >
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-12 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                    FAQs
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Frequently Asked Questions
                </h2>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div variants={fadeUp} className="flex justify-center gap-4 mb-10">
                {["General", "Product", "Pricing"].map((tab) => (
                    <button
                        key={tab}
                        className="px-6 py-2 rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all duration-300"
                    >
                        {tab}
                    </button>
                ))}
            </motion.div>

            {/* FAQs List */}
            <motion.div variants={stagger} className="max-w-3xl mx-auto space-y-3">
                {FAQS.map((faq) => (
                    <motion.div key={faq.id} variants={fadeUp}>
                        <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full text-left"
                        >
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                                <p className="font-semibold text-gray-900">
                                    {faq.question}
                                </p>
                                <ChevronDown
                                    size={20}
                                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                                        openId === faq.id ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </button>

                        {/* Answer */}
                        {openId === faq.id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="border border-t-0 border-gray-200 bg-gray-50 p-5 rounded-b-lg">
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
