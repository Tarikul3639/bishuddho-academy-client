"use client";

import { motion, type Variants } from "framer-motion";
import FounderAvatar from "./FounderAvatar";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
  },
};

const FOUNDER = {
  name: "Tarikul Islam",
  role: "Founder & Lead Instructor",
  bio: "Tarikul Islam is a passionate computer educator based in Dhaka, Bangladesh. He founded Bishuddho Academy with a single goal — to teach computer skills in a clear, practical, and accessible way. With years of hands-on experience in software development and teaching, he has helped over a thousand students start their journey in technology.",
  subjects: ["Web Development", "Programming", "Digital Skills", "Software Basics"],
  social: {
    facebook: "https://www.facebook.com/bishuddhoacademy.bd",
    linkedin: "#",
  },
};

export default function AboutFounder() {
  return (
    <section className="px-4 py-20 border-t border-gray-100 select-none">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="mb-16 text-center select-none relative">
            {/* Subtle ambient glow behind text for extra premium feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            {/* Modernized Pill Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-[11px] font-bold tracking-widest uppercase text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" />
              Instructor Profile
            </span>

            {/* Title with explicit weight handling */}
            <h2
              className="mt-3.5 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 antialiased"
              style={{ fontWeight: 800 }}
            >
              Meet the Founder
            </h2>

            {/* Premium Dual-Component Divider Line */}
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <div className="h-0.75 w-12 rounded-full bg-linear-to-r from-primary to-primary/20" />
              <div className="h-0.75 w-1.5 rounded-full bg-primary/40" />
            </div>
          </motion.div>

          {/* Main Layout Grid/Flex */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start lg:gap-8">

            {/* Left Side: Avatar Box */}
            <motion.div variants={fadeUp} className="shrink-0">
              <FounderAvatar />
            </motion.div>

            {/* Right Side: Premium Info Card */}
            <motion.div
              variants={fadeUp}
              className="flex flex-1 flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-8 md:p-10 text-center shadow shadow-zinc-200/40 md:text-left min-h-102.5"
            >
              {/* Top: Name, Role & Bio */}
              <div>
                <h3
                  className="text-3xl font-extrabold tracking-tight text-zinc-900"
                  style={{ fontWeight: 800 }}
                >
                  {FOUNDER.name}
                </h3>
                <p
                  className="mt-1.5 text-xs font-bold tracking-wider uppercase text-primary"
                  style={{ fontWeight: 700 }}
                >
                  {FOUNDER.role}
                </p>

                <p className="mt-5 text-base leading-relaxed text-zinc-600 antialiased font-medium">
                  {FOUNDER.bio}
                </p>
              </div>

              {/* Middle: Premium Subject Tags */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-400 md:text-left">
                  Expertise
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {FOUNDER.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      style={{ fontWeight: 600 }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Social Links Layout */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-6">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Follow on:
                  </span>

                  {/* Facebook Link */}
                  <a
                    href={FOUNDER.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-[#1877f2] shadow-xs transition-all duration-300 hover:scale-105 hover:border-[#1877f2]/30 hover:bg-blue-50/50"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>

                  {/* LinkedIn Link */}
                  <a
                    href={FOUNDER.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-[#0a66c2] shadow-xs transition-all duration-300 hover:scale-105 hover:border-[#0a66c2]/30 hover:bg-blue-50/50"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>

                {/* Optional: Clean location badge or text for bishuddho academy context */}
                <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dhaka, Bangladesh
                </span>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}