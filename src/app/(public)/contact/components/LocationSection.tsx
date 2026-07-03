"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
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

export function LocationSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="py-12 md:py-16"
        >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="mb-10 text-center md:mb-12"
            >
                <p className="mb-3 text-[clamp(0.7rem,1vw,0.8rem)] font-bold uppercase tracking-[0.2em] text-primary">
                    Our Location
                </p>

                <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900">
                    Visit Bishuddho Academy
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-[clamp(0.95rem,1.5vw,1.05rem)] leading-7 text-gray-600">
                    Find our academy easily using Google Maps. We'd love to
                    welcome you for counseling, admission, or a campus visit.
                </p>
            </motion.div>

            <motion.div
                variants={fadeUp}
                className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm"
            >
                <div className="grid lg:grid-cols-3">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center border-b border-gray-200 p-6 md:p-8 lg:border-r lg:border-b-0">
                        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-primary/20 bg-primary/5 md:h-12 md:w-12">
                            <MapPin className="h-5 w-5 text-primary md:h-6 md:w-6" />
                        </div>

                        <p className="mb-2 text-[clamp(0.7rem,1vw,0.8rem)] font-bold uppercase tracking-[0.2em] text-primary">
                            Campus Address
                        </p>

                        <h3 className="text-[clamp(1.35rem,2.8vw,1.9rem)] font-bold text-gray-900">
                            Bishuddho Academy
                        </h3>

                        <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-7 text-gray-600">
                            Taragang, Dhaka 1201
                            <br />
                            Bangladesh
                        </p>

                        <div className="mt-8">
                            <a
                                href="https://maps.app.goo.gl/Y68apavA18g6F6o17"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:px-5 md:py-3"
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-2">
                        <div className="aspect-video w-full lg:h-full">
                            <iframe
                                title="Bishuddho Academy Location"
                                className="h-full w-full"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.72295600205712!2d90.64154963321741!3d24.046319341905104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37542dab6400b589%3A0xfb8669802e3fc5de!2sTaragonj%20Bazar%2C%20Kapasia%2C%20Gazipur!5e0!3m2!1sen!2sbd!4v1783122106324!5m2!1sen!2sbd"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}