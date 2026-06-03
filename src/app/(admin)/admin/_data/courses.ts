// app/admin/_data/courses.ts

export type CourseStatus = "active" | "upcoming" | "completed";

export interface AdminCourse {
    id:          string;
    title:       string;
    instructor:  string;
    schedule:    string;
    location:    string;
    startDate:   Date;
    duration:    string;
    lessons:     number;
    totalSeats:  number;
    bookedSeats: number;
    revenue:     number;
    status:      CourseStatus;
}

export const STATUS_CONFIG: Record<CourseStatus, { label: string; bg: string; color: string }> = {
    active:    { label: "Active",    bg: "#dcfce7", color: "#16a34a" },
    upcoming:  { label: "Upcoming",  bg: "#eef3ff", color: "#1a56db" },
    completed: { label: "Completed", bg: "#f3f4f6", color: "#6b7280" },
};

export const COURSES: AdminCourse[] = [
    {
        id:          "web-dev-batch-1",
        title:       "Complete Web Development — Batch 1",
        instructor:  "Tarikul Islam",
        schedule:    "Sat & Mon, 10AM–12PM",
        location:    "Bishuddho Academy, Kafrul",
        startDate:   new Date("Jan 15, 2026"),
        duration:    "3 months",
        lessons:     36,
        totalSeats:  30,
        bookedSeats: 28,
        revenue:     98000,
        status:      "active",
    },
    {
        id:          "graphic-design-batch-1",
        title:       "Graphic Design with Figma — Batch 1",
        instructor:  "Nusrat Jahan",
        schedule:    "Fri & Sat, 2PM–4PM",
        location:    "Bishuddho Academy, Kafrul",
        startDate:   new Date("Feb 1, 2026"),
        duration:    "2 months",
        lessons:     24,
        totalSeats:  25,
        bookedSeats: 22,
        revenue:     77000,
        status:      "active",
    },
    {
        id:          "digital-marketing-batch-1",
        title:       "Digital Marketing & SEO — Batch 1",
        instructor:  "Rakibul Hasan",
        schedule:    "Sun & Tue, 6PM–8PM",
        location:    "Bishuddho Academy, Kafrul",
        startDate:   new Date("Mar 1, 2026"),
        duration:    "2 months",
        lessons:     20,
        totalSeats:  20,
        bookedSeats: 20,
        revenue:     50000,
        status:      "completed",
    },
    {
        id:          "web-dev-batch-2",
        title:       "Complete Web Development — Batch 2",
        instructor:  "Tarikul Islam",
        schedule:    "Wed & Thu, 4PM–6PM",
        location:    "Bishuddho Academy, Kafrul",
        startDate:   new Date("Jun 15, 2026"),
        duration:    "3 months",
        lessons:     36,
        totalSeats:  30,
        bookedSeats: 8,
        revenue:     28000,
        status:      "upcoming",
    },
    {
        id:          "graphic-design-batch-2",
        title:       "Graphic Design with Figma — Batch 2",
        instructor:  "Nusrat Jahan",
        schedule:    "Fri & Sat, 4PM–6PM",
        location:    "Bishuddho Academy, Kafrul",
        startDate:   new Date("Jul 1, 2026"),
        duration:    "2 months",
        lessons:     24,
        totalSeats:  25,
        bookedSeats: 3,
        revenue:     10500,
        status:      "upcoming",
    },
];