import { EnrolledCourseDetailPage } from "./components/EnrolledCourseDetailPage";


export default async function Page({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    console.log("My Course ID:", courseId);
    return <EnrolledCourseDetailPage courseId={courseId} />;
}