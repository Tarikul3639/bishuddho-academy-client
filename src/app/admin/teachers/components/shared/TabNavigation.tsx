"use client";

import { motion } from "framer-motion";

export interface TabItem {
    id: string;
    label: string;
}

interface TabNavigationProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (tab: string) => void;
}

export default function TabNavigation({
    tabs,
    activeTab,
    onChange,
}: TabNavigationProps) {
    return (
        <div className="mb-6 overflow-x-hidden">
            <div className="inline-flex min-w-full rounded-lg border border-[#e5e7eb] bg-white p-1">
                {tabs.map((tab) => {
                    const active = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={`relative flex-1 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${active
                                    ? "text-white"
                                    : "text-slate-600 hover:text-primary"
                                }`}
                        >
                            {active && (
                                <motion.div
                                    layoutId="teacher-form-tab"
                                    className="absolute inset-0 rounded-md bg-primary"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}