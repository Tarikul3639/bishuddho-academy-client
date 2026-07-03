// types/teacher.ts

export interface TeacherSocialLinks {
    facebook?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

/* ─────────────────────────────
   Teacher List Item
───────────────────────────── */

export interface TeacherListItem {
    teacherId: string;
    fullName: string;
    slug: string;
    designation: string;
    shortBio?: string;
    profileImage: string;
    yearsOfExperience: number;
    skills: string[];
    socialLinks: TeacherSocialLinks;
    featured: boolean;
    isActive: boolean;
    displayOrder: number;
}

/* ─────────────────────────────
   Teacher Details
───────────────────────────── */

export interface TeacherDetails {
    teacherId: string;
    fullName: string;
    slug: string;
    designation: string;
    shortBio?: string;
    biography?: string;
    profileImage: string;
    email?: string;
    phone?: string;
    yearsOfExperience: number;
    skills: string[];
    socialLinks: TeacherSocialLinks;
    featured: boolean;
}

/* ─────────────────────────────
   Admin Teacher Details
───────────────────────────── */

export interface AdminTeacherDetails extends TeacherDetails {
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
}

/* ─────────────────────────────
   Pagination
───────────────────────────── */

export interface TeachersResponse {
    teachers: TeacherListItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

/* ─────────────────────────────
   Create / Update Payload
───────────────────────────── */

export interface CreateTeacherPayload {
    fullName: string;
    slug: string;
    designation: string;
    shortBio?: string;
    biography?: string;
    email?: string;
    phone?: string;
    yearsOfExperience?: number;
    skills?: string[];
    socialLinks?: TeacherSocialLinks;
    featured?: boolean;
    isActive?: boolean;
    displayOrder?: number;
}

export type UpdateTeacherPayload = Partial<CreateTeacherPayload>;