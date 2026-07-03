"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CircleAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { fadeUp, stagger } from "@/components/animations";
import TeacherForm from "../../components/TeacherForm";

import {
  useGetAdminTeacherQuery,
  useUpdateTeacherMutation,
} from "@/redux/features/teachers/teachers.api";
import { NormalizeError } from "@/redux/api/apiError";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditTeacherPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: teacher,
    isLoading: isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useGetAdminTeacherQuery(id);

  const [updateTeacher, { isLoading, isError: isUpdateError, error: updateError }] =
    useUpdateTeacherMutation();

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateTeacher({
        teacherId: id,
        formData,
      }).unwrap();

      toast.success("Teacher updated successfully.");
      router.push("/admin/teachers");
    } catch (err) {
      toast.error(NormalizeError(err).message);
    }
  };

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-gray-500">Loading teacher...</p>
        </div>
      </div>
    );
  }

  if (isFetchError || !teacher) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <button
          onClick={() => router.replace("/admin/teachers")}
          className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-gray-500 transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teachers
        </button>

        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4">
          <CircleAlert className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-700">
            {NormalizeError(fetchError).message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-6 p-6"
    >
      <motion.button
        variants={fadeUp}
        onClick={() => router.replace("/admin/teachers")}
        className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-gray-500 transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Teachers
      </motion.button>

      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-slate-900">Edit Teacher</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update information for{" "}
          <span className="font-semibold">{teacher.fullName}</span>.
        </p>
      </motion.div>

      {isUpdateError && (
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 rounded-lg bg-red-50 p-4"
        >
          <CircleAlert className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-700">
            {NormalizeError(updateError).message}
          </p>
        </motion.div>
      )}

      <motion.div variants={fadeUp}>
        <TeacherForm
          initialData={teacher}
          loading={isLoading}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </motion.div>
  );
}