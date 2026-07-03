"use client";

import Link from "next/link";
import { PenLine, Trash2 } from "lucide-react";

interface TeacherActionsProps {
    teacherId: string;
    onDelete: (
        teacherId: string,
    ) => void;
}

export default function TeacherActions({
    teacherId,
    onDelete,
}: TeacherActionsProps) {
    return (
        <div className="flex items-center justify-end gap-2">

            <Link
                href={`/admin/teachers/edit/${teacherId}`}
            >
                <button
                    type="button"
                    className="rounded-sm p-1.5 text-primary transition hover:bg-primary/10 cursor-pointer"
                >
                    <PenLine className="h-4 w-4" />
                </button>
            </Link>

            <button
                type="button"
                onClick={() =>
                    onDelete(teacherId)
                }
                className="rounded-sm p-1.5 text-red-600 transition hover:bg-red-50 cursor-pointer"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}