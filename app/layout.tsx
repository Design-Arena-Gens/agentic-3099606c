import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlobeX Markets | Crypto & Forex Intelligence",
  description:
    "Global-first trading intelligence platform providing actionable crypto and forex insights, market analytics, and strategy tools.",
  openGraph: {
    title: "GlobeX Markets",
    description:
      "Harness crypto and forex intelligence with real-time analytics, institutional-grade tools, and global coverage.",
    url: "https://agentic-3099606c.vercel.app",
    siteName: "GlobeX Markets",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobeX Markets",
    description:
      "All-world crypto and forex trading intelligence built for global operators."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
