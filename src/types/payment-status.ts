export const PaymentStatus = {
    PENDING: "pending",
    VERIFIED: "verified",
    REJECTED: "rejected",
} as const;

export type PaymentStatus =
    (typeof PaymentStatus)[keyof typeof PaymentStatus];