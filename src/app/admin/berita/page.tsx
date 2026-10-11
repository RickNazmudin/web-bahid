"use client";

import { useEffect, useState } from "react";
import {
  Newspaper,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Calendar,
  User,
  Eye,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  thumbnail?: string;
  authorName?: string;
  isPublished: boolean;
  publishedAt: string;
}

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Modal State
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("Sekretariat Pesantren");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      const json = await res.json();
      if (json.success) {
        setNewsList(json.data);
      }
    } catch (err) {
      console.error("Gagal memuat berita", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback("");

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          authorName,
          isPublished: true,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal menerbitkan artikel.");
      }

      setFeedback("Artikel warta berhasil diterbitkan!");
      setTimeout(() => {
        setFormOpen(false);
        setTitle("");
        setExcerpt("");
        setContent("");
        fetchNews();
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setFeedback(`Error: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel warta ini?")) return;

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchNews();
      }
    } catch (err) {
      console.error("Gagal menghapus berita", err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#0A8B46] font-semibold block mb-1">
            CMS Konten Publikasi
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3521] tracking-tight">
            Manajemen Warta &amp; Berita
          </h1>
          <p className="text-xs text-[#2B2825]/70 mt-1 font-light">
            Tulis, sunting, dan terbitkan pengumuman serta berita prestasi santri di website profil.
          </p>
        </div>

        <button
          onClick={() => {
            setFormOpen(true);
            setFeedback("");
          }}
          className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold bg-[#E5A81E] hover:bg-[#0A8B46] text-white px-6 py-3.5 rounded-full transition-all shadow-md shadow-[#E5A81E]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Table List */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#0B3521]/5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0B3521]">
            Total Artikel Diterbitkan: <span className="text-[#E5A81E] font-bold">{newsList.length}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#0B3521]/10 text-[10px] uppercase tracking-widest text-[#2B2825]/60">
                <th className="py-3 px-3">Judul Artikel Warta</th>
                <th className="py-3 px-3">Penulis</th>
                <th className="py-3 px-3">Tanggal Terbit</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B3521]/5 font-light">
              {newsList.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFAF7] transition-colors">
                  <td className="py-4 px-3 font-medium text-[#0B3521] max-w-md">
                    <div className="truncate">{item.title}</div>
                    <div className="text-[10px] text-[#2B2825]/50 font-mono">/berita/{item.slug}</div>
                  </td>
                  <td className="py-4 px-3 text-[#2B2825]/80">{item.authorName || "Admin"}</td>
                  <td className="py-4 px-3 text-[#2B2825]/80">
                    {new Date(item.publishedAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      DITERBITKAN
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right space-x-2">
                    <a
                      href={`/berita/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#0B3521] bg-[#FAFAF7] border border-[#0B3521]/10 px-3 py-1.5 rounded-full hover:bg-[#0B3521] hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E5A81E]" />
                      <span>Lihat</span>
                    </a>
                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && newsList.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#2B2825]/50 font-light">
                    Belum ada artikel berita yang dibuat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Editor Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-2xl w-full p-8 rounded-3xl border border-[#0B3521]/10 shadow-2xl space-y-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#0B3521]/10 pb-4">
              <h3 className="font-serif text-lg font-medium text-[#0B3521]">
                Tulis &amp; Terbitkan Artikel Berita
              </h3>
              <button onClick={() => setFormOpen(false)} className="text-[#2B2825]/40 hover:text-[#0B3521]">
                ✕
              </button>
            </div>

            {feedback && (
              <div className="p-4 rounded-2xl bg-[#E5A81E]/10 border border-[#E5A81E]/30 text-xs text-[#0B3521] font-medium">
                {feedback}
              </div>
            )}

            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Judul Artikel Berita
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Santri Baitul Hidayah Raih Juara 1 Tahfidz Internasional"
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Ringkasan Artikel (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan singkat 1-2 kalimat..."
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl p-4 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Isi Lengkap Artikel (HTML / Teks Paragraf)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<p>Tulis paragraf artikel warta di sini...</p>"
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl p-4 text-xs font-mono text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#0A8B46] mb-2">
                  Nama Penulis / Redaksi
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-[#0B3521]/10 rounded-2xl px-4 py-3 text-xs text-[#2B2825] focus:outline-none focus:border-[#E5A81E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B3521]/10">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-3 text-xs uppercase tracking-widest font-medium text-[#2B2825]/70 hover:text-[#0B3521]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-[#E5A81E] hover:bg-[#0A8B46] text-white text-xs font-semibold uppercase tracking-widest rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Menerbitkan..." : "Terbitkan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
