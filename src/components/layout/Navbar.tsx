"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/program", label: "Program" },
  { href: "/fasilitas", label: "Fasilitas" },
  { href: "/berita", label: "Warta" },
  { href: "/ppdb", label: "PPDB 2026" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
      if (currentScroll > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#E5A81E] z-[9999] transition-all duration-150 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <nav
        className={cn(
          "fixed w-full top-0 z-[1000] transition-all duration-500 px-6 md:px-12",
          scrolled
            ? "bg-white/98 backdrop-blur-md border-b border-[#0B3521]/10 shadow-sm py-3.5"
            : "bg-gradient-to-b from-[#0B3521]/90 via-[#0B3521]/50 to-transparent py-5"
        )}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center p-1 rounded-xl bg-white/90 shadow-sm border border-[#E5A81E]/40 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Logo Pesantren Baitul Hidayah"
                width={44}
                height={44}
                className="w-auto h-9 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div
                className={cn(
                  "tracking-tight font-serif font-bold text-base sm:text-lg transition-colors duration-300 leading-tight",
                  scrolled ? "text-[#0B3521]" : "text-white"
                )}
              >
                BAITUL HIDAYAH
              </div>
              <div className="text-[#E5A81E] font-medium text-[10px] tracking-widest uppercase -mt-0.5">
                PONDOK PESANTREN
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xs tracking-widest uppercase transition-colors duration-300 font-medium",
                      scrolled
                        ? isActive
                          ? "text-[#0A8B46] font-bold"
                          : "text-[#1A281E] hover:text-[#0A8B46]"
                        : isActive
                        ? "text-[#E5A81E] font-bold"
                        : "text-white/90 hover:text-[#E5A81E]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/ppdb/cek-status"
              className={cn(
                "hidden sm:flex items-center justify-center p-2.5 transition-colors",
                scrolled ? "text-[#1A281E] hover:text-[#0A8B46]" : "text-white/80 hover:text-white"
              )}
              title="Cek Status Pendaftaran"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href="/ppdb/daftar"
              className={cn(
                "hidden md:flex items-center justify-center text-xs tracking-widest uppercase font-semibold px-6 py-3 transition-colors duration-300 shadow-sm border border-transparent rounded-full",
                scrolled
                  ? "bg-[#0B3521] text-white hover:bg-[#E5A81E] hover:text-[#0B3521]"
                  : "bg-[#E5A81E] text-[#0B3521] hover:bg-white hover:text-[#0B3521]"
              )}
            >
              Daftar Santri Baru
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 transition-colors",
                scrolled ? "text-[#0B3521]" : "text-white"
              )}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Luxury Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-[#0B3521]/98 z-[2000] flex flex-col items-center justify-center gap-8 transition-all duration-300 backdrop-blur-md",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-8 right-8 text-white p-2 hover:text-[#E5A81E] transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="text-3xl font-serif text-white hover:text-[#E5A81E] transition-colors tracking-tight"
        >
          Beranda Utama
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-serif text-white/90 hover:text-[#E5A81E] transition-colors tracking-tight"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/ppdb/daftar"
          onClick={() => setMobileOpen(false)}
          className="mt-6 inline-flex items-center justify-center text-xs tracking-widest uppercase font-bold bg-[#E5A81E] text-[#0B3521] px-8 py-4 hover:bg-[#0A8B46] hover:text-white transition-colors shadow-sm rounded-full"
        >
          Pendaftaran Online (PPDB)
        </Link>
      </div>
    </>
  );
}
