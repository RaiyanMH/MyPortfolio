import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import EffectsRoot from "@/components/EffectsRootClient";
import NotificationBanner from "@/components/NotificationBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raiyan Haque – Portfolio",
  description:
    "Software Engineering & Business Informatics graduate. I build clean, functional, and creative software.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://raiyan.vercel.app"),
  openGraph: {
    title: "Raiyan Haque – Portfolio",
    description:
      "Software Engineering & Business Informatics graduate. I build clean, functional, and creative software.",
    url: "https://raiyan.vercel.app",
    siteName: "Raiyan Haque",
    images: [{ url: "/vercel.svg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raiyan Haque – Portfolio",
    description:
      "Software Engineering & Business Informatics graduate. I build clean, functional, and creative software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <EffectsRoot />
        <NotificationBanner />
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
