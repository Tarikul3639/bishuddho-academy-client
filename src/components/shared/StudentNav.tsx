"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/my-courses", icon: GraduationCap },
  { label: "Profile", href: "/profile", icon: User },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const sidebarVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: [0, 0, 0.2, 1] },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// ─── Sidebar Content ──────────────────────────────────────────────────────────
// Reused in both desktop and mobile

function SidebarContent({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#e5e7eb] px-5">
        <Link
          href="/"
          onClick={onLinkClick}
          className="flex items-center gap-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a56db]">
            <BookOpen className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-[#111827]">Bishuddho Academy</span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#eff6ff] text-[#1a56db]"
                  : "text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827]"
              }`}
            >
              <span className="flex items-center gap-3">
                <item.icon
                  className={`h-4 w-4 ${
                    active ? "text-[#1a56db]" : "text-[#9ca3af] group-hover:text-[#374151]"
                  }`}
                />
                {item.label}
              </span>
              {active && <ChevronRight className="h-3.5 w-3.5 text-[#1a56db]" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#e5e7eb] px-3 py-4">
        <button
          onClick={() => {
            // TODO: call auth logout here
            // e.g. signOut({ callbackUrl: "/login" })
            onLinkClick?.();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b7280] transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudentNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden h-screen w-60 shrink-0 border-r border-[#e5e7eb] bg-white md:flex md:flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ── Mobile Topbar ───────────────────────────────────────────────── */}
      <header className="flex h-14 items-center justify-between border-b border-[#e5e7eb] bg-white px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a56db]">
            <BookOpen className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-[#111827]">Bishuddho Academy</span>
        </Link>

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-[#6b7280] hover:text-[#1a56db]"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Mobile Sidebar Overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl md:hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 rounded-lg p-2 text-[#6b7280] hover:text-[#1a56db]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <SidebarContent
                pathname={pathname}
                onLinkClick={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}