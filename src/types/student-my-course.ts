export enum EnrollmentStatus {
    ACTIVE = "active",
    PENDING = "pending",
    COMPLETED = "completed",
}

export interface StudentMyCourse {
    courseId: string;
    title: string;
    thumbnailUrl: string;
    instructor: string;
    status: EnrollmentStatus;
    schedule: string;
    location: string;
    duration: string;
    currentSession: number;
    totalSessions: number;
}