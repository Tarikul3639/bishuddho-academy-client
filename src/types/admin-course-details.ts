import type { CourseModule } from "@/types/course-create";
import type { CourseStatus } from "@/types/course-status";

/* ─────────────────────────────
   ENUMS
───────────────────────────── */

export type PaymentMethod =
    | "bkash"
    | "nagad"
    | "rocket"
    | "bank_transfer"
    | "cash";

export type EnrollmentStatus =
    | "pending"
    | "active"
    | "completed";

export type PaymentStatus =
    | "pending"
    | "verified"
    | "rejected";

/* ─────────────────────────────
   STUDENT
───────────────────────────── */

export interface EnrolledStudent {
    enrollment: {
        enrollmentId: string;
        status: EnrollmentStatus;
        currentSession: number;
    };

    user: {
        id: string;
        name: string;
        email: string;
    };

    payment?: {
        paymentId: string;
        method: PaymentMethod;
        trxId?: string;
        amount: number;
        paidAt: string;
        status: PaymentStatus;

        verifiedBy?: string;
        verifiedAt?: string;
        rejectionReason?: string;
    };
}

/* ─────────────────────────────
   COURSE DETAILS
───────────────────────────── */

export interface CourseDetails {
    courseId: string;

    title: string;
    tagline: string;
    description: string;

    thumbnailUrl: string;
    thumbnailFile?: File | null;

    instructor: string;

    schedule: string;
    location: string;
    startDate: string;

    duration: string;

    totalSeats: number;
    bookedSeats: number;

    price: number;
    originalPrice: number;

    discountStarts: string | null;
    discountEnds: string | null;

    status: CourseStatus;

    revenue: number;
    lessons: number;

    includes: string[];

    modules: CourseModule[];

    students: EnrolledStudent[];
}