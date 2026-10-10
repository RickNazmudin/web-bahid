"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
        className="fixed top-0 left-0 h-[2px] bg-[#D3AD3B] z-[9999] transition-all duration-150 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <nav
        className={cn(
          "fixed w-full top-0 z-[1000] transition-all duration-500 px-6 md:px-12",
          scrolled
            ? "bg-white/98 backdrop-blur-md border-b border-[#1A1A2E]/10 shadow-sm py-4"
            : "bg-gradient-to-b from-[#1A1A2E]/90 via-[#1A1A2E]/50 to-transparent py-6"
        )}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1A1A2E] border border-[#D3AD3B]/40 text-[#D3AD3B] flex items-center justify-center font-serif font-bold text-lg shadow-sm rounded-lg">
              <span>D</span>
            </div>
            <div
              className={cn(
                "tracking-tight font-semibold text-lg transition-colors duration-300",
                scrolled ? "text-[#1A1A2E]" : "text-white"
              )}
            >
              DARUL ULUM <span className="text-[#D3AD3B] font-light text-xs tracking-widest uppercase ml-1">PESANTREN</span>
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
                          ? "text-[#D3AD3B] font-semibold"
                          : "text-[#2B2825] hover:text-[#CA9667]"
                        : isActive
                        ? "text-[#D3AD3B] font-semibold"
                        : "text-white/90 hover:text-white"
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
                scrolled ? "text-[#2B2825] hover:text-[#CA9667]" : "text-white/80 hover:text-white"
              )}
              title="Cek Status Pendaftaran"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href="/ppdb/daftar"
              className={cn(
                "hidden md:flex items-center justify-center text-xs tracking-widest uppercase font-medium px-6 py-3 transition-colors duration-300 shadow-sm border border-transparent rounded-full",
                scrolled
                  ? "bg-[#1A1A2E] text-white hover:bg-[#D3AD3B] hover:text-[#1A1A2E]"
                  : "bg-[#D3AD3B] text-white hover:bg-white hover:text-[#1A1A2E]"
              )}
            >
              Daftar Santri Baru
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 transition-colors",
                scrolled ? "text-[#1A1A2E]" : "text-white"
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
          "fixed inset-0 bg-[#1A1A2E]/98 z-[2000] flex flex-col items-center justify-center gap-8 transition-all duration-300 backdrop-blur-md",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-8 right-8 text-white p-2 hover:text-[#D3AD3B] transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="text-3xl font-serif text-white hover:text-[#D3AD3B] transition-colors tracking-tight"
        >
          Beranda Utama
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-serif text-white/90 hover:text-[#D3AD3B] transition-colors tracking-tight"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/ppdb/daftar"
          onClick={() => setMobileOpen(false)}
          className="mt-6 inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-[#D3AD3B] text-white px-8 py-4 hover:bg-[#CA9667] transition-colors shadow-sm rounded-full"
        >
          Pendaftaran Online (PPDB)
        </Link>
      </div>
    </>
  );
}
