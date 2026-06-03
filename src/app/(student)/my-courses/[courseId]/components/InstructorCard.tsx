"use client";

function InstructorCard({ name }: { name: string }) {
    return (
        <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-widest text-[#9ca3af]">
                Instructor
            </p>
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-lg font-bold text-white">
                    {name[0]}
                </div>
                <div>
                    <p className="text-[14px] font-bold text-[#0d1b3e]">{name}</p>
                    <p className="text-[12px] text-[#6b7280]">Lead Instructor</p>
                </div>
            </div>
        </div>
    );
}

export default InstructorCard;