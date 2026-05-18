"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

export function CTASection() {
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="py-20"
        >
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-blue-600 to-primary px-8 py-16 md:px-16 md:py-24 text-center">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20" />

                {/* Content */}
                <motion.div variants={fadeUp} className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Transform Your Career With
                        <br />
                        <span className="text-blue-200">Bishuddho Academy</span>
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                        Start your learning journey today and join thousands of successful students
                    </p>

                    <button className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-primary transition-all duration-300 hover:shadow-xl hover:shadow-white/20 active:scale-95">
                        Get Started
                        <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>
        </motion.section>
    );
}
