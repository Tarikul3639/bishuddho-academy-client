"use client";

import { CheckCircle } from "lucide-react";

interface CourseDescriptionProps {
    tagline: string;
    description: string;
    includes: string[];
}

export function CourseDescription({ tagline, description, includes }: CourseDescriptionProps) {
    return (
        <div>
            <h2 className="mb-5 text-xl font-bold text-[#111827]">Course Description</h2>
            <h3 className="mb-3 text-lg font-bold text-[#111827]">{tagline}</h3>
            <p className="mb-4 leading-relaxed text-[#6b7280]">{description}</p>
            <p className="mb-5 leading-relaxed text-[#6b7280]">
                By the end of this program, you will be able to build complete web applications
                and confidently apply for junior developer positions.
            </p>

            <div className="mt-5">
                <p className="mb-3 font-semibold text-[#111827]">What&apos;s included?</p>
                <ul className="space-y-2">
                    {includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#6b7280]">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}