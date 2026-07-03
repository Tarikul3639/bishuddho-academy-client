"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

import { fadeUp } from "@/components/animations";
import TeacherBadges from "./TeacherBadges";
import TeacherActions from "./TeacherActions";

import type { TeacherListItem } from "@/types/teacher";

interface TeacherRowProps {
    teacher: TeacherListItem;
    index: number;
    total: number;
    onMove: (index: number, direction: "up" | "down") => void;
    onFeatureToggle: (teacherId: string, current: boolean) => void;
    onStatusToggle: (teacherId: string, current: boolean) => void;
    onDelete: (teacherId: string) => void;
}

export default function TeacherRow({
    teacher,
    index,
    total,
    onMove,
    onFeatureToggle,
    onStatusToggle,
    onDelete,
}: TeacherRowProps) {
    const profileImage = teacher.profileImage
        ? teacher.profileImage.startsWith("http")
            ? teacher.profileImage
            : `${process.env.NEXT_PUBLIC_API_URL}${teacher.profileImage}`
        : "/avatar-placeholder.png";

    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-[#f3f4f6] transition-colors hover:bg-[#f9fafb]"
        >
            {/* Teacher */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
                        <Image
                            src={profileImage}
                            alt={teacher.fullName}
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-[#0d1b3e]">
                            {teacher.fullName}
                        </p>
                        <p className="text-[11px] text-[#6b7280]">{teacher.designation}</p>
                    </div>
                </div>
            </td>

            {/* Status */}
            <td className="px-4 py-3">
                <TeacherBadges
                    teacherId={teacher.teacherId}
                    featured={teacher.featured}
                    isActive={teacher.isActive}
                    onToggleFeature={onFeatureToggle}
                    onToggleStatus={onStatusToggle}
                />
            </td>

            {/* Order */}
            <td className="w-24 px-4 py-3">
                <div className="flex items-center justify-center gap-1">
                    <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => onMove(index, "up")}
                        className="rounded-sm p-1 text-gray-400 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        disabled={index === total - 1}
                        onClick={() => onMove(index, "down")}
                        className="rounded-sm p-1 text-gray-400 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30"
                    >
                        <ArrowDown className="h-4 w-4" />
                    </button>
                </div>
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-right">
                <TeacherActions teacherId={teacher.teacherId} onDelete={onDelete} />
            </td>
        </motion.tr>
    );
}