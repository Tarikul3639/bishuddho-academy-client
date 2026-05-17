"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import NavLinks from "./NavLinks";
import AuthSection from "./AuthSection";
import MobileMenu from "./MobileMenu";
import { type AuthUser } from "./UserDropdown";

// ─── Demo auth state ──────────────────────────────────────────────────────────
// TODO: Redux connect করার সময় এই section টা replace করো:
//
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "@/store";
// import { logout } from "@/store/slices/authSlice";
//
// const dispatch = useDispatch();
// const user    = useSelector((state: RootState) => state.auth.user);
// const loading = useSelector((state: RootState) => state.auth.loading);
// const handleLogout = () => { dispatch(logout()); router.push("/"); };

const DEMO_USER: AuthUser | null = {
    name: "Tarikul Islam",
    email: "tarikul@example.com",
    role: "student",   // "admin" দিলে admin state test হবে
};
const DEMO_LOADING = false; // true দিলে skeleton দেখাবে

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // ── Auth state — swap with Redux when ready ───────────────────────────────
    const user: AuthUser | null = DEMO_USER;
    const loading = DEMO_LOADING;
    const handleLogout = () => {
        // TODO: dispatch(logout())
        router.push("/");
        setMobileOpen(false);
    };
    // ─────────────────────────────────────────────────────────────────────────

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`fixed left-0 top-2 z-50 w-full bg-transparent transition-all duration-700 ${scrolled ? "py-3" : "py-0"
            }`}>

            {/* ── Main Bar ──────────────────────────────────────────────────── */}
            <div className={`mx-auto flex h-18 items-center justify-between px-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled
                    ? "max-w-4xl rounded-full border border-white/50 bg-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10"
                    : "max-w-6xl border-b border-gray-100 bg-transparent backdrop-blur-md dark:border-border/30 dark:bg-background/60"
                }`}>

                <Logo />

                <NavLinks pathname={pathname} />

                {/* Desktop auth */}
                <div className="hidden items-center gap-2 md:flex">
                    <AuthSection
                        loading={loading}
                        user={user}
                        scrolled={scrolled}
                        onLogout={handleLogout}
                    />
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen((p) => !p)}
                    className="rounded-lg p-2 text-[#6b7280] hover:text-primary md:hidden"
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* ── Mobile Menu ───────────────────────────────────────────────── */}
            <MobileMenu
                isOpen={mobileOpen}
                pathname={pathname}
                loading={loading}
                user={user}
                onClose={() => setMobileOpen(false)}
                onLogout={handleLogout}
            />
        </nav>
    );
}