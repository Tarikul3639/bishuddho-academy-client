import type { EnrollmentStatus } from "@/types/enrollment-status";
import type { PaymentStatus } from "@/types/payment-status";

export interface StudentMyCourse {
    courseId: string;
    title: string;
    thumbnailUrl: string;
    instructor: string;
    status: EnrollmentStatus;
    paymentStatus: PaymentStatus;
    rejectionReason?: string;
    schedule: string;
    location: string;
    duration: string;
    currentSession: number;
    totalSessions: number;
}