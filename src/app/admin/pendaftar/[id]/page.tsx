"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  HeartHandshake,
  ShieldCheck,
  ExternalLink,
  Loader2,
  Save,
  AlertCircle,
  Edit,
  Eye,
} from "lucide-react";

interface DocumentItem {
  id: string;
  type: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  status: "PENDING" | "VALID" | "INVALID";
  verificationNote?: string;
  createdAt: string;
}

interface ParentData {
  fatherName: string;
  fatherNik?: string;
  fatherOccupation?: string;
  fatherPhone?: string;
  motherName: string;
  motherNik?: string;
  motherOccupation?: string;
  motherPhone?: string;
  guardianName?: string;
  guardianPhone?: string;
}

interface ApplicantDetail {
  id: string;
  registrationNumber: string;
  fullName: string;
  gender: string;
  nik: string;
  nisn: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  city: string;
  province: string;
  schoolOrigin: string;
  npsn?: string;
  status: "BARU" | "VERIFIKASI" | "SELEKSI" | "LULUS" | "DITOLAK" | "DAFTAR_ULANG" | "DITERIMA";
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
  program: { name: string; level: string };
  period: { name: string; academicYear: string };
  parent: ParentData;
  documents: DocumentItem[];
}

export default function AdminApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [applicant, setApplicant] = useState<ApplicantDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State for Status Update
  const [status, setStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState("");

  // Document Verification State
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [docStatus, setDocStatus] = useState<string>("VALID");
  const [docNote, setDocNote] = useState<string>("");
  const [isSavingDoc, setIsSavingDoc] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applicants/${id}`);
      const json = await res.json();
      if (json.success) {
        setApplicant(json.data);
        setStatus(json.data.status);
        setNotes(json.data.notes || "");
        setRejectionReason(json.data.rejectionReason || "");
      }
    } catch (err) {
      console.error("Gagal memuat detail pendaftar", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingStatus(true);
    setStatusFeedback("");

    try {
      const res = await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_STATUS",
          status,
          notes,
          rejectionReason,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal mengupdate status.");
      }

      setStatusFeedback("Status pendaftar berhasil diperbarui!");
      fetchDetail();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setStatusFeedback(`Error: ${msg}`);
    } finally {
      setIsSavingStatus(false);
    }
  };

  const handleUpdateDocument = async (docId: string, newStatus: string, note: string) => {
    setIsSavingDoc(true);
    try {
      const res = await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_DOCUMENT",
          documentId: docId,
          status: newStatus,
          verificationNote: note,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSelectedDoc(null);
        fetchDetail();
      }
    } catch (err) {
      console.error("Gagal memverifikasi dokumen", err);
    } finally {
      setIsSavingDoc(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#0B3521]">
        <Loader2 className="w-10 h-10 animate-spin text-[#E5A81E] mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#0A8B46] font-medium">
          Memuat Detail Calon Santri...
        </span>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-[#0B3521]/5 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="font-serif text-xl font-medium text-[#0B3521]">Data Tidak Ditemukan</h2>
        <Link
          href="/admin/pendaftar"
          className="inline-block text-xs uppercase tracking-widest font-medium text-[#E5A81E] border-b border-[#E5A81E]"
        >
          Kembali ke Tabel Pendaftar
        </Link>
      </div>
    );
  }

  const getDocTypeLabel = (t: string) => {
    switch (t) {
      case "KK":
        return "Kartu Keluarga (KK)";
      case "AKTA":
        return "Akta Kelahiran";
      case "IJAZAH_SKL":
        return "Ijazah / SKL / Rapor";
      case "FOTO":
        return "Pas Foto Calon Santri (3x4)";
      default:
        return t;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back Button & Top Action */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/pendaftar"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B3521] hover:text-[#E5A81E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Pendaftar</span>
        </Link>

        <div className="text-xs text-[#2B2825]/60 font-light">
          Registrasi: <span className="font-mono font-bold text-[#0B3521]">{applicant.registrationNumber}</span>
        </div>
      </div>

      {/* Main Applicant Identity Banner */}
      <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0B3521] text-[#E5A81E] font-serif font-bold text-2xl flex items-center justify-center shadow-md border border-[#E5A81E]/30">
            {applicant.fullName.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#E5A81E] font-semibold block mb-1">
              {applicant.program.name} ({applicant.program.level})
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3521] tracking-tight">
              {applicant.fullName}
            </h1>
            <div className="text-xs text-[#2B2825]/70 mt-1 font-light flex flex-wrap gap-4">
              <span>NIK: {applicant.nik}</span>
              <span>&bull;</span>
              <span>NISN: {applicant.nisn || "-"}</span>
              <span>&bull;</span>
              <span>{applicant.city}, {applicant.province}</span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block mb-1">
            Status Berkas Saat Ini
          </span>
          <span className="text-xs font-bold uppercase tracking-widest bg-[#0B3521] text-[#E5A81E] border border-[#E5A81E]/40 px-4 py-2 rounded-full inline-block">
            {applicant.status}
          </span>
        </div>
      </div>

      {/* Grid 2 Columns: Left (Data Details), Right (Status Action & Document Verification) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Data Santri & Ortu */}
        <div className="lg:col-span-7 space-y-8">
          {/* Data Calon Santri Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
              <User className="w-5 h-5 text-[#E5A81E]" />
              <h2 className="font-serif text-lg font-medium text-[#0B3521]">
                Data Diri Calon Santri
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#2B2825]/50 font-semibold block mb-1">
                  Tempat &amp; Tgl Lahir
                </span>
                <span className="font-medium text-[#0B3521]">
                  {applicant.birthPlace}, {new Date(applicant.birthDate).toLocaleDateString("id-ID")}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#2B2825]/50 font-semibold block mb-1">
                  Jenis Kelamin
                </span>
                <span className="font-medium text-[#0B3521]">
                  {applicant.gender === "MALE" ? "Laki-laki (Putra)" : "Perempuan (Putri)"}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#2B2825]/50 font-semibold block mb-1">
                  Asal Sekolah &amp; NPSN
                </span>
                <span className="font-medium text-[#0B3521]">
                  {applicant.schoolOrigin} (NPSN: {applicant.npsn || "-"})
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#2B2825]/50 font-semibold block mb-1">
                  Alamat Tempat Tinggal
                </span>
                <span className="font-medium text-[#0B3521]">
                  {applicant.address}, {applicant.city}, {applicant.province}
                </span>
              </div>
            </div>
          </div>

          {/* Data Orang Tua Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
              <HeartHandshake className="w-5 h-5 text-[#0A8B46]" />
              <h2 className="font-serif text-lg font-medium text-[#0B3521]">
                Data Orang Tua / Wali
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block">
                  Data Ayah Kandung
                </span>
                <div>
                  <div className="text-[10px] text-[#2B2825]/50">Nama:</div>
                  <div className="font-medium text-[#0B3521]">{applicant.parent.fatherName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2B2825]/50">Pekerjaan:</div>
                  <div className="font-medium text-[#0B3521]">{applicant.parent.fatherOccupation || "-"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2B2825]/50">WhatsApp / HP:</div>
                  <div className="font-medium text-[#E5A81E]">{applicant.parent.fatherPhone || "-"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block">
                  Data Ibu Kandung
                </span>
                <div>
                  <div className="text-[10px] text-[#2B2825]/50">Nama:</div>
                  <div className="font-medium text-[#0B3521]">{applicant.parent.motherName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2B2825]/50">Pekerjaan:</div>
                  <div className="font-medium text-[#0B3521]">{applicant.parent.motherOccupation || "-"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2B2825]/50">WhatsApp / HP:</div>
                  <div className="font-medium text-[#E5A81E]">{applicant.parent.motherPhone || "-"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status Control & Document Verification */}
        <div className="lg:col-span-5 space-y-8">
          {/* Status Update Form Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
              <ShieldCheck className="w-5 h-5 text-[#E5A81E]" />
              <h2 className="font-serif text-lg font-medium text-[#0B3521]">
                Tindakan Admin &amp; Status Seleksi
              </h2>
            </div>

            {statusFeedback && (
              <div className="p-4 rounded-2xl bg-[#E5A81E]/10 border border-[#E5A81E]/30 text-xs text-[#0B3521] font-medium">
                {statusFeedback}
              </div>
            )}

            <form onSubmit={handleUpdateStatus} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Ubah Status Pendaftar
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] font-medium focus:outline-none focus:border-[#E5A81E]"
                >
                  <option value="BARU">BARU — Pendaftaran Baru Masuk</option>
                  <option value="VERIFIKASI">VERIFIKASI — Sedang Verifikasi Berkas</option>
                  <option value="SELEKSI">SELEKSI — Mengikuti Tes Ujian</option>
                  <option value="LULUS">LULUS — Lulus Seleksi Santri</option>
                  <option value="DAFTAR_ULANG">DAFTAR_ULANG — Tahap Daftar Ulang</option>
                  <option value="DITERIMA">DITERIMA — Resmi Santri Aktif</option>
                  <option value="DITOLAK">DITOLAK — Tidak Lulus Seleksi</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Catatan Internal Panitia
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan hasil wawancara, nilai tes, atau catatan panitia..."
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl p-4 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              {status === "DITOLAK" && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-red-600 mb-2">
                    Alasan Penolakan / Berkas Tidak Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Sebutkan alasan penolakan untuk Wali Santri..."
                    className="w-full bg-red-50/50 border border-red-200 rounded-2xl p-4 text-xs text-red-900 focus:outline-none focus:border-red-400"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSavingStatus}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E5A81E] hover:bg-[#0A8B46] text-white text-xs font-semibold uppercase tracking-widest py-4 rounded-2xl transition-all shadow-md shadow-[#E5A81E]/20 cursor-pointer disabled:opacity-50"
              >
                {isSavingStatus ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Status</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Document Verification Cards */}
          <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
              <FileText className="w-5 h-5 text-[#0A8B46]" />
              <h2 className="font-serif text-lg font-medium text-[#0B3521]">
                Verifikasi Dokumen Berkas ({applicant.documents.length})
              </h2>
            </div>

            <div className="space-y-4">
              {applicant.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#FAFAF7] p-5 rounded-2xl border border-[#0B3521]/5 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-xs text-[#0B3521]">
                      {getDocTypeLabel(doc.type)}
                    </div>
                    <div className="text-[10px] text-[#2B2825]/50 truncate max-w-[180px]">
                      {doc.fileName}
                    </div>
                    <div className="mt-1">
                      <span
                        className={`text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold border ${
                          doc.status === "VALID"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : doc.status === "INVALID"
                            ? "bg-red-50 text-red-800 border-red-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-xl border border-[#0B3521]/10 text-[#0B3521] hover:text-[#E5A81E] transition-colors"
                      title="Buka / Unduh File"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setDocStatus(doc.status);
                        setDocNote(doc.verificationNote || "");
                      }}
                      className="px-3 py-2 bg-[#0B3521] text-white text-[10px] font-semibold uppercase tracking-wider rounded-xl hover:bg-[#E5A81E] transition-colors cursor-pointer"
                    >
                      Verifikasi
                    </button>
                  </div>
                </div>
              ))}

              {applicant.documents.length === 0 && (
                <div className="text-center py-6 text-xs text-[#2B2825]/50 font-light">
                  Calon santri belum mengunggah dokumen berkas.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Verification Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full p-8 rounded-3xl border border-[#0B3521]/10 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#0B3521]/10 pb-4">
              <h3 className="font-serif text-lg font-medium text-[#0B3521]">
                Verifikasi {getDocTypeLabel(selectedDoc.type)}
              </h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-[#2B2825]/40 hover:text-[#0B3521]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Status Keabsahan Berkas
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDocStatus("VALID")}
                    className={`py-3 text-xs font-semibold rounded-2xl border transition-all ${
                      docStatus === "VALID"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-[#FAFAF7] text-emerald-800 border-emerald-200"
                    }`}
                  >
                    VALID (Sesuai)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocStatus("INVALID")}
                    className={`py-3 text-xs font-semibold rounded-2xl border transition-all ${
                      docStatus === "INVALID"
                        ? "bg-red-600 text-white border-red-600 shadow-sm"
                        : "bg-[#FAFAF7] text-red-800 border-red-200"
                    }`}
                  >
                    INVALID (Buram/Salah)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Catatan Verifikasi (Jika Invalid)
                </label>
                <textarea
                  rows={3}
                  value={docNote}
                  onChange={(e) => setDocNote(e.target.value)}
                  placeholder="Contoh: Foto KK buram/tidak terbaca, harap upload ulang..."
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl p-4 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B3521]/10">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-5 py-3 text-xs uppercase tracking-widest font-medium text-[#2B2825]/70 hover:text-[#0B3521]"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={isSavingDoc}
                  onClick={() =>
                    handleUpdateDocument(selectedDoc.id, docStatus, docNote)
                  }
                  className="px-6 py-3 bg-[#E5A81E] hover:bg-[#0A8B46] text-white text-xs font-semibold uppercase tracking-widest rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSavingDoc ? "Menyimpan..." : "Simpan Verifikasi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
