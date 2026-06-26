import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

import type { LoginRequest } from "@/types/login-request";
import type { LoginResponse } from "@/types/login-response";
import type { SignupRequest } from "@/types/signup-request";
import type { SignupResponse } from "@/types/signup-response";
import type { AuthUser } from "@/types/auth-user";
import type { ProfileData } from "@/types/profile-data";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            LoginResponse,
            LoginRequest
        >({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),

        signup: builder.mutation<
            SignupResponse,
            SignupRequest
        >({
            query: (userInfo) => ({
                url: "/auth/signup",
                method: "POST",
                body: userInfo,
            }),
        }),

        // Get the currently authenticated user
        getMe: builder.query<
            AuthUser,
            void
        >({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),

            providesTags: [TAG_TYPES.AUTH],
        }),

        // Password change for the currently authenticated user
        changePassword: builder.mutation<
            { success: boolean },
            { current: string; next: string }
        >({
            query: (passwords) => ({
                url: "/auth/password",
                method: "PATCH",
                body: passwords,
            }),

            invalidatesTags: [TAG_TYPES.AUTH],
        }),

        // Get User Profile for the currently authenticated user
        getProfile: builder.query<
            ProfileData,
            void
        >({
            query: () => ({
                url: "/auth/profile",
                method: "GET",
            }),

            providesTags: [TAG_TYPES.AUTH],
        }),

        // Profile update for the currently authenticated user
        updateProfile: builder.mutation<
            ProfileData,
            Partial<ProfileData>
        >({
            query: (profileData) => ({
                url: "/auth/profile",
                method: "PATCH",
                body: profileData,
            }),

            invalidatesTags: [TAG_TYPES.AUTH],
        }),

        // Logout the currently authenticated user
        logout: builder.mutation<
            { success: boolean },
            void
        >({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),

            invalidatesTags: [TAG_TYPES.AUTH],
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useGetMeQuery,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = authApi;