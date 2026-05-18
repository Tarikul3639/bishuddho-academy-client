"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Linkedin } from "@/components/icons";
import { fadeUp, stagger } from "@/components/animations";

const SOCIAL_ITEMS = [
    {
        icon: Github,
        title: "Build with us",
        description: "Explore our open-source tools and templates.",
        buttonText: "Visit GitHub",
        href: "https://github.com",
        bgColor: "bg-gray-50",
        iconColor: "text-gray-900",
        borderColor: "border-gray-200",
    },
    {
        icon: Twitter,
        title: "Stay in the loop",
        description: "Get the latest updates and insights.",
        buttonText: "Follow on X",
        href: "https://twitter.com",
        bgColor: "bg-gray-50",
        iconColor: "text-gray-900",
        borderColor: "border-gray-200",
    },
    {
        icon: Instagram,
        title: "See the journey",
        description: "Behind the scenes of all in action.",
        buttonText: "Follow on Instagram",
        href: "https://instagram.com",
        bgColor: "bg-gray-50",
        iconColor: "text-pink-500",
        borderColor: "border-pink-200",
    },
    {
        icon: Linkedin,
        title: "Grow with us",
        description: "Connect for ideas, updates, and stories.",
        buttonText: "Connect on LinkedIn",
        href: "https://linkedin.com",
        bgColor: "bg-gray-50",
        iconColor: "text-blue-600",
        borderColor: "border-blue-200",
    },
];

export function SocialSection() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full"
        >
            <motion.div variants={fadeUp} className="mb-14 text-left md:text-center">
                {/* Left Accent Line */}
                <div className="flex items-center gap-3 mb-5 md:justify-center">
                    <span className="h-10 w-0.5 bg-primary rounded-full hidden md:block" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Voices & Feedback
                    </p>
                </div>

                {/* Heading */}
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-snug">
                    What Our Learners
                    <span className="block text-primary font-bold">
                        Are Saying
                    </span>
                </h2>

                {/* Subtext */}
                <p className="mt-4 text-gray-600 max-w-xl md:mx-auto text-sm md:text-base">
                    Real experiences from students who transformed their skills through consistent practice and guided learning.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {SOCIAL_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
                            className="group"
                        >
                            <div className={`h-full flex flex-col items-center text-center p-6 rounded-lg border-2 ${item.borderColor} ${item.bgColor} transition-all duration-300 hover:shadow-lg hover:border-primary/50`}>
                                {/* Icon */}
                                <div className={`mb-4 p-3 rounded-full ${item.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10`}>
                                    <Icon className={`h-8 w-8 ${item.iconColor}`} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-6 grow">
                                    {item.description}
                                </p>

                                {/* Button */}
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-sm transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary active:scale-95"
                                >
                                    {item.buttonText}
                                </a>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
