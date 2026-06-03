// app/admin/payments/components/FilterBar.tsx
"use client";

import { Search, ChevronDown, RotateCcw } from "lucide-react";

const COURSES = [
    "Complete Web Development",
    "Graphic Design with Figma",
    "Digital Marketing & SEO",
];

interface Props {
    search: string; status: string; method: string; course: string;
    onSearch: (v: string) => void; onStatus: (v: string) => void;
    onMethod: (v: string) => void; onCourse: (v: string) => void;
    onReset:  () => void;
}

function SelectBox({
    value, onChange, children,
}: {
    value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-3.5 pr-8 text-[13px] text-[#374151] outline-none transition-colors focus:border-[#1a56db]"
            >
                {children}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
        </div>
    );
}

export default function FilterBar({
    search, status, method, course,
    onSearch, onStatus, onMethod, onCourse, onReset,
}: Props) {
    const hasFilter = search || status || method || course;

    return (
        <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search by name, email or course..."
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-4 text-[13px] text-[#0d1b3e] outline-none placeholder:text-[#9ca3af] transition-colors focus:border-[#1a56db]"
                />
            </div>

            {/* Dropdowns + Reset */}
            <div className="flex flex-wrap items-center gap-2">
                <SelectBox value={status} onChange={onStatus}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </SelectBox>

                <SelectBox value={method} onChange={onMethod}>
                    <option value="">All Methods</option>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="cash">Cash</option>
                </SelectBox>

                <SelectBox value={course} onChange={onCourse}>
                    <option value="">All Courses</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </SelectBox>

                {/* Reset */}
                {hasFilter && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[12px] font-semibold text-[#6b7280] transition-colors hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#ef4444]"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
}