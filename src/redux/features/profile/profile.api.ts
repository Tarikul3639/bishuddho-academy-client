import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

import type { ProfileData } from "@/types/profile-data";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<
            ProfileData,
            void
        >({
            query: () => ({
                url: "/profile",
                method: "GET",
            }),

            providesTags: [
                TAG_TYPES.PROFILE,
            ],
        }),

        updateProfile: builder.mutation<
            ProfileData,
            Partial<ProfileData>
        >({
            query: (profileData) => ({
                url: "/profile",
                method: "PATCH",
                body: profileData,
            }),

            invalidatesTags: [
                TAG_TYPES.PROFILE,
            ],
        }),

        changePassword: builder.mutation<
            { success: boolean },
            {
                current: string;
                next: string;
            }
        >({
            query: (passwords) => ({
                url: "/profile/password",
                method: "PATCH",
                body: passwords,
            }),

            invalidatesTags: [
                TAG_TYPES.PROFILE,
            ],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
} = profileApi;