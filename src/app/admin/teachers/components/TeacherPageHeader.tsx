"use client";

interface TeacherPageHeaderProps {
    total: number;
}

export default function TeacherPageHeader({
    total,
}: TeacherPageHeaderProps) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#0d1b3e]">
                    Teacher Directory
                </h1>

                <p className="mt-1 text-[13px] text-[#6b7280]">
                    {total} total teacher{total !== 1 ? "s" : ""} registered
                </p>
            </div>
        </div>
    );
}