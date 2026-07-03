"use client";

import type { TeacherListItem } from "@/types/teacher";

interface SummaryBadgesProps {
    data: TeacherListItem[];
}

export default function SummaryBadges({
    data,
}: SummaryBadgesProps) {
    const total = data.length;
    const active = data.filter((t) => t.isActive).length;
    const featured = data.filter((t) => t.featured).length;
    const inactive = total - active;

    const badges = [
        {
            label: `${total} Total`,
            bg: "#eef2ff",
            color: "#4338ca",
        },
        {
            label: `${active} Active`,
            bg: "#dcfce7",
            color: "#16a34a",
        },
        {
            label: `${inactive} Inactive`,
            bg: "#fee2e2",
            color: "#dc2626",
        },
        {
            label: `${featured} Featured`,
            bg: "#fffbeb",
            color: "#d97706",
        },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
                <span
                    key={badge.label}
                    className="rounded-full px-3 py-1 text-[11px] font-bold"
                    style={{
                        background: badge.bg,
                        color: badge.color,
                    }}
                >
                    {badge.label}
                </span>
            ))}
        </div>
    );
}