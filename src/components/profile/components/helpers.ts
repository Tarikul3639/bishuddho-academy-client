import { FormState, FormErrors } from "@/types/profile-data";

/**
 * Validates the form data. 
 * Supports Partial<FormState> to allow partial updates.
 */
export function validate(form: Partial<FormState>): FormErrors {
    const errors: FormErrors = {};

    // Helper: Validates Bangladeshi Phone Number format
    const isBangladeshiPhone = (phone: string) => /^01\d{9}$/.test(phone);

    // 1. Name Validation
    if (form.name !== undefined && !form.name.trim()) {
        errors.name = "Full name is required.";
    }

    // 2. Primary Phone Validation
    if (form.phone !== undefined) {
        if (!form.phone.trim()) {
            errors.phone = "Phone number is required.";
        } else if (!isBangladeshiPhone(form.phone)) {
            errors.phone = "Enter a valid Bangladeshi phone number.";
        }
    }

    // 3. Alternative Phone Validation
    if (form.alternativePhone && !isBangladeshiPhone(form.alternativePhone)) {
        errors.alternativePhone = "Enter a valid Bangladeshi phone number.";
    }

    // 4. Guardian Phone Validation
    if (form.guardianPhone && !isBangladeshiPhone(form.guardianPhone)) {
        errors.guardianPhone = "Enter a valid Bangladeshi phone number.";
    }

    // 5. Emergency Contact Number Validation
    if (form.emergencyContactNumber && !isBangladeshiPhone(form.emergencyContactNumber)) {
        errors.emergencyContactNumber = "Enter a valid Bangladeshi phone number.";
    }

    return errors;
}