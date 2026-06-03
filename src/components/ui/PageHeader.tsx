"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { fadeUp } from "@/components/animations";

type PageHeaderProps = {
    title: string;
    description?: string;
    backLabel?: string;
    backPath?: string;
    onBack?: () => void;
};

export default function PageHeader({
    title,
    description,
    backLabel = "Back",
    backPath = "/dashboard",
    onBack,
}: PageHeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) return onBack();
        router.replace(backPath);
    };

    return (
        <motion.div variants={fadeUp} className="space-y-3">
            <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-primary cursor-pointer"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{backLabel}</span>
            </button>

            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                    {title}
                </h1>

                {description && (
                    <p className="text-sm font-medium text-slate-500 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </motion.div>
    );
}