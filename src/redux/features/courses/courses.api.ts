import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

import type { CourseCreate } from "@/types/course-create";
import type { CourseDetails } from "@/types/course-details";
import type { CourseListItem } from "@/types/course-list-item";
import type { PublicCoursesResponse } from "@/types/public-course";
import type { PublicCourseDetails } from "@/types/public-course-details";
import type { StudentCourseDetails } from "@/types/student-course-details";
import type { StudentMyCourse } from "@/types/student-my-course";

interface GetPublicCoursesParams {
    limit?: number;
    page?: number;
    userId?: string;
}

/* API */
export const coursesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* ─────────────────────────────
                   ADMIN
                ───────────────────────────── */

        createCourse: builder.mutation<CourseCreate, FormData>({
            query: (formData) => ({
                url: "/admin/courses",
                method: "POST",
                body: formData,
            }),

            invalidatesTags: [
                {
                    type: TAG_TYPES.COURSES,
                    id: "LIST",
                },
            ],
        }),

        updateCourse: builder.mutation<
            CourseDetails,
            {
                courseId: string;
                formData: FormData;
            }
        >({
            query: ({ courseId, formData }) => ({
                url: `/admin/courses/${courseId}`,
                method: "PATCH",
                body: formData,
            }),

            invalidatesTags: (_, __, { courseId }) => [
                {
                    type: TAG_TYPES.COURSES,
                    id: courseId,
                },
                {
                    type: TAG_TYPES.COURSES,
                    id: "LIST",
                },
            ],
        }),

        getAdminCourses: builder.query<CourseListItem[], void>({
            query: () => ({
                url: "/admin/courses",
                method: "GET",
            }),

            providesTags: (result) =>
                result
                    ? [
                        ...result.map((course) => ({
                            type: TAG_TYPES.COURSES,
                            id: course.courseId,
                        })),
                        {
                            type: TAG_TYPES.COURSES,
                            id: "LIST",
                        },
                    ]
                    : [
                        {
                            type: TAG_TYPES.COURSES,
                            id: "LIST",
                        },
                    ],
        }),

        getAdminCourse: builder.query<CourseDetails, string>({
            query: (courseId) => ({
                url: `/admin/courses/${courseId}`,
                method: "GET",
            }),

            providesTags: (_, __, courseId) => [
                {
                    type: TAG_TYPES.COURSES,
                    id: courseId,
                },
            ],
        }),

        /* ─────────────────────────────
                   PUBLIC
                ───────────────────────────── */

        getPublicCourses: builder.query<
            PublicCoursesResponse,
            GetPublicCoursesParams
        >({
            query: (params) => ({
                url: "/public/courses",
                method: "GET",
                params,
            }),
        }),

        getPublicCourseDetails: builder.query<PublicCourseDetails, string>({
            query: (courseId) => ({
                url: `/public/courses/${courseId}`,
                method: "GET",
            }),
        }),

        /* ─────────────────────────────
                   STUDENT
                ───────────────────────────── */

        getMyCourses: builder.query<StudentMyCourse[], void>({
            query: () => ({
                url: "/student/courses",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((course) => ({
                            type: TAG_TYPES.ENROLLMENTS,
                            id: course.courseId,
                        })),
                        {
                            type: TAG_TYPES.ENROLLMENTS,
                            id: "LIST",
                        },
                    ]
                    : [
                        {
                            type: TAG_TYPES.ENROLLMENTS,
                            id: "LIST",
                        },
                    ],
        }),

        getMyCourseDetails: builder.query<StudentCourseDetails, string>({
            query: (courseId) => ({
                url: `/student/courses/${courseId}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    /* Admin */
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useGetAdminCoursesQuery,
    useGetAdminCourseQuery,

    /* Public */
    useGetPublicCoursesQuery,
    useGetPublicCourseDetailsQuery,

    /* Student */
    useGetMyCoursesQuery,
    useGetMyCourseDetailsQuery,
} = coursesApi;
