"use client";

import { Search, X } from "lucide-react";

interface FilterBarProps {
    search: string;
    onSearch: (value: string) => void;
    status: string;
    onStatus: (value: string) => void;
    onReset: () => void;
}

export default function FilterBar({
    search,
    onSearch,
    status,
    onStatus,
    onReset,
}: FilterBarProps) {
    const isFiltered = !!search || !!status;

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    id="admin-teacher-search"
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search by name, designation or skills..."
                    className="w-full rounded-sm border border-[#e5e7eb] bg-white py-2 pl-9 pr-4 text-xs text-slate-800 outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
            </div>

            {/* Status */}
            <div className="min-w-36">
                <select
                    id="admin-teacher-status-filter"
                    value={status}
                    onChange={(e) => onStatus(e.target.value)}
                    className="w-full cursor-pointer rounded-sm border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-slate-800 outline-hidden focus:border-primary"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {isFiltered && (
                <button
                    onClick={onReset}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-sm border border-[#e5e7eb] px-3 py-2 text-xs font-bold text-gray-500 transition-colors hover:border-red-200 hover:text-red-600"
                >
                    <X className="h-3.5 w-3.5" />
                    Reset
                </button>
            )}
        </div>
    );
}