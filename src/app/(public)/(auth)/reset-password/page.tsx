import { Suspense } from "react";
import { LoadingState } from "@/components/query-states";
import ResetPasswordPage from "./components/ResetPasswordPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
    title: "Reset Password",
    description:
        "Reset your Bishuddho Academy account password securely and regain access to your learning account.",
    ogDescription:
        "Reset your Bishuddho Academy password and continue your learning journey.",
    path: "/reset-password",
    image: "/og-auth.png",
    keywords: [
        "Bishuddho Academy reset password",
        "forgot password",
        "password recovery",
        "reset account password",
    ],
});

export default function Page() {
    return (
        <Suspense fallback={<LoadingState />}>
            <ResetPasswordPage />
        </Suspense>
    );
}