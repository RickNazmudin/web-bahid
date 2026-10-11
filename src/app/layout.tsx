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
    default: "Pondok Pesantren Baitul Hidayah — Membina Generasi Qur'ani",
    template: "%s | Baitul Hidayah",
  },
  description:
    "Pondok Pesantren Baitul Hidayah Bandung memadukan tahfidz Al-Qur'an, kedalaman ilmu agama, dan sains di Jl. Ciporeat Andir kulon, Pasanggrahan, Ujungberung, Kota Bandung.",
  keywords: [
    "pesantren baitul hidayah",
    "pondok pesantren bandung",
    "baitul hidayah ujungberung",
    "PPDB online 2026",
    "tahfidz al-qur'an bandung",
    "pendidikan pesantren baitul hidayah",
  ],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Pesantren Baitul Hidayah",
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
        className="bg-white text-[#1A281E] antialiased min-h-screen flex flex-col selection:bg-[#0A8B46] selection:text-white font-sans"
      >
        {children}
      </body>
    </html>
  );
}
