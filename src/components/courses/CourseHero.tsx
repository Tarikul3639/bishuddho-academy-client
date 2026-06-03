import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/components/animations";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function CourseHero({
    status,
    title,
    tagline,
    schedule,
    location,
    startDate,
}: {
    status?: string;
    title?: string;
    tagline?: string;
    schedule?: string;
    location?: string;
    startDate?: Date;
}) {
    return (
        <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-linear-to-br from-[#0d1b3e] to-[#1a3a6e] px-5 py-10 sm:px-8 sm:py-12"
        >
            <div className="mb-4">
                {status && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1a56db] px-3 py-1 text-[12px] font-bold text-white capitalize">
                        {status}
                    </span>
                )}
            </div>
            {title && (
                <h1 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
                    {title}
                </h1>
            )}

            {tagline && <p className="mb-6 text-[15px] text-white/60">{tagline}</p>}
            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    { icon: Calendar, field: "schedule", value: schedule },
                    { icon: MapPin, field: "location", value: location },
                    { icon: Clock, field: "startDate", value: startDate },
                ].map(({ icon: Icon, field, value }) => (
                    <div key={field} className="flex items-start gap-2">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                        {value && (
                            <span className="text-[13px] text-white/70">
                                {value instanceof Date ? value.toLocaleDateString() : value}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
