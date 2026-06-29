"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PaymentMethodCard from "./PaymentMethodCard";
import MobileBankingInfo from "./MobileBankingInfo";
import BankInfo from "./BankInfo";
import CashInfo from "./CashInfo";
import { METHODS, type PaymentMethod } from "./types";

import type { PublicCourseDetails } from "@/types/public-course-details";

interface PaymentStepsProps {
  selected: PaymentMethod;
  course: PublicCourseDetails;

  trxId: string;
  trxError: string;

  isSubmitting: boolean;
  requiresTrxId: boolean;

  onSelectMethod: (id: PaymentMethod) => void;
  setTrxId: (value: string) => void;
  setTrxError: (value: string) => void;
  handleSubmit: () => void;
}

export default function PaymentSteps({
  selected,
  course,
  trxId,
  trxError,
  isSubmitting,
  requiresTrxId,
  onSelectMethod,
  setTrxId,
  setTrxError,
  handleSubmit,
}: PaymentStepsProps) {
  const selectedMethod = METHODS.find((m) => m.id === selected);
  const paymentStatus = course.payment?.status;

  const canSubmit =
    !isSubmitting && (!course.isEnrolled || paymentStatus === "rejected");

  const showTrxInput =
    requiresTrxId && (!course.isEnrolled || paymentStatus === "rejected");

  const submitText = (() => {
    if (isSubmitting) return "Processing...";

    if (course.isEnrolled) {
      switch (paymentStatus) {
        case "pending":
          return "Payment Under Review";
        case "verified":
          return "Already Enrolled";
        case "rejected":
          return "Resubmit Payment";
        default:
          return "Already Enrolled";
      }
    }

    return selected === "cash"
      ? "Submit Booking Request"
      : "Confirm & Submit Payment";
  })();

  return (
    <div className="space-y-5">
      {/* Step 1 */}
      <motion.div>
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            1
          </span>
          <h2 className="text-sm font-semibold text-card-foreground">
            Choose Payment Method
          </h2>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={selected === method.id}
              onSelect={() => onSelectMethod(method.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Step 2 */}
      <AnimatePresence mode="wait">
        {selectedMethod && (
          <motion.div
            key={selectedMethod.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-5"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                2
              </span>
              <h2 className="text-sm font-semibold text-card-foreground">
                Payment Details
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {"number" in selectedMethod && selectedMethod.number ? (
                <MobileBankingInfo
                  method={selectedMethod}
                  price={course.price}
                />
              ) : "bankDetails" in selectedMethod ? (
                <BankInfo method={selectedMethod} />
              ) : (
                <CashInfo />
              )}
            </AnimatePresence>

            {/* Status Messages */}
            {course.isEnrolled && paymentStatus === "pending" && (
              <div className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                Your payment has been submitted and is currently under review.
                Please wait for an administrator to verify it.
              </div>
            )}

            {course.isEnrolled && paymentStatus === "verified" && (
              <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
                Your payment has already been verified. You are enrolled in this
                course.
              </div>
            )}

            {course.isEnrolled &&
              paymentStatus === "rejected" &&
              course.payment?.rejectionReason && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3">
                  <p className="text-sm font-semibold text-red-700">
                    Payment Rejected
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    {course.payment.rejectionReason}
                  </p>
                  <p className="mt-2 text-xs text-red-500">
                    Please submit your payment again using a valid transaction ID.
                  </p>
                </div>
              )}

            {/* Transaction Input */}
            {showTrxInput && (
              <div className="space-y-2 px-1">
                <p className="text-sm font-semibold text-card-foreground">
                  {selected === "bank_transfer"
                    ? "Enter Transaction / Reference Number"
                    : "Enter Transaction ID"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  After sending money, paste the Transaction ID you received via
                  SMS.
                </p>
                <Input
                  type="text"
                  value={trxId}
                  onChange={(e) => {
                    setTrxId(e.target.value);
                    setTrxError("");
                  }}
                  placeholder="e.g. 8N5A2K9XQ3"
                  className={`h-10 text-sm ${
                    trxError
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {trxError && (
                  <p className="text-xs font-medium text-destructive">
                    {trxError}
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full gap-2 cursor-pointer rounded-sm"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {submitText}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
              Your payment is secure and manually verified by our team.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}