import { createMetadata } from "@/lib/metadata";
import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";
import CourseTypesSection from "./components/CourseTypesSection";
import CoursesSection from "./components/CoursesSection";
import FeaturesSection from "./components/FeaturesSection";
import CTABanner from "./components/CTABanner";

export const metadata = createMetadata({
  title: "Bishuddho Academy",
  description: "Bangladesh's trusted online learning platform. Learn programming, cloud computing, cybersecurity and more — at your own pace, from anywhere.",
  ogDescription: "Start your learning journey with Bishuddho Academy. Quality courses, expert instructors, and a community of learners across Bangladesh.",
  path: "/",
  keywords: [
    "Bishuddho Academy",
    "online learning Bangladesh",
    "programming courses",
    "e-learning platform",
    "learn coding Bangladesh",
    "online education",
  ],
});

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <HeroSection />
      <StatsBar />
      <CoursesSection />
      <FeaturesSection />
      <CourseTypesSection />
      <CTABanner />
    </main>
  );
}
