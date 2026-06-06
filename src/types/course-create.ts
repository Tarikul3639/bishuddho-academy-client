export type CourseStatus = "active" | "upcoming" | "completed";

/* ─────────────────────────────
   CLASS
───────────────────────────── */
export interface CourseClass {
    title: string;
    session: string;
    completed?: boolean;
}

/* ─────────────────────────────
   MODULE
───────────────────────────── */
export interface CourseModule {
    title: string;
    classes: CourseClass[];
}

/* ─────────────────────────────
   MAIN COURSE TYPE
───────────────────────────── */
export interface CourseCreate {
    courseId?: string;

    title: string;
    tagline: string;
    description: string;

    instructor: string;
    schedule: string;
    location: string;

    startDate: string;

    duration: string;
    totalSeats: number;

    thumbnailUrl: string;
    thumbnailFile?: File | null;

    status: CourseStatus;

    price: number;
    originalPrice: number;

    discountStarts: string | null;
    discountEnds: string | null;

    includes: string[];

    modules: CourseModule[];
}