import type { Metadata } from "next";
import Navbar from "@/components/navbar/public";
import Footer from "@/components/footer/public";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Bishuddho Academy",
  description: "Bangladesh's trusted learning platform for recorded courses and physical classes.",
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* pt-16 compensates for the fixed navbar height */}
      <div className="flex min-h-screen flex-col pt-16">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}