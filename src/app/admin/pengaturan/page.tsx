"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Loader2, CheckCircle2, Phone, Mail, Building, ShieldCheck } from "lucide-react";

export default function AdminPengaturanPage() {
  const [formData, setFormData] = useState({
    nama_pesantren: "Pondok Pesantren Baitul Hidayah",
    alamat: "Jl. Ciporeat Andir kulon kelurahan pasanggrahan kec.ujungberung kota bandung",
    telepon: "085196045409",
    whatsapp_helpdesk: "085196045409",
    email_resmi: "info@baitulhidayah.sch.id",
    gelombang_aktif: "Gelombang 1 — TA 2026/2027",
    biaya_pendaftaran: "250000",
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.success && json.data) {
        setFormData((prev) => ({ ...prev, ...json.data }));
      }
    } catch (err) {
      console.error("Gagal memuat pengaturan", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal menyimpan pengaturan.");
      }

      setFeedback("Pengaturan website berhasil diperbarui!");
      fetchSettings();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setFeedback(`Error: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#0B3521]">
        <Loader2 className="w-10 h-10 animate-spin text-[#E5A81E] mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#0A8B46] font-semibold">
          Memuat Pengaturan Website...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-[#0B3521]/10 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-bold block mb-1">
            Konfigurasi Sistem
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3521] tracking-tight">
            Pengaturan Website &amp; PPDB
          </h1>
          <p className="text-xs text-[#1A281E]/70 mt-1 font-light">
            Kelola profil resmi lembaga, kontak helpdesk WhatsApp, gelombang PPDB aktif, dan infaq pendaftaran.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-[#E5A81E]/15 border border-[#E5A81E]/30 text-xs text-[#0B3521] font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0A8B46]" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Profil Lembaga */}
        <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
            <Building className="w-5 h-5 text-[#E5A81E]" />
            <h2 className="font-serif text-lg font-medium text-[#0B3521]">
              Identitas Resmi Lembaga
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                Nama Resmi Pesantren
              </label>
              <input
                type="text"
                name="nama_pesantren"
                value={formData.nama_pesantren}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl px-4 py-3 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                Alamat Lengkap Pesantren
              </label>
              <textarea
                rows={2}
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl p-4 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Kontak & Helpdesk */}
        <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
            <Phone className="w-5 h-5 text-[#0A8B46]" />
            <h2 className="font-serif text-lg font-medium text-[#0B3521]">
              Kanal Kontak &amp; Helpdesk WhatsApp
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                Nomor Telepon Kantor
              </label>
              <input
                type="text"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl px-4 py-3 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                WhatsApp Helpdesk PPDB
              </label>
              <input
                type="text"
                name="whatsapp_helpdesk"
                value={formData.whatsapp_helpdesk}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl px-4 py-3 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                Email Resmi Sekretariat
              </label>
              <input
                type="email"
                name="email_resmi"
                value={formData.email_resmi}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl px-4 py-3 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Konfigurasi PPDB */}
        <div className="bg-white p-8 rounded-3xl border border-[#0B3521]/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#0B3521]/10">
            <ShieldCheck className="w-5 h-5 text-[#E5A81E]" />
            <h2 className="font-serif text-lg font-medium text-[#0B3521]">
              Pengaturan Sistem PPDB Online
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                Nama Gelombang Aktif Saat Ini
              </label>
              <input
                type="text"
                name="gelombang_aktif"
                value={formData.gelombang_aktif}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl px-4 py-3 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                Infaq Pendaftaran Seleksi (Rp)
              </label>
              <input
                type="number"
                name="biaya_pendaftaran"
                value={formData.biaya_pendaftaran}
                onChange={handleChange}
                className="w-full bg-[#F7FAF7] border border-[#0B3521]/15 rounded-2xl px-4 py-3 text-xs text-[#1A281E] focus:outline-none focus:border-[#0A8B46]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 bg-[#E5A81E] hover:bg-[#0A8B46] text-[#0B3521] hover:text-white text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full transition-all shadow-md shadow-[#0B3521]/15 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan Website</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
