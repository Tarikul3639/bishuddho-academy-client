import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

export interface AdminPurchase {
    id: string;
    courseId: string;
    courseTitle: string;
    courseThumbnail: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    method: string;
    trxId: string | null;
    amount: number;
    paymentStatus: string;
    enrollmentStatus: string;
    paidAt: string;
    createdAt: string;
    updatedAt: string;
}

export const adminPurchasesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminPurchases: builder.query<AdminPurchase[], { status?: string; method?: string }>({
            query: (params) => ({
                url: "/purchases/admin",
                method: "GET",
                params,
            }),
            providesTags: [{ type: TAG_TYPES.ENROLLMENTS, id: "LIST" }],
        }),
        updatePurchaseStatus: builder.mutation<
            { success: boolean },
            { id: string; status: string; rejectionReason?: string }
        >({
            query: ({ id, status, rejectionReason }) => ({
                url: `/purchases/admin/${id}/status`,
                method: "PATCH",
                body: { status, rejectionReason },
            }),
            invalidatesTags: [{ type: TAG_TYPES.ENROLLMENTS, id: "LIST" }],
        }),
    }),
});

export const { useGetAdminPurchasesQuery, useUpdatePurchaseStatusMutation } = adminPurchasesApi;
