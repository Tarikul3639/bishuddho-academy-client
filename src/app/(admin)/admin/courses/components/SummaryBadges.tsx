// app/admin/courses/components/SummaryBadges.tsx
import { type AdminCourse } from "../../_data/courses";

export default function SummaryBadges({ data }: { data: AdminCourse[] }) {
    const active    = data.filter((c) => c.status === "active").length;
    const upcoming  = data.filter((c) => c.status === "upcoming").length;
    const completed = data.filter((c) => c.status === "completed").length;
    const revenue   = data.reduce((s, c) => s + c.revenue, 0);

    return (
        <div className="flex flex-wrap gap-2">
            {[
                { label: `${active} Active`,              bg: "#dcfce7", color: "#16a34a" },
                { label: `${upcoming} Upcoming`,          bg: "#eef3ff", color: "#1a56db" },
                { label: `${completed} Completed`,        bg: "#f3f4f6", color: "#6b7280" },
                { label: `৳${revenue.toLocaleString()}`,  bg: "#fffbeb", color: "#d97706" },
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