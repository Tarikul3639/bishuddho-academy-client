"use client";

function ProgressCard({
    current, total,
}: {
    current: number; total: number;
}) {
    const pct = Math.round((current / total) * 100);
    return (
        <div className="rounded-lg border border-[#c7d7fd] bg-[#eef3ff] p-5">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-widest text-[#1a56db]">
                Your Progress
            </p>
            <div className="my-3 flex items-end justify-between">
                <span className="text-3xl font-extrabold text-[#0d1b3e]">{pct}%</span>
                <span className="mb-1 text-[12px] font-semibold text-[#1a56db]">
                    Session {current} / {total}
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#c7d7fd]/50">
                <div
                    className="h-full rounded-full bg-linear-to-r from-[#1a56db] to-[#60a5fa] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default ProgressCard;