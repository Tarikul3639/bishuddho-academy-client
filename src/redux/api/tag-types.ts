/* TAG TYPES */
export const TAG_TYPES = {
    AUTH: "Auth",
    COURSES: "Courses",
    ENROLLMENTS: "Enrollments",
    SESSIONS: "Sessions",
    ADMIN_USERS: "AdminUsers",
    PURCHASES: "Purchases",
    PAYMENTS: "Payments",
} as const;

/* union type */
export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];