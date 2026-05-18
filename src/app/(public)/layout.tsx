import type { Metadata } from "next";
import Navbar from "@/components/navbar/public";
import Footer from "@/components/footer/public";
import { siteConfig } from "@/lib/metadata";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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