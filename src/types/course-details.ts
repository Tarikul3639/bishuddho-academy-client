import {
    CourseClass,
    CourseModule,
} from "./course-create";

export type PaymentMethod =
    | "bkash"
    | "nagad"
    | "cash";

export type EnrollmentStatus =
    | "active"
    | "pending"
    | "completed";

export type CourseStatus =
    | "active"
    | "upcoming"
    | "completed";
/* ─────────────────────────────
   Student
───────────────────────────── */
export interface Student {
    enrollId: string;

    name: string;
    email: string;

    method: PaymentMethod;

    trxId?: string;

    amount: number;

    date: string;

    status: EnrollmentStatus;
}

/* ─────────────────────────────
   Course Details
───────────────────────────── */
export interface CourseDetails {
    courseId: string;

    title: string;
    tagline: string;
    description: string;

    thumbnailUrl: string;

    // local state only
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

    students: Student[];
}