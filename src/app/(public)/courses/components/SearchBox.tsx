"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { fadeUp } from "@/components/animations";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
    return (
        <motion.div
            className="mb-10 flex justify-center w-full px-4"
            variants={fadeUp}
        >
            <div className="relative group flex w-full max-w-2xl items-center overflow-hidden rounded-sm border border-gray-300 bg-white p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="pl-3 text-gray-400 group-focus-within:text-primary">
                    <Search size={20} strokeWidth={1.5} />
                </div>

                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    placeholder="Search for courses"
                    className="w-full bg-transparent px-3 py-2 text-base text-gray-700 outline-none placeholder:text-gray-400 placeholder:font-light"
                />

                <button className="rounded bg-primary px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95 cursor-pointer">
                    Search
                </button>
            </div>
        </motion.div>
    );
}