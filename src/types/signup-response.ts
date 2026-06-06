export interface SignupResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        studentId?: string;
    };
}