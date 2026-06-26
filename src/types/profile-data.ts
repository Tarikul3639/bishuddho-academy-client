// ─── PROFILE DATA (API response — only editable profile fields) ───────────────

export interface ProfileData {
    // Personal Info
    name: string;
    phone?: string;
    alternativePhone?: string;
    dateOfBirth?: string;
    gender?: string;
    bloodGroup?: string;
    religion?: string;
    nationality?: string;
    // Identity Documents
    nidNumber?: string;
    birthRegistrationNumber?: string;
    passportNumber?: string;
    // Family & Guardian
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianOccupation?: string;
    // Emergency Contact
    emergencyContactName?: string;
    emergencyContactNumber?: string;
    relationship?: string;
    // Address
    presentAddress?: string;
    permanentAddress?: string;
    // Avatar
    avatarUrl?: string;
}

// ─── API REQUEST BODY ─────────────────────────────────────────────────────────

export type UpdateProfilePayload = Partial<ProfileData>;

// ─── FORM STATE ───────────────────────────────────────────────────────────────

export interface FormState {
    // Personal Info
    name: string;
    phone: string;
    alternativePhone: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    religion: string;
    nationality: string;
    // Identity Documents
    nidNumber: string;
    birthRegistrationNumber: string;
    passportNumber: string;
    // Family & Guardian
    fatherName: string;
    motherName: string;
    guardianName: string;
    guardianPhone: string;
    guardianOccupation: string;
    // Emergency Contact
    emergencyContactName: string;
    emergencyContactNumber: string;
    relationship: string;
    // Address
    presentAddress: string;
    permanentAddress: string;
    // Avatar
    avatarUrl: string;
}

export type FormErrors = Partial<Record<keyof FormState, string>>;