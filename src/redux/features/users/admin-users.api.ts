import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";
import type { AdminUsersResponse, ToggleBlockResponse, UserStatus } from "@/types/admin-users";

export const adminUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminUsers: builder.query<
            AdminUsersResponse,
            { search?: string; status?: UserStatus }
        >({
            query: (params) => ({
                url: "/admin/users",
                method: "GET",
                params,
            }),
            providesTags: [
                {
                    type: TAG_TYPES.ADMIN_USERS,
                    id: "LIST",
                },
            ],
        }),

        toggleUserBlock: builder.mutation<
            ToggleBlockResponse,
            { userId: string; status?: UserStatus; reason?: string }
        >({
            query: ({ userId, status, reason }) => ({
                url: `/admin/users/${userId}/toggle-block`,
                method: "PATCH",
                body: { status, reason },
            }),
            invalidatesTags: [{ type: TAG_TYPES.ADMIN_USERS, id: "LIST" }],
        }),

        blockUser: builder.mutation<
            ToggleBlockResponse,
            { userId: string; reason?: string }
        >({
            query: ({ userId, reason }) => ({
                url: `/admin/users/${userId}/block`,
                method: "PATCH",
                body: { reason },
            }),
            invalidatesTags: [{ type: TAG_TYPES.ADMIN_USERS, id: "LIST" }],
        }),

        unblockUser: builder.mutation<ToggleBlockResponse, string>({
            query: (userId) => ({
                url: `/admin/users/${userId}/unblock`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: TAG_TYPES.ADMIN_USERS, id: "LIST" }],
        }),

        resetUserPassword: builder.mutation<
            { success: boolean; message: string },
            { userId: string; reason?: string }
        >({
            query: ({ userId, reason }) => ({
                url: `/admin/users/${userId}/reset-password`,
                method: "POST",
                body: { reason },
            }),
        }),
    }),
});

export const {
    useGetAdminUsersQuery,
    useToggleUserBlockMutation,
    useBlockUserMutation,
    useUnblockUserMutation,
    useResetUserPasswordMutation,
} = adminUsersApi;
