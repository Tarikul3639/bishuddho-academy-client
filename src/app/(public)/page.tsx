"use client";

import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";
// import TrustedBySection from "./components/TrustedBySection";
import CourseTypesSection from "./components/CourseTypesSection";
import CoursesSection from "./components/CoursesSection";
import FeaturesSection from "./components/FeaturesSection";
import CTABanner from "./components/CTABanner";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <HeroSection />
      <StatsBar />
      {/* <TrustedBySection /> */}
      <CoursesSection />
      <FeaturesSection />
      <CourseTypesSection />
      <CTABanner />
    </main>
  );
}
