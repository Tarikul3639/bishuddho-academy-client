import type { Variants } from "framer-motion";

// ─── Animations ───────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
    },
};

export const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};
