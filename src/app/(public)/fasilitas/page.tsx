"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const categories = ["Semua", "Ibadah & Halaqah", "Asrama & Hunian", "Laboratorium & Sains", "Perpustakaan & Olahraga"];

const fasilitasData = [
  {
    name: "Masjid Jami' Baitul Hikmah",
    category: "Ibadah & Halaqah",
    tag: "Kapasitas 1.500 Jamaah",
    image: "/images/facility-mosque.jpg",
    desc: "Pusat kegiatan spiritual dan talaqqi Al-Qur'an dengan arsitektur Islam modern, berpendingin ruangan, dan tata suara akustik berkualitas tinggi.",
    specs: [
      "Kapasitas 1.500 jamaah putra & putri",
      "Area halaqah tahfidz 20 kelompok terpisah",
      "Sound system akustik jernih & proyektor digital",
      "Perpustakaan kitab rujukan santri di lantai 2",
    ],
  },
  {
    name: "Gedung Asrama Santri Terpadu",
    category: "Asrama & Hunian",
    tag: "Aman, Nyaman & Sejuk",
    image: "/images/facility-dormitory.jpg",
    desc: "Hunian asrama bertingkat dengan sirkulasi udara alami yang sejuk, ranjang bertingkat ergonomis, loker pribadi, dan pengawasan musyrif 24 jam.",
    specs: [
      "Kamar berkapasitas 4–6 santri per unit",
      "Lemari personal dengan kunci sandi",
      "Sanitasi & kamar mandi bersih di setiap lorong",
      "Didampingi musyrif/musyrifah asrama 24 jam",
    ],
  },
  {
    name: "Laboratorium Komputer & Sains Digital",
    category: "Laboratorium & Sains",
    tag: "Workstation Modern",
    image: "/images/facility-lab.jpg",
    desc: "Pusat riset dan pembelajaran digital dengan komputer berspesifikasi tinggi, jaringan serat optik, dan instrumen laboratorium sains modern.",
    specs: [
      "40 unit PC modern spesifikasi komputasi riset",
      "Koneksi internet dedicated fiber optic 200 Mbps",
      "Laboratorium robotika, IoT, dan coding santri",
      "Pusat ujian CAT dan simulasi UTBK-SNBT",
    ],
  },
  {
    name: "Perpustakaan & e-Library Darul Ulum",
    category: "Perpustakaan & Olahraga",
    tag: "Khazanah 8.000+ Judul",
    image: "/images/facility-library.jpg",
    desc: "Menyediakan ribuan koleksi kitab turats klasik, buku teks kurikulum nasional, ensiklopedia Islam, jurnal ilmiah, dan katalog pencarian digital.",
    specs: [
      "Koleksi 8.000+ kitab kuning & buku sains modern",
      "Sistem katalog pencarian e-Library terpadu",
      "Ruang baca ber-AC dan area diskusi kelompok",
      "Akses repositori karya tulis ilmiah alumni",
    ],
  },
  {
    name: "Kampus Hijau & Area Terbuka",
    category: "Ibadah & Halaqah",
    tag: "Kawasan Pegunungan Asri",
    image: "/images/hero-campus.jpg",
    desc: "Kawasan pesantren seluas 10 hektar di perbukitan Cisarua Bogor dengan taman asri, gazebo belajar luar ruangan, dan udara pegunungan yang bersih.",
    specs: [
      "Lingkungan bebas polusi dan sejuk",
      "Gazebo belajar tahfidz outdoor",
      "Keamanan security & CCTV 24 jam terpadu",
      "Jalur pedestrian batu alam yang rapi",
    ],
  },
  {
    name: "Pusat Halaqah Tahfidz Al-Qur'an",
    category: "Ibadah & Halaqah",
    tag: "Talaqqi Bersanad",
    image: "/images/program-tahfidz.jpg",
    desc: "Ruang halaqah khusus tahfidz yang hening dan tenang untuk mendukung fokus muraja'ah dan setoran hafalan santri setiap pagi dan petang.",
    specs: [
      "Dimentori langsung asatidz hafidz 30 juz",
      "Target setoran terukur dengan buku mutaba'ah",
      "Suasana tenang berkarpet nyaman",
      "Bimbingan munaqosyah & tahsin tajwid",
    ],
  },
];

export default function FasilitasPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? fasilitasData
      : fasilitasData.filter((f) => f.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#D3AD3B] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#1A1A2E] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Fasilitas Kampus"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-4 block">
            Sarana &amp; Prasarana
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Fasilitas Kampus Representatif
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Sarana belajar terpadu, asrama ergonomis, dan masjid megah di tengah alam asri perbukitan
            Bogor untuk mendukung kenyamanan dan tumbuh kembang santri.
          </p>
        </div>
      </header>

      {/* ── FILTER & CARDS GALLERY ────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          {/* Category Filter Pills */}
          <div className="flex justify-center overflow-x-auto no-scrollbar gap-2.5 mb-14">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 text-xs tracking-widest uppercase font-medium rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#1A1A2E] text-white shadow-md"
                      : "bg-white text-[#2B2825]/70 hover:bg-[#1A1A2E]/5 border border-[#1A1A2E]/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#1A1A2E]/5 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#CA9667]/30 hover:shadow-xl transition-all duration-500"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#FAFAF7]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium text-[#1A1A2E] shadow-sm">
                      {item.tag}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-4">
                    <h3 className="font-serif text-xl font-medium text-[#1A1A2E] leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">
                      {item.desc}
                    </p>

                    <div className="space-y-3 pt-5 border-t border-[#1A1A2E]/5">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs text-[#2B2825]/80 leading-relaxed font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#D3AD3B] flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA VISIT CAMPUS ──────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white text-center border-t border-[#1A1A2E]/5">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
            Kunjungan Kampus
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-6">
            Ingin Melihat Langsung Fasilitas Kampus?
          </h2>
          <p className="text-base text-[#2B2825]/70 leading-relaxed mb-10 max-w-xl mx-auto font-light">
            Kami mengundang calon wali santri untuk berkunjung ke kampus Pesantren Modern Darul Ulum,
            melihat sarana asrama, dan berkonsultasi langsung dengan dewan pengasuh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-[#D3AD3B] text-white px-8 py-4 rounded-full hover:bg-[#CA9667] transition-all duration-300 shadow-md shadow-[#D3AD3B]/20"
            >
              Jadwalkan Kunjungan
            </Link>
            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-transparent text-[#1A1A2E] border border-[#1A1A2E]/20 px-8 py-4 rounded-full hover:bg-[#1A1A2E] hover:text-white transition-all duration-300"
            >
              Daftar Santri Baru 2026
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
