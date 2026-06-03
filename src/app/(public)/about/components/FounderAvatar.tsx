"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const POSTER_SRC = "/videos/Instructor-thumbnail.jpg";
const VIDEO_SRC = "/videos/Instructor.mp4";

export default function FounderAvatar() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const handleMouseEnter = () => {
        setPlaying(true);
        videoRef.current?.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        setPlaying(false);
        videoRef.current?.pause();
    };

    return (
        <div
            className="mx-auto w-80 shrink-0 cursor-pointer md:mx-0 group select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Outer Container - Pure White Mode */}
            <div className={`w-full overflow-hidden rounded-2xl border-[3px] bg-white transition-all duration-500 ease-out ${playing
                ? "border-primary shadow-2xl shadow-primary/10 scale-[1.01]"
                : "border-slate-200/70 shadow-md shadow-slate-100"
                }`}>

                {/* ── Top: Image / Video + Content Overlay ───────────────────────── */}
                <div className="relative w-full h-82 overflow-hidden bg-slate-50">
                    {/* Video */}
                    <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        muted
                        loop
                        playsInline
                        preload="auto"

                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Poster image — Smooth Fade */}
                    <Image
                        src={POSTER_SRC}
                        alt="Tarikul Islam"
                        fill
                        priority
                        sizes="320px"
                        className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-105 ${playing ? "opacity-0 pointer-events-none" : "opacity-100"
                            }`}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 bg-linear-to-t from-[#1c2d56] via-[#1c2d56]/40 to-transparent ${playing ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
                        }`}>
                        {/* Learn Badge */}
                        <div>
                            <span className="inline-block px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-primary text-white rounded-md shadow-xs">
                                Learn
                            </span>
                        </div>

                        {/* Title */}
                        <h3
                            className="mt-2 line-clamp-2 text-2xl font-extrabold uppercase leading-tight tracking-wide text-white antialiased"
                            style={{ fontWeight: 800 }}
                        >
                            Computer & <br /> Software
                        </h3>
                    </div>
                </div>

                {/* ── Bottom: Instructor Info Panel (Premium Light Mode) ───────────────────────────── */}
                <div className="relative flex h-28 flex-col justify-center bg-[#1c2d56] px-5 py-4 transition-colors duration-300">

                    {/* Active Indigo/Blue top line effect */}
                    <div className={`absolute top-0 left-0 h-0.75 bg-primary transition-all duration-500 ${playing ? "w-12" : "w-12"}`} />

                    <p className="mb-1 line-clamp-1 text-sm text-gray-400">
                        With{" "}
                        <span
                            className="text-white"
                            style={{ fontWeight: 700 }} // Explicit weight fix
                        >
                            Tarikul Islam
                        </span>
                    </p>

                    <p className="line-clamp-2 text-xs leading-relaxed text-white">
                        <span className="font-bold" style={{ fontWeight: 700 }}>
                            Founder & Lead Instructor
                        </span>
                        <br />
                        Bishuddho Academy, Dhaka
                    </p>
                </div>

            </div>
        </div>
    );
}