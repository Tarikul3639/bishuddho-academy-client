import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";
import { Calendar, MapPin, Clock } from "lucide-react";

interface CourseHeroProps {
    status?: string;
    title?: string;
    tagline?: string;
    schedule?: string;
    location?: string;
    startDate?: string;
}

export default function CourseHero({
    status,
    title,
    tagline,
    schedule,
    location,
    startDate,
}: CourseHeroProps) {
    const formatDate = (value?: string | null) => {
        if (!value) return "-";

        return new Date(value).toLocaleDateString();
    };

    const items = [
        {
            key: "schedule",
            icon: Calendar,
            value: schedule,
        },
        {
            key: "location",
            icon: MapPin,
            value: location,
        },
        {
            key: "startDate",
            icon: Clock,
            value: startDate ? formatDate(startDate) : undefined,
        },
    ].filter((item) => item.value);

    return (
        <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-linear-to-br from-[#0d1b3e] to-[#1a3a6e] px-5 py-10 sm:px-8 sm:py-12"
        >
            {status && (
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1a56db] px-3 py-1 text-xs font-bold capitalize text-white">
                        {status}
                    </span>
                </div>
            )}

            {title && (
                <h1 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
                    {title}
                </h1>
            )}

            {tagline && (
                <p className="mb-6 text-[15px] text-white/60">
                    {tagline}
                </p>
            )}

            {items.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                    {items.map(({ key, icon: Icon, value }) => (
                        <div key={key} className="flex items-start gap-2">
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                            <span className="text-[13px] text-white/70">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}