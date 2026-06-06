"use client";
import { Calendar, Users, MapPin } from "lucide-react";

function BatchInfoCard({
    startDate, bookedSeats, totalSeats,
}: {
    startDate: string; bookedSeats: number; totalSeats: number;
}) {
    const seatsLeft = totalSeats - bookedSeats;
    const seatPct   = Math.round((bookedSeats / totalSeats) * 100);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb] p-5">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-widest text-[#92400e]">
                Batch Info
            </p>
            <div className="flex flex-col gap-2 text-[13px] text-[#b45309]">
                <span className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    Started {formatDate(startDate)}
                </span>
                <span className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    {bookedSeats} / {totalSeats} seats filled
                </span>
                <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {seatsLeft} seats remaining
                </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#fde68a]/50">
                <div
                    className="h-full rounded-full bg-linear-to-r from-[#f59e0b] to-[#ef4444]"
                    style={{ width: `${seatPct}%` }}
                />
            </div>
        </div>
    );
}

export default BatchInfoCard;