"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Informasi PPDB",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Informasi PPDB",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#D3AD3B] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#1A1A2E] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Sekretariat Pesantren"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#CA9667] text-xs font-medium uppercase tracking-widest mb-4 block">
            Sekretariat Lembaga
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Sekretariat &amp; Kontak Lembaga
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Tim panitia dan humas Pondok Pesantren Modern Darul Ulum siap melayani konsultasi
            pendidikan, kunjungan kampus, dan informasi pendaftaran santri baru.
          </p>
        </div>
      </header>

      {/* ── CONTACT FORM & LOCATION SPLIT ─────────────────── */}
      <section className="w-full py-24 md:py-32 bg-[#FAFAF7] flex justify-center" id="contact">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[#CA9667] text-xs tracking-widest uppercase font-medium block mb-4">
              Layanan Kontak
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A2E] tracking-tight mb-8">
              Kirim Pesan / Permohonan Informasi
            </h2>

            {submitted ? (
              <div className="p-10 border border-[#D3AD3B]/30 bg-white rounded-3xl text-center space-y-4 shadow-xl shadow-[#D3AD3B]/5">
                <div className="w-14 h-14 rounded-full bg-[#CA9667]/10 text-[#D3AD3B] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl font-medium text-[#1A1A2E]">Pesan Anda Berhasil Terkirim</h4>
                <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light max-w-md mx-auto">
                  Terima kasih telah menghubungi kami. Petugas panitia PPDB akan membalas pesan Anda melalui
                  WhatsApp atau Email yang telah dicantumkan.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs tracking-widest uppercase font-medium text-[#D3AD3B] hover:text-[#CA9667] border-b border-[#D3AD3B] pb-0.5 mt-4 inline-block transition-colors cursor-pointer"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama Wali Santri"
                      className="input-editorial"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="081234567890"
                      className="input-editorial"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="input-editorial"
                  />
                </div>

                <div className="custom-select-wrapper">
                  <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                    Topik Pertanyaan
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-editorial appearance-none cursor-pointer"
                  >
                    <option>Informasi PPDB 2026/2027</option>
                    <option>Konsultasi Jenjang MTs / MA</option>
                    <option>Skema Beasiswa Tahfidz</option>
                    <option>Jadwal Kunjungan Kampus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-[#CA9667] mb-2 font-semibold">
                    Isi Pesan
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan atau informasi yang dibutuhkan..."
                    className="input-editorial resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#D3AD3B] hover:bg-[#CA9667] text-white text-xs tracking-widest uppercase font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#D3AD3B]/20 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading ? "Mengirim..." : "Kirim Pesan"}</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:pl-12 lg:border-l border-[#1A1A2E]/10 flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#CA9667]" />
                  Alamat Kampus
                </h3>
                <p className="text-xl font-serif text-[#1A1A2E] tracking-tight font-medium">
                  Pondok Pesantren Modern Darul Ulum
                </p>
                <p className="text-sm text-[#2B2825]/70 mt-1 font-light leading-relaxed">
                  Jl. Pesantren Luhur No. 99, Cisarua, Bogor, Jawa Barat 16750
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#CA9667]" />
                  Layanan Telepon &amp; WhatsApp
                </h3>
                <p className="text-base text-[#1A1A2E] font-medium">
                  +62 812-3456-7890 (Sekretariat PPDB)
                </p>
                <p className="text-xs text-[#2B2825]/60 mt-1 font-light">
                  Senin – Sabtu, 08.00 – 16.00 WIB
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-widest uppercase text-[#CA9667] font-semibold mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#CA9667]" />
                  Surat Elektronik
                </h3>
                <p className="text-sm text-[#1A1A2E]">
                  info@darululum-bogor.sch.id
                </p>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 border border-[#1A1A2E]/10 bg-white rounded-3xl relative overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Cisarua,+Bogor,+West+Java&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
