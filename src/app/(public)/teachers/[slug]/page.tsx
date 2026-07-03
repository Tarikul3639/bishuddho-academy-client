// app/(public)/teachers/[slug]/page.tsx

import { Metadata } from "next";
import TeacherDetailsPage from "./components/TeacherDetailsPage";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/public/teachers/${slug}`,
            {
                next: {
                    revalidate: 300,
                },
            },
        );

        if (!res.ok) {
            throw new Error();
        }

        const teacher = await res.json();

        return {
            title: `${teacher.fullName} | Bishuddho Academy`,
            description:
                teacher.shortBio ||
                teacher.biography ||
                `Learn more about ${teacher.fullName}, ${teacher.designation} at Bishuddho Academy.`,

            alternates: {
                canonical: `/teachers/${slug}`,
            },

            keywords: [
                teacher.fullName,
                teacher.designation,
                ...(teacher.skills ?? []),
                "Bishuddho Academy",
            ],

            openGraph: {
                title: `${teacher.fullName} | Bishuddho Academy`,
                description:
                    teacher.shortBio ||
                    teacher.biography ||
                    `${teacher.fullName} - ${teacher.designation}`,

                images: teacher.profileImage
                    ? [
                          `${process.env.NEXT_PUBLIC_API_URL}${teacher.profileImage}`,
                      ]
                    : [],
            },
        };
    } catch {
        return {
            title: "Teacher Profile | Bishuddho Academy",
            description:
                "Learn from experienced instructors at Bishuddho Academy.",
        };
    }
}

export default async function Page({ params }: Props) {
    const { slug } = await params;

    return <TeacherDetailsPage slug={slug} />;
}