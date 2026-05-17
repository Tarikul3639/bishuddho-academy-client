"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, MapPin as Facebook, MessageCircle } from "lucide-react";
import Image from "next/image";

import contactImg from "@/assets/logo.jpg";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

export default function ContactPage() {
    return (
        <section className="min-h-screen bg-[#f9fafb] px-4 pt-24 pb-16">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold text-[#111827]">
                        Contact Us
                    </h1>
                    <p className="text-[#6b7280] mt-2">
                        Get in touch with us anytime
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* Image */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="w-full"
                    >
                        <div className="relative w-full h-[320px] md:h-[420px] rounded-sm overflow-hidden border shadow-sm">
                            <Image
                                src={contactImg}
                                alt="Contact"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="space-y-4"
                    >
                        {/* Location */}
                        <div className="bg-white border shadow-sm p-5 rounded-sm flex gap-4 items-center">
                            <MapPin className="text-primary" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-medium text-gray-800">
                                    Kafrul, Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/8801XXXXXXXXX"
                            target="_blank"
                            className="bg-white border shadow-sm p-5 rounded-sm flex gap-4 items-center hover:shadow-md transition"
                        >
                            <MessageCircle className="text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">WhatsApp</p>
                                <p className="font-medium text-gray-800">
                                    +880 1XXXXXXXXX
                                </p>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:support@classflow.com"
                            className="bg-white border shadow-sm p-5 rounded-sm flex gap-4 items-center hover:shadow-md transition"
                        >
                            <Mail className="text-primary" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">
                                    support@classflow.com
                                </p>
                            </div>
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="bg-white border shadow-sm p-5 rounded-sm flex gap-4 items-center hover:shadow-md transition"
                        >
                            <Facebook className="text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Facebook</p>
                                <p className="font-medium text-gray-800">
                                    ClassFlow Official
                                </p>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}