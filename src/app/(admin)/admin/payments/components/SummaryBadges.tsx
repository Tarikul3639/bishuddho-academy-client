// app/admin/payments/components/SummaryBadges.tsx

import { type Enrollment } from "../../_data/enrollments";

export default function SummaryBadges({ data }: { data: Enrollment[] }) {
    const pending   = data.filter((e) => e.status === "pending").length;
    const active    = data.filter((e) => e.status === "active").length;
    const completed = data.filter((e) => e.status === "completed").length;
    const total     = data.reduce((s, e) => s + e.amount, 0);

    return (
        <div className="flex flex-wrap gap-2">
            {[
                { label: `${pending} Pending`,              bg: "#fff7ed", color: "#ea580c" },
                { label: `${active} Active`,                bg: "#dcfce7", color: "#16a34a" },
                { label: `${completed} Done`,               bg: "#eef3ff", color: "#1a56db" },
                { label: `৳${total.toLocaleString()} Total`, bg: "#f3f4f6", color: "#374151" },
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