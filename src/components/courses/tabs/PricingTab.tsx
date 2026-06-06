"use client";

import { Calendar, Tag, AlertTriangle, RefreshCw } from "lucide-react";

// ── Input Number ─────────────────────────────
function InputNumber({
    value,
    prefix,
    suffix,
    onChange,
    className = "",
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    onChange: (v: number) => void;
    className?: string;
}) {
    return (
        <div className="flex items-center gap-1.5">
            {prefix && (
                <span className="text-xl font-semibold text-[#6b7280]">
                    {prefix}
                </span>
            )}

            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={`w-32 rounded-sm border border-[#e5e7eb] px-2.5 py-1.5 text-[14px] font-bold text-[#0d1b3e] outline-none focus:border-[#1a56db] ${className}`}
            />

            {suffix && (
                <span className="text-[14px] font-semibold text-[#6b7280]">
                    {suffix}
                </span>
            )}
        </div>
    );
}

export default function PricingTab({
    price,
    originalPrice,
    discountStarts,
    discountEnds,
    onChange,
}: {
    price: number;
    originalPrice: number;
    discountStarts: string | null;
    discountEnds: string | null;
    onChange: (
        field: string,
        value: string | number | null
    ) => void;
}) {
    const savings = originalPrice - price;

    // Derived State: Discount Percentage
    const discount =
        originalPrice > 0
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

    return (
        <div className="space-y-4">
            {/* ── Prices ───────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-white p-5">
                    <p className="text-[11px] font-bold text-[#9ca3af]">
                        Original Price
                    </p>

                    <div className="mt-2 text-2xl font-extrabold text-[#0d1b3e]">
                        <InputNumber
                            value={originalPrice}
                            prefix="৳"
                            onChange={(v) => onChange("originalPrice", v)}
                        />
                    </div>
                </div>

                <div className="rounded-lg border bg-[#eef3ff] p-5">
                    <p className="text-[11px] font-bold text-[#1a56db]">
                        Current Price
                    </p>

                    <div className="mt-2 text-2xl font-extrabold text-[#1a56db]">
                        <InputNumber
                            value={price}
                            prefix="৳"
                            onChange={(v) => {
                                onChange("price", v);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Info ───────────────────────────── */}
            <div className="flex items-center gap-3 rounded-lg border bg-[#f9fafb] px-4 py-3">
                <RefreshCw className="h-4 w-4 text-[#9ca3af]" />
                <p className="text-[12px] text-[#6b7280]">
                    Pricing is dynamic and schedule-based.
                </p>
            </div>

            {/* ── Savings ───────────────────────────── */}
            {savings > 0 && (
                <div className="flex items-center gap-3 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dcfce7]">
                        <Tag className="h-4 w-4 text-[#16a34a]" />
                    </div>

                    <p className="text-[13px] font-bold text-[#16a34a]">
                        Students save ৳{savings.toLocaleString()} (
                        {discount}% off)
                    </p>
                </div>
            )}

            {/* ── Discount Schedule ───────────────────────────── */}
            <div className="rounded-lg border bg-white p-5">
                <div className="mb-4">
                    <p className="text-[14px] font-bold text-[#0d1b3e]">
                        Discount Schedule
                    </p>
                    <p className="text-[12px] text-[#6b7280]">
                        Start and end date for offer
                    </p>
                </div>

                <div className="space-y-3">
                    {/* Start Date */}
                    <div className="flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#dcfce7]">
                                <Calendar className="h-4 w-4 text-[#16a34a]" />
                            </div>

                            <div>
                                <p className="text-[12px] font-semibold">
                                    Offer Start
                                </p>
                                <p className="text-[11px] text-[#9ca3af]">
                                    Discount becomes active
                                </p>
                            </div>
                        </div>

                        <input
                            type="date"
                            value={
                                discountStarts
                                    ? new Date(discountStarts)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            onChange={(e) =>
                                onChange(
                                    "discountStarts",
                                    e.target.value || null
                                )
                            }
                            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1a56db]"
                        />
                    </div>

                    {/* End Date */}
                    <div className="flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#fee2e2]">
                                <Calendar className="h-4 w-4 text-[#ef4444]" />
                            </div>

                            <div>
                                <p className="text-[12px] font-semibold">
                                    Offer Ends
                                </p>
                                <p className="text-[11px] text-[#9ca3af]">
                                    Deadline shown to student
                                </p>
                            </div>
                        </div>

                        <input
                            type="date"
                            value={
                                discountEnds
                                    ? new Date(discountEnds)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            onChange={(e) =>
                                onChange("discountEnds", e.target.value || null)
                            }
                            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#1a56db]"
                        />
                    </div>

                    {/* Discount */}
                    <div className="flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#fde68a]">
                                <Tag className="h-4 w-4 text-[#b45309]" />
                            </div>

                            <div>
                                <p className="text-[12px] font-semibold">
                                    Discount
                                </p>
                                <p className="text-[11px] text-[#9ca3af]">
                                    Auto-calculated or manual override
                                </p>
                            </div>
                        </div>

                        <InputNumber
                            value={discount}
                            suffix="%"
                            onChange={(v) => {
                                // Just updating the discount percentage will auto-calculate the price based on originalPrice --- IGNORE ---
                                const newPrice =
                                    originalPrice > 0
                                        ? Math.round(
                                            originalPrice * (1 - v / 100)
                                        )
                                        : price;

                                onChange("price", newPrice);
                            }}
                            className="text-2xl font-extrabold text-[#dc2626]"
                        />
                    </div>

                    {/* Preview */}
                    <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4">
                        <p className="mb-2 text-[11px] font-bold text-[#92400e]">
                            Student Preview
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-extrabold text-[#0d1b3e]">
                                ৳{price.toLocaleString()}
                            </span>

                            <span className="text-[15px] line-through text-[#9ca3af]">
                                ৳{originalPrice.toLocaleString()}
                            </span>

                            <span className="rounded-full bg-[#dc2626]/10 px-2 py-1 text-[11px] font-bold text-[#dc2626]">
                                {discount}% OFF
                            </span>
                        </div>

                        {discountEnds && (
                            <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-[#dc2626]">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                Ends {new Date(discountEnds).toDateString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}