"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import Logo from "@/components/ui/Logo";
import NavLinks from "./NavLinks";
import AuthSection from "./AuthSection";
import MobileMenu from "./MobileMenu";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(clearUser());
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);
        };

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
                        ? "max-w-4xl rounded-full border border-white/50 bg-white shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] ring-1 ring-inset ring-white/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10"
                        : "max-w-6xl border-b border-gray-100 bg-white backdrop-blur-md dark:border-border/30 dark:bg-background/60"
                    }`}
            >
                <Logo />

                <NavLinks pathname={pathname} />

                <div className="hidden items-center gap-2 md:flex">
                    <AuthSection
                        loading={isLoading || logoutLoading}
                        user={user}
                        scrolled={scrolled}
                        onLogout={handleLogout}
                    />
                </div>

                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="cursor-pointer rounded-lg p-2 text-[#6b7280] hover:text-primary md:hidden"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            <MobileMenu
                isOpen={mobileOpen}
                pathname={pathname}
                loading={isLoading || logoutLoading}
                user={user}
                onClose={() => setMobileOpen(false)}
                onLogout={handleLogout}
            />
        </nav>
    );
}
