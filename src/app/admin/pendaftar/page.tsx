"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileCheck2,
} from "lucide-react";

interface ApplicantItem {
  id: string;
  registrationNumber: string;
  fullName: string;
  gender: string;
  schoolOrigin: string;
  city: string;
  status: string;
  createdAt: string;
  program: { name: string; level: string };
  period: { name: string; academicYear: string };
  documents: Array<{ id: string; type: string; status: string }>;
}

export default function AdminPendaftarPage() {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/admin/applicants?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setApplicants(json.data.applicants);
        setTotalPages(json.data.pagination.totalPages);
        setTotalCount(json.data.pagination.total);
      }
    } catch (err) {
      console.error("Gagal memuat daftar pendaftar", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [page, status]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchApplicants();
  };

  const exportCSV = () => {
    if (applicants.length === 0) return;

    const headers = [
      "No. Registrasi",
      "Nama Lengkap",
      "Jenis Kelamin",
      "Program",
      "Asal Sekolah",
      "Kota/Kab",
      "Status",
      "Tanggal Daftar",
    ];

    const rows = applicants.map((app) => [
      app.registrationNumber,
      `"${app.fullName}"`,
      app.gender === "MALE" ? "Laki-laki" : "Perempuan",
      `"${app.program.name}"`,
      `"${app.schoolOrigin}"`,
      `"${app.city}"`,
      app.status,
      new Date(app.createdAt).toLocaleDateString("id-ID"),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `data_pendaftar_ppdb_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "BARU":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "VERIFIKASI":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "SELEKSI":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "LULUS":
        return "bg-[#D3AD3B]/20 text-[#1A1A2E] border-[#D3AD3B]/40 font-semibold";
      case "DAFTAR_ULANG":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "DITERIMA":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold";
      case "DITOLAK":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-[#1A1A2E]/5 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#CA9667] font-semibold block mb-1">
            Manajemen Pendaftar
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#1A1A2E] tracking-tight">
            Data Calon Santri PPDB 2026
          </h1>
          <p className="text-xs text-[#2B2825]/70 mt-1 font-light">
            Kelola berkas calon santri, lakukan verifikasi dokumen, dan perbarui status seleksi.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-medium bg-[#1A1A2E] hover:bg-[#D3AD3B] text-white px-6 py-3 rounded-full transition-all cursor-pointer shadow-sm"
        >
          <Download className="w-4 h-4 text-[#D3AD3B]" />
          <span>Ekspor CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#1A1A2E]/5 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2B2825]/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan nama, No. Registrasi, NIK, atau NISN..."
              className="w-full bg-[#FAFAF7] border border-[#1A1A2E]/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#D3AD3B]"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#FAFAF7] border border-[#1A1A2E]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#D3AD3B]"
            >
              <option value="">Semua Status Seleksi</option>
              <option value="BARU">Pendaftaran Baru (BARU)</option>
              <option value="VERIFIKASI">Sedang Verifikasi (VERIFIKASI)</option>
              <option value="SELEKSI">Tahap Ujian Seleksi (SELEKSI)</option>
              <option value="LULUS">Lulus Seleksi (LULUS)</option>
              <option value="DAFTAR_ULANG">Tahap Daftar Ulang (DAFTAR_ULANG)</option>
              <option value="DITERIMA">Resmi Santri Aktif (DITERIMA)</option>
              <option value="DITOLAK">Tidak Lulus (DITOLAK)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#D3AD3B] hover:bg-[#CA9667] text-white text-xs font-semibold uppercase tracking-widest py-3 rounded-2xl transition-all cursor-pointer"
            >
              Cari Data
            </button>
          </div>
        </form>
      </div>

      {/* Main Applicants Table */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#1A1A2E]/5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1A1A2E]">
            Menampilkan <span className="text-[#D3AD3B] font-bold">{applicants.length}</span> dari{" "}
            <span className="font-bold">{totalCount}</span> Pendaftar
          </span>

          <button
            onClick={fetchApplicants}
            className="p-2 text-[#2B2825]/60 hover:text-[#1A1A2E] cursor-pointer"
            title="Refresh Table"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A2E]/10 text-[10px] uppercase tracking-widest text-[#2B2825]/60">
                <th className="py-3 px-3">No. Registrasi</th>
                <th className="py-3 px-3">Nama Santri</th>
                <th className="py-3 px-3">Program</th>
                <th className="py-3 px-3">Asal Sekolah &amp; Kota</th>
                <th className="py-3 px-3">Berkas Upload</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Aksi Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A2E]/5 font-light">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-[#FAFAF7] transition-colors">
                  <td className="py-4 px-3 font-mono font-medium text-[#1A1A2E]">
                    {app.registrationNumber}
                  </td>
                  <td className="py-4 px-3 font-medium text-[#1A1A2E]">
                    <div>{app.fullName}</div>
                    <div className="text-[10px] text-[#2B2825]/50 font-normal">
                      {app.gender === "MALE" ? "Laki-laki" : "Perempuan"}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-medium text-[#1A1A2E]">{app.program.name}</div>
                    <div className="text-[10px] text-[#D3AD3B] uppercase tracking-wider">
                      {app.program.level}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-[#2B2825]/80">
                    <div>{app.schoolOrigin}</div>
                    <div className="text-[10px] text-[#2B2825]/50">{app.city}</div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#CA9667] bg-[#CA9667]/10 px-2.5 py-1 rounded-full">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      {app.documents.length} File
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <Link
                      href={`/admin/pendaftar/${app.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#D3AD3B] hover:text-[#CA9667] bg-[#D3AD3B]/10 hover:bg-[#D3AD3B]/20 px-3.5 py-2 rounded-full transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Verifikasi</span>
                    </Link>
                  </td>
                </tr>
              ))}

              {!loading && applicants.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#2B2825]/50 font-light">
                    Tidak ada data pendaftar yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1A1A2E]/10">
          <div className="text-xs text-[#2B2825]/60 font-light">
            Halaman <span className="font-semibold text-[#1A1A2E]">{page}</span> dari{" "}
            <span className="font-semibold text-[#1A1A2E]">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-2 bg-[#FAFAF7] border border-[#1A1A2E]/10 rounded-xl disabled:opacity-40 hover:bg-[#1A1A2E] hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className="p-2 bg-[#FAFAF7] border border-[#1A1A2E]/10 rounded-xl disabled:opacity-40 hover:bg-[#1A1A2E] hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
