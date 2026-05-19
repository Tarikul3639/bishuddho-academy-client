import { createMetadata } from "@/lib/metadata";
import AuthRegisterPage from "./components/AuthRegisterPage";

export const metadata = createMetadata({
  title: "Create Account",
  description:
    "Create your Bishuddho Academy account and start learning online courses in Bangladesh.",
  ogDescription:
    "Join Bishuddho Academy — create your account and start learning today.",
  path: "/register",
  image: "/og-auth.png",
  keywords: [
    "Bishuddho Academy register",
    "create account",
    "online learning Bangladesh",
    "e-learning signup",
  ],
});

export default function Page() {
  return <AuthRegisterPage />;
}