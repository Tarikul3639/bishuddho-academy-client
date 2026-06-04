import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";
import { CourseCreate } from "@/types/course-create";

export interface CoursesResponse {
    courses: CourseCreate[];
}

/* API */
export const coursesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* Create Course */
        createCourse: builder.mutation<CourseCreate, FormData>({
            query: (courseData) => ({
                url: "/courses",
                method: "POST",
                body: courseData,
            }),
            invalidatesTags: [{ type: TAG_TYPES.COURSES, id: "LIST" }],
        }),

        /* GET ALL COURSES */
        getCourses: builder.query<CoursesResponse, void>({
            query: () => ({
                url: "/courses",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        // individual courses
                        ...result.courses.map((course) => ({
                            type: TAG_TYPES.COURSES,
                            id: course.courseId,
                        })),

                        // list of courses
                        { type: TAG_TYPES.COURSES, id: "LIST" },
                    ]
                    : [{ type: TAG_TYPES.COURSES, id: "LIST" }],
        }),
    }),
});

export const { useGetCoursesQuery, useCreateCourseMutation } = coursesApi;