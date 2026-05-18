import ContactHeader      from "./components/Header";
import ContactLeftSection  from "./components/LeftSection";
import ContactRightSection from "./components/RightSection";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
    title:         "Contact Us",
    description:   "Have a question or need support? Contact Bishuddho Academy — we're here to help.",
    ogDescription: "Reach out to Bishuddho Academy for any questions, support, or feedback. We'd love to hear from you.",
    path:          "/contact",
    twitterCard:   "summary",
    keywords:      ["contact Bishuddho Academy", "support", "help"],
});

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f9fafb] px-4 py-10 sm:pt-28">
            <div className="mx-auto max-w-6xl">
                <ContactHeader />
                <div className="grid items-stretch gap-10 md:grid-cols-2">
                    <ContactLeftSection />
                    <ContactRightSection />
                </div>
            </div>
        </main>
    );
}