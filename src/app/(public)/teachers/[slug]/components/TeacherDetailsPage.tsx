"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { stagger } from "@/components/animations";
import { useGetPublicTeacherBySlugQuery } from "@/redux/features/teachers/teachers.api";

import TeacherLoading from "./TeacherLoading";
import TeacherError from "./TeacherError";
import TeacherProfileHeader from "./TeacherProfileHeader";
import TeacherBiography from "./TeacherBiography";
import TeacherSkills from "./TeacherSkills";
import TeacherContactCard from "./TeacherContactCard";

interface Props {
    slug: string;
}

export default function TeacherDetailsPage({
    slug,
}: Props) {
    const {
        data: teacher,
        isLoading,
        error,
    } = useGetPublicTeacherBySlugQuery(slug);

    if (isLoading) {
        return <TeacherLoading />;
    }

    if (error || !teacher) {
        return <TeacherError />;
    }

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="min-h-screen bg-[#f9fafb] pb-16"
        >
            {/* Back */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
                    <Link
                        href="/teachers"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-primary"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Teachers
                    </Link>
                </div>
            </div>

            {/* Header */}
            <TeacherProfileHeader teacher={teacher} />

            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3 lg:px-8">
                {/* Left */}
                <div className="space-y-8 lg:col-span-2">
                    <TeacherBiography
                        biography={teacher.biography}
                    />

                    <TeacherSkills
                        skills={teacher.skills}
                    />
                </div>

                {/* Right */}
                <div>
                    <TeacherContactCard
                        yearsOfExperience={
                            teacher.yearsOfExperience
                        }
                        email={teacher.email}
                        phone={teacher.phone}
                    />
                </div>
            </div>
        </motion.main>
    );
}