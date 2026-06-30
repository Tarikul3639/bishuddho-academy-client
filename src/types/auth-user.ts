export type UserRole =
    | "student"
    | "admin";

export interface AuthUser {
    userId: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: "active" | "blocked";

    enrolledCourses?: number;
    createdAt: string;
    avatarUrl?: string;
}
