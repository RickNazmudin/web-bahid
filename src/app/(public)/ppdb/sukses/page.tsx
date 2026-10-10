"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Search,
  MessageCircle,
} from "lucide-react";

function PPDBSuksesContent() {
  const searchParams = useSearchParams();
  const nomorPendaftaran = searchParams.get("nomor") || "PSB-2026-0001";
  const nama = searchParams.get("nama") || "Calon Santri";
  const program = searchParams.get("program") || "Program Pendidikan Islam";
  const tglLahir = searchParams.get("tglLahir") || "";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(nomorPendaftaran);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#D3AD3B] selection:text-white min-h-screen">
      {/* ── HEADER ────────────────────────────────────────── */}
      <section className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden bg-[#1A1A2E] text-white text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Pendaftaran Berhasil"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]" />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#D3AD3B] text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#D3AD3B]/25">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs tracking-widest uppercase text-[#D3AD3B] font-semibold mb-3 block">
            Pendaftaran Berhasil
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4 text-white">
            Formulir Pendaftaran Diterima
          </h1>
          <p className="text-sm md:text-base text-[#FAFAF7]/80 max-w-lg mx-auto font-light leading-relaxed">
            Data calon santri telah tersimpan dalam basis data sistem seleksi santri baru. Simpan nomor registrasi berikut untuk seluruh keperluan verifikasi.
          </p>
        </div>
      </section>

      {/* ── DETAILS & ACTIONS ─────────────────────────────── */}
      <section className="w-full py-20 md:py-28 px-6 md:px-12 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-3xl mx-auto">
          {/* Nomor Pendaftaran Voucher Card */}
          <div className="bg-white rounded-3xl border border-[#1A1A2E]/5 p-8 sm:p-12 mb-10 text-center relative shadow-sm">
            <span className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold block mb-3">
              Nomor Registrasi Calon Santri
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-6">
              <span className="text-2xl sm:text-4xl font-mono font-medium text-[#1A1A2E] tracking-wider bg-[#FAFAF7] px-8 py-3.5 rounded-2xl border border-[#1A1A2E]/10">
                {nomorPendaftaran}
              </span>
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1A1A2E] hover:bg-[#2B2825] text-white transition-all flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium rounded-full shadow-md cursor-pointer"
                title="Salin Nomor"
              >
                {copied ? <Check className="w-4 h-4 text-[#D3AD3B]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Tersalin!" : "Salin"}</span>
              </button>
            </div>

            <div className="border-t border-[#1A1A2E]/5 pt-6 mt-6">
              <p className="text-xs text-[#2B2825]/70 font-light">
                Nama Santri: <strong className="font-medium text-[#1A1A2E]">{nama}</strong> &bull; Program: <strong className="font-medium text-[#1A1A2E]">{program}</strong>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <button
              onClick={handlePrint}
              className="bg-white border border-[#1A1A2E]/20 text-[#1A1A2E] text-xs tracking-widest uppercase font-medium hover:bg-[#1A1A2E] hover:text-white transition-all py-4 rounded-full flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Cetak Kartu Bukti
            </button>

            <Link
              href={`/ppdb/cek-status?nomor=${encodeURIComponent(nomorPendaftaran)}${
                tglLahir ? `&tglLahir=${encodeURIComponent(tglLahir)}` : ""
              }`}
              className="bg-[#D3AD3B] hover:bg-[#CA9667] text-white text-xs tracking-widest uppercase font-medium transition-all py-4 rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#D3AD3B]/20"
            >
              <Search className="w-4 h-4 text-white" />
              Cek Status Verifikasi
            </Link>
          </div>

          {/* Petunjuk Langkah Selanjutnya */}
          <div className="bg-white rounded-3xl border border-[#1A1A2E]/5 p-8 sm:p-10 shadow-sm space-y-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold block mb-2">
                Panduan Pasca Pendaftaran
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#1A1A2E] tracking-tight">
                Tahapan Selanjutnya
              </h2>
            </div>

            <div className="space-y-6 text-sm text-[#2B2825]/80 leading-relaxed font-light">
              <div className="flex items-start gap-4 pb-6 border-b border-[#1A1A2E]/5">
                <span className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white font-serif font-medium flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="font-medium text-[#1A1A2E] block mb-1">
                    Verifikasi Berkas Administrasi (1–2 Hari Kerja):
                  </strong>
                  <p className="text-[#2B2825]/70 text-xs font-light">
                    Sekretariat PPDB akan melakukan pengecekan keabsahan dokumen Akta Kelahiran, Kartu Keluarga, dan Ijazah/Rapor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-[#1A1A2E]/5">
                <span className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white font-serif font-medium flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="font-medium text-[#1A1A2E] block mb-1">
                    Konfirmasi WhatsApp ke Sekretariat PPDB:
                  </strong>
                  <p className="text-[#2B2825]/70 text-xs font-light mb-4">
                    Dapatkan jadwal simulasi ujian, tata tertib seleksi, dan grup informasi resmi wali santri.
                  </p>
                  <a
                    href="https://wa.me/6281234567890?text=Assalamu%27alaikum%20Panitia%20PPDB,%20saya%20sudah%20mendaftar%20dengan%20nomor%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A2E] hover:bg-[#2B2825] text-white text-xs tracking-widest uppercase font-medium rounded-full transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D3AD3B]" />
                    Konfirmasi WhatsApp Panitia
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white font-serif font-medium flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="font-medium text-[#1A1A2E] block mb-1">
                    Ujian Seleksi &amp; Wawancara:
                  </strong>
                  <p className="text-[#2B2825]/70 text-xs font-light">
                    Pelaksanaan tes baca Al-Qur&apos;an, tes akademik, dan wawancara peminatan santri &amp; orang tua sesuai jadwal yang ditentukan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase text-[#2B2825]/60 hover:text-[#1A1A2E] transition-colors font-medium inline-flex items-center gap-2"
            >
              &larr; Kembali ke Beranda Utama
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PPDBSuksesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1A2E]" />
        </div>
      }
    >
      <PPDBSuksesContent />
    </Suspense>
  );
}
