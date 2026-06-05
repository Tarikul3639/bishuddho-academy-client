import type { Variants } from "framer-motion";

// @/components/animations.ts
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.0, 0.0, 0.2, 1],
        },
    },
};

export const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};
