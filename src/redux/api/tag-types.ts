/* TAG TYPES */
export const TAG_TYPES = {
    USERS: "Users",
    COURSES: "Courses",
    ENROLLMENTS: "Enrollments",
    SESSIONS: "Sessions",
} as const;

/* union type */
export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];