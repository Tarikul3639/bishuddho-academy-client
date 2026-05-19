import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import { Facebook, Linkedin, Twitter } from "@/components/icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Log In", href: "/auth" },
  { label: "Sign Up", href: "/auth" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-y-10 sm:gap-10 md:grid-cols-5">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
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
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
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
          <div className="col-span-2 lg:col-span-1">
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
                  <span className="flex h-8 w-8 p-1 items-center justify-center rounded-lg border border-border bg-muted/50 transition-colors hover:border-primary/30 hover:bg-primary/5">
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