import type { Metadata } from "next";
import { ContactHeader } from "./components/ContactHeader";
import { SocialSection } from "./components/SocialSection";
import { InfoSection } from "./components/InfoSection";
import { TestimonialSection } from "./components/TestimonialSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";

export const metadata: Metadata = {
    title: "Contact Us - Bishuddho Academy",
    description: "Get in touch with Bishuddho Academy. Fill out our contact form and our team will get back to you within 1-2 business days.",
    keywords: ["contact", "bishuddho academy", "support", "email", "phone", "help"],
    openGraph: {
        title: "Contact Us - Bishuddho Academy",
        description: "Get in touch with Bishuddho Academy. Fill out our contact form and our team will get back to you.",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f9fafb]">
            {/* Hero Section */}
            <section className="px-4 py-b pt-16 sm:pt-28">
                <div className="mx-auto max-w-7xl">
                    <ContactHeader />
                </div>
            </section>

            {/* Info Section */}
            <section className="px-4 py-8 bg-white">
                <div className="mx-auto max-w-7xl">
                    <InfoSection />
                </div>
            </section>

            {/* Social Section */}
            <section className="px-4 py-8 bg-white">
                <div className="mx-auto max-w-7xl">
                    <SocialSection />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <TestimonialSection />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 py-8 bg-white">
                <div className="mx-auto max-w-7xl">
                    <FAQSection />
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <CTASection />
                </div>
            </section>
        </main>
    );
}
