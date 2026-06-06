import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAG_TYPES } from "./tag-types";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
        credentials: "include",
    }),
    tagTypes: Object.values(TAG_TYPES),
    endpoints: () => ({}),
});