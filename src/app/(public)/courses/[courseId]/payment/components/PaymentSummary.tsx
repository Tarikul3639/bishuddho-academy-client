"use client";

import Image from "next/image";
import { TakaSign } from "@/components/icons/TakaSign";

interface PaymentSummaryProps {
    title: string;
    instructor: string;
    thumbnailUrl: string;
    price: number;
    originalPrice: number;
    discount: number;
    bookedSeats: number;
    totalSeats: number;
    daysLeft: number;
}

export default function PaymentSummary({
    title,
    instructor,
    thumbnailUrl,
    price,
    originalPrice,
    discount,
    bookedSeats,
    totalSeats,
    daysLeft,
}: PaymentSummaryProps) {
    return (
        <div className="space-y-4">
            {/* Summary Card */}
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-5">
                    <h3 className="font-semibold text-card-foreground">
                        Order Summary
                    </h3>
                </div>

                <div className="space-y-4 p-5">
                    {/* Price breakdown */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Course Fee</span>
                            <span className="text-card-foreground">
                                ৳{originalPrice.toLocaleString()}
                            </span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-green-600">
                                    Discount ({discount}%)
                                </span>
                                <span className="text-green-600">
                                    -৳{(originalPrice - price).toLocaleString()}
                                </span>
                            </div>
                        )}
                        <div className="h-px bg-border" />
                        <div className="flex justify-between">
                            <span className="font-semibold text-card-foreground">Total</span>
                            <div className="flex items-center gap-0.5">
                                <TakaSign className="h-4 w-4 text-primary" />
                                <span className="text-xl font-bold text-primary">
                                    {price.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Course meta */}
                    <div className="h-px bg-border" />
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            {bookedSeats}/{totalSeats} seats booked
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            {daysLeft} days left at this price
                        </div>
                    </div>
                </div>
            </div>

            {/* Help text */}
            <div className="rounded-xl border border-border bg-muted/50 p-4">
                <p className="text-xs font-medium text-card-foreground">Need help?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    If you face any issues with payment, contact us at the academy
                    or send a message via the contact page.
                </p>
            </div>
        </div>
    );
}
