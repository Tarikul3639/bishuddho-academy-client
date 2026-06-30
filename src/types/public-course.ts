// types/public-course.ts

import { CourseStatus } from "@/types/course-status";
import { EnrollmentStatus, PublicCoursePayment } from "./public-course-details";

/**
 * Interface representing the summary view of a course, 
 * typically used for listing pages or course catalogs.
 */
export interface PublicCourse {
    courseId: string;
    title: string;
    tagline: string;
    thumbnailUrl: string;
    instructor: string;
    price: number;
    originalPrice: number;
    averageRating: number;
    reviewCount: number;
    isEnrolled: boolean;
    enrollmentStatus?: EnrollmentStatus;
    payment?: PublicCoursePayment;
    status?: "active" | "upcoming" | "completed";
}

export interface PublicCoursesResponse {
    courses: PublicCourse[];

    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}