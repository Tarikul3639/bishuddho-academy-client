"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, MapPin } from "lucide-react";

interface Course {
  id:       string;
  title:    string;
  type:     "recorded" | "physical";
  progress: number;
  schedule?: string;
  thumbnail: string;
}

export default function CourseCard({ course }: { course: Course }) {
  const isRecorded = course.type === "recorded";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative h-36 w-full">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#eff6ff]">
            {isRecorded
              ? <Video  className="h-10 w-10 text-primary/30" />
              : <MapPin className="h-10 w-10 text-[#059669]/30" />
            }
          </div>
        )}

        {/* Type badge */}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${
          isRecorded ? "bg-primary/90" : "bg-[#059669]/90"
        }`}>
          {isRecorded ? "Recorded" : "Physical"}
        </span>
      </div>

      <div className="p-4">
        <h3 className="mb-3 line-clamp-2 text-sm font-bold leading-snug text-[#111827]">
          {course.title}
        </h3>

        {/* Schedule — physical */}
        {!isRecorded && course.schedule && (
          <p className="mb-3 flex items-center gap-1 text-xs text-[#6b7280]">
            <MapPin className="h-3 w-3" /> {course.schedule}
          </p>
        )}

        {/* Progress — recorded */}
        {isRecorded && (
          <div className="mb-4">
            <div className="mb-1 flex justify-between text-[10px] text-[#6b7280]">
              <span>Progress</span>
              <span className="font-medium text-primary">{course.progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        <Link href={`/my-courses/${course.id}`}>
          <button className="w-full rounded-xl bg-primary/5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
            {isRecorded ? "Continue" : "View Details"}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}