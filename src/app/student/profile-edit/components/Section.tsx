import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations";

interface SectionProps {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
}

export function Section({ icon: Icon, title, description, children }: SectionProps) {
    return (
        <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-white p-6"
        >
            <div className="mb-5 flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-[#111827]">{title}</h2>
                    <p className="text-xs text-[#6b7280]">{description}</p>
                </div>
            </div>
            <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">{children}</div>
        </motion.div>
    );
}
