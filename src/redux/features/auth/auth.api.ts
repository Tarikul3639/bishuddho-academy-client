import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

import type { LoginRequest } from "@/types/login-request";
import type { LoginResponse } from "@/types/login-response";
import type { SignupRequest } from "@/types/signup-request";
import type { SignupResponse } from "@/types/signup-response";
import type { AuthUser } from "@/types/auth-user";

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

        forgotPassword: builder.mutation<
            {
                success: boolean;
                message: string;
            },
            {
                email: string;
            }
        >({
            query: (body) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation<
            {
                success: boolean;
                message: string;
            },
            {
                token: string;
                password: string;
                confirmPassword: string;
            }
        >({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
            }),
        }),

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
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetMeQuery,
    useLogoutMutation,
} = authApi;