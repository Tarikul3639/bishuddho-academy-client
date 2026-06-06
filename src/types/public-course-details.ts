// src/types/public-course-details.ts

export interface CourseClassType {
    title: string;
    session: string;
}

export interface CourseModuleType {
    title: string;
    classes: CourseClassType[];
}

export interface PublicCourseDetails {
    courseId: string;
    title: string;
    tagline: string;
    description: string;
    thumbnailUrl: string;
    instructor: string;
    averageRating: number;
    reviewCount: number;
    students: number;
    price: number;
    originalPrice: number;
    discount: number;
    daysLeft: number;
    duration: string;
    lessons: number;
    totalSeats: number;
    bookedSeats: number;
    schedule: string;
    location: string;
    startDate: string;
    isEnrolled: boolean;
    includes: string[];
    modules: CourseModuleType[];
}