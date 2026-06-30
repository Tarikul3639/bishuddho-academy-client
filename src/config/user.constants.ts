import { UserStatus } from "@/types/admin-users";

export const STATUS_CONFIG: Record<
    UserStatus,
    {
        label: string;
        color: string;
        bg: string;
    }
> = {
    active: {
        label: "Active",
        color: "#16a34a",
        bg: "#dcfce7",
    },
    blocked: {
        label: "Blocked",
        color: "#ef4444",
        bg: "#fee2e2",
    },
};


import { PendingAction } from "@/types/admin-users";

export const USER_ACTION_DIALOG_CONFIG: Record<
    PendingAction,
    {
        title: string;
        actionLabel: string;
        actionClass: string;
        description: (user: {
            name: string;
            email: string;
        }) => string;
    }
> = {
    resetPassword: {
        title: "Reset Password?",
        description: (user) =>
            `A reset link will be sent to ${user.email}.`,
        actionLabel: "Send Link",
        actionClass:
            "bg-[#1a56db] hover:bg-[#1e40af] text-white cursor-pointer",
    },

    blockUser: {
        title: "Block User?",
        description: (user) =>
            `${user.name} will lose access immediately.`,
        actionLabel: "Block",
        actionClass:
            "bg-[#ef4444] hover:bg-[#dc2626] text-white cursor-pointer",
    },

    unblockUser: {
        title: "Unblock User?",
        description: (user) =>
            `${user.name} will regain full access immediately.`,
        actionLabel: "Unblock",
        actionClass:
            "bg-[#16a34a] hover:bg-[#15803d] text-white cursor-pointer",
    },
};