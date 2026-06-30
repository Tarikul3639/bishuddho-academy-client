import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAG_TYPES } from "./tag-types";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
    baseUrl:
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}` ||
        "http://localhost:5000/api/v1",
    credentials: "include",
});

const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    // If API returns 403 with "suspended" message, user is blocked
    if (result.error && result.error.status === 403) {
        const errorData = result.error.data as { message?: string } | undefined;
        if (errorData?.message?.toLowerCase().includes("suspended")) {
            // Dispatch an action to mark user as blocked
            if (
                typeof window !== "undefined" &&
                !window.location.pathname.includes("/blocked")
            ) {
                window.location.href = "/blocked";
            }
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithAuth,
    tagTypes: Object.values(TAG_TYPES),
    endpoints: () => ({}),
});
