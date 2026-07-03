import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "@/redux/api/tag-types";

import type {
  CertificateListResponse,
  CertificateResponse,
  CourseCertificateStudentsResponse,
  UploadCertificateRequest,
} from "./certificate.types";

export const certificatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================================
       Admin
    ========================================= */

    getCourseCertificates: builder.query<CourseCertificateStudentsResponse, string>({
      query: (courseId) => ({
        url: `/admin/certificates/course/${courseId}`,
        method: "GET",
      }),
      providesTags: [
        {
          type: TAG_TYPES.CERTIFICATES,
          id: "LIST",
        },
      ],
    }),

    uploadCertificate: builder.mutation<CertificateResponse, UploadCertificateRequest>({
      query: ({ enrollmentId, certificateNo, pdf }) => {
        const formData = new FormData();
        formData.append("enrollmentId", enrollmentId);
        formData.append("certificateNo", certificateNo);
        formData.append("pdf", pdf);

        return {
          url: "/admin/certificates",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [
        {
          type: TAG_TYPES.CERTIFICATES,
          id: "LIST",
        },
      ],
    }),

    deleteCertificate: builder.mutation<{ success: boolean; message: string }, string>({
      query: (certificateId) => ({
        url: `/admin/certificates/${certificateId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TAG_TYPES.CERTIFICATES,
          id: "LIST",
        },
      ],
    }),

    /* =========================================
       Student
    ========================================= */

    getMyCertificates: builder.query<CertificateListResponse, void>({
      query: () => ({
        url: "/me/certificates",
        method: "GET",
      }),
      providesTags: [
        {
          type: TAG_TYPES.CERTIFICATES,
          id: "LIST",
        },
      ],
    }),

    viewCertificate: builder.mutation<Blob, string>({
      query: (certificateId) => ({
        url: `/certificates/${certificateId}/view`,
        method: "GET",
        responseHandler: async (response) => response.blob(),
      }),
    }),

    downloadCertificate: builder.mutation<Blob, string>({
      query: (certificateId) => ({
        url: `/certificates/${certificateId}/download`,
        method: "GET",
        responseHandler: async (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetCourseCertificatesQuery,
  useUploadCertificateMutation,
  useDeleteCertificateMutation,
  useGetMyCertificatesQuery,
  useViewCertificateMutation,
  useDownloadCertificateMutation,
} = certificatesApi;