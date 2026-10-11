"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  FileCheck2,
  AlertCircle,
  XCircle,
  GraduationCap,
  ArrowRight,
  RefreshCw,
  Search,
  BookOpen,
} from "lucide-react";

interface StatsData {
  stats: {
    total: number;
    baru: number;
    verifikasi: number;
    seleksi: number;
    lulus: number;
    ditolak: number;
    daftarUlang: number;
    diterima: number;
  };
  recentApplicants: Array<{
    id: string;
    registrationNumber: string;
    fullName: string;
    status: string;
    createdAt: string;
    program: { name: string; level: string };
  }>;
  programs: Array<{
    id: string;
    name: string;
    level: string;
    _count: { applicants: number };
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Gagal memuat statistik admin", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "BARU":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "VERIFIKASI":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "SELEKSI":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "LULUS":
        return "bg-[#E5A81E]/20 text-[#0B3521] border-[#E5A81E]/40 font-semibold";
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
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block mb-1">
            Ringkasan Eksekutif
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3521] tracking-tight">
            Dashboard PPDB 2026/2027
          </h1>
          <p className="text-xs text-[#2B2825]/70 mt-1 font-light">
            Pantau arus pendaftaran santri baru, alur verifikasi berkas, dan status kelulusan secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-medium bg-[#FAFAF7] hover:bg-[#0B3521] hover:text-white text-[#0B3521] border border-[#0B3521]/10 px-5 py-3 rounded-full transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>
          <Link
            href="/admin/pendaftar"
            className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-medium bg-[#E5A81E] hover:bg-[#0A8B46] text-white px-6 py-3 rounded-full transition-all shadow-md shadow-[#E5A81E]/20"
          >
            <span>Kelola Pendaftar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-[#0B3521]/5 shadow-sm flex flex-col justify-between hover:border-[#E5A81E]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#2B2825]/60 font-medium">
              Total Pendaftar
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B3521]/5 text-[#0B3521] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-medium text-[#0B3521]">
              {loading ? "..." : data?.stats.total || 0}
            </div>
            <div className="text-[11px] text-[#2B2825]/60 mt-1 font-light">
              Seluruh berkas masuk
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B3521]/5 shadow-sm flex flex-col justify-between hover:border-[#E5A81E]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-widest text-amber-700 font-medium">
              Verifikasi Berkas
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-medium text-[#0B3521]">
              {loading ? "..." : (data?.stats.baru || 0) + (data?.stats.verifikasi || 0)}
            </div>
            <div className="text-[11px] text-[#2B2825]/60 mt-1 font-light">
              Menunggu / sedang diverifikasi
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B3521]/5 shadow-sm flex flex-col justify-between hover:border-[#E5A81E]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#E5A81E] font-medium">
              Lulus Seleksi
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#E5A81E]/10 text-[#E5A81E] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-medium text-[#0B3521]">
              {loading ? "..." : (data?.stats.lulus || 0) + (data?.stats.daftarUlang || 0)}
            </div>
            <div className="text-[11px] text-[#2B2825]/60 mt-1 font-light">
              Lolos tes &amp; tahap daftar ulang
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0B3521]/5 shadow-sm flex flex-col justify-between hover:border-[#E5A81E]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-medium">
              Santri Resmi
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-medium text-[#0B3521]">
              {loading ? "..." : data?.stats.diterima || 0}
            </div>
            <div className="text-[11px] text-[#2B2825]/60 mt-1 font-light">
              Telah daftar ulang &amp; aktif
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Content: Program Breakdown & Recent Applicants Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Program Kuota & Distribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block mb-1">
              Sebaran Pendaftar
            </span>
            <h2 className="font-serif text-lg font-medium text-[#0B3521]">
              Pendaftar Per Program
            </h2>
          </div>

          <div className="space-y-4">
            {data?.programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-[#FAFAF7] p-4 rounded-2xl border border-[#0B3521]/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0B3521]">{prog.name}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E5A81E] bg-[#E5A81E]/10 px-2 py-0.5 rounded-full">
                    {prog.level}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#2B2825]/70 pt-1">
                  <span>Total Berkas:</span>
                  <span className="font-bold text-[#0B3521]">{prog._count.applicants} Santri</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Applicants Table */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block mb-1">
                Aktivitas Terbaru
              </span>
              <h2 className="font-serif text-lg font-medium text-[#0B3521]">
                Pendaftaran Masuk Terbaru
              </h2>
            </div>
            <Link
              href="/admin/pendaftar"
              className="text-xs font-semibold uppercase tracking-wider text-[#E5A81E] hover:text-[#0A8B46] transition-colors"
            >
              Lihat Semua
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#0B3521]/10 text-[10px] uppercase tracking-widest text-[#2B2825]/60">
                  <th className="py-3 px-3">No. Registrasi</th>
                  <th className="py-3 px-3">Nama Santri</th>
                  <th className="py-3 px-3">Program</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B3521]/5 font-light">
                {data?.recentApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3.5 px-3 font-mono font-medium text-[#0B3521]">
                      {app.registrationNumber}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#0B3521]">{app.fullName}</td>
                    <td className="py-3.5 px-3 text-[#2B2825]/80">{app.program.name}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/admin/pendaftar/${app.id}`}
                        className="text-[10px] font-semibold uppercase tracking-wider text-[#E5A81E] hover:text-[#0A8B46] bg-[#E5A81E]/10 hover:bg-[#E5A81E]/20 px-3 py-1.5 rounded-full transition-colors"
                      >
                        Periksa
                      </Link>
                    </td>
                  </tr>
                ))}

                {(!data?.recentApplicants || data.recentApplicants.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#2B2825]/50">
                      Belum ada pendaftaran santri baru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
