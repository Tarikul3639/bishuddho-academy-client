import type { Metadata } from "next";

// lib/metadata.ts
export const siteConfig = {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Bishuddho Academy",
    locale: "bn_BD",
    twitterHandle: "@bishuddho",
    description: "Bangladesh's trusted online learning platform for recorded courses and physical classes.",
    keywords: ["Bishuddho Academy", "online learning", "Bangladesh", "e-learning"],
} as const;

interface CreateMetadataOptions {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
    twitterCard?: "summary" | "summary_large_image";
    ogDescription?: string;
}

export function createMetadata({
    title,
    description,
    path,
    keywords = [],
    image = "/og-image.png",
    noIndex = false,
    twitterCard = "summary_large_image",
    ogDescription = description,
}: CreateMetadataOptions): Metadata {

    const canonical = `${siteConfig.url}${path}`;
    const ogImage = `${siteConfig.url}${image}`;
    const fullTitle = `${title} | ${siteConfig.name}`;

    return {
        title,
        description,
        ...(keywords.length > 0 && { keywords }),

        alternates: {
            canonical,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
            },
        },

        openGraph: {
            title: fullTitle,
            description: ogDescription,
            url: canonical,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },

        twitter: {
            card: twitterCard,
            title: fullTitle,
            description,
            site: siteConfig.twitterHandle,
            images: [ogImage],
        },
    };
}