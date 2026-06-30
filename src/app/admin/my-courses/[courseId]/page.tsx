import EnrolledCourseDetail from "@/components/my-courses/enrolled-course-details/EnrolledCourseDetails";

export default async function Page({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    return <EnrolledCourseDetail courseId={courseId} />;
}