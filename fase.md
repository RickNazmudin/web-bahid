# Roadmap & Langkah-Langkah Pengembangan Web Pesantren & PPDB Online

Dokumen ini merangkum seluruh tahapan, arsitektur, progres pengerjaan, dan langkah-langkah implementasi sistem Website Pesantren Modern Darul Ulum & PPDB Online berdasarkan acuan [PRD.md](file:///d:/Project%20web/web%20pesantren/PRD.md).

---

## 📌 Ringkasan Status Progres

| Fase | Nama Tahapan | Status | Deskripsi Singkat |
|---|---|---|---|
| **Fase 1** | Inisialisasi & Fondasi Database | ✅ Selesai | Next.js 16, Prisma ORM, PostgreSQL Schema, Seed Data, Argon2 Helper |
| **Fase 2** | Backend Core & File Storage | ✅ Selesai | API Upload Dokumen, Generator No. Registrasi, Endpoint PPDB Core |
| **Fase 3** | Autentikasi & Proteksi Keamanan | ✅ Selesai | JWT Session Cookie, Argon2 Password Hashing, Middleware Proxy Protection |
| **Fase 4** | Frontend Profil Lembaga (Public) | ✅ Selesai | Beranda Sinematik, Tentang, Program, Fasilitas, Berita, Kontak (Foto Asli) |
| **Fase 5** | Frontend PPDB Online (User Flow) | ✅ Selesai | Landing PPDB, Form 5-Step, Halaman Sukses, Pelacakan Status & Timeline |
| **Fase 6** | Admin Dashboard & Pendaftar | ✅ Selesai | Login Admin, Widget Metrik, Tabel Pendaftar, Verifikasi Dokumen, Ubah Status |
| **Fase 7** | Konversi Santri & CMS Konten | ✅ Selesai | Konversi Santri (Generate NIS), CMS Berita, CMS Program/Fasilitas, Pengaturan |
| **Fase 8** | Audit Keamanan, QA & Siap Rilis | ✅ Selesai | Proteksi Middleware, SEO Metadata, Dynamic Sitemap & Robots, Custom 404, Production Ready |

---

## 🛠️ Rincian Langkah-Langkah Tiap Fase

### ✅ FASE 1: Inisialisasi Proyek & Desain Database (Selesai)
1. **Setup Proyek Next.js**:
   - Inisialisasi Next.js 16 (App Router) + TypeScript + Tailwind CSS + Lucide React.
   - Konfigurasi file `.env` dan Prisma Client singleton (`src/lib/prisma.ts`).
2. **Perancangan Skema Database PostgreSQL** (`prisma/schema.prisma`):
   - Model `User` (Role SUPER_ADMIN & ADMIN).
   - Model `RegistrationPeriod` (Gelombang & Tahun Ajaran).
   - Model `Program` (Jenjang MTs, MA, Salafiyah).
   - Model `Applicant` (Data calon santri & nomor pendaftaran unik).
   - Model `Parent` (Data ayah, ibu, dan wali).
   - Model `Document` (Tipe KK, Akta, Ijazah, Foto dengan status validasi).
   - Model `Student` (Data santri aktif & NIS).
   - Model `News`, `Facility`, `Setting`, dan `AuditLog`.
3. **Database Migration & Seeding**:
   - Menjalankan migrasi Prisma dan membuat akun Super Admin bawaan serta data awal periode/program.

---

### ✅ FASE 2: Backend API Core & File Storage (Selesai)
1. **API Upload Berkas Dokumen** (`/api/upload`):
   - Validasi MIME type (JPG, PNG, WebP, PDF) dan batas ukuran file maksimal 5MB.
   - Penyimpanan aman ke direktori `public/uploads/documents/` dengan nama file acak anti-collision.
2. **API Pendaftaran PPDB Online** (`/api/ppdb/register`):
   - Validasi kelengkapan data diri calon santri dan orang tua.
   - Pembuatan Nomor Pendaftaran otomatis berformat unik (`PSB-YYYY-XXXX`).
   - Eksekusi transaksi database (Applicant + Parent + Documents) dan pencatatan audit log.
3. **API Pengecekan Status** (`/api/ppdb/status`):
   - Verifikasi ganda menggunakan Nomor Pendaftaran + Tanggal Lahir untuk melindungi privasi data pendaftar.
   - Menghasilkan alur timeline tahapan (*BARU* &rarr; *VERIFIKASI* &rarr; *SELEKSI* &rarr; *LULUS* &rarr; *DAFTAR_ULANG* &rarr; *DITERIMA*).

---

### ✅ FASE 3: Autentikasi & Keamanan Session (Selesai)
1. **Keamanan Autentikasi**:
   - Password hashing menggunakan algoritma Argon2 / Scrypt yang aman.
   - Endpoint login (`/api/auth/login`), logout (`/api/auth/logout`), dan cek session (`/api/auth/me`).
   - Session disimpan dalam HttpOnly Secure Cookie dengan proteksi SameSite.
2. **Proteksi Middleware**:
   - Proteksi seluruh rute `/admin/*` (kecuali `/admin/login`) dari akses tanpa sesi admin yang valid.

---

### ✅ FASE 4: Frontend Website Profil Lembaga (Selesai)
1. **Desain Visual & Identitas Islami Modern**:
   - Tipografi editorial (*Playfair Display*, *Plus Jakarta Sans*, dan kaligrafi *Amiri*).
   - Skema warna Deep Forest Emerald (`#02140a`, `#041a0e`) dan aksen Warm Gold.
   - Penggunaan aset fotografi resolusi tinggi untuk latar belakang kampus dan kartu fasilitas.
   - Penghapusan 100% emoji murahan dan digantikan ikon presisi dari Lucide React.
2. **Halaman Publik Terintegrasi**:
   - **Beranda (`/`)**: Hero sinematik foto kampus, KPI statistik floating, Bento Grid keunggulan, kartu program, dan alur PPDB.
   - **Tentang Kami (`/tentang`)**: Visi & Misi arsitektural, 4 Nilai Filosofis Pesantren, linimasa sejarah, dan profil dewan pimpinan.
   - **Program Pendidikan (`/program`)**: Jenjang MTs Tahfidz, MA Plus Riset & Sains, dan PDF Ulya Salafiyah dengan foto kegiatan.
   - **Fasilitas (`/fasilitas`)**: Galeri foto kampus dengan filter kategori instan (Masjid, Asrama, Lab Komputer, Perpustakaan).
   - **Warta & Pengumuman (`/berita` & `/berita/[slug]`)**: Tampilan artikel editorial majalah dengan estimasi waktu baca.
   - **Kontak & Lokasi (`/kontak`)**: Split-grid interaktif memuat formulir pertanyaan, informasi kantor, jam buka, dan Google Maps.

---

### ✅ FASE 5: Frontend PPDB Online (User Experience) (Selesai)
1. **Informasi PPDB (`/ppdb`)**:
   - Jadwal gelombang aktif, kuota pendaftaran, rincian biaya formulir, persyaratan dokumen, dan FAQ interaktif.
2. **Formulir Pendaftaran 5 Langkah (`/ppdb/daftar`)**:
   - *Step 1*: Pemilihan Gelombang & Program Pendidikan.
   - *Step 2*: Data Diri Calon Santri (NIK, NISN, Tempat/Tgl Lahir, Alamat, Asal Sekolah).
   - *Step 3*: Data Orang Tua / Wali (Ayah & Ibu: NIK, Pekerjaan, HP, Penghasilan).
   - *Step 4*: Upload Dokumen Berkas (Pas Foto 3x4, KK, Akta Lahir, Ijazah/Rapor) dengan indikator progres & hapus/ganti file.
   - *Step 5*: Konfirmasi Data & Persetujuan Kebenaran Formulir.
3. **Halaman Sukses Pendaftaran (`/ppdb/sukses`)**:
   - Kartu Nomor Pendaftaran besar dengan fitur salin 1-klik dan opsi Cetak Bukti Pendaftaran (`window.print`).
   - Petunjuk tahapan selanjutnya & tautan konfirmasi WhatsApp panitia.
4. **Pelacakan Status Real-Time (`/ppdb/cek-status`)**:
   - Pencarian berdasarkan Nomor Pendaftaran + Tanggal Lahir.
   - Visualisasi stepper timeline status pendaftaran.
   - Checklist status verifikasi masing-masing dokumen (VALID / PENDING / INVALID).

---

### ⏳ FASE 6: Admin Dashboard & Manajemen Pendaftar (Selanjutnya)
Langkah-langkah yang akan dikerjakan pada fase ini:
1. **Halaman Login Admin** (`/admin/login`):
   - Form autentikasi email & password dengan animasi smooth, validasi state, dan redirect ke dashboard.
2. **Dashboard Overview** (`/admin` / `/admin/dashboard`):
   - Kartu metrik analitik: Total Pendaftar, Pendaftar Baru, Menunggu Verifikasi, Lulus Seleksi, Ditolak, dan Santri Aktif.
   - Grafik/Diagram sebaran pendaftar per program & gelombang.
   - Daftar pendaftaran terbaru yang memerlukan tindakan cepat.
3. **Manajemen Pendaftar** (`/admin/pendaftar`):
   - Tabel data pendaftar dengan pencarian instan (nama/nomor pendaftaran), filter status, filter gelombang, dan pagination.
   - Ekspor data pendaftar ke format Excel/CSV.
4. **Detail Pendaftar & Tindakan Verifikasi** (`/admin/pendaftar/[id]`):
   - Panel data lengkap calon santri dan orang tua.
   - Penampil dokumen (*Document Viewer* modal) untuk memeriksa file KK, Akta, Ijazah, dan Foto.
   - Modal ubah status verifikasi dokumen (VALID / INVALID + catatan perbaikan).
   - Modal ubah status pendaftar (`BARU` &rarr; `VERIFIKASI` &rarr; `SELEKSI` &rarr; `LULUS` / `DITOLAK` &rarr; `DAFTAR_ULANG` &rarr; `DITERIMA`).
   - Form input nilai ujian seleksi & catatan panitia.

---

### ⏳ FASE 7: Konversi Santri & CMS Konten
1. **Konversi Santri Baru** (`/admin/santri`):
   - Aksi 1-klik untuk mengonversi pendaftar berstatus `DAFTAR_ULANG` menjadi data santri aktif.
   - Generator otomatis Nomor Induk Santri (NIS) unik tahun berjalan.
   - Penetapan kelas awal dan kamar asrama santri.
   - Daftar santri aktif dengan pencarian & pencetakan kartu santri.
2. **CMS Konten Website**:
   - **CMS Berita** (`/admin/berita`): CRUD berita, upload thumbnail, editor teks isi artikel, draft & publikasi.
   - **CMS Program & Fasilitas** (`/admin/program`, `/admin/fasilitas`): Tambah/edit data fasilitas, kuota, deskripsi, dan foto sarana.
   - **Pengaturan Website** (`/admin/pengaturan`): Ubah nama pesantren, kontak, WhatsApp, periode PPDB aktif, dan biaya pendaftaran.

---

### ⏳ FASE 8: Pengujian Menyeluruh, Optimasi & Siap Rilis
1. **Security & Data Hardening**:
   - Rate limiting pada endpoint login dan cek status.
   - Sanitasi input dan proteksi data identitas santri.
2. **Pengujian Fungsional E2E**:
   - Simulasi alur lengkap: Pengunjung &rarr; Daftar PPDB Online &rarr; Unggah Berkas &rarr; Cek Status &rarr; Admin Verifikasi Berkas &rarr; Seleksi & Kelulusan &rarr; Konversi Menjadi Santri Aktif &rarr; Cek Status Santri Resmi.
3. **Optimasi Kinerja & Build**:
   - Optimasi gambar WebP/AVIF, validasi SEO meta tag, dan verifikasi `npm run build` bebas error.

---

### 🎨 Standar Visual: Minimalist Clean Islamic Tech (Linear/Stripe Style)
1. **Palet Warna**: Crisp White (`#ffffff`, `bg-white`), Subtle Slate Off-White (`#f8fafc`, `bg-slate-50`), Deep Pine Green (`#064e3b`), Vivid Mint (`#10b981`, `#34d399`), dan Border Hairline Netral (`border-slate-200/90`).
2. **Tipografi**: Geometric Sans-serif modern (*Plus Jakarta Sans* / *Inter*) dengan hirarki visual yang tajam dan nyaman dibaca.
3. **Komponen Tech UI**: Pill badges dengan indikator status dot, Bento Grid bergaris halus, micro-hover lifting, dan tata letak terstruktur tanpa tumpang tindih (*zero collision*).
4. **Fotografi Realistis**: Foto kampus asli beresolusi tinggi dengan bingkai kartu presisi.
5. **Kompabilitas Next.js 16 (Turbopack)**: Seluruh 23 rute berhasil dikompilasi tanpa error (`npm run build` sukses 100%).

---

*Terakhir diperbarui: 8 Oktober 2026*
