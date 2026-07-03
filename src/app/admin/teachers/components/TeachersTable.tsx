"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { stagger } from "@/components/animations";
import type { TeacherListItem } from "@/types/teacher";
import TeacherRow from "./table/TeacherRow";
import DeleteTeacherModal from "./table/DeleteTeacherModal";

import {
    useDeleteTeacherMutation,
    useFeatureTeacherMutation,
    useChangeTeacherStatusMutation,
    useReorderTeachersMutation,
} from "@/redux/features/teachers/teachers.api";

interface TeachersTableProps {
    data: TeacherListItem[];
    allTeachers: TeacherListItem[];
}

export default function TeachersTable({
    data,
    allTeachers,
}: TeachersTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();
    const [featureTeacher] = useFeatureTeacherMutation();
    const [changeStatus] = useChangeTeacherStatusMutation();
    const [reorderTeachers] = useReorderTeachersMutation();

    if (!data.length) {
        return (
            <div className="rounded-lg border border-[#e5e7eb] bg-white py-16 text-center">
                <p className="text-sm font-semibold text-gray-600">No teachers found</p>
                <p className="mt-1 text-xs text-gray-400">Try adjusting your filters.</p>
            </div>
        );
    }

    const handleFeatureToggle = async (teacherId: string, current: boolean) => {
        try {
            await featureTeacher({
                teacherId,
                featured: !current,
            }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusToggle = async (teacherId: string, current: boolean) => {
        try {
            await changeStatus({
                teacherId,
                isActive: !current,
            }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await deleteTeacher(deleteId).unwrap();
            setDeleteId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleMove = async (
        index: number,
        direction: "up" | "down",
    ) => {
        const target =
            direction === "up"
                ? index - 1
                : index + 1;

        if (
            target < 0 ||
            target >= allTeachers.length
        ) {
            return;
        }

        const sorted = [...allTeachers]
            .sort(
                (a, b) =>
                    a.displayOrder -
                    b.displayOrder,
            )
            .map((teacher) => ({
                teacherId: teacher.teacherId,
                displayOrder: teacher.displayOrder,
            }));

        const temp =
            sorted[index].displayOrder;

        sorted[index].displayOrder =
            sorted[target].displayOrder;

        sorted[target].displayOrder =
            temp;

        try {
            await reorderTeachers({
                items: sorted,
            }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                                    Teacher
                                </th>
                                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                                    Status
                                </th>
                                <th className="w-24 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                                    Order
                                </th>
                                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-[#9ca3af]">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <motion.tbody
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.map((teacher) => {
                                const index = allTeachers.findIndex(
                                    (item) => item.teacherId === teacher.teacherId
                                );

                                return (
                                    <TeacherRow
                                        key={teacher.teacherId}
                                        teacher={teacher}
                                        index={index}
                                        total={allTeachers.length}
                                        onMove={handleMove}
                                        onFeatureToggle={handleFeatureToggle}
                                        onStatusToggle={handleStatusToggle}
                                        onDelete={setDeleteId}
                                    />
                                );
                            })}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            <DeleteTeacherModal
                open={!!deleteId}
                loading={isDeleting}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
            />
        </>
    );
}