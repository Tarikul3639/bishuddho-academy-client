// app/admin/courses/[courseId]/page.tsx

import type { Metadata } from "next";
import AdminCourseDetailPage from "./AdminCourseDetailPage";
import { createMetadata } from "@/lib/metadata";

async function getCourse(courseId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/courses/${courseId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  return createMetadata({
    title: `${course?.title ?? "Course"} — Admin`,
    description: course?.description ?? "",
    path: `/admin/courses/${courseId}`,
    keywords: ["admin", "course management", course?.instructor ?? ""],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <AdminCourseDetailPage courseId={courseId} />;
}