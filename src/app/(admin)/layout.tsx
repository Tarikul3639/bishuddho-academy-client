import type { Metadata } from "next";
import Navbar from "@/components/navbar/public";
import Footer from "@/components/footer/public";
import { siteConfig } from "@/lib/metadata";
import ProfileBanner from "./admin/components/AdminBanner";

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
      <div className="flex min-h-screen flex-col pt-16 bg-slate-50/40">
        <main className="flex-1 py-8 sm:px-2 lg:px-4">
          <div className="mx-auto max-w-7xl w-full">
            
            {/* Profile Banner */}
            <ProfileBanner />
            
            {/* Dynamic Children */}
            <div className="w-full">
              {children}
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}