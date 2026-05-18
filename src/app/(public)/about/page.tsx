import AboutHero from "./components/AboutHero";
import AboutMission from "./components/AboutMission";
import AboutFounder from "./components/AboutFounder";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
    title: "About Us",
    description: "Bishuddho Academy is an online learning platform dedicated to providing quality education in Bangladesh. Discover our mission, our story, and the team behind us.",
    ogDescription: "Learn about Bishuddho Academy — our mission to make quality education accessible to everyone in Bangladesh.",
    path: "/about",
    image: "/og-about.png",
    keywords: [
        "Bishuddho Academy",
        "about us",
        "online learning Bangladesh",
        "education platform",
        "e-learning",
    ],
});

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white py-10">
            <AboutHero />
            <AboutMission />
            <AboutFounder />
        </main>
    );
}