import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiError {
    status: number | string;
    message: string;
}

export const NormalizeError = (
    error: FetchBaseQueryError | any
): ApiError => {
    if ("status" in error) {
        return {
            status: error.status,
            message:
                (error.data as any)?.message ||
                "Something went wrong",
        };
    }

    return {
        status: "CUSTOM_ERROR",
        message: "Unknown error",
    };
};