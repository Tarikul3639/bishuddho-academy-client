"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "@/components/ui/sonner";
// import AuthProvider from "./AuthProvider";

export default function ProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            {/* <AuthProvider> */}
                {children}
                <Toaster />
            {/* </AuthProvider> */}
        </Provider>
    );
}
