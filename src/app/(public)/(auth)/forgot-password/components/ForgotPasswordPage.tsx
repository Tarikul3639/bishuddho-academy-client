"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import Logo from "@/components/ui/Logo";

import { fadeUp, stagger } from "@/components/animations";

import { ForgotEmailStep } from "./ForgotEmailStep";
import { ForgotDoneStep } from "./ForgotDoneStep";
import { StepMap } from "./StepMap";

import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";

type Step = "email" | "done";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await forgotPassword({ email }).unwrap();
      toast.success(result.message);
      setStep("done");
    } catch (error: any) {
      setError(error?.data?.message ?? "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"
    >
      <motion.div
        variants={fadeUp}
        className="flex w-full max-w-lg flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <Logo />
        </motion.div>

        <StepMap step={step} />

        <motion.div layoutId="auth-form" className="w-full">
          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <ForgotEmailStep
                  email={email}
                  setEmail={setEmail}
                  loading={loading}
                  error={error}
                  onSend={handleEmailSubmit}
                />
              </motion.div>
            )}

            {step === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <ForgotDoneStep
                  email={email}
                  onBack={() => setStep("email")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}