"use client";
import PaymentSummaryCard from "./PaymentSummaryCard";
import ProgressCard from "./ProgressCard";
import CourseStatsCard from "./CourseStatsCard";
import BatchInfoCard from "./BatchInfoCard";
import InstructorCard from "./InstructorCard";
import CertificateCard from "./CertificateCard";
import type { StudentCourseDetails } from "@/types/student-course-details";

interface SidebarProps {
    course: StudentCourseDetails;
    progPct: number;
    handleCertificateView: () => void;
    handleCertificateDownload: () => void;
}

function Sidebar({
    course,
    progPct,
    handleCertificateView,
    handleCertificateDownload,
}: SidebarProps) {
    return (
        <div className="space-y-4">
            <PaymentSummaryCard payment={course.payment} />
            <ProgressCard modules={course.modules} />
            <CourseStatsCard
                modules={course.modules.length}
                lessons={course.lessons}
                duration={course.duration}
                students={course.students}
            />
            <BatchInfoCard
                startDate={course.startDate}
                bookedSeats={course.bookedSeats}
                totalSeats={course.totalSeats}
            />
            <InstructorCard name={course.instructor} />

            <CertificateCard
                certificate={course.certificate}
                onView={handleCertificateView}
                onDownload={handleCertificateDownload}
            />
        </div>
    );
}

export default Sidebar;
