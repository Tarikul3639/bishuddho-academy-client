// app/(public)/teachers/page.tsx

import { createMetadata } from "@/lib/metadata";
import TeachersPage from "./components/TeachersPage";

export const metadata = createMetadata({
    title: "Our Teachers",
    description:
        "Meet the expert instructors at Bishuddho Academy. Learn from experienced teachers, founders, and lead instructors dedicated to your growth.",
    path: "/teachers",
    keywords: [
        "Bishuddho Academy teachers",
        "instructors",
        "expert educators",
        "programming teachers Bangladesh",
        "online course instructors",
    ],
});

export default function Page() {
    return <TeachersPage />;
}
