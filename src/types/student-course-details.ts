// types/student-course-details.ts

export enum EnrollmentStatus {
    ACTIVE = "active",
    PENDING = "pending",
    COMPLETED = "completed",
}

export enum PaymentMethod {
    BKASH = "bkash",
    NAGAD = "nagad",
    CASH = "cash",
}

export enum PaymentStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    REJECTED = "rejected",
}

export interface StudentCourseClass {
    title: string;
    session: string;
    completed: boolean;
}

export interface StudentCourseModule {
    title: string;
    classes: StudentCourseClass[];
}

export interface StudentCoursePaymentSummary {
    method: PaymentMethod;
    trxId?: string;
    amount: number;
    paidAt: string;
    status: PaymentStatus;
}

export interface StudentCourseDetails {
    courseId: string;
    title: string;
    tagline: string;
    description: string;
    thumbnailUrl: string;
    instructor: string;
    averageRating: number;
    reviewCount: number;
    students: number;
    duration: string;
    lessons: number;
    totalSeats: number;
    bookedSeats: number;
    schedule: string;
    location: string;
    startDate: string;
    includes: string[];
    currentSession: number;
    status: EnrollmentStatus;
    paymentSummary: StudentCoursePaymentSummary;
    modules: StudentCourseModule[];
}