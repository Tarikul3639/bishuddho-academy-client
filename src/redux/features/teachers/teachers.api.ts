// redux/features/teachers/teachers.api.ts

import { baseApi } from '@/redux/api/baseApi';
import { TAG_TYPES } from '@/redux/api/tag-types';

import type {
    TeacherListItem,
    TeacherDetails,
    AdminTeacherDetails,
    TeachersResponse,
    CreateTeacherPayload,
} from '@/types/teacher';

interface GetTeachersParams {
    search?: string;
    department?: string;
    expertise?: string;
    featured?: boolean;
    isActive?: boolean;
    isFounder?: boolean;
    isLeadInstructor?: boolean;
    showOnHomepage?: boolean;
    page?: number;
    limit?: number;
}

export const teachersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* ─────────────────────────────
                   ADMIN
                ───────────────────────────── */

        createTeacher: builder.mutation<{ teacherId: string }, FormData>({
            query: (formData) => ({
                url: '/admin/teachers',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: TAG_TYPES.TEACHERS, id: 'LIST' }],
        }),

        updateTeacher: builder.mutation<
            AdminTeacherDetails,
            { teacherId: string; formData: FormData }
        >({
            query: ({ teacherId, formData }) => ({
                url: `/admin/teachers/${teacherId}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: (_, __, { teacherId }) => [
                { type: TAG_TYPES.TEACHERS, id: teacherId },
                { type: TAG_TYPES.TEACHERS, id: 'LIST' },
            ],
        }),

        deleteTeacher: builder.mutation<{ message: string }, string>({
            query: (teacherId) => ({
                url: `/admin/teachers/${teacherId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: TAG_TYPES.TEACHERS, id: 'LIST' }],
        }),

        getAdminTeachers: builder.query<TeachersResponse, GetTeachersParams>({
            query: (params) => ({
                url: '/admin/teachers',
                method: 'GET',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.teachers.map((t) => ({
                            type: TAG_TYPES.TEACHERS,
                            id: t.teacherId,
                        })),
                        { type: TAG_TYPES.TEACHERS, id: 'LIST' },
                    ]
                    : [{ type: TAG_TYPES.TEACHERS, id: 'LIST' }],
        }),

        getAdminTeacher: builder.query<AdminTeacherDetails, string>({
            query: (teacherId) => ({
                url: `/admin/teachers/${teacherId}`,
                method: 'GET',
            }),
            providesTags: (_, __, teacherId) => [
                { type: TAG_TYPES.TEACHERS, id: teacherId },
            ],
        }),

        featureTeacher: builder.mutation<
            { message: string },
            { teacherId: string; featured: boolean }
        >({
            query: ({ teacherId, featured }) => ({
                url: `/admin/teachers/${teacherId}/feature`,
                method: 'PATCH',
                body: { featured },
            }),
            invalidatesTags: (_, __, { teacherId }) => [
                { type: TAG_TYPES.TEACHERS, id: teacherId },
                { type: TAG_TYPES.TEACHERS, id: 'LIST' },
            ],
        }),

        changeTeacherStatus: builder.mutation<
            { message: string },
            { teacherId: string; isActive: boolean }
        >({
            query: ({ teacherId, isActive }) => ({
                url: `/admin/teachers/${teacherId}/status`,
                method: 'PATCH',
                body: { isActive },
            }),
            invalidatesTags: (_, __, { teacherId }) => [
                { type: TAG_TYPES.TEACHERS, id: teacherId },
                { type: TAG_TYPES.TEACHERS, id: 'LIST' },
            ],
        }),

        reorderTeachers: builder.mutation<
            { message: string },
            { items: { teacherId: string; displayOrder: number }[] }
        >({
            query: (body) => ({
                url: '/admin/teachers/action/reorder',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [{ type: TAG_TYPES.TEACHERS, id: 'LIST' }],
        }),

        /* ─────────────────────────────
                   PUBLIC
                ───────────────────────────── */

        getPublicTeachers: builder.query<TeachersResponse, GetTeachersParams>({
            query: (params) => ({
                url: '/public/teachers',
                method: 'GET',
                params,
            }),
            providesTags: [{ type: TAG_TYPES.TEACHERS, id: 'PUBLIC_LIST' }],
        }),

        getPublicTeacherBySlug: builder.query<TeacherDetails, string>({
            query: (slug) => ({
                url: `/public/teachers/${slug}`,
                method: 'GET',
            }),
            providesTags: (_, __, slug) => [
                { type: TAG_TYPES.TEACHERS, id: slug },
            ],
        }),
    }),
});

export const {
    /* Admin */
    useCreateTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    useGetAdminTeachersQuery,
    useGetAdminTeacherQuery,
    useFeatureTeacherMutation,
    useChangeTeacherStatusMutation,
    useReorderTeachersMutation,

    /* Public */
    useGetPublicTeachersQuery,
    useGetPublicTeacherBySlugQuery,
} = teachersApi;
