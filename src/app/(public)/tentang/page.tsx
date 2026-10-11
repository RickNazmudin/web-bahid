import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Eye,
  HeartHandshake,
  BookOpenCheck,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Pesantren Baitul Hidayah",
  description:
    "Sejarah, visi misi, manhaj keilmuan, dan susunan dewan pengasuh Pondok Pesantren Baitul Hidayah Bandung.",
};

const timeline = [
  {
    year: "1981",
    title: "Pendirian Pesantren",
    event: "Dirintis oleh Al-Maghfurlah KH. Abdul Fattah Alhafidz dengan 12 santri perdana di kawasan sejuk Ujungberung, Kota Bandung.",
  },
  {
    year: "1990",
    title: "Pengembangan MTs Unggulan",
    event: "Pembangunan gedung sekolah terpadu dan peresmian program tahfidz Al-Qur'an intensif berstandar nasional.",
  },
  {
    year: "1998",
    title: "MA Plus Sains & Riset",
    event: "Pendirian Madrasah Aliyah berbasis riset sains, laboratorium komputer, dan bimbingan bahasa Arab-Inggris aktif.",
  },
  {
    year: "2008",
    title: "Pendidikan Diniyah Formal (PDF)",
    event: "Perluasan manhaj keilmuan dengan menyelenggarakan PDF Ulya untuk pendalaman turats dan kutubus sittah.",
  },
  {
    year: "2018",
    title: "Transformasi Kampus Terpadu",
    event: "Pembangunan asrama modern berkapasitas 1.500 santri, masjid jami' 3 lantai, dan laboratorium sains digital.",
  },
  {
    year: "2026",
    title: "Era Ekosistem Digital Berkelanjutan",
    event: "Digitalisasi menyeluruh sistem seleksi PPDB Online, perpustakaan digital, dan prestasi santri di kancah global.",
  },
];

const misiList = [
  "Menyelenggarakan pendidikan tahfidz Al-Qur'an mutqin dengan sanad keilmuan yang bersambung.",
  "Memadukan kurikulum kepesantrenan klasik (turats) dengan penguasaan sains teknologi modern.",
  "Membentuk karakter santri yang berakhlak karimah, mandiri, disiplin, dan berjiwa kepemimpinan.",
  "Mempersiapkan lulusan yang kompeten untuk melanjutkan studi ke universitas ternama di dalam maupun luar negeri.",
  "Membangun ekosistem belajar yang asri, aman, islami, dan berorientasi pada kemaslahatan umat.",
];

const nilaiUtama = [
  {
    icon: BookOpenCheck,
    title: "Tafaqquh Fiddin",
    desc: "Mendalami esensi keilmuan Islam secara komprehensif, bersanad, dan berlandaskan dalil yang shahih.",
  },
  {
    icon: Target,
    title: "Itqan & Ihsan",
    desc: "Bekerja dan belajar dengan kesungguhan tingkat tinggi, ketelitian terbaik, dan orientasi kesempurnaan amal.",
  },
  {
    icon: HeartHandshake,
    title: "Ukhuwah & Adab",
    desc: "Menjunjung tinggi adab di atas ilmu, saling menghormati, mengasihi sesama, dan berjiwa sosial tinggi.",
  },
  {
    icon: ShieldCheck,
    title: "Integritas & Istiqomah",
    desc: "Memegang teguh kejujuran moral, kedisiplinan hidup, serta konsistensi dalam menegakkan kebenaran.",
  },
];

const dewanPengasuh = [
  {
    name: "KH. Muhammad Fadhil Alhafidz, M.A.",
    role: "Pimpinan Pondok Pesantren",
    desc: "Alumnus Universitas Al-Azhar Kairo & Pemegang Sanad Qira'ah 'Asyrah.",
  },
  {
    name: "Dr. H. Ahmad Zainuddin, M.Pd.I.",
    role: "Direktur Pendidikan & Akademik",
    desc: "Pakar Kurikulum Pendidikan Islam Terpadu & Dosen Pascasarjana.",
  },
  {
    name: "Ust. H. Rahmat Hidayat, Lc., M.Hum.",
    role: "Kepala Bidang Kepengasuhan & Asrama",
    desc: "Alumnus Universitas Islam Madinah & Pembina Kedisiplinan Santri.",
  },
];

export default function TentangPage() {
  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#E5A81E] selection:text-white">
      {/* ── HEADER HERO ────────────────────────────────────── */}
      <header className="relative w-full min-h-[50vh] md:min-h-[56vh] flex items-center justify-center pt-40 md:pt-48 pb-20 md:pb-24 px-6 md:px-12 bg-[#0B3521] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Kampus Pesantren"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3521]/80 via-[#0B3521]/50 to-[#0B3521]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#E5A81E] text-xs font-semibold uppercase tracking-widest mb-4 block">
            Profil Lembaga
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Sejarah, Visi &amp; Manhaj Pesantren
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Lebih dari empat dekade mendedikasikan diri untuk mencetak generasi berilmu, berakhlak,
            dan berdaya saing global di bawah bimbingan para ulama.
          </p>
        </div>
      </header>

      {/* ── VISI & MISI ───────────────────────────────────── */}
      <section className="w-full py-24 md:py-36 bg-[#FAFAF7]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Visi Card */}
            <div className="lg:col-span-5 bg-[#0B3521] text-white p-10 lg:p-12 rounded-3xl flex flex-col justify-between relative shadow-xl border border-white/10">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#0A8B46]/20 text-[#E5A81E] flex items-center justify-center mb-8">
                  <Eye className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E5A81E] block mb-3">
                  Visi Utama
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-6 leading-snug">
                  Pusat Keunggulan Generasi Qur&apos;ani yang Berwawasan Global
                </h2>
                <p className="text-[#FAFAF7]/80 text-sm leading-relaxed font-light">
                  Menjadi lembaga pendidikan Islam unggulan yang melahirkan ulama, saintis, dan pemimpin
                  berakhlak mulia dengan landasan Al-Qur&apos;an, Sunnah, dan kesiapan berkiprah di tingkat internasional.
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 text-[10px] text-[#FAFAF7]/50 uppercase tracking-widest font-medium">
                Pondok Pesantren Baitul Hidayah Bandung
              </div>
            </div>

            {/* Misi Card */}
            <div className="lg:col-span-7 bg-white border border-[#0B3521]/5 rounded-3xl p-10 lg:p-12 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#0A8B46]/10 text-[#0A8B46] flex items-center justify-center mb-8">
                  <Target className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0A8B46] block mb-3">
                  Misi Kelembagaan
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B3521] mb-6 tracking-tight">
                  Pilar Misi Strategis
                </h2>

                <ul className="space-y-5">
                  {misiList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm text-[#2B2825]/80 leading-relaxed font-light">
                      <span className="w-7 h-7 rounded-full bg-[#FAFAF7] border border-[#0B3521]/10 text-[#0B3521] font-medium text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 NILAI UTAMA (FOUR PILLARS STYLE) ────────────── */}
      <section className="w-full py-24 md:py-36 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#0A8B46] text-xs tracking-widest uppercase font-medium block mb-4">
              Nilai Pokok
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0B3521] tracking-tight">
              Nilai Utama Kepesantrenan
            </h2>
            <p className="text-sm text-[#2B2825]/70 mt-3 font-light">
              Prinsip integritas moral dan tradisi keilmuan yang ditanamkan dalam keseharian setiap santri.
            </p>
          </div>

          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {nilaiUtama.map((n, idx) => {
              const Icon = n.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAF7] p-8 md:p-10 rounded-2xl border border-[#0B3521]/5 hover:border-[#0A8B46]/30 hover:bg-white hover:shadow-xl hover:shadow-[#0B3521]/5 transition-all duration-500 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#0A8B46]/10 flex items-center justify-center mb-8 group-hover:bg-[#0A8B46] text-[#0A8B46] group-hover:text-white transition-colors duration-500">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#0B3521] mb-3">
                      {n.title}
                    </h3>
                    <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">
                      {n.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TIMELINE SEJARAH ──────────────────────────────── */}
      <section className="w-full py-24 md:py-36 bg-[#FAFAF7] border-y border-[#0B3521]/5">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center mb-20">
            <span className="text-[#0A8B46] text-xs tracking-widest uppercase font-medium block mb-4">
              Linimasa Sejarah
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0B3521] tracking-tight">
              Jejak Perjalanan Lembaga
            </h2>
            <p className="text-sm text-[#2B2825]/70 mt-2 font-light">
              Dari 12 santri di gubuk sederhana hingga berkembang menjadi kampus peradaban terpadu.
            </p>
          </div>

          <div className="w-full space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:w-[1px] before:bg-[#0B3521]/10">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 group"
              >
                <div
                  className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    idx % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:order-2 sm:pl-12"
                  }`}
                >
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0A8B46] bg-[#0A8B46]/10 px-3.5 py-1 rounded-full inline-block mb-3">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#0B3521] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">{item.event}</p>
                </div>

                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 sm:top-1/2 sm:-translate-y-1/2 w-8 h-8 rounded-full bg-[#0B3521] border-4 border-white text-[#E5A81E] flex items-center justify-center text-xs font-bold shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEWAN PENGASUH ────────────────────────────────── */}
      <section className="w-full py-24 md:py-36 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0A8B46] text-xs tracking-widest uppercase font-medium block mb-4">
              Dewan Pimpinan
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0B3521] tracking-tight">
              Dewan Pengasuh &amp; Pimpinan
            </h2>
            <p className="text-sm text-[#2B2825]/70 mt-2 font-light">
              Dibina oleh asatidz dan para pakar pendidikan berdedikasi tinggi dengan sanad keilmuan yang jelas.
            </p>
          </div>

          <div className="w-full grid md:grid-cols-3 gap-8">
            {dewanPengasuh.map((d, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF7] p-8 md:p-10 rounded-2xl border border-[#0B3521]/5 shadow-sm text-center flex flex-col justify-between hover:border-[#0A8B46]/30 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div>
                  <div className="w-20 h-20 rounded-full bg-[#0B3521] text-[#E5A81E] flex items-center justify-center mx-auto mb-6 shadow-md border border-[#E5A81E]/20">
                    <GraduationCap className="w-9 h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#0B3521] mb-1">
                    {d.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0A8B46] mb-4 uppercase tracking-wider">{d.role}</p>
                  <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center justify-center bg-[#E5A81E] text-white text-xs font-medium uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#0A8B46] transition-all duration-300 shadow-md shadow-[#E5A81E]/20"
            >
              Daftar Santri Baru 2026/2027
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
