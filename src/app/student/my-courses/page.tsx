"use client";

import { fadeUp, stagger } from "@/components/animations";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnrolledCourse, EnrolledCourseCard } from "@/components/courses/EnrolledCourseCard";

// TODO: replace with API data
const MY_COURSES: EnrolledCourse[] = [
  {
    id: "web-dev-batch-1",
    title: "Complete Web Development — Physical Batch",
    instructor: "Tarikul Islam",
    thumbnail: "/thumbnails/web-dev.jpg",
    status: "active",
    schedule: "Sat & Mon, 10:00 AM – 12:00 PM",
    location: "Bishuddho Academy, Kafrul, Dhaka",
    duration: "3 months",
    currentSession: 12,
    totalSessions: 36,
  },
  {
    id: "graphic-design-batch-2",
    title: "Professional Graphic Design with Figma & Illustrator",
    instructor: "Nusrat Jahan",
    thumbnail: "/thumbnails/graphic-design.jpg",
    status: "pending",
    schedule: "Fri & Sat, 2:00 PM – 4:00 PM",
    location: "Bishuddho Academy, Kafrul, Dhaka",
    duration: "2 months",
    currentSession: 0,
    totalSessions: 24,
  },
  {
    id: "digital-marketing-batch-3",
    title: "Digital Marketing & SEO Masterclass",
    instructor: "Rakibul Hasan",
    thumbnail: "/thumbnails/digital-marketing.jpg",
    status: "completed",
    schedule: "Sun & Tue, 6:00 PM – 8:00 PM",
    location: "Bishuddho Academy, Kafrul, Dhaka",
    duration: "2 months",
    currentSession: 20,
    totalSessions: 20,
  },
];

export default function MyCoursesPage() {
  const router = useRouter();

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6 p-6"
    >

      {/* ─── PAGE HEADER & BACK NAV ─── */}
      <motion.div variants={fadeUp} className="space-y-3">
        <button
          onClick={() => router.replace("/dashboard")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-primary cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            My Courses
          </h1>
          <p className="text-sm font-medium text-slate-500 line-clamp-2">
            View and manage your enrolled courses, track progress, and access learning materials all in one place.
          </p>
        </div>
      </motion.div>

      <div className="mx-auto">
        {/* Active */}
        {MY_COURSES.filter((c) => c.status === "active").length > 0 && (
          <div className="mb-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MY_COURSES.map((course) => (
                <EnrolledCourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
}
