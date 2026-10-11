"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  Printer,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface StatusTimelineItem {
  key: string;
  label: string;
  desc: string;
}

interface ApplicantDoc {
  type: string;
  status: "PENDING" | "VALID" | "INVALID";
  verificationNote?: string;
  createdAt: string;
}

interface ApplicantData {
  registrationNumber: string;
  fullName: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  programName: string;
  programLevel: string;
  periodName: string;
  academicYear: string;
  status: "BARU" | "VERIFIKASI" | "SELEKSI" | "LULUS" | "DITOLAK" | "DAFTAR_ULANG" | "DITERIMA";
  currentStepIndex: number;
  rejectionReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  documents: ApplicantDoc[];
  timeline: StatusTimelineItem[];
}

function PPDBStatusContent() {
  const searchParams = useSearchParams();
  const initialNomor = searchParams.get("nomor") || "";
  const initialTglLahir = searchParams.get("tglLahir") || "";

  const [nomorPendaftaran, setNomorPendaftaran] = useState(initialNomor);
  const [birthDate, setBirthDate] = useState(initialTglLahir);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<ApplicantData | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nomorPendaftaran.trim()) {
      setErrorMsg("Harap masukkan Nomor Pendaftaran.");
      return;
    }
    if (!birthDate) {
      setErrorMsg("Harap masukkan Tanggal Lahir calon santri.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `/api/ppdb/status?registrationNumber=${encodeURIComponent(
          nomorPendaftaran.trim()
        )}&birthDate=${encodeURIComponent(birthDate)}`
      );
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Data pendaftaran tidak ditemukan. Pastikan Nomor Registrasi dan Tanggal Lahir sesuai.");
      }

      setResult(json.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memeriksa status pendaftaran.";
      setErrorMsg(msg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialNomor && initialTglLahir) {
      handleSearch();
    }
  }, [initialNomor, initialTglLahir]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "BARU":
        return {
          label: "Pendaftaran Baru",
          className: "bg-[#FAFAF7] text-[#0B3521] border-[#0B3521]/10",
        };
      case "VERIFIKASI":
        return {
          label: "Sedang Diverifikasi",
          className: "bg-[#0A8B46]/10 text-[#0A8B46] border-[#0A8B46]/30",
        };
      case "SELEKSI":
        return {
          label: "Tahap Seleksi / Ujian",
          className: "bg-[#0B3521] text-white border-[#0B3521]",
        };
      case "LULUS":
        return {
          label: "LULUS SELEKSI",
          className: "bg-[#E5A81E]/15 text-[#E5A81E] border-[#E5A81E]/40 font-semibold",
        };
      case "DAFTAR_ULANG":
        return {
          label: "Menunggu Daftar Ulang",
          className: "bg-[#0A8B46]/10 text-[#0A8B46] border-[#0A8B46]/30",
        };
      case "DITERIMA":
        return {
          label: "RESMI SANTRI AKTIF",
          className: "bg-[#0B3521] text-[#E5A81E] border-[#E5A81E]/40 font-semibold",
        };
      case "DITOLAK":
        return {
          label: "TIDAK LULUS",
          className: "bg-red-50 text-red-800 border-red-200",
        };
      default:
        return {
          label: status,
          className: "bg-[#FAFAF7] text-[#2B2825] border-[#0B3521]/10",
        };
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#E5A81E] selection:text-white min-h-screen">
      {/* ── HERO HEADER ────────────────────────────────────── */}
      <section className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden bg-[#0B3521] text-white text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Status Tracking"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3521]/80 via-[#0B3521]/50 to-[#0B3521]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#0A8B46] text-xs tracking-widest uppercase font-medium block mb-4">
            Pelacakan Status Seleksi
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">
            Cek Status Pendaftaran
          </h1>
          <p className="text-base text-[#FAFAF7]/80 max-w-lg mx-auto leading-relaxed font-light">
            Pantau status verifikasi berkas, jadwal ujian seleksi, dan pengumuman kelulusan calon santri secara berkala.
          </p>
        </div>
      </section>

      {/* ── SEARCH CARD & RESULTS ─────────────────────────── */}
      <section className="w-full py-20 md:py-28 px-6 md:px-12 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Search Box */}
          <div className="bg-white rounded-3xl border border-[#0B3521]/5 p-8 md:p-10 shadow-sm mb-12">
            <div className="mb-6">
              <span className="text-xs tracking-widest uppercase text-[#0A8B46] font-semibold block mb-1">
                Portal Pelacakan
              </span>
              <h2 className="font-serif text-xl md:text-2xl font-medium text-[#0B3521] tracking-tight">
                Masukkan Data Pendaftaran
              </h2>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              <div className="md:col-span-6">
                <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                  Nomor Registrasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nomorPendaftaran}
                  onChange={(e) => setNomorPendaftaran(e.target.value)}
                  placeholder="Contoh: PSB-2026-0001"
                  className="input-editorial font-mono uppercase tracking-wider"
                  required
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                  Tanggal Lahir Santri <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input-editorial"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E5A81E] hover:bg-[#0A8B46] text-white text-xs tracking-widest uppercase font-medium py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#E5A81E]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Cari
                </button>
              </div>
            </form>

            {errorMsg && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-start gap-3 text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Result Container */}
          {result && (
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
              {/* Header Result Card */}
              <div className="bg-white rounded-3xl border border-[#0B3521]/5 p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#0B3521]/10 pb-8 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs font-semibold text-[#0B3521] bg-[#FAFAF7] px-3.5 py-1 rounded-full border border-[#0B3521]/10">
                        {result.registrationNumber}
                      </span>
                      <span className="text-xs text-[#2B2825]/60">&bull; {result.periodName} ({result.academicYear})</span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3521] tracking-tight">
                      {result.fullName}
                    </h2>
                    <p className="text-xs text-[#2B2825]/70 mt-2 font-light">
                      Pilihan Program: <strong className="font-medium text-[#0B3521]">{result.programName}</strong> ({result.programLevel})
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-block px-4 py-2 text-xs tracking-widest uppercase font-medium border rounded-full ${
                        getStatusBadge(result.status).className
                      }`}
                    >
                      {getStatusBadge(result.status).label}
                    </span>
                  </div>
                </div>

                {/* Status Notice Messages */}
                {result.status === "LULUS" && (
                  <div className="p-6 mb-8 bg-[#E5A81E]/10 border border-[#E5A81E]/30 rounded-2xl text-[#0B3521] text-xs sm:text-sm leading-relaxed flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#E5A81E] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-medium block text-[#0B3521] mb-1">
                        Selamat! Calon santri dinyatakan Lulus Seleksi Masuk.
                      </strong>
                      <p className="text-xs text-[#2B2825]/80 font-light leading-relaxed">
                        Silakan segera selesaikan tahapan daftar ulang atau hubungi sekretariat panitia PPDB sebelum batas waktu penutupan untuk konfirmasi kuota asrama.
                      </p>
                    </div>
                  </div>
                )}

                {result.status === "DITOLAK" && (
                  <div className="p-6 mb-8 bg-red-50 border border-red-200 rounded-2xl text-red-900 text-xs sm:text-sm leading-relaxed flex items-start gap-4">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-medium block text-red-900 mb-1">
                        Mohon Maaf, Hasil Seleksi Belum Memenuhi Kriteria.
                      </strong>
                      {result.rejectionReason && (
                        <p className="text-xs text-red-800 font-light">
                          Catatan: {result.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Timeline Workflow */}
                <div className="mt-8">
                  <span className="text-xs tracking-widest uppercase text-[#0A8B46] font-semibold block mb-6">
                    Tahapan Pendaftaran &amp; Evaluasi
                  </span>

                  <div className="space-y-4">
                    {result.timeline.map((step, idx) => {
                      const isPassed = result.currentStepIndex >= idx && result.status !== "DITOLAK";
                      const isCurrent = result.currentStepIndex === idx && result.status !== "DITOLAK";

                      return (
                        <div
                          key={step.key}
                          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
                            isCurrent
                              ? "bg-[#E5A81E]/10 border-[#E5A81E]/40"
                              : isPassed
                              ? "bg-[#FAFAF7] border-[#0B3521]/5"
                              : "bg-white border-[#0B3521]/5 opacity-60"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs flex-shrink-0 ${
                              isPassed
                                ? "bg-[#0B3521] text-white"
                                : isCurrent
                                ? "bg-[#E5A81E] text-white font-bold"
                                : "bg-[#0B3521]/5 text-[#2B2825]/50"
                            }`}
                          >
                            {isPassed ? <CheckCircle2 className="w-4 h-4 text-[#E5A81E]" /> : idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-serif text-sm font-medium text-[#0B3521]">{step.label}</h4>
                            <p className="text-xs text-[#2B2825]/70 mt-1 leading-relaxed font-light">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Dokumen Administrasi */}
                {result.documents && result.documents.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-[#0B3521]/10">
                    <span className="text-xs tracking-widest uppercase text-[#0A8B46] font-semibold block mb-4">
                      Verifikasi Berkas Dokumen
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.documents.map((doc, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-4 rounded-2xl border border-[#0B3521]/5 flex items-center justify-between text-xs bg-[#FAFAF7]"
                        >
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-[#0A8B46]" />
                            <span className="font-medium text-[#0B3521]">{doc.type.replace(/_/g, " ")}</span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium border ${
                              doc.status === "VALID"
                                ? "bg-white text-[#0B3521] border-[#0B3521]/10"
                                : doc.status === "INVALID"
                                ? "bg-red-50 text-red-800 border-red-200"
                                : "bg-[#E5A81E]/10 text-[#E5A81E] border-[#E5A81E]/30"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <Link
                  href="/ppdb"
                  className="text-xs tracking-widest uppercase text-[#2B2825]/70 hover:text-[#0B3521] transition-colors font-medium"
                >
                  &larr; Informasi &amp; Alur PPDB
                </Link>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium bg-white text-[#0B3521] px-6 py-3 rounded-full border border-[#0B3521]/20 hover:bg-[#0B3521] hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak Lembar Status
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function PPDBStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B3521]" />
        </div>
      }
    >
      <PPDBStatusContent />
    </Suspense>
  );
}
