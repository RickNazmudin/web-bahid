"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Email atau password salah.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal masuk ke sistem admin.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1A1A2E] text-white p-6 relative overflow-hidden font-sans">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-campus.jpg"
          alt="Latar Belakang Admin"
          fill
          priority
          className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A2E] via-[#1A1A2E]/90 to-[#1A1A2E]/70" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D3AD3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#CA9667]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#1A1A2E] border border-[#D3AD3B]/40 text-[#D3AD3B] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] tracking-widest uppercase text-[#CA9667] font-semibold block mb-1">
            Portal Administrasi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Masuk Panitia PPDB
          </h1>
          <p className="text-xs text-[#FAFAF7]/70 mt-2 font-light">
            Silakan masuk dengan akun terverifikasi untuk mengelola pendaftaran santri baru.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-light text-center animate-fadeIn">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#D3AD3B] mb-2">
              Email Administrasi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@darululum.sch.id"
                className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D3AD3B] focus:ring-1 focus:ring-[#D3AD3B] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-[#D3AD3B] mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D3AD3B] focus:ring-1 focus:ring-[#D3AD3B] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#D3AD3B] hover:bg-[#CA9667] text-white text-xs font-semibold uppercase tracking-widest py-4 px-6 rounded-full transition-all duration-300 shadow-lg shadow-[#D3AD3B]/20 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-[10px] text-white/40 uppercase tracking-widest font-light">
          Pondok Pesantren Modern Darul Ulum Bogor &copy; 2026
        </div>
      </div>
    </div>
  );
}
