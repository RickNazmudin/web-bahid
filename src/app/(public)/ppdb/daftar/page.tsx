"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  User,
  Users,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Loader2,
  Trash2,
  Check,
} from "lucide-react";

interface Period {
  id: string;
  name: string;
  academicYear: string;
  registrationFee: number | string;
  description?: string;
}

interface Program {
  id: string;
  name: string;
  slug: string;
  level: string;
  description?: string;
}

interface UploadedDoc {
  type: string;
  label: string;
  required: boolean;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  mimeType?: string;
  isUploading?: boolean;
  error?: string;
}

const initialDocs: UploadedDoc[] = [
  { type: "PAS_FOTO", label: "Pas Foto Resmi 3x4 (Background Merah/Biru)", required: true },
  { type: "KK", label: "Kartu Keluarga (KK)", required: true },
  { type: "AKTA_KELAHIRAN", label: "Akta Kelahiran Calon Santri", required: true },
  { type: "IJAZAH_SKL", label: "Ijazah / Surat Keterangan Lulus (SKL) / Rapor", required: true },
  { type: "PRESTASI", label: "Piagam / Sertifikat Prestasi / Tahfidz (Opsional)", required: false },
];

export default function PPDBDaftarPage() {
  const router = useRouter();

  // Stepper State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Data Source
  const [periods, setPeriods] = useState<Period[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    periodId: "",
    programId: "",

    // Step 2
    fullName: "",
    gender: "LAKI_LAKI",
    nik: "",
    nisn: "",
    birthPlace: "",
    birthDate: "",
    phone: "",
    address: "",
    previousSchool: "",

    // Step 3
    fatherName: "",
    fatherNik: "",
    fatherJob: "",
    fatherPhone: "",
    fatherIncome: "",
    motherName: "",
    motherNik: "",
    motherJob: "",
    motherPhone: "",
    motherIncome: "",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",

    // Step 5
    agreed: false,
  });

  // Docs State
  const [docs, setDocs] = useState<UploadedDoc[]>(initialDocs);

  // Loading & Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMetadata() {
      try {
        const res = await fetch("/api/ppdb/periods-and-programs");
        const json = await res.json();
        if (json.success) {
          setPeriods(json.data.periods || []);
          setPrograms(json.data.programs || []);
          if (json.data.periods?.length > 0) {
            setFormData((prev) => ({ ...prev, periodId: json.data.periods[0].id }));
          }
        }
      } catch (err) {
        console.error("Gagal memuat metadata pendaftaran", err);
      } finally {
        setIsLoadingMeta(false);
      }
    }
    loadMetadata();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (index: number, file: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setDocs((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], error: "Ukuran file maksimal 5MB" };
        return updated;
      });
      return;
    }

    setDocs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isUploading: true, error: undefined };
      return updated;
    });

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("type", docs[index].type);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengunggah file");
      }

      setDocs((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          isUploading: false,
          fileName: data.data.originalName,
          fileUrl: data.data.fileUrl,
          fileSize: data.data.fileSize,
          mimeType: data.data.mimeType,
        };
        return updated;
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah file";
      setDocs((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], isUploading: false, error: msg };
        return updated;
      });
    }
  };

  const handleRemoveDoc = (index: number) => {
    setDocs((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        fileName: undefined,
        fileUrl: undefined,
        fileSize: undefined,
        mimeType: undefined,
        error: undefined,
      };
      return updated;
    });
  };

  const validateStep = (step: number): boolean => {
    setErrorMessage("");
    if (step === 1) {
      if (!formData.periodId) {
        setErrorMessage("Silakan pilih Gelombang Pendaftaran.");
        return false;
      }
      if (!formData.programId) {
        setErrorMessage("Silakan pilih Program Pendidikan.");
        return false;
      }
    } else if (step === 2) {
      if (!formData.fullName.trim()) {
        setErrorMessage("Nama Lengkap calon santri wajib diisi.");
        return false;
      }
      if (!formData.birthPlace.trim()) {
        setErrorMessage("Tempat Lahir wajib diisi.");
        return false;
      }
      if (!formData.birthDate) {
        setErrorMessage("Tanggal Lahir wajib diisi.");
        return false;
      }
      if (!formData.previousSchool.trim()) {
        setErrorMessage("Asal Sekolah sebelumnya wajib diisi.");
        return false;
      }
      if (!formData.address.trim()) {
        setErrorMessage("Alamat Lengkap santri wajib diisi.");
        return false;
      }
    } else if (step === 3) {
      if (!formData.fatherName.trim() && !formData.motherName.trim() && !formData.guardianName.trim()) {
        setErrorMessage("Mohon isi minimal salah satu data (Nama Ayah, Nama Ibu, atau Nama Wali).");
        return false;
      }
    } else if (step === 4) {
      const missingRequired = docs.find((d) => d.required && !d.fileUrl);
      if (missingRequired) {
        setErrorMessage(`Mohon unggah dokumen wajib: ${missingRequired.label}`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      setErrorMessage("Anda harus menyetujui pernyataan kebenaran data.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const documentsPayload = docs
        .filter((d) => d.fileUrl)
        .map((d) => ({
          type: d.type,
          fileUrl: d.fileUrl,
          fileName: d.fileName,
          fileSize: d.fileSize,
          mimeType: d.mimeType,
        }));

      const payload = {
        ...formData,
        documents: documentsPayload,
      };

      const res = await fetch("/api/ppdb/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Pendaftaran gagal dikirim.");
      }

      const params = new URLSearchParams({
        nomor: result.data.registrationNumber,
        nama: result.data.fullName,
        program: result.data.programName,
        tglLahir: formData.birthDate,
      });

      router.push(`/ppdb/sukses?${params.toString()}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses formulir.";
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  const selectedProgramObj = programs.find((p) => p.id === formData.programId);
  const selectedPeriodObj = periods.find((p) => p.id === formData.periodId);

  return (
    <div className="w-full flex flex-col items-center bg-white text-[#2B2825] font-light overflow-x-hidden selection:bg-[#E5A81E] selection:text-white min-h-screen">
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative w-full min-h-[48vh] flex items-center justify-center pt-44 md:pt-52 pb-20 md:pb-28 px-6 md:px-12 bg-[#0B3521] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Formulir PPDB Online"
            fill
            priority
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3521]/80 via-[#0B3521]/50 to-[#0B3521]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[#E5A81E] text-xs font-medium uppercase tracking-widest mb-4 block">
            Pendaftaran Daring
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight mb-6">
            Formulir Pendaftaran Santri Baru
          </h1>
          <p className="text-[#FAFAF7]/80 max-w-xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Lengkapi 5 tahapan formulir di bawah ini dengan data yang valid dan benar.
          </p>
        </div>
      </header>

      {/* ── STEPPER & FORM SECTION ────────────────────────── */}
      <section className="w-full py-20 md:py-28 px-6 md:px-12 bg-[#FAFAF7] flex justify-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Custom Stepper */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#0B3521]/5 mb-12 shadow-sm">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: "Program", icon: GraduationCap },
                { step: 2, label: "Santri", icon: User },
                { step: 3, label: "Orang Tua", icon: Users },
                { step: 4, label: "Dokumen", icon: FileText },
                { step: 5, label: "Review", icon: CheckCircle2 },
              ].map(({ step, label, icon: Icon }) => {
                const isDone = currentStep > step;
                const isActive = currentStep === step;

                return (
                  <div key={step} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        isDone
                          ? "bg-[#0B3521] text-white"
                          : isActive
                          ? "bg-[#E5A81E] text-white font-extrabold shadow-md shadow-[#E5A81E]/30"
                          : "bg-[#FAFAF7] text-[#2B2825]/40 border border-[#0B3521]/10"
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span
                      className={`text-[10px] tracking-widest uppercase mt-2.5 font-medium hidden sm:block ${
                        isActive ? "text-[#0B3521] font-bold" : isDone ? "text-[#2B2825]" : "text-[#2B2825]/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-4 mb-8 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 text-xs">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Main Form Box */}
          <div className="bg-white p-8 md:p-14 rounded-3xl border border-[#0B3521]/5 shadow-sm">
            {isLoadingMeta ? (
              <div className="py-20 text-center text-[#2B2825]/50 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#E5A81E]" />
                <span className="text-xs tracking-widest uppercase">Memuat data pendaftaran...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* STEP 1: PILIHAN PROGRAM & GELOMBANG */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-[#0B3521] mb-1">
                        Langkah 1: Pilihan Jenjang &amp; Gelombang
                      </h2>
                      <p className="text-[#2B2825]/60 text-xs font-light">
                        Pilih gelombang aktif dan program pendidikan yang dituju.
                      </p>
                    </div>

                    {/* Gelombang Selection */}
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-3 font-semibold">
                        Pilih Gelombang Pendaftaran <span className="text-red-500">*</span>
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {periods.map((p) => {
                          const isSelected = formData.periodId === p.id;
                          return (
                            <div
                              key={p.id}
                              onClick={() => setFormData((prev) => ({ ...prev, periodId: p.id }))}
                              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? "border-[#E5A81E] bg-[#E5A81E]/5 shadow-sm"
                                  : "border-[#0B3521]/10 hover:border-[#0A8B46]/40 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-serif font-medium text-[#0B3521] text-base">{p.name}</span>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                    isSelected ? "border-[#E5A81E] bg-[#E5A81E]" : "border-[#0B3521]/20"
                                  }`}
                                >
                                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                              </div>
                              <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">{p.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Program Selection */}
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-3 font-semibold">
                        Pilih Program Pendidikan <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        {programs.map((prog) => {
                          const isSelected = formData.programId === prog.id;
                          return (
                            <div
                              key={prog.id}
                              onClick={() => setFormData((prev) => ({ ...prev, programId: prog.id }))}
                              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                                isSelected
                                  ? "border-[#E5A81E] bg-[#E5A81E]/5 shadow-sm"
                                  : "border-[#0B3521]/10 hover:border-[#0A8B46]/40 bg-white"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border mt-1 flex items-center justify-center flex-shrink-0 ${
                                  isSelected ? "border-[#E5A81E] bg-[#E5A81E]" : "border-[#0B3521]/20"
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-0.5 rounded-full bg-[#0A8B46]/10 text-[#0A8B46]">
                                    {prog.level}
                                  </span>
                                  <h3 className="font-serif text-base font-medium text-[#0B3521]">{prog.name}</h3>
                                </div>
                                <p className="text-xs text-[#2B2825]/70 leading-relaxed font-light">{prog.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: DATA DIRI CALON SANTRI */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-[#0B3521] mb-1">
                        Langkah 2: Data Diri Calon Santri
                      </h2>
                      <p className="text-[#2B2825]/60 text-xs font-light">
                        Pastikan data sesuai dengan Kartu Keluarga (KK) dan Akta Kelahiran.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Nama Lengkap Calon Santri <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Contoh: Muhammad Rayhan Al-Fatih"
                          className="input-editorial"
                          required
                        />
                      </div>

                      <div className="custom-select-wrapper">
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Jenis Kelamin <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="input-editorial appearance-none cursor-pointer"
                        >
                          <option value="LAKI_LAKI">Laki-laki (Ikhwan)</option>
                          <option value="PEREMPUAN">Perempuan (Akhwat)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Nomor Induk Kependudukan (NIK)
                        </label>
                        <input
                          type="text"
                          name="nik"
                          value={formData.nik}
                          onChange={handleChange}
                          placeholder="16 digit NIK calon santri"
                          maxLength={16}
                          className="input-editorial"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Tempat Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="birthPlace"
                          value={formData.birthPlace}
                          onChange={handleChange}
                          placeholder="Contoh: Bandung"
                          className="input-editorial"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Tanggal Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className="input-editorial"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Nomor Induk Siswa Nasional (NISN)
                        </label>
                        <input
                          type="text"
                          name="nisn"
                          value={formData.nisn}
                          onChange={handleChange}
                          placeholder="10 digit NISN jika ada"
                          className="input-editorial"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Nomor HP / WhatsApp Santri
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="085196045409"
                          className="input-editorial"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Asal Sekolah Sebelumnya <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={handleChange}
                          placeholder="Contoh: SDIT Al-Ihsan Bandung / MTs Negeri 1 Bandung"
                          className="input-editorial"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                          Alamat Lengkap Domisili <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Jalan, RT/RW, Kelurahan/Desa, Kecamatan, Kota/Kabupaten, Kode Pos"
                          className="input-editorial resize-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: DATA ORANG TUA / WALI */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-[#0B3521] mb-1">
                        Langkah 3: Data Orang Tua / Wali
                      </h2>
                      <p className="text-[#2B2825]/60 text-xs font-light">
                        Informasi kontak orang tua penting untuk pemberitahuan seleksi dan koordinasi.
                      </p>
                    </div>

                    {/* Data Ayah */}
                    <div className="p-8 bg-[#FAFAF7] rounded-2xl border border-[#0B3521]/5 space-y-4">
                      <h3 className="font-serif text-base font-medium text-[#0B3521] flex items-center gap-2">
                        <User className="w-4 h-4 text-[#0A8B46]" />
                        Data Ayah Kandung
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Nama Lengkap Ayah
                          </label>
                          <input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            placeholder="Nama lengkap ayah"
                            className="input-editorial"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Nomor WhatsApp Ayah
                          </label>
                          <input
                            type="tel"
                            name="fatherPhone"
                            value={formData.fatherPhone}
                            onChange={handleChange}
                            placeholder="085196045409"
                            className="input-editorial"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Pekerjaan Ayah
                          </label>
                          <input
                            type="text"
                            name="fatherJob"
                            value={formData.fatherJob}
                            onChange={handleChange}
                            placeholder="PNS / Swasta / Wiraswasta dll."
                            className="input-editorial"
                          />
                        </div>
                        <div className="custom-select-wrapper">
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Penghasilan Bulanan
                          </label>
                          <select
                            name="fatherIncome"
                            value={formData.fatherIncome}
                            onChange={handleChange}
                            className="input-editorial appearance-none cursor-pointer"
                          >
                            <option value="">-- Pilih Penghasilan --</option>
                            <option value="< 2 Juta">&lt; Rp 2.000.000</option>
                            <option value="2 - 5 Juta">Rp 2.000.000 - Rp 5.000.000</option>
                            <option value="5 - 10 Juta">Rp 5.000.000 - Rp 10.000.000</option>
                            <option value="> 10 Juta">&gt; Rp 10.000.000</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Data Ibu */}
                    <div className="p-8 bg-[#FAFAF7] rounded-2xl border border-[#0B3521]/5 space-y-4">
                      <h3 className="font-serif text-base font-medium text-[#0B3521] flex items-center gap-2">
                        <User className="w-4 h-4 text-[#0A8B46]" />
                        Data Ibu Kandung
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Nama Lengkap Ibu
                          </label>
                          <input
                            type="text"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleChange}
                            placeholder="Nama lengkap ibu"
                            className="input-editorial"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Nomor WhatsApp Ibu
                          </label>
                          <input
                            type="tel"
                            name="motherPhone"
                            value={formData.motherPhone}
                            onChange={handleChange}
                            placeholder="085196045409"
                            className="input-editorial"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Pekerjaan Ibu
                          </label>
                          <input
                            type="text"
                            name="motherJob"
                            value={formData.motherJob}
                            onChange={handleChange}
                            placeholder="Ibu Rumah Tangga / PNS dll."
                            className="input-editorial"
                          />
                        </div>
                        <div className="custom-select-wrapper">
                          <label className="block text-[10px] tracking-widest uppercase text-[#0A8B46] mb-2 font-semibold">
                            Penghasilan Bulanan
                          </label>
                          <select
                            name="motherIncome"
                            value={formData.motherIncome}
                            onChange={handleChange}
                            className="input-editorial appearance-none cursor-pointer"
                          >
                            <option value="">-- Pilih Penghasilan --</option>
                            <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                            <option value="< 2 Juta">&lt; Rp 2.000.000</option>
                            <option value="2 - 5 Juta">Rp 2.000.000 - Rp 5.000.000</option>
                            <option value="> 5 Juta">&gt; Rp 5.000.000</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: UPLOAD DOKUMEN & FOTO */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-[#0B3521] mb-1">
                        Langkah 4: Upload Berkas Dokumen
                      </h2>
                      <p className="text-[#2B2825]/60 text-xs font-light">
                        Format file didukung: JPG, PNG, atau PDF (Ukuran maks: 5 MB per file).
                      </p>
                    </div>

                    <div className="space-y-4">
                      {docs.map((doc, idx) => (
                        <div
                          key={doc.type}
                          className="p-6 rounded-2xl border border-[#0B3521]/5 bg-[#FAFAF7] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-base font-medium text-[#0B3521]">{doc.label}</span>
                              {doc.required ? (
                                <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#E5A81E]/10 text-[#E5A81E]">
                                  Wajib
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#0B3521]/5 text-[#2B2825]/60">
                                  Opsional
                                </span>
                              )}
                            </div>
                            {doc.fileName && (
                              <p className="text-xs text-[#E5A81E] mt-1 flex items-center gap-1.5 font-medium">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                Terunggah: {doc.fileName}
                              </p>
                            )}
                            {doc.error && (
                              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {doc.error}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {doc.isUploading ? (
                              <div className="flex items-center gap-2 text-xs text-[#E5A81E] px-4 py-2 bg-[#E5A81E]/10 rounded-full">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Mengunggah...
                              </div>
                            ) : doc.fileUrl ? (
                              <button
                                type="button"
                                onClick={() => handleRemoveDoc(idx)}
                                className="px-4 py-2 text-xs text-red-600 hover:bg-red-50 border border-red-200 rounded-full flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Ganti File
                              </button>
                            ) : (
                              <label className="cursor-pointer px-6 py-2.5 text-xs tracking-widest uppercase font-medium text-[#0B3521] bg-white hover:bg-[#0B3521] hover:text-white border border-[#0B3521]/20 rounded-full shadow-sm flex items-center gap-2 transition-all">
                                <Upload className="w-3.5 h-3.5" />
                                Pilih File
                                <input
                                  type="file"
                                  accept=".jpg,.jpeg,.png,.pdf,.webp"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleFileUpload(idx, e.target.files[0]);
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: KONFIRMASI & REVIEW DATA */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-[#0B3521] mb-1">
                        Langkah 5: Konfirmasi &amp; Pengiriman Formulir
                      </h2>
                      <p className="text-[#2B2825]/60 text-xs font-light">
                        Periksa kembali ringkasan data sebelum melakukan pengiriman formulir pendaftaran.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Pilihan */}
                      <div className="p-6 rounded-2xl bg-[#FAFAF7] border border-[#0B3521]/5 text-xs space-y-2">
                        <div className="font-serif font-medium text-[#0B3521] text-base border-b border-[#0B3521]/10 pb-2 mb-3">
                          Pilihan Pendaftaran
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Gelombang:</span>
                            <span className="font-medium text-[#0B3521] text-sm">{selectedPeriodObj?.name}</span>
                          </div>
                          <div>
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Program:</span>
                            <span className="font-medium text-[#0B3521] text-sm">{selectedProgramObj?.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Identitas Santri */}
                      <div className="p-6 rounded-2xl bg-[#FAFAF7] border border-[#0B3521]/5 text-xs space-y-2">
                        <div className="font-serif font-medium text-[#0B3521] text-base border-b border-[#0B3521]/10 pb-2 mb-3">
                          Identitas Calon Santri
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Nama Lengkap:</span>
                            <span className="font-medium text-[#0B3521] text-sm">{formData.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Jenis Kelamin:</span>
                            <span className="font-medium text-[#0B3521] text-sm">
                              {formData.gender === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Tempat, Tanggal Lahir:</span>
                            <span className="font-medium text-[#0B3521] text-sm">
                              {formData.birthPlace}, {formData.birthDate}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Asal Sekolah:</span>
                            <span className="font-medium text-[#0B3521] text-sm">{formData.previousSchool}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#0A8B46] block uppercase tracking-widest text-[10px] font-semibold mb-0.5">Alamat Domisili:</span>
                            <span className="font-medium text-[#0B3521] text-sm">{formData.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Berkas */}
                      <div className="p-6 rounded-2xl bg-[#FAFAF7] border border-[#0B3521]/5 text-xs">
                        <div className="font-serif font-medium text-[#0B3521] text-base border-b border-[#0B3521]/10 pb-2 mb-3">
                          Berkas Terlampir
                        </div>
                        <ul className="space-y-2">
                          {docs
                            .filter((d) => d.fileUrl)
                            .map((d) => (
                              <li key={d.type} className="flex items-center gap-2 text-[#0B3521] text-xs font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#E5A81E]" />
                                <span>
                                  {d.label}: <strong>{d.fileName}</strong>
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Persetujuan */}
                    <div className="p-6 rounded-2xl bg-[#E5A81E]/10 border border-[#E5A81E]/30">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={(e) => setFormData((prev) => ({ ...prev, agreed: e.target.checked }))}
                          className="w-4 h-4 text-[#E5A81E] focus:ring-[#E5A81E] rounded mt-0.5"
                        />
                        <span className="text-xs text-[#2B2825]/90 leading-relaxed font-light">
                          Saya menyatakan dengan sebenarnya bahwa seluruh data dan dokumen yang saya unggah
                          adalah benar, sah, dan dapat dipertanggungjawabkan. Saya bersedia mengikuti seluruh
                          tahapan seleksi dan mematuhi tata tertib Pondok Pesantren Baitul Hidayah.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-12 pt-8 border-t border-[#0B3521]/10 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isSubmitting}
                      className="text-xs tracking-widest uppercase font-medium bg-white text-[#0B3521] border border-[#0B3521]/20 px-6 py-3.5 rounded-full hover:bg-[#0B3521] hover:text-white transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Sebelumnya
                    </button>
                  ) : (
                    <Link href="/ppdb" className="text-xs text-[#2B2825]/60 hover:text-[#0B3521] font-medium tracking-wider uppercase">
                      &larr; Info PPDB
                    </Link>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-xs tracking-widest uppercase font-medium bg-[#E5A81E] hover:bg-[#0A8B46] text-white px-8 py-3.5 rounded-full transition-all shadow-md shadow-[#E5A81E]/20 inline-flex items-center gap-2 cursor-pointer"
                    >
                      Lanjutkan
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreed}
                      className="text-xs tracking-widest uppercase font-medium bg-[#E5A81E] hover:bg-[#0A8B46] text-white px-10 py-3.5 rounded-full transition-all shadow-md shadow-[#E5A81E]/20 inline-flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Mengirim Pendaftaran...
                        </>
                      ) : (
                        <>
                          Kirim Formulir Pendaftaran
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
