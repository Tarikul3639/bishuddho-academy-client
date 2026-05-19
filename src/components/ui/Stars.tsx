"use client";

import { Star } from "lucide-react";

interface StarsProps {
    rating: number;
    maxRating?: number; // Total number of stars (default is 5)
    size?: number | string; // Controls star size (Tailwind class or custom string)
    activeColor?: string; // Color for filled/active stars
    inactiveColor?: string; // Color for empty/inactive stars
    className?: string; // Optional wrapper classes for styling
}

export const Stars = ({
    rating,
    maxRating = 5,
    size = "h-4 w-4",
    activeColor = "fill-yellow-400 text-yellow-400",
    inactiveColor = "fill-none text-gray-300",
    className = "",
}: StarsProps) => {
    // Generate an array based on maxRating for rendering stars
    const starArray = Array.from({ length: maxRating }, (_, i) => i + 1);

    return (
        <div className={`flex items-center gap-0.5 ${className}`}>
            {starArray.map((i) => {
                // Determine whether the current star should be active
                const isActive = i <= Math.floor(rating);

                return (
                    <Star
                        key={i}
                        className={`${typeof size === "string"
                                ? size
                                : `h-${size} w-${size}`
                            } ${isActive ? activeColor : inactiveColor}`}
                    />
                );
            })}
        </div>
    );
}