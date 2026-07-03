import { CourseStatus } from "@/types/course-status";
import { PaymentStatus } from "@/types/payment-status";
import { PaymentMethod } from "@/types/payment-method";
import { EnrollmentStatus } from "@/types/student-course-details";

export interface DashboardCourse {
  courseId: string;
  title: string;
  instructor: string;
  schedule: string;
  location: string;
  duration: string;
  status: CourseStatus;
  totalSeats: number;
  bookedSeats: number;
  lessons: number;
  revenue: number;
  startDate: string;
}

export interface DashboardCoursesResponse {
  courses: DashboardCourse[];
}

/* ----------------------------------
   Pending Payments
----------------------------------- */

export interface PendingPayment {
    paymentId: string;
    enrollmentId: string;
    studentName: string;
    courseName: string;
    status: PaymentStatus;
    method: PaymentMethod;
    trxId?: string;
    amount: number;
    paidAt: string;
}

export interface PendingPaymentsResponse {
    payments: PendingPayment[];
}

/* ---------------------------------------
   Recent Enrollments
--------------------------------------- */

export interface RecentEnrollment {
    enrollmentId: string;
    studentName: string;
    courseName: string;
    method: string;
    status: EnrollmentStatus;
    date: string;
}

export interface RecentEnrollmentsResponse {
    enrollments: RecentEnrollment[];
}

/* ---------------------------------------
   Dashboard Stats
--------------------------------------- */

export interface DashboardStats {
    totalStudents: number;
    totalRevenue: number;
    activeCourses: number;
    upcomingCourses: number;
    pendingPayments: number;
    newStudentsThisMonth: number;
    revenueThisMonth: number;
}

export interface DashboardStatsResponse {
    stats: DashboardStats;
}