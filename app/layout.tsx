import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "火大的元件｜2027 台灣盃火箭競賽",
  description:
    "元智大學學生火箭團隊「火大的元件」2027 台灣盃火箭競賽募款形象網站。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
