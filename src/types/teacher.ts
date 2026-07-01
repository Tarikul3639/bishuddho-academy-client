// types/teacher.ts

export interface TeacherSocialLinks {
    facebook?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    googleScholar?: string;
    researchGate?: string;
    youtube?: string;
}

export interface TeacherEducationHistory {
    degree: string;
    university: string;
    field?: string;
    year?: number;
    grade?: string;
}

export interface TeacherPublication {
    title: string;
    journal?: string;
    year?: number;
    url?: string;
}

export interface TeacherSeo {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
}

/* ─── List Item (used in cards, table) ─── */
export interface TeacherListItem {
    teacherId: string;
    fullName: string;
    slug: string;
    designation: string;
    department?: string;
    shortBio?: string;
    profileImage: string;
    expertise: string[];
    featured: boolean;
    isActive: boolean;
    isFounder: boolean;
    isLeadInstructor: boolean;
    displayOrder: number;
    showOnHomepage: boolean;
    yearsOfExperience: number;
    socialLinks: TeacherSocialLinks;
}

/* ─── Full Details (used in detail page) ─── */
export interface TeacherDetails {
    teacherId: string;
    fullName: string;
    slug: string;
    designation: string;
    department?: string;
    shortBio?: string;
    biography?: string;
    profileImage: string;
    coverImage?: string;
    email?: string;
    phone?: string;
    officeAddress?: string;
    officeHours?: string;
    academicRank?: string;
    educationHistory: TeacherEducationHistory[];
    specialization: string[];
    researchInterests: string[];
    yearsOfExperience: number;
    achievements: string[];
    awards: string[];
    certifications: string[];
    publications: TeacherPublication[];
    memberships: string[];
    currentCourses: string[];
    previousCourses: string[];
    expertise: string[];
    socialLinks?: TeacherSocialLinks;
    featured: boolean;
    isFounder: boolean;
    isLeadInstructor: boolean;
    seo?: TeacherSeo;
}

/* ─── Admin Details (with all fields) ─── */
export interface AdminTeacherDetails extends TeacherDetails {
    email?: string;
    phone?: string;
    officeAddress?: string;
    officeHours?: string;
    instructorPriority: number;
    isActive: boolean;
    displayOrder: number;
    showOnHomepage: boolean;
    showContact: boolean;
    showSocialLinks: boolean;
    createdAt: string;
    updatedAt: string;
}

/* ─── Pagination ─── */
export interface TeachersResponse {
    teachers: TeacherListItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

/* ─── Create/Update payload ─── */
export interface CreateTeacherPayload {
    fullName: string;
    slug: string;
    designation: string;
    department?: string;
    shortBio?: string;
    biography?: string;
    email?: string;
    phone?: string;
    officeAddress?: string;
    officeHours?: string;
    academicRank?: string;
    educationHistory?: TeacherEducationHistory[];
    specialization?: string[];
    researchInterests?: string[];
    yearsOfExperience?: number;
    achievements?: string[];
    awards?: string[];
    certifications?: string[];
    publications?: TeacherPublication[];
    memberships?: string[];
    currentCourses?: string[];
    previousCourses?: string[];
    expertise?: string[];
    instructorPriority?: number;
    socialLinks?: TeacherSocialLinks;
    featured?: boolean;
    isActive?: boolean;
    displayOrder?: number;
    isFounder?: boolean;
    isLeadInstructor?: boolean;
    showOnHomepage?: boolean;
    showContact?: boolean;
    showSocialLinks?: boolean;
    seo?: TeacherSeo;
}
