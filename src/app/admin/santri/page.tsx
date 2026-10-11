"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Search,
  UserPlus,
  Printer,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Building,
  School,
  FileCheck2,
} from "lucide-react";

interface StudentItem {
  id: string;
  nis: string;
  fullName: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  entryYear: number;
  status: string;
  classGrade?: string;
  dormitoryRoom?: string;
  program: { name: string; level: string };
  applicant?: { registrationNumber: string };
}

interface ApplicantCandidate {
  id: string;
  registrationNumber: string;
  fullName: string;
  program: { name: string; level: string };
}

export default function AdminSantriPage() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Conversion Modal State
  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<ApplicantCandidate[]>([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState("");
  const [classGrade, setClassGrade] = useState("Kelas 7A");
  const [dormitoryRoom, setDormitoryRoom] = useState("Asrama Kampus Utama Kamar 01");
  const [isConverting, setIsConverting] = useState(false);
  const [convertFeedback, setConvertFeedback] = useState("");

  // Printable Card State
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<StudentItem | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: "10",
      });
      const res = await fetch(`/api/admin/students?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setStudents(json.data.students);
        setTotalPages(json.data.pagination.totalPages);
        setTotalCount(json.data.pagination.total);
      }
    } catch (err) {
      console.error("Gagal memuat data santri", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const loadCandidates = async () => {
    try {
      const res = await fetch("/api/admin/applicants?status=DAFTAR_ULANG&limit=50");
      const json = await res.json();
      if (json.success) {
        setCandidates(json.data.applicants);
        if (json.data.applicants.length > 0) {
          setSelectedApplicantId(json.data.applicants[0].id);
        }
      }
    } catch (err) {
      console.error("Gagal memuat kandidat santri", err);
    }
  };

  const handleOpenConvertModal = () => {
    setConvertModalOpen(true);
    setConvertFeedback("");
    loadCandidates();
  };

  const handleExecuteConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplicantId) return;

    setIsConverting(true);
    setConvertFeedback("");

    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantId: selectedApplicantId,
          classGrade,
          dormitoryRoom,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal mengonversi pendaftar.");
      }

      setConvertFeedback("Berhasil mengonversi calon santri menjadi Santri Resmi Aktif!");
      setTimeout(() => {
        setConvertModalOpen(false);
        fetchStudents();
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setConvertFeedback(`Error: ${msg}`);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block mb-1">
            Buku Induk Santri
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3521] tracking-tight">
            Data Santri Resmi Aktif
          </h1>
          <p className="text-xs text-[#2B2825]/70 mt-1 font-light">
            Daftar santri yang telah melengkapi administrasi daftar ulang dan memiliki NIS resmi.
          </p>
        </div>

        <button
          onClick={handleOpenConvertModal}
          className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold bg-[#E5A81E] hover:bg-[#0A8B46] text-white px-6 py-3.5 rounded-full transition-all shadow-md shadow-[#E5A81E]/20 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Konversi Santri Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#0B3521]/5 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            fetchStudents();
          }}
          className="flex gap-3"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2B2825]/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan NIS, Nama Santri, atau NISN..."
              className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0B3521] hover:bg-[#E5A81E] text-white px-6 py-3 rounded-2xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
          >
            Cari Santri
          </button>
        </form>
      </div>

      {/* Main Table */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0B3521]">
            Menampilkan <span className="text-[#E5A81E] font-bold">{students.length}</span> dari{" "}
            <span className="font-bold">{totalCount}</span> Santri Aktif
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#0B3521]/10 text-[10px] uppercase tracking-widest text-[#2B2825]/60">
                <th className="py-3 px-3">NIS Resmi</th>
                <th className="py-3 px-3">Nama Santri</th>
                <th className="py-3 px-3">Program Pendidikan</th>
                <th className="py-3 px-3">Kelas &amp; Asrama</th>
                <th className="py-3 px-3">Tahun Masuk</th>
                <th className="py-3 px-3 text-right">Kartu Santri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B3521]/5 font-light">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-[#FAFAF7] transition-colors">
                  <td className="py-4 px-3 font-mono font-bold text-[#E5A81E]">{st.nis}</td>
                  <td className="py-4 px-3 font-medium text-[#0B3521]">
                    <div>{st.fullName}</div>
                    <div className="text-[10px] text-[#2B2825]/50">
                      {st.gender === "MALE" ? "Putra" : "Putri"}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-medium text-[#0B3521]">{st.program.name}</div>
                    <div className="text-[10px] text-[#0A8B46] uppercase">{st.program.level}</div>
                  </td>
                  <td className="py-4 px-3 text-[#2B2825]/80">
                    <div className="font-medium">{st.classGrade || "-"}</div>
                    <div className="text-[10px] text-[#2B2825]/50">{st.dormitoryRoom || "-"}</div>
                  </td>
                  <td className="py-4 px-3 font-medium text-[#0B3521]">{st.entryYear}</td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => setSelectedStudentForCard(st)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#0B3521] bg-[#FAFAF7] hover:bg-[#0B3521] hover:text-white border border-[#0B3521]/10 px-3.5 py-2 rounded-full transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#E5A81E]" />
                      <span>Cetak Kartu</span>
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && students.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#2B2825]/50 font-light">
                    Belum ada data santri aktif terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#0B3521]/10">
          <div className="text-xs text-[#2B2825]/60 font-light">
            Halaman <span className="font-semibold text-[#0B3521]">{page}</span> dari{" "}
            <span className="font-semibold text-[#0B3521]">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-2 bg-[#FAFAF7] border border-[#0B3521]/10 rounded-xl disabled:opacity-40 hover:bg-[#0B3521] hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className="p-2 bg-[#FAFAF7] border border-[#0B3521]/10 rounded-xl disabled:opacity-40 hover:bg-[#0B3521] hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Conversion Modal */}
      {convertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full p-8 rounded-3xl border border-[#0B3521]/10 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#0B3521]/10 pb-4">
              <h3 className="font-serif text-lg font-medium text-[#0B3521]">
                Konversi Calon Santri &rarr; Santri Resmi
              </h3>
              <button
                onClick={() => setConvertModalOpen(false)}
                className="text-[#2B2825]/40 hover:text-[#0B3521]"
              >
                ✕
              </button>
            </div>

            {convertFeedback && (
              <div className="p-4 rounded-2xl bg-[#E5A81E]/10 border border-[#E5A81E]/30 text-xs text-[#0B3521] font-medium">
                {convertFeedback}
              </div>
            )}

            <form onSubmit={handleExecuteConversion} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Pilih Calon Santri (Status: Daftar Ulang)
                </label>
                <select
                  value={selectedApplicantId}
                  onChange={(e) => setSelectedApplicantId(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                >
                  {candidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} — {c.registrationNumber} ({c.program.name})
                    </option>
                  ))}
                  {candidates.length === 0 && (
                    <option value="">Tidak ada calon santri berstatus DAFTAR_ULANG</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Penetapan Kelas Awal
                </label>
                <input
                  type="text"
                  required
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  placeholder="Contoh: Kelas 7A / Kelas 10 IPA 1"
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Penetapan Kamar Asrama
                </label>
                <input
                  type="text"
                  required
                  value={dormitoryRoom}
                  onChange={(e) => setDormitoryRoom(e.target.value)}
                  placeholder="Contoh: Asrama Al-Farabi Kamar 04"
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B3521]/10">
                <button
                  type="button"
                  onClick={() => setConvertModalOpen(false)}
                  className="px-5 py-3 text-xs uppercase tracking-widest font-medium text-[#2B2825]/70 hover:text-[#0B3521]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isConverting || !selectedApplicantId}
                  className="px-6 py-3 bg-[#E5A81E] hover:bg-[#0A8B46] text-white text-xs font-semibold uppercase tracking-widest rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isConverting ? "Proses NIS..." : "Terbitkan NIS &amp; Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Digital Student Card Modal */}
      {selectedStudentForCard && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-[#0B3521]/10 shadow-2xl space-y-6 text-center animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#0B3521]/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#E5A81E] font-bold">
                Kartu Santri Digital
              </span>
              <button
                onClick={() => setSelectedStudentForCard(null)}
                className="text-[#2B2825]/40 hover:text-[#0B3521]"
              >
                ✕
              </button>
            </div>

            {/* Card Graphic */}
            <div className="bg-[#0B3521] text-white p-6 rounded-2xl border border-[#E5A81E]/30 shadow-xl space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center border border-[#E5A81E]/40 shadow-xs">
                    <Image
                      src="/images/logo.png"
                      alt="Logo Pesantren Baitul Hidayah"
                      width={28}
                      height={28}
                      className="w-auto h-7 object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-bold tracking-tight">BAITUL HIDAYAH</div>
                    <div className="text-[8px] text-[#E5A81E] tracking-widest uppercase font-semibold">
                      PESANTREN BAITUL HIDAYAH BANDUNG
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[#E5A81E] font-bold">
                  {selectedStudentForCard.nis}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <div className="text-lg font-serif font-medium">{selectedStudentForCard.fullName}</div>
                <div className="text-xs text-[#FAFAF7]/80">{selectedStudentForCard.program.name}</div>
                <div className="text-[10px] text-[#E5A81E] uppercase tracking-widest pt-2">
                  {selectedStudentForCard.classGrade} &bull; {selectedStudentForCard.dormitoryRoom}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E5A81E] text-white text-xs uppercase tracking-widest font-semibold py-3.5 rounded-2xl shadow-md cursor-pointer hover:bg-[#0A8B46]"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Kartu Santri</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
