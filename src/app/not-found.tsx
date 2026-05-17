"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Home, ArrowLeft, BookOpen, Search, Compass } from "lucide-react";

const FLOATING_BOOKS = [
  { emoji: "📘", x: "8%",  y: "18%", delay: 0,    duration: 4.2 },
  { emoji: "📗", x: "88%", y: "12%", delay: 0.6,  duration: 3.8 },
  { emoji: "📙", x: "5%",  y: "72%", delay: 1.1,  duration: 4.6 },
  { emoji: "📕", x: "91%", y: "68%", delay: 0.3,  duration: 3.5 },
  { emoji: "📓", x: "78%", y: "38%", delay: 1.5,  duration: 4.0 },
  { emoji: "✏️", x: "15%", y: "45%", delay: 0.9,  duration: 3.9 },
];

const SUGGESTIONS = [
  { icon: Home,     label: "Go to homepage",   href: "/" },
  { icon: BookOpen, label: "Browse courses",   href: "/courses" },
  { icon: Compass,  label: "Explore academy",  href: "/about" },
];

const DIGITS = ["4", "0", "4"];

export default function NotFound() {
  const [searchVal, setSearchVal] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50 px-6 py-20 font-sans">

      {/* ── Ambient grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#1a56db 1px, transparent 1px), linear-gradient(90deg, #1a56db 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Floating book decorations ── */}
      {FLOATING_BOOKS.map(({ emoji, x, y, delay, duration }) => (
        <motion.span
          key={emoji + x}
          className="pointer-events-none absolute select-none text-2xl"
          style={{ left: x, top: y }}
          animate={{ y: [0, -14, 0], rotate: [-4, 4, -4], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* ── Brand ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 flex items-center gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight text-gray-900">
          Bishuddho Academy
        </span>
      </motion.div>

      {/* ── 404 digits ── */}
      <div className="mb-8 flex items-center gap-3 sm:gap-5">
        {DIGITS.map((digit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: i * 0.12,
              duration: 0.55,
              type: "spring",
              bounce: 0.45,
            }}
            className={`relative flex h-28 w-24 items-center justify-center rounded-3xl sm:h-36 sm:w-28 ${
              i === 1
                ? "bg-blue-600 text-white shadow-xl shadow-blue-300/50"
                : "border border-gray-200 bg-white text-gray-900 shadow-lg shadow-gray-200/60"
            }`}
          >
            <span className="text-6xl font-black tracking-tighter sm:text-7xl">
              {digit}
            </span>

            {/* Pulsing dot on the middle zero */}
            {i === 1 && (
              <motion.div
                className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Headline ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.5 }}
        className="mb-3 text-center"
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Oops — Page Pot Found
        </h1>
        <p className="mt-2.5 max-w-sm text-center text-sm leading-relaxed text-gray-500">
          Looks like this lesson doesn't exist yet. The page you're looking for may have been moved, deleted, or never existed.
        </p>
      </motion.div>

      {/* ── Search bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.54, duration: 0.5 }}
        className="mt-7 w-full max-w-sm"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 shadow-sm outline-none placeholder:text-gray-400 transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          />
          <AnimatePresence>
            {searchVal && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Search
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Quick links ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.64, duration: 0.5 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {SUGGESTIONS.map(({ icon: Icon, label, href }, i) => (
          <motion.a
            key={label}
            href={href}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 + i * 0.08 }}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm transition-colors ${
              i === 0
                ? "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
                : "border border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </motion.a>
        ))}
      </motion.div>

      {/* ── Back link ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        onClick={() => window.history.back()}
        className="mt-10 flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Go back to previous page
      </motion.button>

      {/* ── Animated bottom wave ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
            fill="#1a56db"
            fillOpacity="0.07"
            animate={{ d: [
              "M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z",
              "M0,50 C200,10 400,70 600,30 C800,10 1000,70 1200,50 L1200,80 L0,80 Z",
              "M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z",
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
    </div>
  );
}