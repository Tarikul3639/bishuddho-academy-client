import { type Variants } from "framer-motion";

export type PaymentMethod = "bkash" | "nagad" | "rocket" | "bank_transfer" | "cash" | null;

export interface Course { title: string; price: number; courseId: string; }

export const SENDER_REF = "Tarikul Islam";
export const makeRef = (name: string) => `Bishuddho-Academy-${name}`;

export const METHODS = [
    {
        id: "bkash" as const,
        name: "bKash",
        description: "Send money then submit Transaction ID",
        number: "01712-345678",
        accountType: "Personal",
        color: "#E2136E",
        bg: "#FDF2F8",
        border: "#FBCFE8",
    },
    {
        id: "nagad" as const,
        name: "Nagad",
        description: "Send money then submit Transaction ID",
        number: "01811-456789",
        accountType: "Personal",
        color: "#F7941D",
        bg: "#FFF8F0",
        border: "#FDE68A",
    },
    {
        id: "rocket" as const,
        name: "Rocket",
        description: "Send money then submit Transaction ID",
        number: "01612-345678",
        accountType: "Personal",
        color: "#8B5CF6",
        bg: "#F5F3FF",
        border: "#DDD6FE",
    },
    {
        id: "bank_transfer" as const,
        name: "Bank Transfer",
        description: "Transfer to bank account, submit reference",
        color: "#1E40AF",
        bg: "#EFF6FF",
        border: "#BFDBFE",
        bankDetails: {
            bankName: "Dutch Bangla Bank Ltd.",
            accountName: "Bishuddho Academy",
            accountNumber: "1234-5678-9012-3456",
            branch: "Mirpur Branch",
            routingNumber: "090261234",
        },
    },
    {
        id: "cash" as const,
        name: "Cash",
        description: "Pay in-person at the academy",
        number: null,
        color: "#059669",
        bg: "#F0FDF4",
        border: "#BBF7D0",
    },
] as const;

export const stepV: Variants = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
    exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
};
