import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Program Pendidikan — Pesantren Baitul Hidayah",
  description:
    "Pilihan program pendidikan: MTs Unggulan Tahfidz Al-Qur'an, MA Plus Riset Sains Digital, dan Pendidikan Diniyah Formal (PDF) Ulya.",
};

const programs = [
  {
    id: "mts",
    level: "MTs / Setingkat SMP",
    name: "MTs Unggulan Tahfidz Al-Qur'an",
    tagline: "Hafal Qur'an Mutqin & Kuat Karakter Islami",
    image: "/images/program-tahfidz.jpg",
    desc: "Program terpadu tingkat menengah pertama yang mengombinasikan Kurikulum Nasional & Kemenag dengan target pencapaian hafalan 15 hingga 30 Juz secara mutqin bersanad.",
    kurikulum: "Kurikulum Merdeka + Kemenag + Manhaj Tahfidz Intensif Talaqqi",
    durasi: "3 Tahun (Full Asrama)",
    quota: "75 Santri",
    isRecommended: true,
    highlights: [
      "Target hafalan 15–30 Juz Al-Qur'an dengan ujian munaqosyah berkala",
      "Bimbingan talaqqi 1-on-1 bersama ustadz/ustadzah hafidz 30 juz",
      "Pengenalan dasar nahwu-shorof, adab islami, dan bahasa Arab aktif",
      "Laboratorium komputer dan pendampingan olimpiade sains madrasah",
    ],
  },
  {
    id: "ma",
    level: "MA / Setingkat SMA",
    name: "MA Plus Riset & Sains Digital",
    tagline: "Sains Terdepan, Bahasa Global, Landasan Aqidah",
    image: "/images/facility-lab.jpg",
    desc: "Jenjang lanjutan yang memfokuskan santri pada penguasaan sains modern, metodologi penelitian ilmiah, coding, robotika, serta persiapan lolos PTN favorit dan perguruan tinggi luar negeri.",
    kurikulum: "Kemenag + Cambridge Science Prep + Laboratorium Riset Digital",
    durasi: "3 Tahun (Full Asrama)",
    quota: "60 Santri",
    isRecommended: false,
    highlights: [
      "Fasilitas laboratorium kimia, fisika, biologi, dan robotika modern",
      "Lingkungan dwibahasa aktif (Arab & Inggris) dalam kehidupan asrama",
      "Bimbingan intensif UTBK-SNBT, SNBP, dan beasiswa internasional (Timur Tengah & Turki)",
      "Program karya tulis ilmiah santri dan kompetisi riset nasional (OSN & LKIR)",
    ],
  },
  {
    id: "salaf",
    level: "Pendidikan Diniyah Formal",
    name: "PDF Ulya & Kajian Turats Klasik",
    tagline: "Khazanah Ulama, Keilmuan Otentik",
    image: "/images/facility-library.jpg",
    desc: "Pendidikan diniyah formal berjenjang ulya (setingkat Aliyah) yang mendalami khazanah kitab kuning klasik, ushul fiqh, tafsir jalalain, dan fiqh perbandingan madzhab.",
    kurikulum: "Manhaj Salafiyah Syafi'iyyah + Sistem Sorogan, Bandongan & Mudzakarah",
    durasi: "4 Tahun (Kaderisasi Ulama)",
    quota: "40 Santri",
    isRecommended: false,
    highlights: [
      "Kajian kitab mutun dan syuruh karya ulama mu'tabarah",
      "Sanad keilmuan muttashil yang tersambung kepada mushannif",
      "Forum Bahtsul Masa'il berkala untuk melatih nalar fiqih kontemporer",
      "Ijazah formal kepesantrenan yang diakui negara (Pendidikan Diniyah Formal)",
    ],
  },
];

export default function ProgramPage() {
  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#E5A81E] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#0B3521] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Program Pendidikan"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3521]/80 via-[#0B3521]/50 to-[#0B3521]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#E5A81E] text-xs font-medium uppercase tracking-widest mb-4 block">
            Pilihan Jenjang
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Program Pendidikan Unggulan
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Mengharmonisasikan kurikulum keislaman komprehensif dengan keunggulan sains teknologi
            untuk melahirkan generasi berdaya saing global.
          </p>
        </div>
      </header>

      {/* ── PROGRAM CARDS ─────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {programs.map((prog) => (
            <div
              key={prog.id}
              id={prog.id}
              className={`rounded-3xl overflow-hidden transition-all duration-500 shadow-md ${
                prog.isRecommended
                  ? "border border-[#E5A81E]/40 bg-white shadow-xl shadow-[#E5A81E]/5"
                  : "border border-[#0B3521]/5 bg-white"
              }`}
            >
              <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                {/* Photo Column */}
                <div className="lg:col-span-4 relative min-h-[320px] lg:min-h-full w-full overflow-hidden">
                  <Image
                    src={prog.image}
                    alt={prog.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3521]/70 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#0B3521] bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm">
                      {prog.level}
                    </span>
                  </div>
                  {prog.isRecommended && (
                    <div className="absolute bottom-6 left-6 bg-[#E5A81E] text-white text-[10px] tracking-widest uppercase font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                      Paling Diminati
                    </div>
                  )}
                </div>

                {/* Info Column */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B3521] mb-2 leading-snug">
                      {prog.name}
                    </h2>
                    <p className="text-xs font-semibold text-[#0A8B46] uppercase tracking-wider mb-4">
                      {prog.tagline}
                    </p>
                    <p className="text-sm text-[#2B2825]/80 leading-relaxed font-light">
                      {prog.desc}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold text-[#0A8B46] uppercase tracking-widest mb-3">
                      Fokus &amp; Capaian Santri:
                    </h3>
                    <div className="space-y-3">
                      {prog.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3 text-xs text-[#2B2825]/80 leading-relaxed font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#E5A81E] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta & CTA Column */}
                <div className="lg:col-span-3 p-8 lg:p-12 bg-[#FAFAF7] border-t lg:border-t-0 lg:border-l border-[#0B3521]/5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#0A8B46] uppercase tracking-widest block mb-1">
                        Kurikulum
                      </span>
                      <p className="font-medium text-[#0B3521] leading-relaxed">
                        {prog.kurikulum}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#0B3521]/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#2B2825]/60 font-light">Masa Studi</span>
                        <span className="font-medium text-[#0B3521]">{prog.durasi}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2B2825]/60 font-light">Kuota Siswa</span>
                        <span className="font-bold text-[#E5A81E]">{prog.quota}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-[#0B3521]/10">
                    <Link
                      href="/ppdb/daftar"
                      className="w-full bg-[#E5A81E] hover:bg-[#0A8B46] text-white text-xs tracking-widest uppercase font-medium py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#E5A81E]/20 text-center"
                    >
                      <span>Daftar Jenjang Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/kontak"
                      className="w-full py-2.5 text-xs text-[#2B2825]/70 hover:text-[#0B3521] font-medium text-center block transition-colors uppercase tracking-wider border border-[#0B3521]/10 hover:border-[#0B3521]/30 rounded-full"
                    >
                      Konsultasi Program
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
