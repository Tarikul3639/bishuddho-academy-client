"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();

    const {
        data,
        isError,
    } = useGetMeQuery();

    useEffect(() => {
        if (data) {
            dispatch(
                setUser(data),
            );
        }
    }, [data?.userId]);

    useEffect(() => {
        if (isError) {
            dispatch(
                clearUser(),
            );
        }
    }, [isError]);

    return <>{children}</>;
}