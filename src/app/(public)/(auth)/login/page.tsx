import { createMetadata } from "@/lib/metadata";
import AuthLoginPage from "./components/AuthLoginPage";

export const metadata = createMetadata({
    title: "Sign In",
    description:
        "Sign in to your Bishuddho Academy account to access quality online courses in Bangladesh.",
    ogDescription: "Welcome back to Bishuddho Academy. Sign in to continue learning.",
    path: "/login",
    image: "/og-auth.png",
    keywords: [
        "Bishuddho Academy login",
        "sign in",
        "online learning Bangladesh",
        "e-learning account",
    ],
});

export default function Page() {
    return <AuthLoginPage />;
}