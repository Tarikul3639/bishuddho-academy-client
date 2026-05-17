"use client";

import { motion, type Variants, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const STATS = [
    { value: 1200, suffix: "+", label: "Students" },
    { value: 45,   suffix: "+", label: "Courses" },
    { value: 98,   suffix: "%", label: "Satisfaction" },
];

// ─── Counter ──────────────────────────────────────────────────────────────────
// Starts animating only once — uses a ref to avoid re-triggering on re-render

function Counter({
    from = 0,
    to,
    suffix = "",
}: {
    from?: number;
    to: number;
    suffix?: string;
}) {
    const [count, setCount] = useState(from);
    const started = useRef(false);

    useEffect(() => {
        if (started.current) return;
        started.current = true;

        const controls = animate(from, to, {
            duration: 1.4,
            ease: "easeOut",
            onUpdate(value) {
                setCount(value);
            },
        });

        return () => controls.stop();
    }, [from, to]);

    const formatted =
        to % 1 !== 0
            ? count.toFixed(1)
            : Math.floor(count).toLocaleString();

    return <span>{formatted + suffix}</span>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatsBar() {
    return (
        // continues seamlessly from HeroSection's cyan-50/30 → to white
        <section className="relative bg-linear-to-b from-cyan-50/30 to-white px-4 py-12">

            <motion.div
                className="mx-auto grid max-w-3xl grid-cols-3 gap-y-8 gap-x-4"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                {STATS.map((s) => (
                    <motion.div
                        key={s.label}
                        variants={fadeUp}
                        className="text-center"
                    >
                        <p className="text-2xl font-bold text-primary md:text-3xl">
                            <Counter to={s.value} suffix={s.suffix} />
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#6b7280] sm:text-sm">
                            {s.label}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom separator — gradient line matching primary color */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        </section>
    );
}