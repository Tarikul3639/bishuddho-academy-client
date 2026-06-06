"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/animations";
import { ShieldCheck, BookOpen, CalendarDays, Camera, GraduationCap, Mail } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { ProfileBannerSkeleton } from "./ProfileBannerSkeleton";

export default function ProfileBanner() {
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const inputRef = useRef<HTMLInputElement>(null);

    const initials = user?.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "—";

    if (isLoading) {
        return <ProfileBannerSkeleton />;
    }

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative overflow-hidden rounded-2xl border border-primary/10"
        >
            {/* ── Decorative blobs ── */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#1a56db]/6 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-[#60a5fa]/6 blur-2xl" />

            {/* ── Wave SVG — bottom decoration ── */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 120"
                className="absolute bottom-0 left-0 w-full h-full"
                preserveAspectRatio="none"
            >
                <path
                    fill="#1a56db"
                    fillOpacity="0.6"
                    d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                />
                <path
                    fill="#1a56db"
                    fillOpacity="0.6"
                    d="M0,96L60,90.7C120,85,240,75,360,69.3C480,64,600,64,720,69.3C840,75,960,85,1080,85.3C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                />
            </svg>

            {/* ── Main content ── */}
            <div className="relative z-10 p-4 sm:p-6 md:p-10">
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
                >
                    {/* Avatar */}
                    <motion.div variants={fadeUp} className="relative shrink-0">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-[#e5e7eb] bg-white p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:h-28 md:w-28">
                            <div className="h-full w-full overflow-hidden rounded-full">
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#1a56db] to-[#60a5fa] text-2xl font-bold tracking-wider text-white">
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Camera button */}
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#6b7280] shadow-sm transition-all hover:border-[#c7d7fd] hover:text-[#1a56db] active:scale-90"
                            title="Update Photo"
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => console.log(e.target.files?.[0]?.name)}
                        />
                    </motion.div>

                    {/* Info */}
                    <motion.div variants={fadeUp} className="space-y-3">

                        {/* Name + badge */}
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0d1b3e] md:text-3xl">
                                {user?.name}
                            </h1>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#c7d7fd] bg-[#eef3ff] px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1a56db]">
                                <GraduationCap className="h-3.5 w-3.5" />
                                Student
                            </span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2 text-blue-950">
                            <Mail className="h-4 w-4 text-blue-950" />
                            <span>{user?.email}</span>
                        </div>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                            {[
                                { icon: ShieldCheck, label: user?.userId?.toUpperCase() },
                                { icon: BookOpen, label: `${user?.enrolledCourses ?? 0} Active Courses` },
                                { icon: CalendarDays, label: `Joined ${joinedDate}` },
                            ].map((pill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-white/70 backdrop-blur-xl px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#374151] transition-colors hover:border-[#c7d7fd] hover:bg-[#eef3ff] hover:text-[#1a56db]"
                                >
                                    <pill.icon className="h-3.5 w-3.5 text-[#1a56db]" />
                                    {pill.label}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}