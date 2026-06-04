// app/admin/courses/[courseId]/components/tabs/BatchInfoTab.tsx
"use client";

import { Calendar, MapPin, Clock, Users, User } from "lucide-react";

function InputRow({
    icon: Icon,
    label,
    value,
    placeholder,
    type = "text",
    onChange,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number | Date;
    placeholder?: string;
    type?: string;
    onChange: (value: string | number | Date) => void;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6]">
                <Icon className="h-4 w-4 text-[#6b7280]" />
            </div>

            <div className="flex-1">
                <label className="mb-1 block text-[11px] text-[#9ca3af]">{label}</label>

                <input
                    type={type}
                    value={value instanceof Date ? value.toISOString().split("T")[0] : value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-sm border border-[#e5e7eb] px-3 py-2 text-[14px] outline-none focus:border-[#1a56db]"
                />
            </div>
        </div>
    );
}

function SelectRow({
    icon: Icon,
    label,
    value,
    options,
    onChange,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6]">
                <Icon className="h-4 w-4 text-[#6b7280]" />
            </div>

            <div className="flex-1">

                <label className="mb-1 block text-[11px] text-[#9ca3af]">{label}</label>

                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-sm border border-[#e5e7eb] px-3 py-2 text-[14px] outline-none focus:border-[#1a56db]"
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default function BatchInfoTab({
    instructor,
    status,
    bookedSeats = 0,
    totalSeats,
    schedule,
    location,
    duration,
    startDate,
    onChange,
}: {
    instructor: string;
    status: string;
    bookedSeats?: number;
    totalSeats: number;
    schedule: string;
    location: string;
    duration: string;
    startDate: Date;
    onChange: (field: string, value: string | number | Date) => void;
}) {
    const seatPct =
        totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0;

    const seatsLeft = totalSeats - bookedSeats;


    return (
        <div className="space-y-4">
            {/* Editable Fields */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    Batch Details
                </p>

                <div className="flex flex-col gap-3">
                    <InputRow
                        icon={User}
                        label="Instructor"
                        value={instructor}
                        placeholder="e.g., John Doe"
                        onChange={(v) => onChange("instructor", v)}
                    />

                    <InputRow
                        icon={Calendar}
                        label="Schedule"
                        value={schedule}
                        placeholder="e.g., Mon, Wed, Fri 6:00 PM - 8:00 PM"
                        onChange={(v) => onChange("schedule", v)}
                    />

                    <InputRow
                        icon={MapPin}
                        label="Location"
                        value={location}
                        placeholder="e.g., Room 101, Main Building"
                        onChange={(v) => onChange("location", v)}
                    />

                    <InputRow
                        icon={Clock}
                        label="Duration"
                        value={duration}
                        placeholder="e.g., 2 months"
                        onChange={(v) => onChange("duration", v)}
                    />

                    <InputRow
                        icon={Calendar}
                        label="Start Date"
                        type="date"
                        value={startDate}
                        placeholder="e.g., 2023-10-01"
                        onChange={(v) => onChange("startDate", v)}
                    />

                    {/* Status section */}
                    <SelectRow
                        icon={Clock}
                        label="Status"
                        value={status}
                        options={["Upcoming", "Ongoing", "Completed"]}
                        onChange={(v) => onChange("status", v)}
                    />

                    <InputRow
                        icon={Users}
                        label="Total Seats"
                        type="number"
                        value={totalSeats}
                        placeholder="e.g., 30"
                        onChange={(v) => onChange("totalSeats", Number(v))}
                    />
                </div>
            </div>

            {/* Seat Info (Read-only) */}
            <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb] p-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#92400e]">
                    Seat Availability
                </p>

                <div className="mb-1.5 flex justify-between text-[12px] font-semibold text-[#b45309]">
                    <span>{seatsLeft} seats left</span>
                    <span>
                        {bookedSeats} / {totalSeats} booked
                    </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-[#fde68a]/40">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{
                            width: `${seatPct}%`,
                            background:
                                seatPct >= 90
                                    ? "#ef4444"
                                    : seatPct >= 60
                                        ? "#f59e0b"
                                        : "#1a56db",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
