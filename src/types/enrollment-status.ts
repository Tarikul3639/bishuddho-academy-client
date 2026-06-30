export const EnrollmentStatus = {
    ACTIVE: "active",
    PENDING: "pending",
    COMPLETED: "completed",
} as const;

export type EnrollmentStatus =
    (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];