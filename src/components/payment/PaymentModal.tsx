// components/PaymentModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Sub-components
import ModalHeader from "./ModalHeader";
import SelectStep from "./SelectStep";
import TrxIdStep from "./TrxIdStep";
import ProcessingStep from "./ProcessingStep";
import SuccessStep from "./SuccessStep";
import FailedStep from "./FailedStep";
import ModalFooter from "./ModalFooter";

// Types and Config
import {
    type PaymentMethod,
    type Step,
    type Course,
    METHODS,
} from "./types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    course: Course;
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const overlayV: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
};
const modalV: Variants = {
    hidden:  { opacity: 0, scale: 0.96, y: 16 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
    exit:    { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

export default function PaymentModal({ isOpen, onClose, course }: Props) {
    const [selected, setSelected] = useState<PaymentMethod>(null);
    const [step,     setStep    ] = useState<Step>("select");
    const [trxId,    setTrxId   ] = useState("");
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [error,    setError   ] = useState("");

    const selectedMethod = METHODS.find((m) => m.id === selected);

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setSelected(null); setStep("select");
            setTrxId(""); setError("");
        }, 300);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    const handleNext = () => {
        if (!selected) return;
        if (selected === "cash") { setStep("processing"); setTimeout(() => setStep("success"), 1500); }
        else setStep("trxid");
    };

    const handleSubmitTrx = () => {
        if (!trxId.trim())          { setError("Please enter your Transaction ID."); return; }
        if (trxId.trim().length < 6){ setError("Transaction ID seems too short.");   return; }
        setError("");
        setStep("processing");
        // TODO: POST /payments/verify { method, trxId, courseId }
        setTimeout(() => setStep("success"), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        variants={overlayV} initial="hidden" animate="visible" exit="hidden"
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            variants={modalV} initial="hidden" animate="visible" exit="exit"
                            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <ModalHeader step={step} courseTitle={course.title} onClose={handleClose} />

                            <AnimatePresence mode="wait">
                                {step === "select" && (
                                    <SelectStep
                                        price={course.price}
                                        selected={selected}
                                        onSelect={setSelected}
                                    />
                                )}
                                {step === "trxid" && selectedMethod && selectedMethod.number && (
                                    <TrxIdStep
                                        method={selectedMethod as typeof METHODS[number] & { number: string }}
                                        price={course.price}
                                        trxId={trxId}
                                        error={error}
                                        copiedText={copiedText}
                                        onTrxChange={(v) => { setTrxId(v); setError(""); }}
                                        onPhoneCopy={handleCopy}
                                    />
                                )}
                                {step === "processing" && <ProcessingStep />}
                                {step === "success"    && <SuccessStep onClose={handleClose} />}
                                {step === "failed"     && <FailedStep  onRetry={() => setStep("select")} />}
                            </AnimatePresence>

                            <ModalFooter
                                step={step}
                                selected={selected}
                                onNext={handleNext}
                                onSubmit={handleSubmitTrx}
                                onBack={() => setStep("select")}
                            />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}