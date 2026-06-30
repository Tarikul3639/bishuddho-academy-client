export interface User {
    id: string;
    name: string;
    email: string;
    studentId: string;
    joinedDate: string;
    lastLogin: string;
    status: "active" | "blocked";
    coursesCount: number;
    lastPurchase: string;
}

export const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
    active: { label: "Active", bg: "#DCFCE7", color: "#16A34A" },
    blocked: { label: "Blocked", bg: "#FEE2E2", color: "#EF4444" },
};

export const USERS: User[] = [];
