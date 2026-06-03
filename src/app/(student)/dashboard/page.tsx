// app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { stagger } from "@/components/animations";
import SettingsBar from "./components/SettingsBar";
import EnrolledCourses from "./components/EnrolledCourses";

export default function DashboardPage() {
    return (
        <div
            className="min-h-screen bg-background flex flex-col"
        >

            {/* Main Content */}
            <main className="grow max-w-7xl mx-auto w-full px-4 py-8">

                {/* Settings Bar */}
                <SettingsBar />

                {/* Enrolled Courses */}
                {/* <EnrolledCourses /> */}
            </main>

        </div>
    );
}