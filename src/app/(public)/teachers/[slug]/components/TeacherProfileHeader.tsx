"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeUp } from "@/components/animations";
import { TeacherDetails } from "@/types/teacher";

import TeacherSocialLinks from "./TeacherSocialLinks";

interface Props {
    teacher: TeacherDetails;
}

export default function TeacherProfileHeader({
    teacher,
}: Props) {
    const profileImage = teacher.profileImage
        ? teacher.profileImage.startsWith("http")
            ? teacher.profileImage
            : `${process.env.NEXT_PUBLIC_API_URL}${teacher.profileImage}`
        : "/avatar-placeholder.png";

    return (
        <div className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row lg:px-8">
                <motion.div
                    variants={fadeUp}
                    className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-sm"
                >
                    <Image
                        src={profileImage}
                        alt={teacher.fullName}
                        fill
                        sizes="150px"
                        className="object-cover"
                        unoptimized
                    />
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className="flex-1 space-y-3"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        {teacher.featured && (
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                Featured Instructor
                            </span>
                        )}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {teacher.fullName}
                        </h1>

                        <p className="mt-1 text-sm font-semibold text-primary">
                            {teacher.designation}
                        </p>
                    </div>

                    {teacher.shortBio && (
                        <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
                            {teacher.shortBio}
                        </p>
                    )}

                    <TeacherSocialLinks
                        socialLinks={teacher.socialLinks}
                    />
                </motion.div>
            </div>
        </div>
    );
}