import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DonationFlowProvider from "@/components/DonationFlowProvider";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...createPageMetadata("/"),
  metadataBase: siteUrl,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <DonationFlowProvider>
          <Navbar />
          {children}
          <Footer />
        </DonationFlowProvider>
        <Analytics />
      </body>
    </html>
  );
}
