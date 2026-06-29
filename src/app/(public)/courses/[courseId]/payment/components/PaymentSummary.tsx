"use client";

import {
    ArrowDown,
    BadgeCheck,
    Sparkles,
    TrendingDown,
} from "lucide-react";
import { TakaSign } from "@/components/icons/TakaSign";

interface PaymentSummaryProps {
    price: number;
    originalPrice: number;
    discount: number;
    bookedSeats: number;
    totalSeats: number;
    daysLeft: number;
}

export default function PaymentSummary({
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
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-background to-background shadow-sm relative overflow-hidden">
                {/* Subtle accent glow */}
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-primary/5 blur-2xl" />

                <div className="relative border-b border-border p-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold text-card-foreground">
                            Order Summary
                        </h3>
                    </div>
                </div>

                <div className="relative space-y-3 p-4">
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
                                <span className="flex items-center gap-1 text-green-600">
                                    <TrendingDown className="h-3 w-3" />
                                    Discount ({discount}%)
                                </span>
                                <span className="font-medium text-green-600">
                                    -৳{(originalPrice - price).toLocaleString()}
                                </span>
                            </div>
                        )}
                        <div className="h-px bg-border" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-card-foreground">Total</span>
                            <div className="flex items-center gap-0.5 rounded bg-primary/10 px-2 py-1">
                                <TakaSign className="h-3.5 w-3.5 text-primary" />
                                <span className="text-lg font-bold text-primary">
                                    {price.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Course meta */}
                    <div className="h-px bg-border" />
                    <div className="space-y-1.5 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-3 w-3 text-blue-500" />
                            <span>{bookedSeats}/{totalSeats} seats booked</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ArrowDown className="h-3 w-3 text-orange-500" />
                            <span>{daysLeft} days left at this price</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Help text */}
            <div className="rounded-xl border border-border bg-muted/50 p-3">
                <p className="text-[11px] font-medium text-card-foreground">Need help?</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                    If you face any issues with payment, contact us at the academy
                    or send a message via the contact page.
                </p>
            </div>
        </div>
    );
}
