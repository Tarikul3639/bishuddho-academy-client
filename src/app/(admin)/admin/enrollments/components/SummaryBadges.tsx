// app/admin/enrollments/components/SummaryBadges.tsx
import { type Enrollment } from "../../_data/enrollments";

export default function SummaryBadges({ data }: { data: Enrollment[] }) {
    const active    = data.filter((e) => e.status === "active").length;
    const pending   = data.filter((e) => e.status === "pending").length;
    const completed = data.filter((e) => e.status === "completed").length;

    return (
        <div className="flex flex-wrap gap-2">
            {[
                { label: `${active} Active`,    bg: "#dcfce7", color: "#16a34a" },
                { label: `${pending} Pending`,  bg: "#fff7ed", color: "#ea580c" },
                { label: `${completed} Done`,   bg: "#eef3ff", color: "#1a56db" },
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