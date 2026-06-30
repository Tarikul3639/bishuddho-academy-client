// app/admin/users/components/SummaryBadges.tsx
import type { AdminUser } from "@/redux/features/users/admin-users.api";

export default function SummaryBadges({ data }: { data: AdminUser[] }) {
    const total = data.length;
    const active = data.filter((u) => u.status === "active").length;
    const blocked = data.filter((u) => u.status === "blocked").length;

    return (
        <div className="flex flex-wrap gap-2">
            {[
                { label: `${total} Total`,      bg: "#f3f4f6", color: "#374151" },
                { label: `${active} Active`,    bg: "#dcfce7", color: "#16a34a" },
                { label: `${blocked} Blocked`,  bg: "#fee2e2", color: "#ef4444" },
            ].map((b) => (
                <span
                    key={b.label}
                    className="rounded-full px-3 py-1 text-[11px] font-bold"
                    style={{ background: b.bg, color: b.color }}
                >
                    {b.label}
                </span>
            ))}
        </div>
    );
}