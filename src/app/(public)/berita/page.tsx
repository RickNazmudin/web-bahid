import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Warta & Pengumuman — Pesantren Baitul Hidayah",
  description:
    "Berita terbaru, informasi akademik, prestasi santri, dan pengumuman resmi dari Pesantren Baitul Hidayah.",
};

const beritaList = [
  {
    slug: "penerimaan-santri-baru-psb-2026-resmi-dibuka",
    kategori: "PPDB 2026",
    judul: "Pendaftaran Santri Baru Tahun Ajaran 2026/2027 Resmi Dibuka",
    tanggal: "10 Januari 2026",
    bacaan: "3 Menit Baca",
    image: "/images/hero-campus.jpg",
    ringkasan:
      "Pondok Pesantren Baitul Hidayah secara resmi membuka jalur penerimaan calon santri baru untuk jenjang MTs, MA, dan Pendidikan Diniyah Formal. Tersedia kuota beasiswa tahfidz penuh.",
  },
  {
    slug: "santri-raih-medali-emas-olimpiade-nasional",
    kategori: "Prestasi Sains",
    judul: "Santri Baitul Hidayah Raih Medali Emas Olimpiade Sains Nasional 2025",
    tanggal: "15 Februari 2026",
    bacaan: "4 Menit Baca",
    image: "/images/facility-lab.jpg",
    ringkasan:
      "Delegasi santri binaan program riset MA Plus Keterampilan berhasil meraih medali emas pada ajang bergengsi Olimpiade Sains Nasional bidang Fisika, membuktikan kualitas integrasi sains dan agama.",
  },
];

export default function BeritaPage() {
  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#E5A81E] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#0B3521] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Warta & Publikasi Pesantren"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3521]/80 via-[#0B3521]/50 to-[#0B3521]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#E5A81E] text-xs font-medium uppercase tracking-widest mb-4 block">
            Warta &amp; Publikasi
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Kabar &amp; Warta Pesantren
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Menyajikan informasi aktual seputar aktivitas santri, prestasi akademik &amp; tahfidz, serta
            pengumuman resmi Pondok Pesantren Baitul Hidayah.
          </p>
        </div>
      </header>

      {/* ── BERITA LIST ───────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((item) => (
              <Link
                key={item.slug}
                href={`/berita/${item.slug}`}
                className="bg-white rounded-3xl border border-[#0B3521]/5 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#0A8B46]/30 hover:shadow-xl transition-all duration-500"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#FAFAF7]">
                    <Image
                      src={item.image}
                      alt={item.judul}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium text-[#0B3521] shadow-sm">
                      {item.kategori}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-[#2B2825]/60">
                      <span className="flex items-center gap-1.5 font-medium text-[#0A8B46]">
                        <Calendar className="w-3.5 h-3.5 text-[#0A8B46]" />
                        {item.tanggal}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5 font-light">
                        <Clock className="w-3.5 h-3.5 text-[#2B2825]/40" />
                        {item.bacaan}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl font-medium text-[#0B3521] group-hover:text-[#E5A81E] transition-colors leading-snug">
                      {item.judul}
                    </h2>

                    <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light line-clamp-3">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5A81E] group-hover:text-[#0A8B46] transition-colors">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
