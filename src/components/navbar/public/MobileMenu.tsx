"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AuthUser } from "@/types/auth-user";
import { NAV_LINKS } from "./constants";


interface Props {
  isOpen: boolean;
  pathname: string;
  loading: boolean;
  user: AuthUser | null;
  onClose: () => void;
  onLogout: () => void;
}

export default function MobileMenu({
  isOpen, pathname, loading, user, onClose, onLogout,
}: Props) {
  const isAdmin = user?.role === "admin";

  const ref = useClickOutside<HTMLDivElement>({
    onClose,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
          className="mx-auto mt-2 max-w-4xl rounded-2xl border border-white/50 bg-white/40 px-4 pb-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10 cursor-pointer"
        >
          {/* Nav links */}
          <nav className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/50 hover:text-primary ${pathname === link.href
                  ? "bg-white/50 text-primary"
                  : "text-[#374151] dark:text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/40 pt-3">
            {loading ? (
              <div className="h-20 animate-pulse rounded-xl bg-white/30" />
            ) : user ? (
              <>
                {/* User info card */}
                <div className="flex items-center gap-3 rounded-xl bg-white/30 px-3 py-2.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white cursor-pointer">
                    {user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#111827]">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${isAdmin ? "bg-orange-100 text-orange-600" : "bg-primary/10 text-primary"
                      }`}>
                      {isAdmin ? "Admin" : "Student"}
                    </span>
                  </div>
                </div>

                <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} onClick={onClose}>
                  <button className="w-full rounded-sm bg-primary/80 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-primary">
                    {isAdmin ? "Admin Panel" : "Go to Dashboard"}
                  </button>
                </Link>

                <button
                  onClick={onLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-sm border border-red-200 bg-red-50/60 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={onClose}>
                  <button className="w-full rounded-sm border border-white/50 bg-white/30 px-4 py-2.5 text-sm font-semibold text-[#374151] backdrop-blur-sm transition-colors hover:text-primary">
                    Log In
                  </button>
                </Link>
                <Link href="/auth" onClick={onClose}>
                  <button className="w-full rounded-sm bg-primary/80 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_12px_0_rgba(26,86,219,0.30)] backdrop-blur-sm transition-colors hover:bg-primary">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}