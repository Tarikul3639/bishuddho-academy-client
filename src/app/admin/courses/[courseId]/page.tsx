// app/admin/courses/[courseId]/page.tsx

import AdminCourseDetailPage from "./AdminCourseDetailPage";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { COURSE_DETAIL } from "../../_data/courseDetail";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
    const { courseId } = await params;
    return createMetadata({
        title: `${COURSE_DETAIL.title} — Admin`,
        description: COURSE_DETAIL.description ?? "",
        path: `/admin/courses/${courseId}`,
        keywords: ["admin", "course management", COURSE_DETAIL.instructor],
    });
}

// Async page allowed
export default async function Page({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    console.log("Admin Course ID:", courseId);

    return <AdminCourseDetailPage  courseId={courseId} />;
}
