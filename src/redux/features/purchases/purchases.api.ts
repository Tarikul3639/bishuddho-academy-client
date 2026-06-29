import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

interface CreatePurchaseRequest {
    courseId: string;
    method: string;
    trxId?: string;
}

interface CreatePurchaseResponse {
    success: boolean;
    message: string;
    enrollment: {
        id: string;
        courseId: string;
        status: string;
        payment: {
            method: string;
            trxId?: string;
            amount: number;
            status: string;
        };
    };
}

export const purchasesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPurchase: builder.mutation<CreatePurchaseResponse, CreatePurchaseRequest>({
            query: (body) => ({
                url: "/purchases",
                method: "POST",
                body,
            }),
            invalidatesTags: [
                { type: TAG_TYPES.ENROLLMENTS, id: "LIST" },
                { type: TAG_TYPES.ENROLLMENTS },
            ],
        }),
    }),
});

export const { useCreatePurchaseMutation } = purchasesApi;
