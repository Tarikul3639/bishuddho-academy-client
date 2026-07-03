import type { Metadata } from "next";

import { ContactHeader } from "./components/ContactHeader";
import { LocationSection } from "./components/LocationSection";
import { InfoSection } from "./components/InfoSection";
import { FAQSection } from "./components/FAQSection";
import { TestimonialSection } from "./components/TestimonialSection";
import { SocialSection } from "./components/SocialSection";
import { CTASection } from "./components/CTASection";

export const metadata: Metadata = {
    title: "Contact Us - Bishuddho Academy",
    description:
        "Get in touch with Bishuddho Academy. Fill out our contact form and our team will get back to you within 1–2 business days.",
    keywords: [
        "contact",
        "bishuddho academy",
        "support",
        "email",
        "phone",
        "help",
    ],
    openGraph: {
        title: "Contact Us - Bishuddho Academy",
        description:
            "Get in touch with Bishuddho Academy. Fill out our contact form and our team will get back to you.",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f9fafb]">
            {/* Hero Section */}
            <section className="bg-white px-4 pt-16 pb-8 sm:pt-28">
                <div className="mx-auto max-w-7xl">
                    <ContactHeader />
                </div>
            </section>

            {/* Location Section */}
            <section className="bg-white px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <LocationSection />
                </div>
            </section>

            {/* Contact Information */}
            <section className="bg-white px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <InfoSection />
                </div>
            </section>

            {/* Frequently Asked Questions */}
            <section className="bg-white px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <FAQSection />
                </div>
            </section>

            {/* Student Testimonials */}
            <section className="px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <TestimonialSection />
                </div>
            </section>

            {/* Social Links */}
            <section className="bg-white px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <SocialSection />
                </div>
            </section>

            {/* Call To Action */}
            <section className="px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <CTASection />
                </div>
            </section>
        </main>
    );
}
