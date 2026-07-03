"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { fadeUp, stagger } from "@/components/animations";

import TeacherForm from "../components/TeacherForm";

import { NormalizeError } from "@/redux/api/apiError";
import { useCreateTeacherMutation } from "@/redux/features/teachers/teachers.api";

export default function NewTeacherPage() {
    const router = useRouter();

    const [
        createTeacher,
        {
            isLoading,
            isError,
            error,
        },
    ] = useCreateTeacherMutation();

    const handleSubmit = async (
        formData: FormData,
    ) => {
        try {
            await createTeacher(
                formData,
            ).unwrap();

            toast.success(
                "Teacher created successfully.",
            );

            router.push(
                "/admin/teachers",
            );
        } catch (err) {
            toast.error(
                NormalizeError(err).message,
            );
        }
    };

    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-5xl space-y-6 p-6"
        >
            <motion.button
                variants={fadeUp}
                onClick={() =>
                    router.replace(
                        "/admin/teachers",
                    )
                }
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-gray-500 transition hover:text-primary"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Teachers
            </motion.button>

            <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-slate-900">
                    Add New Teacher
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Create a teacher profile for
                    your academy.
                </p>
            </motion.div>

            {isError && (
                <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-2 rounded-lg bg-red-50 p-4"
                >
                    <CircleAlert className="h-5 w-5 text-red-600" />

                    <p className="text-sm text-red-700">
                        {
                            NormalizeError(
                                error,
                            ).message
                        }
                    </p>
                </motion.div>
            )}

            <motion.div variants={fadeUp}>
                <TeacherForm
                    loading={
                        isLoading
                    }
                    onSubmit={
                        handleSubmit
                    }
                />
            </motion.div>
        </motion.div>
    );
}