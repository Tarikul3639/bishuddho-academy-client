"use client";
import PaymentSummaryCard from "./PaymentSummaryCard";
import ProgressCard from "./ProgressCard";
import CourseStatsCard from "./CourseStatsCard";
import BatchInfoCard from "./BatchInfoCard";
import InstructorCard from "./InstructorCard";
import type { StudentCourseDetails } from "@/types/student-course-details";

function Sidebar({ course, progPct }: { course: StudentCourseDetails; progPct: number }) {
    return (
        <div className="space-y-4">
            <PaymentSummaryCard payment={course.paymentSummary} />
            <ProgressCard current={course.currentSession} total={course.lessons} />
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
        </div>
    );
}

export default Sidebar;