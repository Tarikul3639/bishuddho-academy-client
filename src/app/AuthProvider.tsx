"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser, setLoading, setUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const user = useAppSelector((state) => state.auth.user);

    const { data, isLoading, isError } = useGetMeQuery();

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [dispatch, isLoading]);

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [dispatch, data?.userId]);

    useEffect(() => {
        if (isError) {
            dispatch(clearUser());
        }
    }, [dispatch, isError]);

    // Redirect blocked users to /blocked
    useEffect(() => {
        if (user?.status === "blocked" && pathname !== "/blocked") {
            router.replace("/blocked");
        }
    }, [user?.status, pathname, router]);

    // Redirect unauthenticated users away from protected pages
    useEffect(() => {
        if (!isLoading && !data && !isError) {
            const protectedPaths = ["/student", "/admin"];
            const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
            if (isProtected && pathname !== "/blocked") {
                router.replace("/login");
            }
        }
    }, [isLoading, data, isError, pathname, router]);

    return <>{children}</>;
}
