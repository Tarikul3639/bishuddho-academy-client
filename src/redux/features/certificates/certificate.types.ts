// redux/features/certificates/certificate.types.ts

/* ---------------------------------------
   Admin Course Certificates
--------------------------------------- */

export interface StudentCertificate {
    certificateId: string;
    certificateNo: string;
    pdfUrl: string;
    issuedAt: string;
}

export interface CourseCertificateStudent {
    enrollmentId: string;
    studentId: string;
    studentName: string;
    studentEmail: string;

    certificate: StudentCertificate | null;
}

export interface CourseCertificateStudentsResponse {
    students: CourseCertificateStudent[];
}

/* ---------------------------------------
   Student Certificates
--------------------------------------- */

export interface Certificate {
    certificateId: string;
    enrollmentId: string;
    studentId: string;
    studentName: string;
    studentEmail: string;

    courseId: string;
    courseTitle: string;

    certificateNo: string;
    pdfUrl: string;

    uploadedBy: string;
    issuedAt: string;
}

export interface CertificateResponse {
    certificate: Certificate;
}

export interface CertificateListResponse {
    certificates: Certificate[];
}

/* ---------------------------------------
   Requests
--------------------------------------- */

export interface UploadCertificateRequest {
    enrollmentId: string;
    certificateNo: string;
    pdf: File;
}

export interface DeleteCertificateResponse {
    success: boolean;
    message: string;
}