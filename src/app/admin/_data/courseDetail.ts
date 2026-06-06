// app/admin/_data/courseDetail.ts

import { AdminCourse } from "./courses";
import { CourseModule } from '@/types/course-create';

export type CourseStatus = "active" | "upcoming" | "completed";

export interface EnrolledStudent {
    enrollId: string;
    name: string;
    email: string;
    method: "bkash" | "nagad" | "cash";
    trxId?: string;
    amount: number;
    date: string;
    status: "active" | "pending" | "completed";
}

export interface AdminCourseDetail extends AdminCourse {
    thumbnailUrl: string;
    thumbnailFile?: File | null;
    price: number;
    originalPrice: number;
    discountStarts: Date | null;
    discountEnds: Date | null;
    tagline: string;
    description: string;
    includes: string[];
    modules: CourseModule[];
    students: EnrolledStudent[];
}

export const METHOD_CONFIG = {
    bkash: { label: "bKash", bg: "#FDF2F8", color: "#E2136E", border: "#FBCFE8" },
    nagad: { label: "Nagad", bg: "#FFF8F0", color: "#F7941D", border: "#FDE68A" },
    cash: { label: "Cash", bg: "#F0FDF4", color: "#059669", border: "#BBF7D0" },
} as const;

export const STUDENT_STATUS_CONFIG = {
    active: { label: "Active", bg: "#dcfce7", color: "#16a34a" },
    pending: { label: "Pending", bg: "#fff7ed", color: "#ea580c" },
    completed: { label: "Completed", bg: "#eef3ff", color: "#1a56db" },
} as const;

// ── Demo data ─────────────────────────────────────────────────────────────────

export const COURSE_DETAIL: AdminCourseDetail = {
    courseId: "web-dev-batch-1",
    title: "Complete Web Development — Batch 1",
    tagline: "Hands-on classroom training from HTML to full-stack",
    description:
        "A structured physical training program designed for students who want to learn web development in a real classroom environment. Each session is hands-on with direct guidance from the instructor.",
    thumbnailUrl: "/images/course-thumbnails/web-dev-batch-1.jpg",
    instructor: "Tarikul Islam",
    schedule: "Sat & Mon, 10:00 AM – 12:00 PM",
    location: "Bishuddho Academy, Kafrul, Dhaka",
    startDate: new Date("Jan 15, 2026"),
    duration: "3 months",
    lessons: 36,
    totalSeats: 30,
    bookedSeats: 22,
    revenue: 77000,
    price: 3500,
    originalPrice: 5000,
    discountStarts: new Date("Jan 1, 2026"),
    discountEnds: new Date("Jan 14, 2026"),
    status: "active",
    includes: [
        "Live face-to-face instruction",
        "Printed study materials included",
        "Hands-on project in every session",
        "Doubt clearing after each class",
        "Certificate of completion",
    ],
    modules: [
        {
            title: "HTML & CSS Fundamentals",
            classes: [
                {
                    title: "Introduction to HTML & Document Structure",
                    session: "Session 1–2",
                    completed: true,
                },
                {
                    title: "CSS Basics, Selectors & Box Model",
                    session: "Session 3–4",
                    completed: false,
                },
                {
                    title: "Flexbox, Grid & Responsive Design",
                    session: "Session 5–6",
                    completed: false,
                },
            ],
        },
        {
            title: "JavaScript Fundamentals",
            classes: [
                {
                    title: "Variables, Functions & Control Flow",
                    session: "Session 7–9",
                    completed: false,
                },
                {
                    title: "DOM Manipulation & Events",
                    session: "Session 10–11",
                    completed: false,
                },
                {
                    title: "ES6+, Async & Fetch API",
                    session: "Session 12–14",
                    completed: false,
                },
            ],
        },
        {
            title: "React & Modern Frontend",
            classes: [
                {
                    title: "React Basics & JSX",
                    session: "Session 15–17",
                    completed: false,
                },
                {
                    title: "Hooks, State & Props",
                    session: "Session 18–20",
                    completed: false,
                },
                {
                    title: "React Router & Context API",
                    session: "Session 21–22",
                    completed: false,
                },
                {
                    title: "Final Frontend Project",
                    session: "Session 23–24",
                    completed: false,
                },
            ],
        },
        {
            title: "Backend & Final Project",
            classes: [
                {
                    title: "Node.js & Express Basics",
                    session: "Session 25–27",
                    completed: false,
                },
                {
                    title: "MongoDB & REST API",
                    session: "Session 28–30",
                    completed: false,
                },
                {
                    title: "Full-Stack Capstone Project",
                    session: "Session 31–36",
                    completed: false,
                },
            ],
        },
    ],
    students: [
        {
            enrollId: "1",
            name: "Rafiq Islam",
            email: "rafiq@gmail.com",
            method: "bkash",
            trxId: "8N5A2K9XQ3",
            amount: 3500,
            date: "Jan 10, 2026",
            status: "active",
        },
        {
            enrollId: "2",
            name: "Sadia Akter",
            email: "sadia@gmail.com",
            method: "nagad",
            trxId: "9K2L5M8NQ1",
            amount: 3500,
            date: "Jan 11, 2026",
            status: "pending",
        },
        {
            enrollId: "3",
            name: "Jahid Hasan",
            email: "jahid@gmail.com",
            method: "cash",
            trxId: undefined,
            amount: 3500,
            date: "Jan 12, 2026",
            status: "active",
        },
        {
            enrollId: "4",
            name: "Mitu Begum",
            email: "mitu@gmail.com",
            method: "bkash",
            trxId: "7B3C1D6EP4",
            amount: 3500,
            date: "Jan 13, 2026",
            status: "pending",
        },
        {
            enrollId: "5",
            name: "Rubel Mia",
            email: "rubel@gmail.com",
            method: "nagad",
            trxId: "6A1B4C7DQ2",
            amount: 3500,
            date: "Jan 14, 2026",
            status: "completed",
        },
        {
            enrollId: "6",
            name: "Nasrin Akter",
            email: "nasrin@gmail.com",
            method: "bkash",
            trxId: "5D8E3F2GR9",
            amount: 3500,
            date: "Jan 15, 2026",
            status: "active",
        },
    ],
};
