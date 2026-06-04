"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "@/components/ui/sonner";

export default function ProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            {children}
            <Toaster />
        </Provider>
    );  
}
