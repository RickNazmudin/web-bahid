# PRD — Website Pesantren & PPDB Online

**Versi:** 1.0  
**Platform:** Responsive Web Application  
**Target:** Pesantren, Madrasah, dan Lembaga Pendidikan Islam.

## 1. Tujuan Produk
Membangun website resmi pesantren yang menyediakan informasi pendidikan dan fasilitas, serta sistem Penerimaan Santri Baru (PSB/PPDB) online dengan dashboard admin untuk mengelola pendaftaran.

## 2. Fitur Frontend (Public Website)
- **Home:** Hero section, profil singkat, keunggulan, program pendidikan, fasilitas, statistik, berita terbaru, CTA pendaftaran, dan footer.
- **Tentang:** Sejarah, visi misi, dan profil pesantren.
- **Program:** Daftar program pendidikan beserta deskripsi.
- **Fasilitas:** Galeri foto dan deskripsi fasilitas.
- **Berita:** Daftar berita dan halaman detail.
- **Kontak:** Alamat, WhatsApp, email, media sosial, dan Google Maps.
- **PPDB/PSB:** Informasi persyaratan, jadwal, biaya, dan tahapan seleksi.
- **Form Pendaftaran:** Form bertahap berisi data calon santri, data orang tua, pilihan jenjang/program, serta upload dokumen (KK, akta kelahiran, ijazah/SKL, dan foto).
- **Cek Status:** Pengecekan status menggunakan nomor pendaftaran dan tanggal lahir.
- **Halaman Sukses:** Menampilkan nomor pendaftaran setelah formulir berhasil dikirim.

## 3. Fitur Backend & Admin Dashboard
- **Login Admin:** Autentikasi aman dan proteksi halaman admin.
- **Dashboard:** Statistik total pendaftar, pendaftar baru, menunggu verifikasi, lulus, dan ditolak.
- **Manajemen Pendaftar:** Melihat, mencari, memfilter, dan membuka detail pendaftar.
- **Detail Pendaftar:** Melihat data calon santri, orang tua, pilihan program, dan dokumen.
- **Manajemen Status:** Mengubah status menjadi Baru, Verifikasi, Seleksi, Lulus, Ditolak, Daftar Ulang, atau Diterima.
- **Manajemen Santri:** Mengubah pendaftar yang telah menyelesaikan daftar ulang menjadi data santri.
- **CMS Berita:** CRUD berita, thumbnail, isi, draft, dan publikasi.
- **Manajemen Program & Fasilitas:** Tambah, edit, hapus, dan atur publikasi.
- **Pengaturan Website:** Mengelola nama pesantren, logo, alamat, kontak, media sosial, periode PPDB, jadwal, dan persyaratan.

## 4. Teknologi
- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend:** Next.js Route Handlers/API.
- **Database:** PostgreSQL.
- **ORM:** Prisma.
- **Authentication:** Session-based authentication dengan password hashing menggunakan Argon2 atau bcrypt.
- **File Storage:** Cloudflare R2, Supabase Storage, atau layanan object storage sejenis.
- **Deployment:** Vercel untuk aplikasi dan layanan PostgreSQL terkelola untuk database.

## 5. Database Utama
`users`, `applicants`, `parents`, `documents`, `students`, `programs`, `news`, `facilities`, `settings`, `registration_periods`, dan `audit_logs`.

## 6. Ketentuan UI/UX
- Desain modern, profesional, bersih, dan tidak terlihat seperti template AI generik.
- Website public menggunakan pendekatan mobile-first.
- Dashboard admin mengutamakan kemudahan penggunaan, navigasi sederhana, tabel yang jelas, pencarian, filter, dan pagination.
- Form pendaftaran bertahap dengan indikator progres, validasi, dan halaman konfirmasi.
- Gunakan identitas visual Islami secara elegan tanpa dekorasi berlebihan.

## 7. Keamanan
- Validasi data di frontend dan backend.
- Proteksi endpoint berdasarkan autentikasi dan hak akses.
- Dokumen pribadi tidak boleh dapat diakses publik tanpa otorisasi.
- Batasi ukuran dan tipe file upload.
- Terapkan rate limiting pada login dan pengecekan status.
- Gunakan HTTPS, secure cookies, backup database, dan audit log perubahan status.
- Lindungi data pribadi sesuai ketentuan perlindungan data yang berlaku.

## 8. Scope MVP V1
Fokus pada website profil pesantren, formulir PPDB online, upload dokumen, nomor pendaftaran otomatis, cek status, admin dashboard, manajemen pendaftar, pengelolaan konten, dan konversi pendaftar menjadi santri.

**Di luar scope V1:** Pembayaran online, WhatsApp otomatis, akademik, absensi, rapor, manajemen asrama, aplikasi mobile, dan fitur AI.

## 9. Acceptance Criteria
Produk dinyatakan siap apabila website responsif, formulir pendaftaran tersimpan ke database, nomor pendaftaran unik dihasilkan otomatis, dokumen tersimpan dengan aman, status pendaftaran dapat diperiksa, admin dapat memverifikasi dan mengelola pendaftar, pendaftar yang diterima dapat dikonversi menjadi santri, serta konten website dapat dikelola melalui dashboard tanpa mengubah kode program.

**Alur utama:** Pengunjung → Website → Form PPDB → Upload Dokumen → Nomor Pendaftaran → Verifikasi Admin → Seleksi → Diterima → Data Santri.