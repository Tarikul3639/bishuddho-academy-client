"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

import { fadeUp } from "@/components/animations";

interface TeachersFiltersProps {
    search: string;
    onSearch: (value: string) => void;
    onReset: () => void;
    isFiltered: boolean;
}

export default function TeachersFilters({
    search,
    onSearch,
    onReset,
    isFiltered,
}: TeachersFiltersProps) {
    return (
        <motion.div
            variants={fadeUp}
            className="mb-8 flex items-center gap-3"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    id="teacher-search"
                    type="text"
                    value={search}
                    onChange={(e) =>
                        onSearch(e.target.value)
                    }
                    placeholder="Search by name, designation or skills..."
                    className="w-full rounded-sm border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
            </div>

            {isFiltered && (
                <button
                    onClick={onReset}
                    className="flex cursor-pointer items-center gap-1.5 rounded-sm border border-[#e5e7eb] px-3 py-2.5 text-sm text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
                >
                    <X className="h-3.5 w-3.5" />
                    Clear
                </button>
            )}
        </motion.div>
    );
}