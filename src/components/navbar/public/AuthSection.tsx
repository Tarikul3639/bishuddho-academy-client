import Link from "next/link";
import AuthSkeleton from "./AuthSkeleton";
import UserDropdown, { type AuthUser } from "./UserDropdown";

interface Props {
    loading: boolean;
    user: AuthUser | null;
    scrolled: boolean;
    onLogout: () => void;
}

export default function AuthSection({ loading, user, scrolled, onLogout }: Props) {
    if (loading) return <AuthSkeleton />;

    if (user) return <UserDropdown user={user} onLogout={onLogout} />;

    return (
        <>
            <Link href="/auth">
                <button className="cursor-pointer rounded-sm px-4 py-2 text-sm font-semibold text-[#374151] transition-colors hover:text-primary dark:text-foreground">
                    Log In
                </button>
            </Link>
            <Link href="/register">
                <button className={`cursor-pointer rounded-sm px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/75 ${scrolled
                        ? "bg-primary/80 shadow-[0_2px_12px_0_rgba(26,86,219,0.30)] backdrop-blur-sm"
                        : "bg-primary"
                    }`}>
                    Sign Up
                </button>
            </Link>
        </>
    );
}