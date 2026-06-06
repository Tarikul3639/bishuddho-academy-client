import { AuthUser } from "@/types/auth-user";

export interface LoginResponse {
    success: boolean;
    message?: string;
    accessToken: string;
    user: AuthUser;
}