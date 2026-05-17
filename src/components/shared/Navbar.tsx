"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Features", href: "/#features" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-2 z-50 w-full bg-transparent transition-all duration-700 ${scrolled ? "py-3" : "py-0"
        }`}
    >
      <div
        className={`mx-auto flex h-18 items-center justify-between px-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled
          ? "max-w-4xl rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] border border-white/50 dark:border-white/10 ring-1 ring-inset ring-white/60 dark:ring-white/10"
          : "max-w-6xl bg-transparent dark:bg-background/60 backdrop-blur-md border-b border-gray-100 dark:border-border/30"
          }`}
      >
        <Logo />

        <div className="hidden items-center gap-1 rounded-full border border-border/40 bg-gray-200/70 backdrop-blur-3xl px-1.5 py-1.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${pathname === link.href
                ? "bg-white text-primary shadow-sm dark:bg-background"
                : "text-[#374151] hover:text-primary dark:text-muted-foreground hover:bg-gray-300/50 dark:hover:bg-white/10"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <button className="cursor-pointer rounded-sm px-4 py-2 text-sm font-semibold text-[#374151] transition-colors hover:text-primary dark:text-foreground">
              Log In
            </button>
          </Link>

          <Link href="/register">
            <button
              className={`cursor-pointer rounded-sm px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/75 ${scrolled
                ? "bg-primary/80 shadow-[0_2px_12px_0_rgba(26,86,219,0.30)] backdrop-blur-sm"
                : "bg-primary"
                }`}
            >
              Sign Up
            </button>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="rounded-lg p-2 text-[#6b7280] hover:text-primary md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="mx-auto mt-2 max-w-4xl rounded-2xl border border-white/50 bg-white/40 px-4 pb-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10"
          >
            <nav className="flex flex-col gap-1 pt-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/50 hover:text-primary ${pathname === link.href
                    ? "bg-white/50 text-primary"
                    : "text-[#374151] dark:text-muted-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/40 pt-3">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-sm border border-white/50 bg-white/30 px-4 py-2.5 text-sm font-semibold text-[#374151] backdrop-blur-sm transition-colors hover:text-primary">
                  Log In
                </button>
              </Link>

              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-sm bg-primary/80 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_12px_0_rgba(26,86,219,0.30)] backdrop-blur-sm transition-colors hover:bg-primary">
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
