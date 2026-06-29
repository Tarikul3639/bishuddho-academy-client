// src/types/public-course-details.ts

export type PaymentMethod =
  | "bkash"
  | "nagad"
  | "rocket"
  | "bank_transfer"
  | "cash";

export type EnrollmentStatus =
  | "pending"
  | "active"
  | "completed";

export type PaymentStatus =
  | "pending"
  | "verified"
  | "rejected";

export interface CourseClassType {
  title: string;
  session: string;
}

export interface CourseModuleType {
  title: string;
  classes: CourseClassType[];
}

export interface PublicCoursePayment {
  method: PaymentMethod;
  trxId?: string;
  amount: number;
  paidAt: string;
  status: PaymentStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
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
  enrollmentStatus?: EnrollmentStatus;
  payment?: PublicCoursePayment;

  includes: string[];

  modules: CourseModuleType[];
}