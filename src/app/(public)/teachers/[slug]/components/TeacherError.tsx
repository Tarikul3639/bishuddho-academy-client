"use client";

import Link from "next/link";
import { ChevronLeft, TriangleAlert } from "lucide-react";

export default function TeacherError() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f9fafb] px-4">
            <div className="max-w-md text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <TriangleAlert className="h-8 w-8 text-red-500" />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-slate-900">
                    Teacher Not Found
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    The teacher profile you're looking for doesn't exist or has
                    been removed.
                </p>

                <Link
                    href="/teachers"
                    className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Teachers
                </Link>
            </div>
        </div>
    );
}