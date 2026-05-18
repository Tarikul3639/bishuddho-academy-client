import { createMetadata } from "@/lib/metadata";
import AuthPage from "./components/AuthPage";

export const metadata = createMetadata({
    title: "Sign In or Register",
    description:
        "Sign in to your Bishuddho Academy account or create a new one to access quality online courses in Bangladesh.",
    ogDescription:
        "Join Bishuddho Academy — sign in or register to start learning today.",
    path: "/auth",
    image: "/og-auth.png",
    keywords: [
        "Bishuddho Academy login",
        "sign in",
        "register",
        "online learning Bangladesh",
        "e-learning account",
    ],
});

export default function Page() {
    return <AuthPage />;
}