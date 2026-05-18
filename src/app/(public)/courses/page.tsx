import CoursesPage from "./components/CoursesPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
    title: "Explore Courses",
    description: "Browse all courses at Bishuddho Academy. Learn JavaScript, Python, Cloud Computing, Cybersecurity and more — at your own pace, from anywhere in Bangladesh.",
    path: "/courses",
    keywords: [
        "Bishuddho Academy courses",
        "online courses Bangladesh",
        "learn programming",
        "JavaScript course",
        "Python course",
        "Cloud Computing",
        "Cybersecurity",
        "e-learning",
    ],
});

export default function Page() {
    return <CoursesPage />;
}