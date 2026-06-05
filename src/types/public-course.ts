// types/public-course.ts

/**
 * Represents the current lifecycle status of a course.
 */
export type CourseStatus = "active" | "upcoming" | "completed";

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
    status: CourseStatus;
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