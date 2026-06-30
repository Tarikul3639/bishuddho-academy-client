export const UserStatus = {
    ACTIVE: "active",
    BLOCKED: "blocked",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export interface AdminUser {
    userId: string;
    name: string;
    email: string;
    studentId: string;
    joinedDate: string;
    lastLogin: string;
    status: UserStatus;
    coursesCount: number;
    lastPurchase: string;
}

export interface AdminUsersResponse {
    users: AdminUser[];
    total: number;
    active: number;
    blocked: number;
    newUsersCount: number;
}

export interface ToggleBlockResponse {
    success: boolean;
    message: string;
    status: UserStatus;
}

export const PendingAction = {
    RESET_PASSWORD: "resetPassword",
    BLOCK_USER: "blockUser",
    UNBLOCK_USER: "unblockUser",
} as const;

export type PendingAction =
    (typeof PendingAction)[keyof typeof PendingAction];