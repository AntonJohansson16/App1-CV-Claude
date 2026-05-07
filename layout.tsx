import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAREER OS — AI Career Strategist",
  description: "Elite-level AI career strategist, ATS optimization engine, and technical hiring system. Maximize your interview probability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
