// app/admin/payments/components/SummaryBadges.tsx

import type { AdminPurchase } from "@/redux/features/purchases/admin-purchases.api";

export default function SummaryBadges({ data }: { data: AdminPurchase[] }) {
    const pending  = data.filter((e) => e.paymentStatus === "pending").length;
    const verified = data.filter((e) => e.paymentStatus === "verified").length;
    const rejected = data.filter((e) => e.paymentStatus === "rejected").length;
    const total    = data.reduce((s, e) => s + e.amount, 0);

    return (
        <div className="flex flex-wrap gap-2">
            {[
                { label: `${pending} Pending`,              bg: "#fff7ed", color: "#ea580c" },
                { label: `${verified} Verified`,           bg: "#dcfce7", color: "#16a34a" },
                { label: `${rejected} Rejected`,           bg: "#fee2e2", color: "#ef4444" },
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
