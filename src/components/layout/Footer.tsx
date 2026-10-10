"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Award,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A2E] pt-20 pb-10 text-[#FAFAF7]/80 border-t border-[#D3AD3B]/20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          {/* Brand & Mission Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D3AD3B]/10 border border-[#D3AD3B]/40 text-[#D3AD3B] flex items-center justify-center font-serif font-bold text-base rounded-lg">
                D
              </div>
              <span className="text-white font-serif font-medium text-lg tracking-tight">
                Darul Ulum
              </span>
            </div>
            <p className="text-xs text-[#FAFAF7]/70 leading-relaxed font-light">
              Pondok Pesantren Modern terdepan di Bogor, Jawa Barat. Memadukan keunggulan tahfidz Al-Qur&apos;an, kedalaman kitab turots, sains riset modern, dan wawasan global.
            </p>
          </div>

          {/* Experience / Programs */}
          <div>
            <h5 className="text-[10px] tracking-widest uppercase text-[#D3AD3B] mb-6 font-semibold">
              Pendidikan
            </h5>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link href="/program#mts" className="hover:text-white transition-colors">
                  MTs Unggulan Tahfidz
                </Link>
              </li>
              <li>
                <Link href="/program#ma" className="hover:text-white transition-colors">
                  MA Plus Sains &amp; Riset
                </Link>
              </li>
              <li>
                <Link href="/program#salaf" className="hover:text-white transition-colors">
                  PDF Ulya Salafiyah
                </Link>
              </li>
              <li>
                <Link href="/fasilitas" className="hover:text-white transition-colors">
                  Fasilitas Kampus
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions / PPDB */}
          <div>
            <h5 className="text-[10px] tracking-widest uppercase text-[#D3AD3B] mb-6 font-semibold">
              Penerimaan Santri
            </h5>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link href="/ppdb" className="hover:text-white transition-colors">
                  Informasi PPDB 2026/2027
                </Link>
              </li>
              <li>
                <Link href="/ppdb/daftar" className="hover:text-white transition-colors">
                  Pendaftaran Daring
                </Link>
              </li>
              <li>
                <Link href="/ppdb/cek-status" className="hover:text-white transition-colors">
                  Pelacakan Status Berkas
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Jadwal Kunjungan Kampus
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bulletin */}
          <div>
            <h5 className="text-[10px] tracking-widest uppercase text-[#D3AD3B] mb-6 font-semibold">
              Buletin &amp; Warta
            </h5>
            <p className="text-xs text-[#FAFAF7]/60 mb-3 font-light">
              Dapatkan warta terbaru dan informasi beasiswa tahfidz berkala.
            </p>
            <form
              className="flex border border-white/10 rounded-full overflow-hidden"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Terima kasih telah berlangganan warta Darul Ulum.");
              }}
            >
              <input
                type="email"
                placeholder="Alamat email..."
                required
                className="bg-transparent text-xs px-4 py-3 w-full focus:outline-none text-white placeholder-[#FAFAF7]/40"
              />
              <button
                type="submit"
                className="px-4 text-white hover:text-[#D3AD3B] transition-colors border-l border-white/10"
                aria-label="Langganan"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Accreditation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#FAFAF7]/50 font-light">
          <div>
            &copy; 2026 Pondok Pesantren Modern Darul Ulum Bogor. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#D3AD3B] font-medium">Akreditasi &apos;A&apos; BAN-SM</span>
            <span>&bull;</span>
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
