// app/admin/_data/courses.ts

export type CourseStatus = "active" | "upcoming" | "completed";

export interface AdminCourse {
    courseId: string;
    title: string;
    instructor: string;
    schedule: string;
    location: string;
    startDate: Date;
    duration: string;
    lessons: number;
    totalSeats: number;
    bookedSeats?: number;
    revenue: number;
    status: CourseStatus;
}

export const COURSES: AdminCourse[] = [
    {
        courseId: "web-dev-batch-1",
        title: "Complete Web Development — Batch 1",
        instructor: "Tarikul Islam",
        schedule: "Sat & Mon, 10AM–12PM",
        location: "Bishuddho Academy, Kafrul",
        startDate: new Date("Jan 15, 2026"),
        duration: "3 months",
        lessons: 36,
        totalSeats: 30,
        bookedSeats: 28,
        revenue: 98000,
        status: "active",
    },
    {
        courseId: "graphic-design-batch-1",
        title: "Graphic Design with Figma — Batch 1",
        instructor: "Nusrat Jahan",
        schedule: "Fri & Sat, 2PM–4PM",
        location: "Bishuddho Academy, Kafrul",
        startDate: new Date("Feb 1, 2026"),
        duration: "2 months",
        lessons: 24,
        totalSeats: 25,
        bookedSeats: 22,
        revenue: 77000,
        status: "active",
    },
    {
        courseId: "digital-marketing-batch-1",
        title: "Digital Marketing & SEO — Batch 1",
        instructor: "Rakibul Hasan",
        schedule: "Sun & Tue, 6PM–8PM",
        location: "Bishuddho Academy, Kafrul",
        startDate: new Date("Mar 1, 2026"),
        duration: "2 months",
        lessons: 20,
        totalSeats: 20,
        bookedSeats: 20,
        revenue: 50000,
        status: "completed",
    },
    {
        courseId: "web-dev-batch-2",
        title: "Complete Web Development — Batch 2",
        instructor: "Tarikul Islam",
        schedule: "Wed & Thu, 4PM–6PM",
        location: "Bishuddho Academy, Kafrul",
        startDate: new Date("Jun 15, 2026"),
        duration: "3 months",
        lessons: 36,
        totalSeats: 30,
        bookedSeats: 8,
        revenue: 28000,
        status: "upcoming",
    },
    {
        courseId: "graphic-design-batch-2",
        title: "Graphic Design with Figma — Batch 2",
        instructor: "Nusrat Jahan",
        schedule: "Fri & Sat, 4PM–6PM",
        location: "Bishuddho Academy, Kafrul",
        startDate: new Date("Jul 1, 2026"),
        duration: "2 months",
        lessons: 24,
        totalSeats: 25,
        bookedSeats: 3,
        revenue: 10500,
        status: "upcoming",
    },
];