import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileText,
  HelpCircle,
  Users,
  Search,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Penerimaan Santri Baru (PPDB) 2026/2027 — Pesantren Modern Darul Ulum",
  description:
    "Informasi lengkap pendaftaran santri baru Pondok Pesantren Modern Darul Ulum. Jadwal gelombang, syarat berkas, beasiswa tahfidz, dan alur pendaftaran online.",
};

const gelombangList = [
  {
    nama: "Gelombang 1 — Jalur Prestasi & Tahfidz",
    periode: "1 Januari – 31 Maret 2026",
    status: "Sedang Dibuka",
    kuota: "150 Santri",
    biayaPendaftaran: "Rp 250.000",
    benefit: [
      "Prioritas penempatan asrama kampus utama",
      "Potongan infaq sarana 25% bagi peringkat 10 besar seleksi",
      "Peluang Beasiswa Penuh Tahfidz Al-Qur'an (30 Juz)",
    ],
    isPrimary: true,
  },
  {
    nama: "Gelombang 2 — Jalur Reguler",
    periode: "1 April – 30 Juni 2026",
    status: "Akan Dibuka",
    kuota: "100 Santri",
    biayaPendaftaran: "Rp 300.000",
    benefit: [
      "Pilihan jenjang MTs, MA Plus Sains, dan PDF Salafiyah",
      "Tes seleksi bertahap sesuai tanggal pendaftaran",
      "Fasilitas lengkap kurikulum nasional & kepesantrenan",
    ],
    isPrimary: false,
  },
];

const alurTahapan = [
  {
    step: "01",
    title: "Pengisian Formulir Online",
    desc: "Isi data calon santri, data orang tua/wali, serta pilih jenjang pendidikan yang diminati.",
  },
  {
    step: "02",
    title: "Upload Dokumen Berkas",
    desc: "Unggah scan KK, Akta Kelahiran, Pas Foto, dan Ijazah/SKL/Rapor terakhir dalam format PDF/JPG.",
  },
  {
    step: "03",
    title: "Dapatkan Nomor Registrasi",
    desc: "Simpan kartu bukti pendaftaran berisikan Nomor Registrasi unik (Contoh: PSB-2026-0001).",
  },
  {
    step: "04",
    title: "Verifikasi & Tes Seleksi",
    desc: "Panitia memverifikasi berkas dan calon santri mengikuti tes baca Al-Qur'an & wawancara.",
  },
  {
    step: "05",
    title: "Pengumuman & Daftar Ulang",
    desc: "Cek hasil kelulusan secara online dan selesaikan administrasi daftar ulang santri baru.",
  },
];

const syaratBerkas = [
  {
    kategori: "Persyaratan Umum",
    items: [
      "Lulus jenjang SD/MI (untuk pendaftar MTs) atau lulus SMP/MTs (untuk pendaftar MA/Salafiyah).",
      "Beragama Islam dan siap tinggal di asrama pesantren secara penuh.",
      "Sehat jasmani dan rohani serta bebas dari penyakit menular kronis.",
      "Sanggup menaati seluruh tata tertib dan disiplin santri.",
    ],
  },
  {
    kategori: "Dokumen Digital yang Diunggah (PDF / JPG)",
    items: [
      "Scan / Foto Kartu Keluarga (KK) yang masih berlaku.",
      "Scan / Foto Akta Kelahiran calon santri.",
      "Scan / Foto Ijazah atau Surat Keterangan Lulus (SKL) / Rapor semester terakhir.",
      "Pas foto resmi calon santri ukuran 3x4 (latar belakang biru/merah).",
      "Sertifikat piagam prestasi / sertifikat tahfidz (jika memiliki).",
    ],
  },
];

const faqs = [
  {
    q: "Apakah calon santri yang belum lancar membaca Al-Qur'an boleh mendaftar?",
    a: "Boleh. Pesantren memiliki program matrikulasi tahsin dan bimbingan membaca Al-Qur'an dari dasar pada 3 bulan pertama untuk memastikan seluruh santri memiliki standar bacaan yang baik.",
  },
  {
    q: "Bagaimana sistem ujian seleksi masuk pesantren?",
    a: "Ujian seleksi terdiri dari 3 tahapan: Tes Baca Tulis Al-Qur'an & Hafalan, Tes Potensi Akademik (Matematika & Bahasa Indonesia), serta Wawancara Psikologi & Kesiapan Mondok bersama calon santri dan orang tua.",
  },
  {
    q: "Apakah tersedia program beasiswa penuh?",
    a: "Ya, kami menyediakan Beasiswa Penuh (Bebas Biaya Pendidikan & Asrama) untuk calon santri yang memiliki hafalan minimal 10 Juz mutqin atau juara 1 Olimpiade Sains tingkat Provinsi/Nasional.",
  },
  {
    q: "Berapa lama proses verifikasi berkas setelah mendaftar?",
    a: "Verifikasi berkas dilakukan oleh panitia dalam waktu maksimal 2x24 jam hari kerja. Anda dapat memantau status secara langsung melalui menu Cek Status.",
  },
];

export default function PPDBPage() {
  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#D3AD3B] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#1A1A2E] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Penerimaan Santri Baru"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-4 block">
            PPDB 2026/2027
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Pendaftaran Santri Baru Online
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed mb-10">
            Sistem penerimaan terintegrasi, transparan, dan efisien. Daftarkan putra-putri Anda untuk
            menjadi generasi penghafal Al-Qur&apos;an dan saintis muslim masa depan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-[#D3AD3B] text-white px-8 py-4 rounded-full hover:bg-[#CA9667] transition-all duration-300 shadow-md shadow-[#D3AD3B]/20"
            >
              Mulai Pendaftaran Online
            </Link>
            <Link
              href="/ppdb/cek-status"
              className="inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-transparent text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <Search className="w-4 h-4 mr-2 text-[#D3AD3B]" />
              Cek Status Berkas
            </Link>
          </div>
        </div>
      </header>

      {/* ── GELOMBANG & JADWAL ─────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Jadwal &amp; Gelombang
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-4">
              Pilihan Gelombang Pendaftaran
            </h2>
            <p className="text-sm text-[#2B2825]/70 font-light">
              Kuota setiap gelombang dibatasi untuk menjaga rasio ideal santri dan asatidz pembina.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {gelombangList.map((g, idx) => (
              <div
                key={idx}
                className={`p-8 md:p-10 rounded-3xl relative flex flex-col justify-between transition-all duration-500 shadow-sm ${
                  g.isPrimary
                    ? "border border-[#D3AD3B]/50 bg-white shadow-xl shadow-[#D3AD3B]/5"
                    : "border border-[#1A1A2E]/5 bg-white"
                }`}
              >
                {g.isPrimary && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#1A1A2E] text-white font-medium text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
                    Rekomendasi
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${
                        g.isPrimary
                          ? "bg-[#D3AD3B]/10 text-[#D3AD3B]"
                          : "bg-[#1A1A2E]/5 text-[#2B2825]/60"
                      }`}
                    >
                      {g.status}
                    </span>
                    <span className="text-xs text-[#2B2825]/60 font-light flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#CA9667]" />
                      Kuota: {g.kuota}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#1A1A2E] mb-2">
                    {g.nama}
                  </h3>

                  <div className="flex items-center gap-2 text-[#2B2825]/60 text-xs mb-6 font-light">
                    <Calendar className="w-3.5 h-3.5 text-[#CA9667]" />
                    <span>{g.periode}</span>
                  </div>

                  <div className="p-5 bg-[#FAFAF7] border border-[#1A1A2E]/5 rounded-2xl mb-6">
                    <span className="text-[10px] text-[#CA9667] uppercase tracking-widest font-semibold block mb-1">
                      Infaq Pendaftaran &amp; Seleksi
                    </span>
                    <span className="text-2xl font-serif text-[#1A1A2E] font-medium">
                      {g.biayaPendaftaran}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {g.benefit.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-[#2B2825]/80 leading-relaxed font-light">
                        <CheckCircle2 className="w-4 h-4 text-[#D3AD3B] mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/ppdb/daftar"
                  className={`w-full py-3.5 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 rounded-full transition-all duration-300 ${
                    g.isPrimary
                      ? "bg-[#D3AD3B] hover:bg-[#CA9667] text-white shadow-md shadow-[#D3AD3B]/20"
                      : "bg-white text-[#1A1A2E] border border-[#1A1A2E]/20 hover:bg-[#1A1A2E] hover:text-white"
                  }`}
                >
                  <span>Pilih Gelombang Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALUR 5 TAHAP ───────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-y border-[#1A1A2E]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Alur Pendaftaran
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-4">
              5 Langkah Menjadi Santri
            </h2>
            <p className="text-sm text-[#2B2825]/70 font-light">
              Proses registrasi digital terpusat dari awal pengisian hingga penetapan santri resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {alurTahapan.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF7] p-8 rounded-2xl border border-[#1A1A2E]/5 flex flex-col justify-between hover:border-[#CA9667]/30 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#CA9667]/10 text-[#CA9667] font-serif font-bold text-base flex items-center justify-center mb-6">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#1A1A2E] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSYARATAN BERKAS ─────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Berkas Persyaratan
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight">
              Persiapan Dokumen Pendaftaran
            </h2>
            <p className="text-sm text-[#2B2825]/70 leading-relaxed font-light">
              Harap siapkan file scan/foto dokumen identitas resmi (format JPG/PNG atau PDF,
              ukuran maksimal 5 MB per file) sebelum mengisi formulir online.
            </p>

            <div className="p-6 bg-white border border-[#1A1A2E]/5 rounded-2xl text-xs text-[#2B2825]/80 leading-relaxed flex items-start gap-4 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#D3AD3B] flex-shrink-0 mt-0.5" />
              <span className="font-light">
                <strong className="font-medium text-[#1A1A2E]">Keamanan Data Terjamin:</strong> Seluruh berkas identitas calon santri dan wali
                disimpan secara aman dan terenkripsi untuk keperluan verifikasi panitia seleksi.
              </span>
            </div>

            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium bg-[#D3AD3B] hover:bg-[#CA9667] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#D3AD3B]/20"
            >
              <span>Mulai Isi Formulir Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-6">
            {syaratBerkas.map((group, idx) => (
              <div key={idx} className="bg-white border border-[#1A1A2E]/5 rounded-3xl p-8 shadow-sm">
                <h3 className="font-serif text-base font-medium text-[#1A1A2E] mb-4 flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#CA9667]" />
                  <span>{group.kategori}</span>
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-3 text-xs text-[#2B2825]/80 leading-relaxed font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D3AD3B] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ───────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-t border-[#1A1A2E]/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Tanya Jawab (FAQ)
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-4">
              Pertanyaan Seputar PPDB
            </h2>
            <p className="text-sm text-[#2B2825]/70 font-light">
              Jawaban ringkas atas pertanyaan yang sering diajukan oleh calon wali santri.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#FAFAF7] p-8 rounded-2xl border border-[#1A1A2E]/5 shadow-xs">
                <h3 className="font-serif font-medium text-[#1A1A2E] text-base mb-2 flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-[#CA9667] flex-shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#2B2825]/70 leading-relaxed pl-7 font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
