"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { clearUser, setLoading, setUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();

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

    return <>{children}</>;
}