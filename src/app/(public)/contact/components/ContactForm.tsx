"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { useState } from "react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        phoneNumber: "",
        jobTitle: "",
        companyName: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your form submission logic here
    };

    return (
        <motion.form
            id="contact-form"
            onSubmit={handleSubmit}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-5 rounded-3xl border-2 border-primary bg-linear-to-br from-blue-50 to-white p-8"
        >
            {/* First Name & Last Name */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
            </motion.div>

            {/* Work Email & Phone Number */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                        Work Email
                    </label>
                    <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
            </motion.div>

            {/* Job Title & Company Name */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Your job title"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeUp}>
                <label className="text-xs font-bold uppercase tracking-wide text-gray-600 block mb-2">
                    Message
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
            </motion.div>

            {/* Submit Button */}
            <motion.button
                variants={fadeUp}
                type="submit"
                className="w-full rounded-lg bg-linear-to-r from-primary to-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
            >
                Submit
            </motion.button>
        </motion.form>
    );
}
