import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Log In", href: "/login" },
  { label: "Sign Up", href: "/register" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-3 gap-10 md:grid-cols-5">

          {/* Brand */}
          <div className="col-span-3 md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>

            <p className="pl-1 text-sm leading-relaxed text-muted-foreground">
              Bangladesh&apos;s trusted learning platform. Build real skills
              through expert-led courses and physical classes.
            </p>

            {/* decorative line */}
            <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

            {/* small extra info / filler */}
            <p className="mt-4 pl-1 text-xs leading-relaxed text-muted-foreground/80">
              Learn • Build • Grow — together with a modern learning experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#111827]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="pl-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (with Lucide icons) */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#111827]">
              Contact
            </h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="group flex items-center gap-2 pl-1 cursor-pointer transition-colors hover:text-primary">
                <Mail className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                info@bishuddho.com
              </li>

              <li className="group flex items-center gap-2 pl-1 cursor-pointer transition-colors hover:text-primary">
                <Phone className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                +880 1XXX-XXXXXX
              </li>

              <li className="group flex items-center gap-2 pl-1 cursor-pointer transition-colors hover:text-primary">
                <MapPin className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#111827]">
              Follow Us
            </h4>

            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/50 transition-colors hover:border-primary/30 hover:bg-primary/5">
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────────────────────── */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Bishuddho Academy. All rights reserved.</p>

          <p>
            Designed &amp; built by{" "}
            <a
              href="https://tarikul-islam.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-colors hover:underline"
            >
              Tarikul Islam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}