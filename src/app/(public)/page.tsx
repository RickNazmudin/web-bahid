"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  BookOpenCheck,
  Atom,
  Scroll,
  Star,
  Award,
  Trophy,
  ShieldCheck,
  Maximize2,
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Compass,
} from "lucide-react";

export default function HomePage() {
  // Tabs State for Programs
  const [activeTab, setActiveTab] = useState(0);

  // Lightbox State
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Booking Widget State
  const [selectedLevel, setSelectedLevel] = useState("MTs Unggulan Tahfidz");
  const [selectedTrack, setSelectedTrack] = useState("Jalur Beasiswa Tahfidz");

  // Audio Mock State for the Editorial Player Widget
  const [isPlaying, setIsPlaying] = useState(false);

  const fourPillars = [
    {
      title: "Tahfidz Bersanad",
      desc: "Menghafal Al-Qur'an 30 Juz secara mutqin dengan sanad talaqqi yang bersambung langsung hingga Rasulullah SAW.",
      icon: BookOpenCheck,
    },
    {
      title: "Sains & Riset Modern",
      desc: "Eksplorasi sains tingkat lanjut, robotika, coding, serta pembinaan medali olimpiade sains nasional (OSN).",
      icon: Atom,
    },
    {
      title: "Turats & Adab",
      desc: "Kajian mendalam khazanah kitab kuning klasik, tata bahasa Arab, dan penempaan adab di atas ilmu.",
      icon: Scroll,
    },
    {
      title: "Karakter Kepemimpinan",
      desc: "Kemandirian hidup asrama, bilingual (Arab & Inggris), serta integritas moral kepemimpinan masa depan.",
      icon: Compass,
    },
  ];

  const programsData = [
    {
      name: "MTs Unggulan Tahfidz Al-Qur'an",
      badge: "Paling Diminati",
      subtitle: "Jenjang Menengah Pertama · 3 Tahun Asrama",
      image: "/images/program-tahfidz.jpg",
      desc: "Program terpadu tingkat menengah pertama yang mengombinasikan Kurikulum Nasional & Kemenag dengan target capaian hafalan 15 hingga 30 Juz secara mutqin bersanad.",
      specs: [
        "Bimbingan talaqqi 1-on-1 bersanad muttashil",
        "Lingkungan asrama dwibahasa (Arab & Inggris)",
        "Laboratorium komputer & pembinaan OSN",
        "Pendampingan musyrif kepengasuhan 24 jam",
      ],
      fee: "Rp 250.000",
      feeLabel: "/ infaq pendaftaran seleksi",
      href: "/ppdb/daftar?program=mts",
    },
    {
      name: "MA Plus Sains & Riset Digital",
      badge: "Unggulan Sains",
      subtitle: "Jenjang Menengah Atas · 3 Tahun Asrama",
      image: "/images/facility-lab.jpg",
      desc: "Jenjang lanjutan yang memfokuskan santri pada penguasaan riset sains modern, metodologi penelitian ilmiah, coding, robotika, serta persiapan lolos PTN favorit dan perguruan tinggi luar negeri.",
      specs: [
        "Laboratorium sains & robotika terakreditasi",
        "Bimbingan intensif olimpiade (OSN & KIR)",
        "Persiapan UTBK-SNBT & beasiswa luar negeri",
        "Karya tulis ilmiah & publikasi riset santri",
      ],
      fee: "Rp 250.000",
      feeLabel: "/ infaq pendaftaran seleksi",
      href: "/ppdb/daftar?program=ma",
    },
    {
      name: "Pendidikan Diniyah Formal (PDF) Ulya",
      badge: "Kader Ulama",
      subtitle: "Kaderisasi Ulama · 4 Tahun Asrama",
      image: "/images/facility-library.jpg",
      desc: "Pendidikan diniyah formal berjenjang ulya (setingkat Aliyah) yang mendalami khazanah kitab kuning klasik, ushul fiqh, tafsir, balaghah, dan fiqh perbandingan madzhab dengan ijazah formal diakui negara.",
      specs: [
        "Metode sorogan, bandongan & mudzakarah",
        "Sanad keilmuan muttashil mushannif",
        "Forum Bahtsul Masa'il berkala kontemporer",
        "Ijazah formal kepesantrenan Kemenag RI",
      ],
      fee: "Rp 250.000",
      feeLabel: "/ infaq pendaftaran seleksi",
      href: "/ppdb/daftar?program=pdf",
    },
  ];

  const amenities = [
    {
      title: "Masjid Jami' Baitul Hikmah",
      desc: "Pusat ibadah dan halaqah tahfidz berkapasitas 1.500 jamaah dengan tata suara akustik berkualitas tinggi.",
    },
    {
      title: "Laboratorium Riset & Sains",
      desc: "Workstation komputer modern, instrumen kimia, fisika, biologi, dan laboratorium robotika santri.",
    },
    {
      title: "Asrama Ergonomis 24 Jam",
      desc: "Hunian asri dan sejuk dengan kamar ber-ventilasi alami, ranjang bertingkat, dan pendampingan musyrif.",
    },
    {
      title: "Perpustakaan & e-Library",
      desc: "Koleksi lebih dari 8.000 judul kitab turats klasik, ensiklopedia Islam, dan repositori karya ilmiah digital.",
    },
    {
      title: "Pusat Talaqqi Al-Qur'an",
      desc: "Ruang halaqah khusus tahfidz yang hening dan tenang untuk muraja'ah harian bersama asatidz 30 juz.",
    },
    {
      title: "Klinik & Poskestren",
      desc: "Layanan kesehatan primer dan tenaga medis siaga 24 jam untuk menunjang kebugaran seluruh santri.",
    },
    {
      title: "Kampus Hijau 10 Hektar",
      desc: "Kawasan perbukitan sejuk Cisarua Bogor yang asri, bebas polusi, dan dilengkapi gazebo belajar alam.",
    },
    {
      title: "Koneksi Dedicated Fiber",
      desc: "Akses jaringan internet serat optik berfilter edukasi untuk mendukung simulasi CAT dan riset digital.",
    },
  ];

  const gallery = [
    {
      url: "/images/hero-campus.jpg",
      title: "Kawasan Kampus Terpadu Pesantren Darul Ulum",
    },
    {
      url: "/images/facility-mosque.jpg",
      title: "Masjid Jami' Baitul Hikmah",
    },
    {
      url: "/images/program-tahfidz.jpg",
      title: "Halaqah Tahfidz Al-Qur'an Bersanad",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#D3AD3B] selection:text-white">
      {/* ── SECTION 1: HERO ─────────────────────────────────── */}
      <section className="relative bg-[#1A1A2E] w-full min-h-[96vh] flex items-center justify-center px-6 md:px-12 pt-40 md:pt-48 pb-36">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-campus.jpg"
            alt="Kampus Pesantren Darul Ulum"
            fill
            priority
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-6 block">
            Pondok Pesantren Modern Darul Ulum
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight leading-[1.1] mb-8">
            Membina Generasi Qur&apos;ani.
            <br />
            <span className="italic text-[#FAFAF7]/90 font-normal">
              Mencetak Pemimpin Masa Depan.
            </span>
          </h1>
          <p className="text-base md:text-xl text-[#FAFAF7]/80 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Pendidikan Islam holistik di perbukitan sejuk Bogor yang memadukan
            tahfidz Al-Qur&apos;an bersanad, sains teknologi modern, dan tradisi kitab kuning klasik.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center justify-center bg-[#D3AD3B] text-white text-xs font-medium uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#CA9667] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#D3AD3B]/20"
            >
              Daftar Santri Baru
            </Link>
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center border border-white/20 text-white text-xs font-medium uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Profil Pesantren
            </Link>
          </div>
        </div>

        {/* Floating Quick Admission Widget - Centered with left-1/2 -translate-x-1/2 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-20 px-4 md:px-8 translate-y-1/2">
          <div className="bg-[#FAFAF7] border border-[#1A1A2E]/10 shadow-2xl p-5 grid grid-cols-1 md:grid-cols-5 gap-3 rounded-2xl">
            <div className="p-3 border-b md:border-b-0 md:border-r border-[#1A1A2E]/10 flex flex-col justify-center custom-select-wrapper">
              <label className="text-[10px] tracking-widest uppercase text-[#CA9667] mb-1 font-semibold block">
                Jenjang Pendidikan
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full text-xs font-medium text-[#1A1A2E] bg-transparent outline-none cursor-pointer appearance-none py-1"
              >
                <option value="MTs Unggulan Tahfidz">MTs Tahfidz (Setingkat SMP)</option>
                <option value="MA Plus Sains & Riset">MA Plus Sains (Setingkat SMA)</option>
                <option value="PDF Ulya Salafiyah">PDF Ulya (Kajian Turats)</option>
              </select>
            </div>

            <div className="p-3 border-b md:border-b-0 md:border-r border-[#1A1A2E]/10 flex flex-col justify-center custom-select-wrapper">
              <label className="text-[10px] tracking-widest uppercase text-[#CA9667] mb-1 font-semibold block">
                Jalur Seleksi
              </label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full text-xs font-medium text-[#1A1A2E] bg-transparent outline-none cursor-pointer appearance-none py-1"
              >
                <option value="Jalur Beasiswa Tahfidz">Jalur Beasiswa Tahfidz</option>
                <option value="Jalur Prestasi Sains">Jalur Prestasi Sains OSN</option>
                <option value="Jalur Reguler">Jalur Reguler Asrama</option>
              </select>
            </div>

            <div className="p-3 border-b md:border-b-0 md:border-r border-[#1A1A2E]/10 flex flex-col justify-center">
              <label className="text-[10px] tracking-widest uppercase text-[#CA9667] mb-1 font-semibold block">
                Tahun Ajaran
              </label>
              <span className="text-xs font-medium text-[#1A1A2E] block py-1">
                2026/2027 (Gelombang 1)
              </span>
            </div>

            <div className="p-3 border-b md:border-b-0 border-[#1A1A2E]/10 flex flex-col justify-center">
              <label className="text-[10px] tracking-widest uppercase text-[#CA9667] mb-1 font-semibold block">
                Kuota Tersedia
              </label>
              <span className="text-xs font-bold text-[#D3AD3B] block py-1">
                Tersisa 150 Kursi
              </span>
            </div>

            <Link
              href="/ppdb/daftar"
              className="bg-[#D3AD3B] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#CA9667] transition-all duration-300 py-3.5 md:py-0 flex items-center justify-center gap-2 rounded-full shadow-md shadow-[#D3AD3B]/20"
            >
              <span>Daftar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS & AWARDS BANNER ─────────────────── */}
      <div className="w-full bg-[#FAFAF7] pt-28 pb-12 border-b border-[#1A1A2E]/5 flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-85">
            <div className="flex items-center gap-2.5 text-xs tracking-widest uppercase text-[#2B2825] font-medium">
              <Award className="w-4 h-4 text-[#D3AD3B]" />
              Akreditasi &apos;A&apos; BAN-SM
            </div>
            <div className="w-1 h-1 bg-[#CA9667] rounded-full hidden md:block" />
            <div className="flex items-center gap-2.5 text-xs tracking-widest uppercase text-[#2B2825] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#D3AD3B]" />
              Pesantren Mandiri Kemenag RI
            </div>
            <div className="w-1 h-1 bg-[#CA9667] rounded-full hidden md:block" />
            <div className="flex items-center gap-2.5 text-xs tracking-widest uppercase text-[#2B2825] font-medium">
              <Star className="w-4 h-4 text-[#D3AD3B]" />
              Sanad Tahfidz 30 Juz Muttashil
            </div>
            <div className="w-1 h-1 bg-[#CA9667] rounded-full hidden md:block" />
            <div className="flex items-center gap-2.5 text-xs tracking-widest uppercase text-[#2B2825] font-medium">
              <Trophy className="w-4 h-4 text-[#D3AD3B]" />
              Medali Emas OSN Fisika 2025
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: THE INVITATION (NILAI LUHUR) ────────── */}
      <section className="relative w-full bg-[#FAFAF7] py-24 md:py-36 px-6 overflow-hidden flex flex-col items-center justify-center">
        {/* Decorative Quote Mark */}
        <div className="absolute top-0 left-4 md:left-24 text-[#CA9667] opacity-[0.04] font-serif text-[18rem] md:text-[26rem] leading-none select-none pointer-events-none">
          &ldquo;
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A2E] font-medium tracking-tight mb-8">
            Ruang pembinaan adab &amp; ilmu yang seimbang.
          </h2>
          <p className="text-lg md:text-xl text-[#2B2825]/80 font-light leading-relaxed mb-6">
            Di tengah perubahan zaman yang serba cepat, santri Darul Ulum dibekali
            keteguhan akidah, hafalan Al-Qur&apos;an yang terjaga, serta kecakapan riset sains modern
            agar mampu memimpin peradaban dengan hikmah dan keteladanan.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: THE FOUR PILLARS ───────────────────── */}
      <section className="w-full bg-white py-24 md:py-36 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-4 block">
              Empat Pilar Utama
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A2E] font-medium tracking-tight mb-6">
              Fondasi kokoh pembinaan santri unggul.
            </h2>
            <p className="text-base text-[#2B2825]/70 font-light leading-relaxed">
              Empat dimensi yang menyatu dalam keseharian asrama dan ruang belajar terpadu.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {fourPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAF7] p-8 md:p-10 rounded-2xl border border-[#1A1A2E]/5 hover:border-[#CA9667]/30 hover:bg-white hover:shadow-xl hover:shadow-[#1A1A2E]/5 transition-all duration-500 group flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-[#CA9667]/10 flex items-center justify-center mb-8 group-hover:bg-[#CA9667] transition-colors duration-500 text-[#CA9667] group-hover:text-white">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#1A1A2E] font-medium tracking-tight mb-4">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#2B2825]/70 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: MEET FOUNDER & SEJARAH (EDITORIAL SPLIT) */}
      <section className="w-full bg-[#FAFAF7] py-24 md:py-36 px-6 md:px-12 border-y border-[#1A1A2E]/5 flex justify-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#CA9667]/10 rounded-[2rem] translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-campus.jpg"
                alt="Sejarah Pesantren Darul Ulum"
                fill
                className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6 bg-[#1A1A2E] text-white p-4 rounded-xl shadow-lg border border-[#D3AD3B]/30">
                <div className="font-serif text-2xl font-medium tracking-tight text-[#D3AD3B]">
                  1981
                </div>
                <div className="text-[9px] tracking-widest uppercase text-[#FAFAF7]/70 font-medium mt-1">
                  Didirikan
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-6">
              Sejarah &amp; Manhaj
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A2E] font-medium tracking-tight mb-8 leading-tight">
              Empat dekade membina santri beradab &amp; mendunia.
            </h2>
            <div className="text-base text-[#2B2825]/80 font-light leading-relaxed space-y-6 mb-10">
              <p>
                Didirikan pada tahun 1981 di kawasan sejuk Cisarua Bogor oleh Al-Maghfurlah KH. Abdul Fattah Alhafidz,
                Darul Ulum bermula dari halaqah sederhana 12 santri dan kini telah menaungi lebih dari 1.250 santri mukim.
              </p>
              <p>
                Kami memegang teguh tradisi keilmuan Islam ahlussunnah wal jama&apos;ah, memuliakan guru, dan senantiasa
                adaptif menyerap riset sains teknologi demi kemaslahatan umat.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 w-full border-y border-[#1A1A2E]/10 py-6 mb-10">
              <div>
                <div className="font-serif text-3xl text-[#1A1A2E] tracking-tight">1.250+</div>
                <div className="text-[10px] tracking-widest uppercase text-[#2B2825]/60 mt-1">Santri Mukim</div>
              </div>
              <div className="border-l border-[#1A1A2E]/10 pl-6">
                <div className="font-serif text-3xl text-[#1A1A2E] tracking-tight">45<span className="text-[#D3AD3B]">+</span></div>
                <div className="text-[10px] tracking-widest uppercase text-[#2B2825]/60 mt-1">Tahun Khidmah</div>
              </div>
              <div className="border-l border-[#1A1A2E]/10 pl-6">
                <div className="font-serif text-3xl text-[#1A1A2E] tracking-tight">100<span className="text-[#D3AD3B]">%</span></div>
                <div className="text-[10px] tracking-widest uppercase text-[#2B2825]/60 mt-1">Lolos PTN/PTKIN</div>
              </div>
            </div>

            <Link
              href="/tentang"
              className="group inline-flex items-center gap-3 text-[#1A1A2E] font-medium text-sm border-b border-[#1A1A2E]/20 pb-1 hover:border-[#1A1A2E] transition-colors"
            >
              <span>Pelajari Profil &amp; Manhaj Pesantren</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION: ACADEMIC SHOWCASE TABS ─────────────────── */}
      <section className="w-full py-24 md:py-36 bg-white flex justify-center" id="programs">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-4 block">
              Program Pendidikan
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-4">
              Pilihan Jenjang Terpadu
            </h2>
            <p className="text-sm text-[#2B2825]/70 font-light">
              Setiap jenjang memadukan kurikulum keislaman komprehensif dengan keunggulan sains mutakhir.
            </p>
          </div>

          {/* Custom Tabs */}
          <div className="flex justify-center overflow-x-auto no-scrollbar gap-3 mb-12">
            {programsData.map((prog, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 text-xs tracking-widest uppercase font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#1A1A2E] text-white shadow-md"
                    : "bg-[#FAFAF7] text-[#2B2825]/70 hover:bg-[#1A1A2E]/5"
                }`}
              >
                {prog.name.split(" ")[0]} {prog.name.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Active Panel */}
          {programsData[activeTab] && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-10 bg-[#FAFAF7] border border-[#1A1A2E]/5 rounded-3xl overflow-hidden shadow-xl shadow-[#1A1A2E]/5">
              <div className="lg:col-span-3 relative h-[360px] lg:h-auto overflow-hidden group">
                <Image
                  src={programsData[activeTab].image}
                  alt={programsData[activeTab].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-6 left-6 bg-[#1A1A2E] text-white px-3.5 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-medium shadow-md">
                  {programsData[activeTab].badge}
                </div>
              </div>

              <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 block font-semibold">
                    {programsData[activeTab].subtitle}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-medium text-[#1A1A2E] tracking-tight mb-4">
                    {programsData[activeTab].name}
                  </h3>
                  <p className="text-sm text-[#2B2825]/80 mb-8 leading-relaxed font-light">
                    {programsData[activeTab].desc}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-4 mb-8">
                    {programsData[activeTab].specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2.5 text-xs text-[#2B2825] font-light">
                        <CheckCircle2 className="w-4 h-4 text-[#D3AD3B] flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#1A1A2E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="font-serif text-2xl text-[#1A1A2E] tracking-tight">
                      {programsData[activeTab].fee}
                      <span className="text-xs font-sans font-light text-[#2B2825]/60 tracking-normal ml-1">
                        {programsData[activeTab].feeLabel}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={programsData[activeTab].href}
                    className="w-full sm:w-auto bg-[#D3AD3B] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#CA9667] transition-all px-6 py-3.5 rounded-full shadow-md text-center"
                  >
                    Daftar Jenjang Ini
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: SINTESIS SAINS & AUDIO SHOWCASE (DARK HERO SECTION) */}
      <section className="w-full bg-[#1A1A2E] py-24 md:py-36 px-6 md:px-12 text-white overflow-hidden flex justify-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-6">
              Sintesis Sains &amp; Qur&apos;ani
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
              Keseimbangan akal, ruhani &amp; adab.
            </h2>
            <p className="text-base md:text-lg text-[#FAFAF7]/70 font-light leading-relaxed mb-10">
              Santri dididik menguasai metodologi riset sains modern dan bahasa internasional
              tanpa melepaskan ketundukan spiritual melalui halaqah Al-Qur&apos;an dan kajian kitab kuning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/ppdb/daftar"
                className="inline-flex items-center justify-center gap-3 bg-[#D3AD3B] text-white px-8 py-4 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-[#CA9667] transition-all shadow-lg shadow-[#D3AD3B]/20"
              >
                Daftar Beasiswa Riset
              </Link>
              <Link
                href="/program"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-8 py-4 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Eksplorasi Kurikulum
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            {/* Elegant Halaqah Audio Player Mockup */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-md mx-auto lg:ml-auto">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                <Image
                  src="/images/program-tahfidz.jpg"
                  alt="Murottal Halaqah"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center text-center md:text-left flex-1 w-full">
                <span className="text-[#D3AD3B] text-xs uppercase tracking-wider font-medium mb-2">
                  Murottal Santri Darul Ulum
                </span>
                <h4 className="font-serif text-lg text-white font-medium mb-1 leading-tight">
                  Surah Ar-Rahman (Ayat 1–30)
                </h4>
                <p className="text-xs text-white/50 mb-5">Hafidz 30 Juz · Sanad Asyrah</p>

                {/* Mock Controls */}
                <div className="flex items-center justify-center md:justify-start gap-6 text-white/70">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="hover:text-white transition-colors"
                    title="Ulangi"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-white text-[#1A1A2E] flex items-center justify-center hover:scale-105 transition-transform shadow-lg cursor-pointer"
                    title={isPlaying ? "Jeda" : "Putar"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-[#1A1A2E] ml-0.5" />}
                  </button>
                  <span className="text-xs font-mono text-[#D3AD3B]">
                    {isPlaying ? "02:45 / 07:12" : "00:00 / 07:12"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-5 overflow-hidden">
                  <div
                    className="h-full bg-[#D3AD3B] rounded-full transition-all duration-300"
                    style={{ width: isPlaying ? "38%" : "8%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: FACILITIES 8-GRID ─────────────────────── */}
      <section className="w-full py-24 md:py-36 bg-white border-b border-[#1A1A2E]/5 flex justify-center" id="facilities">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="w-full mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A2E]/10 pb-8">
            <div>
              <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-3">
                Sarana &amp; Fasilitas
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight">
                Kampus Representatif &amp; Asri
              </h2>
            </div>
            <p className="text-sm text-[#2B2825]/70 max-w-sm font-light">
              Lingkungan belajar 10 hektar di perbukitan Cisarua Bogor dengan sarana modern terpadu.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF7] p-8 rounded-2xl border border-[#1A1A2E]/5 hover:border-[#CA9667]/30 hover:bg-white hover:shadow-xl hover:shadow-[#1A1A2E]/5 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#CA9667]/10 flex items-center justify-center font-serif text-[#CA9667] font-semibold text-sm mb-6 group-hover:bg-[#CA9667] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-medium text-[#1A1A2E] mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: GALLERY ───────────────────────────────── */}
      <section className="w-full py-24 md:py-36 bg-[#FAFAF7] flex justify-center" id="gallery">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="w-full flex justify-between items-end mb-12 border-b border-[#1A1A2E]/10 pb-8">
            <div>
              <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-3">
                Dokumentasi Visual
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight">
                Galeri Suasana Kampus
              </h2>
            </div>
            <Link
              href="/fasilitas"
              className="hidden sm:inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#1A1A2E] border-b border-[#1A1A2E]/20 pb-0.5 hover:border-[#1A1A2E] transition-colors"
            >
              <span>Lihat Seluruh Fasilitas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Big Main Image */}
            <div
              className="col-span-2 row-span-2 h-[320px] md:h-[580px] relative group overflow-hidden cursor-pointer rounded-3xl shadow-md"
              onClick={() => setLightboxImg(gallery[0].url)}
            >
              <Image
                src={gallery[0].url}
                alt={gallery[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-[#1A1A2E]/0 group-hover:bg-[#1A1A2E]/40 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Sub Image 1 */}
            <div
              className="h-[155px] md:h-[280px] relative group overflow-hidden cursor-pointer rounded-2xl shadow-sm"
              onClick={() => setLightboxImg(gallery[1].url)}
            >
              <Image
                src={gallery[1].url}
                alt={gallery[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#1A1A2E]/0 group-hover:bg-[#1A1A2E]/40 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Sub Image 2 */}
            <div
              className="h-[155px] md:h-[280px] relative group overflow-hidden cursor-pointer rounded-2xl shadow-sm"
              onClick={() => setLightboxImg(gallery[2].url)}
            >
              <Image
                src={gallery[2].url}
                alt={gallery[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#1A1A2E]/0 group-hover:bg-[#1A1A2E]/40 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: PPDB OFFERS & BEASISWA ────────────────── */}
      <section className="w-full py-24 md:py-36 bg-white flex justify-center" id="offers">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Penerimaan Santri Baru 2026/2027
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-4">
              Jalur Masuk &amp; Skema Beasiswa
            </h2>
            <p className="text-sm text-[#2B2825]/70 font-light">
              Tersedia beasiswa penuh bagi calon santri berprestasi hafalan Al-Qur&apos;an dan olimpiade sains.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Offer 1 */}
            <div className="bg-[#FAFAF7] rounded-2xl border border-[#1A1A2E]/5 shadow-sm overflow-hidden flex flex-col group hover:border-[#CA9667]/30 hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="h-52 overflow-hidden relative">
                <Image
                  src="/images/program-tahfidz.jpg"
                  alt="Beasiswa Tahfidz"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium text-[#1A1A2E] shadow-sm">
                  Beasiswa Penuh
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-medium text-[#1A1A2E] tracking-tight mb-3">
                  Jalur Tahfidz Al-Qur&apos;an
                </h3>
                <p className="text-xs text-[#2B2825]/70 leading-relaxed mb-6 flex-grow font-light">
                  Bebas biaya pendidikan &amp; asrama bagi calon santri dengan hafalan minimal 5–10 Juz mutqin.
                </p>
                <div className="flex items-center justify-between border-t border-[#1A1A2E]/10 pt-6">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1A2E]">
                      Infaq Rp 0,- (Full)
                    </div>
                  </div>
                  <Link
                    href="/ppdb/daftar"
                    className="text-xs tracking-widest uppercase font-medium text-[#D3AD3B] hover:text-[#CA9667] transition-colors"
                  >
                    Daftar &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="bg-[#FAFAF7] rounded-2xl border border-[#1A1A2E]/5 shadow-sm overflow-hidden flex flex-col group hover:border-[#CA9667]/30 hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="h-52 overflow-hidden relative">
                <Image
                  src="/images/facility-lab.jpg"
                  alt="Prestasi Sains"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium text-[#1A1A2E] shadow-sm">
                  Prestasi Sains
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-medium text-[#1A1A2E] tracking-tight mb-3">
                  Jalur Riset &amp; OSN
                </h3>
                <p className="text-xs text-[#2B2825]/70 leading-relaxed mb-6 flex-grow font-light">
                  Potongan infaq sarana 50% bagi juara olimpiade sains/matematika tingkat kabupaten/provinsi.
                </p>
                <div className="flex items-center justify-between border-t border-[#1A1A2E]/10 pt-6">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1A2E]">
                      Potongan 50%
                    </div>
                  </div>
                  <Link
                    href="/ppdb/daftar"
                    className="text-xs tracking-widest uppercase font-medium text-[#D3AD3B] hover:text-[#CA9667] transition-colors"
                  >
                    Daftar &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="bg-[#FAFAF7] rounded-2xl border border-[#1A1A2E]/5 shadow-sm overflow-hidden flex flex-col group hover:border-[#CA9667]/30 hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="h-52 overflow-hidden relative">
                <Image
                  src="/images/hero-campus.jpg"
                  alt="Jalur Reguler"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium text-[#1A1A2E] shadow-sm">
                  Reguler Asrama
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-medium text-[#1A1A2E] tracking-tight mb-3">
                  Jalur Reguler Terpadu
                </h3>
                <p className="text-xs text-[#2B2825]/70 leading-relaxed mb-6 flex-grow font-light">
                  Seleksi tes potensi akademik, tes membaca Al-Qur&apos;an, dan kesiapan tinggal di asrama modern.
                </p>
                <div className="flex items-center justify-between border-t border-[#1A1A2E]/10 pt-6">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1A2E]">
                      Infaq Rp 250.000
                    </div>
                  </div>
                  <Link
                    href="/ppdb/daftar"
                    className="text-xs tracking-widest uppercase font-medium text-[#D3AD3B] hover:text-[#CA9667] transition-colors"
                  >
                    Daftar &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: CONTACT & SECRETARIAT ─────────────────── */}
      <section className="w-full py-24 md:py-36 bg-[#FAFAF7] border-t border-[#1A1A2E]/5 flex justify-center" id="contact">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Sekretariat &amp; Informasi
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-8">
              Layanan Informasi &amp; Kunjungan Kampus
            </h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Pesan Anda telah diterima oleh panitia sekretariat Darul Ulum.");
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                    Nama Wali Santri
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    className="input-editorial"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    className="input-editorial"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  className="input-editorial"
                />
              </div>

              <div className="custom-select-wrapper">
                <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                  Topik Pertanyaan
                </label>
                <select className="input-editorial appearance-none cursor-pointer">
                  <option>Informasi Pendaftaran (PPDB)</option>
                  <option>Konsultasi Program MTs / MA</option>
                  <option>Skema Beasiswa Tahfidz</option>
                  <option>Jadwal Kunjungan Kampus</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                  Isi Pesan
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan Anda..."
                  className="input-editorial resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#D3AD3B] hover:bg-[#CA9667] text-white text-xs tracking-widest uppercase font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#D3AD3B]/20 cursor-pointer w-full sm:w-auto"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="lg:pl-12 lg:border-l border-[#1A1A2E]/10 flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold mb-2">
                  Alamat Kampus
                </h3>
                <p className="text-lg font-serif text-[#1A1A2E] tracking-tight font-medium">
                  Pondok Pesantren Modern Darul Ulum
                </p>
                <p className="text-sm text-[#2B2825]/70 mt-1 font-light leading-relaxed">
                  Jl. Pesantren Luhur No. 99, Cisarua, Bogor, Jawa Barat 16750
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold mb-2">
                  Layanan WhatsApp PPDB
                </h3>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-serif text-[#1A1A2E] tracking-tight hover:text-[#D3AD3B] transition-colors font-medium"
                >
                  +62 812-3456-7890
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 border border-[#1A1A2E]/10 bg-white rounded-2xl relative overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps?q=Cisarua,+Bogor,+West+Java&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX POPUP ────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-[#1A1A2E]/95 z-[5000] flex items-center justify-center backdrop-blur-md p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white hover:text-[#D3AD3B] transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh] w-full h-[600px]">
            <Image
              src={lightboxImg}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
