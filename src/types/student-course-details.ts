// src/types/student-course-details.ts

export enum EnrollmentStatus {
    ACTIVE = "active",
    PENDING = "pending",
    COMPLETED = "completed",
}

export enum PaymentMethod {
    BKASH = "bkash",
    NAGAD = "nagad",
    ROCKET = "rocket",
    BANK_TRANSFER = "bank_transfer",
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

export interface StudentCoursePayment {
    method: PaymentMethod;
    trxId?: string;
    amount: number;
    paidAt: string;
    status: PaymentStatus;
    verifiedBy?: string;
    verifiedAt?: string;
    rejectionReason?: string;
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

    status: EnrollmentStatus;
    payment: StudentCoursePayment;
    modules: StudentCourseModule[];
}