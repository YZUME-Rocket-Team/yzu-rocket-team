import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "火大的元件｜2027 台灣盃火箭競賽",
  description:
    "元智大學學生火箭團隊「火大的元件」2027 台灣盃火箭競賽募款形象網站。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
