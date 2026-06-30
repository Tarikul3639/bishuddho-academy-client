export interface Enrollment {
    id: string;
    name: string;
    email: string;
    course: string;
    method: string;
    trxId: string;
    amount: number;
    status: string;
    date: string;
}

export const METHOD_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
    bkash: { label: "bKash", bg: "#FDF2F8", color: "#E2136E", border: "#FBCFE8" },
    nagad: { label: "Nagad", bg: "#FFF8F0", color: "#F7941D", border: "#FDE68A" },
    rocket: { label: "Rocket", bg: "#F5F3FF", color: "#8B5CF6", border: "#DDD6FE" },
    bank_transfer: { label: "Bank", bg: "#EFF6FF", color: "#1E40AF", border: "#BFDBFE" },
    cash: { label: "Cash", bg: "#F0FDF4", color: "#059669", border: "#BBF7D0" },
};

export const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: "Pending", bg: "#FEF3C7", color: "#D97706" },
    verified: { label: "Verified", bg: "#DCFCE7", color: "#16A34A" },
    rejected: { label: "Rejected", bg: "#FEE2E2", color: "#EF4444" },
};

export const ENROLLMENTS: Enrollment[] = [];
