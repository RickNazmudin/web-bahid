"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Award,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B3521] pt-20 pb-10 text-[#FAFAF7]/80 border-t border-[#E5A81E]/30">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          {/* Brand & Mission Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center p-1 rounded-xl bg-white/90 shadow-sm border border-[#E5A81E]/40">
                <Image
                  src="/images/logo.png"
                  alt="Logo Pesantren Baitul Hidayah"
                  width={48}
                  height={48}
                  className="w-auto h-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif font-bold text-lg tracking-tight leading-none">
                  Baitul Hidayah
                </span>
                <span className="text-[#E5A81E] text-[10px] tracking-widest uppercase font-semibold mt-1">
                  Pondok Pesantren
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAFAF7]/70 leading-relaxed font-light">
              Pondok Pesantren di Kota Bandung, Jawa Barat. Memadukan keunggulan tahfidz Al-Qur&apos;an, kedalaman kitab turots, sains riset modern, dan pembinaan karakter santri yang berakhlakul karimah.
            </p>
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#FAFAF7]/85 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5A81E] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Jl. Ciporeat Andir kulon kelurahan pasanggrahan kec.ujungberung kota bandung
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5A81E] shrink-0" />
                <a
                  href="https://wa.me/6285196045409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5A81E] font-medium transition-colors"
                >
                  085196045409
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5A81E] shrink-0" />
                <a
                  href="mailto:info@baitulhidayah.sch.id"
                  className="hover:text-[#E5A81E] transition-colors"
                >
                  info@baitulhidayah.sch.id
                </a>
              </div>
            </div>
          </div>

          {/* Experience / Programs */}
          <div>
            <h5 className="text-[10px] tracking-widest uppercase text-[#E5A81E] mb-6 font-semibold">
              Pendidikan
            </h5>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link href="/program#mts" className="hover:text-[#E5A81E] transition-colors">
                  MTs Unggulan Tahfidz
                </Link>
              </li>
              <li>
                <Link href="/program#ma" className="hover:text-[#E5A81E] transition-colors">
                  MA Plus Sains &amp; Riset
                </Link>
              </li>
              <li>
                <Link href="/program#salaf" className="hover:text-[#E5A81E] transition-colors">
                  PDF Ulya Salafiyah
                </Link>
              </li>
              <li>
                <Link href="/fasilitas" className="hover:text-[#E5A81E] transition-colors">
                  Fasilitas Kampus
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions / PPDB */}
          <div>
            <h5 className="text-[10px] tracking-widest uppercase text-[#E5A81E] mb-6 font-semibold">
              Penerimaan Santri
            </h5>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link href="/ppdb" className="hover:text-[#E5A81E] transition-colors">
                  Informasi PPDB 2026/2027
                </Link>
              </li>
              <li>
                <Link href="/ppdb/daftar" className="hover:text-[#E5A81E] transition-colors">
                  Pendaftaran Daring
                </Link>
              </li>
              <li>
                <Link href="/ppdb/cek-status" className="hover:text-[#E5A81E] transition-colors">
                  Pelacakan Status Berkas
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#E5A81E] transition-colors">
                  Jadwal Kunjungan Kampus
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bulletin */}
          <div>
            <h5 className="text-[10px] tracking-widest uppercase text-[#E5A81E] mb-6 font-semibold">
              Buletin &amp; Warta
            </h5>
            <p className="text-xs text-[#FAFAF7]/60 mb-3 font-light">
              Dapatkan warta terbaru dan informasi beasiswa tahfidz berkala.
            </p>
            <form
              className="flex border border-white/10 rounded-full overflow-hidden"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Terima kasih telah berlangganan warta Baitul Hidayah.");
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
                className="px-4 text-white hover:text-[#E5A81E] transition-colors border-l border-white/10"
                aria-label="Langganan"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Accreditation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#FAFAF7]/60 font-light">
          <div>
            &copy; 2026 Pondok Pesantren Baitul Hidayah Bandung. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#E5A81E] font-medium">Akreditasi &apos;A&apos; BAN-SM</span>
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
