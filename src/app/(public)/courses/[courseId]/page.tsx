import { CourseDetailPage } from "./components/CourseDetailPage";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// params typed as Promise
export async function generateMetadata({
    params,
}: {
    params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
    const { courseId } = await params;

    const course = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}/public/courses/${courseId}`,
    )
        .then((res) => res.json())
        .catch((err) => {
            console.error(
                "Error fetching course details for metadata:",
                err,
            );
            return null;
        });

    console.log("Course details for metadata:", course);

    return createMetadata({
        title: course?.title || "Default Title",
        description: course?.description || "Default description",
        ogDescription: course?.tagline || "Default tagline",
        path: `/courses/${courseId}`,
        keywords: [
            "web development course",
            "physical batch Dhaka",
            "HTML CSS JavaScript",
            "React course Bangladesh",
            "full-stack training",
            "Bishuddho Academy",
            course?.instructor,
        ],
    });
}

// Page function
export default async function Page({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    return <CourseDetailPage courseId={courseId} />;
}