import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

import type {
    DashboardCoursesResponse,
    DashboardStatsResponse,
    PendingPaymentsResponse,
    RecentEnrollmentsResponse,
} from "./dashboard.types";

export const dashboardApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({

            /* ---------------------------------
               Dashboard Courses
            ---------------------------------- */
            getDashboardCourses:
                builder.query<
                    DashboardCoursesResponse,
                    void
                >({
                    query: () => ({
                        url: "/admin/dashboard/courses",
                        method: "GET",
                    }),

                    providesTags: [
                        TAG_TYPES.DASHBOARD,
                    ],
                }),

            /* ---------------------------------
               Pending Payments
            ---------------------------------- */
            getPendingPayments:
                builder.query<
                    PendingPaymentsResponse,
                    void
                >({
                    query: () => ({
                        url: "/admin/dashboard/pending-payments",
                        method: "GET",
                    }),

                    providesTags: [
                        TAG_TYPES.DASHBOARD,
                    ],
                }),

            /* ---------------------------------
               Recent Enrollments
            ---------------------------------- */

            getRecentEnrollments:
                builder.query<
                    RecentEnrollmentsResponse,
                    void
                >({
                    query: () => ({
                        url: "/admin/dashboard/recent-enrollments",
                        method: "GET",
                    }),

                    providesTags: [
                        TAG_TYPES.DASHBOARD,
                    ],
                }),

            /* ---------------------------------
               Dashboard Stats
            ---------------------------------- */

            getDashboardStats:
                builder.query<
                    DashboardStatsResponse,
                    void
                >({
                    query: () => ({
                        url: "/admin/dashboard/stats",
                        method: "GET",
                    }),

                    providesTags: [
                        TAG_TYPES.DASHBOARD,
                    ],
                }),

        }),
    });

export const {
    useGetDashboardCoursesQuery,
    useGetPendingPaymentsQuery,
    useGetRecentEnrollmentsQuery,
    useGetDashboardStatsQuery,
} = dashboardApi;