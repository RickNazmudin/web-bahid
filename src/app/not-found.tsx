import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1A1A2E] text-white p-6 text-center font-sans relative overflow-hidden">
      <div className="w-20 h-20 rounded-3xl bg-[#D3AD3B]/10 text-[#D3AD3B] border border-[#D3AD3B]/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#D3AD3B]/10">
        <Compass className="w-10 h-10" />
      </div>

      <span className="text-xs uppercase tracking-widest text-[#CA9667] font-semibold block mb-2">
        Halaman Tidak Ditemukan (404)
      </span>

      <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-4 text-white">
        Jalur Halaman Tidak Ditemukan
      </h1>

      <p className="text-sm text-[#FAFAF7]/70 max-w-md mx-auto leading-relaxed font-light mb-8">
        Halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda utama pesantren.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 bg-[#D3AD3B] hover:bg-[#CA9667] text-white text-xs font-semibold uppercase tracking-widest py-4 px-8 rounded-full transition-all shadow-lg shadow-[#D3AD3B]/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda Utama</span>
      </Link>
    </div>
  );
}
