"use client";

export default function TeacherLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f9fafb]">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />

                <div className="space-y-2 text-center">
                    <h3 className="text-base font-semibold text-slate-800">
                        Loading Teacher Profile
                    </h3>

                    <p className="text-sm text-gray-500">
                        Please wait a moment...
                    </p>
                </div>
            </div>
        </div>
    );
}