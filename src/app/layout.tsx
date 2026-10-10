import type { Metadata } from "next";
import { Raleway, Playfair_Display } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pondok Pesantren Modern Darul Ulum — Membina Generasi Qur'ani",
    template: "%s | Pesantren Darul Ulum",
  },
  description:
    "Pondok Pesantren Modern Darul Ulum Bogor memadukan tahfidz Al-Qur'an bersanad, keunggulan sains riset modern, dan tradisi kitab kuning di kawasan sejuk perbukitan Bogor.",
  keywords: [
    "pesantren modern bogor",
    "PPDB online 2026",
    "tahfidz bersanad",
    "madrasah aliyah sains",
    "madrasah tsanawiyah unggulan",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Pesantren Darul Ulum",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${raleway.variable} ${playfair.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-white text-[#2B2825] antialiased min-h-screen flex flex-col selection:bg-[#D3AD3B] selection:text-white font-sans"
      >
        {children}
      </body>
    </html>
  );
}
