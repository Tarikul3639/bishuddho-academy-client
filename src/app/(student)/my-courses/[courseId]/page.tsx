// app/my-courses/[courseId]/page.tsx
// import { EnrolledCourseDetail, EnrolledCourseDetailPage } from "./components/EnrolledCourseDetailPage";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { EnrolledCourseDetail } from "./components/courseTypes";
import { EnrolledCourseDetailPage } from "./components/EnrolledCourseDetailPage";

const COURSE: EnrolledCourseDetail = {
    title: "Complete Web Development — Physical Batch",
    tagline: "Hands-on classroom training from HTML to full-stack",
    description: "A structured physical training program designed for students who want to learn web development in a real classroom environment. Each session is hands-on with direct guidance from the instructor.",
    rating: 4.9,
    ratingCount: 45,
    students: 30,
    instructor: "Tarikul Islam",
    duration: "3 months",
    lessons: 36,
    totalSeats: 30,
    bookedSeats: 22,
    schedule: "Sat & Mon, 10:00 AM – 12:00 PM",
    location: "Bishuddho Academy, Kafrul, Dhaka",
    startDate: "June 15, 2025",
    currentSession: 12,
    includes: [
        "Live face-to-face instruction",
        "Printed study materials included",
        "Hands-on project in every session",
        "Doubt clearing after each class",
        "Certificate of completion",
    ],
    paymentSummary: {
        method: "bkash",
        trxId: "8N5A2K9XQ3",
        amount: 3500,
        paidAt: "June 14, 2025",
        status: "verified",
    },
    modules: [
        {
            id: 1,
            title: "HTML & CSS Fundamentals",
            sessions: 6,
            duration: "3 weeks",
            classes: [
                { title: "Introduction to HTML & Document Structure", session: "Session 1–2" },
                { title: "CSS Basics, Selectors & Box Model", session: "Session 3–4" },
                { title: "Flexbox, Grid & Responsive Design", session: "Session 5–6" },
            ],
        },
        {
            id: 2,
            title: "JavaScript Fundamentals",
            sessions: 8,
            duration: "4 weeks",
            classes: [
                { title: "Variables, Functions & Control Flow", session: "Session 7–9" },
                { title: "DOM Manipulation & Events", session: "Session 10–11" },
                { title: "ES6+, Async & Fetch API", session: "Session 12–14" },
            ],
        },
        {
            id: 3,
            title: "React & Modern Frontend",
            sessions: 10,
            duration: "5 weeks",
            classes: [
                { title: "React Basics & JSX", session: "Session 15–17" },
                { title: "Hooks, State & Props", session: "Session 18–20" },
                { title: "React Router & Context API", session: "Session 21–22" },
                { title: "Final Frontend Project", session: "Session 23–24" },
            ],
        },
        {
            id: 4,
            title: "Backend & Final Project",
            sessions: 8,
            duration: "4 weeks",
            classes: [
                { title: "Node.js & Express Basics", session: "Session 25–27" },
                { title: "MongoDB & REST API", session: "Session 28–30" },
                { title: "Full-Stack Capstone Project", session: "Session 31–36" },
            ],
        },
    ],
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
    const { courseId } = await params;
    return createMetadata({
        title: COURSE.title,
        description: COURSE.description,
        ogDescription: COURSE.tagline,
        path: `/my-courses/${courseId}`,
        keywords: ["web development", "physical batch", "Bishuddho Academy", COURSE.instructor],
    });
}

export default async function Page({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    console.log("My Course ID:", courseId);
    return <EnrolledCourseDetailPage course={COURSE} />;
}