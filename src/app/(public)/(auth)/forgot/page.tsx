import { createMetadata } from "@/lib/metadata";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

export const metadata = createMetadata({
  title: "Forgot Password",
  description:
    "Reset your Bishuddho Academy account password securely in a few steps.",
  ogDescription: "Reset your Bishuddho Academy password securely.",
  path: "/forgot",
  image: "/og-auth.png",
  keywords: [
    "forgot password",
    "reset password",
    "Bishuddho Academy",
    "email code verification",
  ],
});

export default function Page() {
  return <ForgotPasswordPage />;
}