"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Mail,
    Phone,
} from "lucide-react";

import { fadeUp } from "@/components/animations";

interface Props {
    yearsOfExperience: number;
    email?: string;
    phone?: string;
}

export default function TeacherContactCard({
    yearsOfExperience,
    email,
    phone,
}: Props) {
    return (
        <motion.section
            variants={fadeUp}
            className="rounded-xl border border-slate-200 bg-white p-6"
        >
            <h2 className="border-b border-slate-100 pb-3 text-sm font-bold uppercase tracking-wider text-[#0d1b3e]">
                Instructor Information
            </h2>

            <div className="mt-5 space-y-5">
                <div className="flex items-start gap-3">
                    <Briefcase className="mt-0.5 h-5 w-5 text-primary" />

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            Experience
                        </p>

                        <p className="text-sm font-semibold text-slate-800">
                            {yearsOfExperience} Years
                        </p>
                    </div>
                </div>

                {email && (
                    <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-5 w-5 text-primary" />

                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                Email
                            </p>

                            <a
                                href={`mailto:${email}`}
                                className="text-sm font-semibold text-slate-700 hover:text-primary"
                            >
                                {email}
                            </a>
                        </div>
                    </div>
                )}

                {phone && (
                    <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-5 w-5 text-primary" />

                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                Phone
                            </p>

                            <a
                                href={`tel:${phone}`}
                                className="text-sm font-semibold text-slate-700 hover:text-primary"
                            >
                                {phone}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </motion.section>
    );
}