import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    studentId: string;
    joinedDate: string;
    lastLogin: string;
    status: "active" | "blocked";
    coursesCount: number;
    lastPurchase: string;
}

export interface AdminUsersResponse {
    users: AdminUser[];
    total: number;
    active: number;
    blocked: number;
    newUsersCount: number;
}

export interface ToggleBlockResponse {
    success: boolean;
    message: string;
    status: string;
}

export const adminUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminUsers: builder.query<
            AdminUsersResponse,
            { search?: string; status?: string }
        >({
            query: (params) => ({
                url: "/admin/users",
                method: "GET",
                params,
            }),
            providesTags: [{ type: "AdminUsers" as any, id: "LIST" }],
        }),

        toggleUserBlock: builder.mutation<
            ToggleBlockResponse,
            { id: string; status?: "active" | "blocked"; reason?: string }
        >({
            query: ({ id, status, reason }) => ({
                url: `/admin/users/${id}/toggle-block`,
                method: "PATCH",
                body: { status, reason },
            }),
            invalidatesTags: [{ type: "AdminUsers" as any, id: "LIST" }],
        }),

        blockUser: builder.mutation<
            ToggleBlockResponse,
            { id: string; reason?: string }
        >({
            query: ({ id, reason }) => ({
                url: `/admin/users/${id}/block`,
                method: "PATCH",
                body: { reason },
            }),
            invalidatesTags: [{ type: "AdminUsers" as any, id: "LIST" }],
        }),

        unblockUser: builder.mutation<ToggleBlockResponse, string>({
            query: (id) => ({
                url: `/admin/users/${id}/unblock`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: "AdminUsers" as any, id: "LIST" }],
        }),

        resetUserPassword: builder.mutation<
            { success: boolean; message: string },
            { id: string; reason?: string }
        >({
            query: ({ id, reason }) => ({
                url: `/admin/users/${id}/reset-password`,
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
