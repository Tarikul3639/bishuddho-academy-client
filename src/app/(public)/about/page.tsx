import AboutHero from "./components/AboutHero";
import AboutMission from "./components/AboutMission";
import AboutFounder from "./components/AboutFounder";
import AboutJourney from "./components/AboutJourney";
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
        "computer training Dhaka",
        "web development course Bangladesh",
    ],
});

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Bishuddho Academy",
    description:
        "Bishuddho Academy is a Dhaka-based training center dedicated to teaching practical computer skills to students of all backgrounds.",
    url: "https://bishuddho.com/about",
    logo: "https://bishuddho.com/og-about.png",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
    },
    sameAs: ["https://www.facebook.com/bishuddhoacademy.bd"],
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <AboutHero />
            <AboutMission />
            <AboutJourney />
            <AboutFounder />
        </main>
    );
}