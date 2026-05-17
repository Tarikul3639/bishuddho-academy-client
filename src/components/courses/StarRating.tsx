"use client";

import { Star } from "lucide-react";

export default function StarRating({ rating, count }: { rating: number; count: number }) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-amber-800">{rating}</span>
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                            }`}
                    />
                ))}
            </div>
            <span className="text-xs text-[#6b7280]">({count})</span>
        </div>
    );
}