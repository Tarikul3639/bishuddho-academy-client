// src/types/course-list-item.ts
export type CourseStatus = "active" | "upcoming" | "completed";

export interface CourseListItem {
  courseId: string;
  title: string;
  instructor: string;
  schedule: string;
  location: string;
  status: CourseStatus;
  totalSeats: number;
  bookedSeats: number;
  revenue: number;
  lessons: number;
}