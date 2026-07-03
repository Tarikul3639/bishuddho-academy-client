"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LayoutDashboard, Settings } from "lucide-react";

import { fadeUp, stagger } from "@/components/animations";
import { useAppSelector } from "@/redux/hooks";

import AdminBannerSkeleton from "./AdminBannerSkeleton";

export default function AdminBanner() {
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (isLoading || !user) {
    return <AdminBannerSkeleton />;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative overflow-hidden rounded-2xl border border-[#fde68a]/40"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#f59e0b]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-[#ef4444]/6 blur-2xl" />

      {/* Wave */}
      <div className="absolute bottom-0 left-0 w-full leading-0">
        <svg
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-17.5 w-full sm:h-22.5 lg:h-30"
        >
          <path
            fill="#f59e0b"
            fillOpacity="0.6"
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          />
          <path
            fill="#f59e0b"
            fillOpacity="0.6"
            d="M0,55 C200,20 400,70 720,55 C1040,40 1240,65 1440,50 L1440,80 L0,80 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-10 sm:px-6 md:p-10">
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:flex-row lg:items-center lg:text-left"
        >
          {/* Avatar */}
          <motion.div variants={fadeUp} className="relative shrink-0">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-[#fde68a] bg-white p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:h-24 sm:w-24 md:h-28 md:w-28">
              <div className="h-full w-full overflow-hidden rounded-full">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#f59e0b] to-[#ef4444] text-xl font-bold tracking-wider text-white md:text-2xl">
                    {initials}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div variants={fadeUp} className="flex-1 space-y-3">
            {/* Name + Badge */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <h1 className="text-xl font-extrabold tracking-tight text-[#0d1b3e] sm:text-2xl md:text-3xl">
                {user.name}
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#fde68a] bg-[#fffbeb] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#92400e] sm:text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#f59e0b]" />
                {user.role}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[#92400e] lg:justify-start">
              <Settings className="h-4 w-4 shrink-0 text-[#d97706]" />
              <span className="break-all text-sm font-medium">{user.email}</span>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 lg:justify-start">
              {[
                {
                  icon: ShieldCheck,
                  label: user.userId.toUpperCase(),
                },
                {
                  icon: LayoutDashboard,
                  label: `Joined ${user.createdAt}`,
                },
              ].map((pill, index) => (
                <span
                  key={`${pill.label}-${index}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#fde68a]/60 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold text-[#374151] backdrop-blur-xl transition-colors hover:border-[#f59e0b] hover:bg-[#fffbeb] hover:text-[#92400e] sm:text-xs"
                >
                  <pill.icon className="h-3.5 w-3.5 text-[#f59e0b]" />
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