export const METHOD_CONFIG = {
    bkash: {
        label: "bKash",
        bg: "#FDF2F8",
        color: "#E2136E",
        border: "#FBCFE8",
    },
    nagad: {
        label: "Nagad",
        bg: "#FFF8F0",
        color: "#F7941D",
        border: "#FDE68A",
    },
    rocket: {
        label: "Rocket",
        bg: "#F3E8FF",
        color: "#7C3AED",
        border: "#DDD6FE",
    },
    bank_transfer: {
        label: "Bank Transfer",
        bg: "#EFF6FF",
        color: "#2563EB",
        border: "#BFDBFE",
    },
    cash: {
        label: "Cash",
        bg: "#F0FDF4",
        color: "#059669",
        border: "#BBF7D0",
    },
} as const;

export const ENROLLMENT_STATUS_CONFIG = {
    pending: {
        label: "Pending",
        bg: "#fff7ed",
        color: "#ea580c",
    },
    active: {
        label: "Active",
        bg: "#dcfce7",
        color: "#16a34a",
    },
    completed: {
        label: "Completed",
        bg: "#eef3ff",
        color: "#1a56db",
    },
} as const;

export const PAYMENT_STATUS_CONFIG = {
    pending: {
        label: "Pending",
        bg: "#fff7ed",
        color: "#ea580c",
    },
    verified: {
        label: "Verified",
        bg: "#dcfce7",
        color: "#16a34a",
    },
    rejected: {
        label: "Rejected",
        bg: "#fee2e2",
        color: "#dc2626",
    },
} as const;