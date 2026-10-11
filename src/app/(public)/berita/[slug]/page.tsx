import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

const beritaData: Record<string, {
  judul: string;
  kategori: string;
  tanggal: string;
  penulis: string;
  konten: string;
}> = {
  "penerimaan-santri-baru-psb-2026-resmi-dibuka": {
    judul: "Pendaftaran Santri Baru Tahun Ajaran 2026/2027 Resmi Dibuka",
    kategori: "PPDB 2026",
    tanggal: "10 Januari 2026",
    penulis: "Sekretariat PPDB Baitul Hidayah",
    konten: `
      <p>Alhamdulillah, dengan memohon ridho dan taufiq Allah SWT, Pondok Pesantren Baitul Hidayah secara resmi membuka Penerimaan Santri Baru (PSB/PPDB) untuk Tahun Ajaran 2026/2027.</p>
      
      <h3>Jalur Pendaftaran yang Tersedia</h3>
      <p>Calon santri dapat memilih jalur seleksi pendaftaran sesuai dengan kualifikasi dan prestasi yang dimiliki:</p>
      <ul>
        <li><strong>Jalur Prestasi Tahfidz Al-Qur'an:</strong> Diperuntukkan bagi calon santri yang memiliki hafalan minimal 3 Juz Al-Qur'an secara mutqin. Tersedia beasiswa potongan infaq hingga beasiswa penuh.</li>
        <li><strong>Jalur Prestasi Akademik & Sains:</strong> Diperuntukkan bagi calon santri berprestasi dengan nilai rata-rata rapor minimal 85 atau peraih juara olimpiade sains/riset.</li>
        <li><strong>Jalur Reguler:</strong> Terbuka untuk seluruh lulusan SD/MI (untuk pendaftar MTs) dan SMP/MTs (untuk pendaftar MA/PDF).</li>
      </ul>

      <h3>Tahapan Pendaftaran Digital</h3>
      <p>Pendaftaran dilaksanakan secara daring (online) melalui portal resmi website pesantren. Calon wali santri cukup melengkapi formulir 5 langkah, mengunggah berkas identitas (KK, Akta Lahir, Pas Foto, Ijazah/Rapor), dan mendapatkan Nomor Registrasi untuk pemantauan status seleksi secara berkala.</p>
      
      <p>Bagi calon wali santri yang membutuhkan konsultasi langsung atau panduan teknis pengisian formulir, tim helpdesk panitia PPDB siap melayani melalui kanal WhatsApp resmi pesantren.</p>
    `,
  },
  "santri-raih-medali-emas-olimpiade-nasional": {
    judul: "Santri Baitul Hidayah Raih Medali Emas Olimpiade Sains Nasional 2025",
    kategori: "Prestasi Sains",
    tanggal: "15 Februari 2026",
    penulis: "Biro Humas & Publikasi",
    konten: `
      <p>Prestasi membanggakan kembali ditorehkan oleh santri binaan Pondok Pesantren Baitul Hidayah pada ajang bergengsi Olimpiade Sains Nasional (OSN) 2025 yang diselenggarakan di Jakarta.</p>
      
      <p>Ahmad Faruq Maulana, santri kelas XI jenjang Madrasah Aliyah (MA) Plus Riset & Sains Digital, berhasil menyabet <strong>Medali Emas Bidang Fisika</strong> setelah melalui babak penyisihan teori dan eksperimen laboratorium yang ketat.</p>

      <h3>Harmonisasi Sains dan Keislaman</h3>
      <p>Pencapaian gemilang ini menjadi bukti nyata bahwa sistem pendidikan pesantren modern yang mengintegrasikan penguatan akidah, tahfidz Al-Qur'an, dan riset sains teknologi mampu melahirkan saintis muda muslim yang unggul dan kompetitif di kancah nasional maupun internasional.</p>

      <p>Pimpinan Pondok Pesantren menyampaikan apresiasi setinggi-tingginya kepada ananda dan dewan asatidz pembina, serta berpesan agar prestasi ini senantiasa dibarengi dengan ketawadhu'an dan niat tulus untuk menebar manfaat bagi umat dan bangsa.</p>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(beritaData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const berita = beritaData[slug];
  if (!berita) return { title: "Berita Tidak Ditemukan" };
  return {
    title: `${berita.judul} — Pesantren Baitul Hidayah`,
    description: berita.konten.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = beritaData[slug];
  if (!berita) notFound();

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#E5A81E] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#0B3521] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Pesantren Baitul Hidayah"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3521]/80 via-[#0B3521]/50 to-[#0B3521]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#E5A81E] hover:text-[#E5A81E] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Warta</span>
          </Link>

          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#0B3521] bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm">
              {berita.kategori}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mb-6 leading-tight">
            {berita.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#FAFAF7]/70 pt-6 border-t border-white/10">
            <span className="flex items-center gap-1.5 font-medium text-[#E5A81E]">
              <Calendar className="w-4 h-4 text-[#E5A81E]" />
              {berita.tanggal}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#FAFAF7]/50" />
              {berita.penulis}
            </span>
          </div>
        </div>
      </header>

      {/* ── ARTICLE CONTENT ───────────────────────────────── */}
      <article className="w-full py-24 md:py-32 px-6 md:px-12 bg-white flex justify-center">
        <div className="w-full max-w-3xl mx-auto">
          <div
            className="prose prose-zinc prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0B3521] prose-p:text-[#2B2825]/80 prose-p:leading-relaxed prose-li:text-[#2B2825]/80 font-light"
            dangerouslySetInnerHTML={{ __html: berita.konten }}
          />

          {/* Divider */}
          <div className="h-px bg-[#0B3521]/10 my-16" />

          {/* Footer Nav */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/berita"
              className="inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-transparent text-[#0B3521] border border-[#0B3521]/20 px-8 py-4 rounded-full hover:bg-[#0B3521] hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Lihat Berita Lainnya
            </Link>
            <Link
              href="/ppdb/daftar"
              className="inline-flex items-center justify-center text-xs tracking-widest uppercase font-medium bg-[#E5A81E] hover:bg-[#0A8B46] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#E5A81E]/20 w-full sm:w-auto"
            >
              Daftar Santri Baru
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
