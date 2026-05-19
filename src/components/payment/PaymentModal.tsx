"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ChevronRight, ShieldCheck, Loader2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = "bkash" | "nagad" | "sslcommerz" | null;
type Step = "select" | "processing" | "success" | "failed";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    price: number;
  };
}

// ─── Animation ────────────────────────────────────────────────────────────────

const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
};

// ─── Payment Method Config ────────────────────────────────────────────────────

const METHODS = [
  {
    id: "bkash" as const,
    name: "bKash",
    description: "Pay instantly with your bKash account",
    color: "#E2136E",
    bg: "#FDF2F8",
    icon: (
      <svg viewBox="0 0 60 60" className="h-8 w-8" fill="none">
        <rect width="60" height="60" rx="12" fill="#E2136E" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">bKash</text>
      </svg>
    ),
  },
  {
    id: "nagad" as const,
    name: "Nagad",
    description: "Pay instantly with your Nagad account",
    color: "#F7941D",
    bg: "#FFF8F0",
    icon: (
      <svg viewBox="0 0 60 60" className="h-8 w-8" fill="none">
        <rect width="60" height="60" rx="12" fill="#F7941D" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Nagad</text>
      </svg>
    ),
  },
  {
    id: "sslcommerz" as const,
    name: "Card / Net Banking",
    description: "Visa, Mastercard, DBBL, Dutch-Bangla & more",
    color: "#1a56db",
    bg: "#EFF6FF",
    icon: (
      <svg viewBox="0 0 60 60" className="h-8 w-8" fill="none">
        <rect width="60" height="60" rx="12" fill="#1a56db" />
        <rect x="10" y="20" width="40" height="26" rx="4" fill="white" fillOpacity="0.2" />
        <rect x="10" y="26" width="40" height="8" fill="white" fillOpacity="0.5" />
        <rect x="14" y="38" width="12" height="4" rx="1" fill="white" fillOpacity="0.8" />
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaymentModal({ isOpen, onClose, course }: Props) {
  const [selected, setSelected] = useState<PaymentMethod>(null);
  const [step,     setStep    ] = useState<Step>("select");

  const handleClose = () => {
    onClose();
    // reset after close animation
    setTimeout(() => { setSelected(null); setStep("select"); }, 300);
  };

  const handlePay = () => {
    if (!selected) return;

    if (selected === "sslcommerz") {
      // TODO: call API → get SSLCommerz redirect URL → redirect
      // const res = await api.post("/payments/initiate", { method: "sslcommerz", courseId })
      // window.location.href = res.data.redirectUrl
      setStep("processing");
      setTimeout(() => setStep("success"), 2000); // demo
    } else {
      // TODO: call API → initiate bKash/Nagad → redirect to gateway
      setStep("processing");
      setTimeout(() => setStep("success"), 2000); // demo
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* ── Header ────────────────────────────────────────────── */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="font-bold text-[#111827]">Complete Your Booking</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {course.title}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-1.5 text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* ── Body ──────────────────────────────────────────────── */}
              <div className="px-6 py-5">

                {/* Select step */}
                {step === "select" && (
                  <>
                    {/* Amount */}
                    <div className="mb-5 flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-3">
                      <span className="text-sm text-[#6b7280]">Total Amount</span>
                      <span className="text-lg font-bold text-[#111827]">
                        ৳{course.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Method list */}
                    <p className="mb-3 text-sm font-semibold text-[#374151]">
                      Select Payment Method
                    </p>

                    <div className="space-y-3">
                      {METHODS.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelected(method.id)}
                          className={`flex w-full items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                            selected === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border bg-white hover:border-gray-300"
                          }`}
                        >
                          {/* Icon */}
                          <div className="shrink-0">{method.icon}</div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#111827]">{method.name}</p>
                            <p className="mt-0.5 text-xs text-[#6b7280]">{method.description}</p>
                          </div>

                          {/* Radio */}
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            selected === method.id
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                          }`}>
                            {selected === method.id && (
                              <div className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Security note */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#6b7280]">
                      <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                      Secured by SSL encryption. Your payment info is safe.
                    </div>
                  </>
                )}

                {/* Processing step */}
                {step === "processing" && (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 font-semibold text-[#111827]">Processing Payment...</p>
                    <p className="mt-1 text-sm text-[#6b7280]">Please wait, do not close this window.</p>
                  </div>
                )}

                {/* Success step */}
                {step === "success" && (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="mt-4 text-lg font-bold text-[#111827]">Booking Confirmed!</p>
                    <p className="mt-1 text-sm text-[#6b7280]">
                      Your seat has been reserved. Check your email for details.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-[#1e40af]"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                )}

                {/* Failed step */}
                {step === "failed" && (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                      <X className="h-8 w-8 text-red-500" />
                    </div>
                    <p className="mt-4 text-lg font-bold text-[#111827]">Payment Failed</p>
                    <p className="mt-1 text-sm text-[#6b7280]">
                      Something went wrong. Please try again.
                    </p>
                    <button
                      onClick={() => setStep("select")}
                      className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-[#1e40af]"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>

              {/* ── Footer — only on select step ──────────────────────── */}
              {step === "select" && (
                <div className="border-t border-border px-6 py-4">
                  <button
                    onClick={handlePay}
                    disabled={!selected}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white transition-all ${
                      selected
                        ? "bg-[#059669] hover:bg-[#047857]"
                        : "cursor-not-allowed bg-gray-200 text-gray-400"
                    }`}
                  >
                    Proceed to Pay ৳{course.price.toLocaleString()}
                    {selected && <ChevronRight className="h-5 w-5" />}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}