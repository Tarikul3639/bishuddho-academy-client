"use client";

import { Star, UserCheck, UserX } from "lucide-react";

interface TeacherBadgesProps {
    teacherId: string;
    featured: boolean;
    isActive: boolean;
    onToggleFeature: (teacherId: string, current: boolean) => void;
    onToggleStatus: (teacherId: string, current: boolean) => void;
}

export default function TeacherBadges({
    teacherId,
    featured,
    isActive,
    onToggleFeature,
    onToggleStatus,
}: TeacherBadgesProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                type="button"
                onClick={() => onToggleStatus(teacherId, isActive)}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition cursor-pointer ${isActive
                        ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                    }`}
            >
                {isActive ? (
                    <>
                        <UserCheck className="h-3 w-3" />
                        Active
                    </>
                ) : (
                    <>
                        <UserX className="h-3 w-3" />
                        Inactive
                    </>
                )}
            </button>

            <button
                type="button"
                onClick={() => onToggleFeature(teacherId, featured)}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition cursor-pointer ${featured
                        ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                        : "border-slate-200 bg-slate-100 text-gray-600 hover:bg-slate-200"
                    }`}
            >
                <Star
                    className={`h-3 w-3 ${featured ? "fill-amber-500 text-amber-500" : ""
                        }`}
                />
                Featured
            </button>
        </div>
    );
}