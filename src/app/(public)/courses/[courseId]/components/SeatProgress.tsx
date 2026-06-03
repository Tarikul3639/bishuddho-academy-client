"use client";

interface SeatProgressProps {
    bookedSeats: number;
    totalSeats: number;
}

export function SeatProgress({ bookedSeats, totalSeats }: SeatProgressProps) {
    const pct = Math.round((bookedSeats / totalSeats) * 100);
    return (
        <div className="mb-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-[#374151] capitalize">
                    {totalSeats - bookedSeats} seats remaining
                </span>
                <span className="text-[#6b7280] capitalize">{bookedSeats}/{totalSeats} booked</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}